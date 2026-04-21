import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useProjects, useBlogs, useMessages, useSkills, useServices, useTestimonials, useProfile } from "@/hooks/usePortfolioData";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  LayoutDashboard, FolderOpen, FileText, Wrench, Briefcase, MessageSquare, User, Star, LogOut, Plus, Pencil, Trash2, Menu, X,
} from "lucide-react";

type Tab = "dashboard" | "projects" | "blogs" | "skills" | "services" | "testimonials" | "profile" | "messages";

const AdminDashboard = () => {
  const { user, loading, signOut } = useAuth();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: projects } = useProjects();
  const { data: blogs } = useBlogs();
  const { data: messages } = useMessages();
  const { data: skills } = useSkills();
  const { data: services } = useServices();
  const { data: testimonials } = useTestimonials();
  const { data: profile } = useProfile();

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  if (!user) return <Navigate to="/admin/login" replace />;

  const sidebarItems: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "blogs", label: "Blogs", icon: FileText },
    { id: "skills", label: "Skills", icon: Wrench },
    { id: "services", label: "Services", icon: Briefcase },
    { id: "testimonials", label: "Testimonials", icon: Star },
    { id: "profile", label: "Profile", icon: User },
    { id: "messages", label: "Messages", icon: MessageSquare },
  ];

  const handleDelete = async (table: string, id: string) => {
    if (!confirm("Are you sure?")) return;
    const { error } = await supabase.from(table as any).delete().eq("id", id);
    if (error) toast.error("Delete failed");
    else {
      toast.success("Deleted");
      queryClient.invalidateQueries({ queryKey: [table] });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Mobile toggle */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden fixed top-4 left-4 z-50 p-2 glass-card rounded-xl">
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="p-6 border-b">
          <h2 className="font-heading text-lg font-bold gradient-text">Admin Panel</h2>
        </div>
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${tab === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button onClick={signOut} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {tab === "dashboard" && <DashboardView projects={projects} blogs={blogs} messages={messages} skills={skills} />}
        {tab === "projects" && <CrudTable title="Projects" items={projects} fields={["title", "description", "featured"]} tableName="projects" onDelete={handleDelete} queryClient={queryClient} />}
        {tab === "blogs" && <CrudTable title="Blogs" items={blogs} fields={["title", "category", "read_time"]} tableName="blogs" onDelete={handleDelete} queryClient={queryClient} />}
        {tab === "skills" && <CrudTable title="Skills" items={skills} fields={["name", "category"]} tableName="skills" onDelete={handleDelete} queryClient={queryClient} />}
        {tab === "services" && <CrudTable title="Services" items={services} fields={["title", "description"]} tableName="services" onDelete={handleDelete} queryClient={queryClient} />}
        {tab === "testimonials" && <CrudTable title="Testimonials" items={testimonials} fields={["name", "role", "content"]} tableName="testimonials" onDelete={handleDelete} queryClient={queryClient} />}
        {tab === "profile" && <ProfileEditor profile={profile} queryClient={queryClient} />}
        {tab === "messages" && <MessagesView messages={messages} onDelete={handleDelete} />}
      </main>
    </div>
  );
};

const DashboardView = ({ projects, blogs, messages, skills }: any) => {
  const stats = [
    { label: "Projects", value: projects?.length || 0, icon: FolderOpen },
    { label: "Blogs", value: blogs?.length || 0, icon: FileText },
    { label: "Messages", value: messages?.length || 0, icon: MessageSquare },
    { label: "Skills", value: skills?.length || 0, icon: Wrench },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <s.icon size={24} className="text-primary" />
            </div>
            <p className="font-heading text-3xl font-bold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const CrudTable = ({ title, items, fields, tableName, onDelete, queryClient }: any) => {
  const [editing, setEditing] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const startAdd = () => {
    const empty: any = {};
    fields.forEach((f: string) => (empty[f] = ""));
    if (tableName === "projects") {
      empty.technologies = "";
      empty.live_link = "";
      empty.github_link = "";
      empty.image = "";
      empty.featured = false;
    }
    if (tableName === "blogs") { empty.content = ""; empty.image = ""; }
    if (tableName === "testimonials") { empty.company = ""; empty.rating = 5; }
    if (tableName === "services") { empty.icon = "Code2"; }
    if (tableName === "skills") { empty.icon = ""; }
    setFormData(empty);
    setEditing("new");
  };

  const startEdit = (item: any) => {
    const data: any = {};
    Object.keys(item).forEach((k) => {
      if (k === "technologies") data[k] = (item[k] || []).join(", ");
      else data[k] = item[k];
    });
    setFormData(data);
    setEditing(item.id);
  };

  const save = async () => {
    const payload = { ...formData };
    delete payload.id;
    delete payload.created_at;
    delete payload.updated_at;
    if (tableName === "projects" && typeof payload.technologies === "string") {
      payload.technologies = payload.technologies.split(",").map((s: string) => s.trim()).filter(Boolean);
    }
    if (payload.rating) payload.rating = Number(payload.rating);
    if (payload.featured !== undefined) payload.featured = Boolean(payload.featured);

    let error;
    if (editing === "new") {
      ({ error } = await supabase.from(tableName).insert(payload));
    } else {
      ({ error } = await supabase.from(tableName).update(payload).eq("id", editing));
    }
    if (error) toast.error("Save failed: " + error.message);
    else {
      toast.success("Saved!");
      queryClient.invalidateQueries({ queryKey: [tableName] });
      setEditing(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold">{title}</h1>
        <button onClick={startAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90">
          <Plus size={16} /> Add
        </button>
      </div>

      {editing && (
        <div className="glass-card rounded-2xl p-6 mb-6">
          <h3 className="font-heading text-lg font-semibold mb-4">{editing === "new" ? "Add" : "Edit"} {title.slice(0, -1)}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(formData).filter((k) => !["id", "created_at", "updated_at", "sort_order"].includes(k)).map((key) => (
              <div key={key}>
                <label className="text-xs font-medium text-muted-foreground capitalize mb-1 block">{key.replace(/_/g, " ")}</label>
                {key === "content" || key === "description" || key === "bio" ? (
                  <textarea value={formData[key] || ""} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-sm" />
                ) : key === "featured" ? (
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={!!formData[key]} onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })} className="rounded" />
                    <span className="text-sm">Featured</span>
                  </label>
                ) : (
                  <input type={key === "rating" ? "number" : "text"} value={formData[key] || ""} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-sm" placeholder={key === "technologies" ? "React, Node.js, MongoDB" : ""} />
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={save} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">Save</button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 border border-border rounded-lg text-sm">Cancel</button>
          </div>
        </div>
      )}

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                {fields.map((f: string) => (
                  <th key={f} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase">{f.replace(/_/g, " ")}</th>
                ))}
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item: any) => (
                <tr key={item.id} className="border-b last:border-0 hover:bg-accent/30">
                  {fields.map((f: string) => (
                    <td key={f} className="px-4 py-3 text-sm max-w-xs truncate">
                      {f === "featured" ? (item[f] ? "⭐" : "—") : typeof item[f] === "object" ? JSON.stringify(item[f]) : String(item[f] || "—")}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => startEdit(item)} className="p-2 hover:bg-accent rounded-lg"><Pencil size={14} /></button>
                    <button onClick={() => onDelete(tableName, item.id)} className="p-2 hover:bg-destructive/10 text-destructive rounded-lg ml-1"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
              {(!items || items.length === 0) && (
                <tr><td colSpan={fields.length + 1} className="px-4 py-8 text-center text-muted-foreground">No items yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ProfileEditor = ({ profile, queryClient }: any) => {
  const [form, setForm] = useState<any>(profile || {});
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const { id, created_at, updated_at, ...payload } = form;
    const { error } = await supabase.from("profile").update(payload).eq("id", profile.id);
    setSaving(false);
    if (error) toast.error("Save failed");
    else { toast.success("Profile updated!"); queryClient.invalidateQueries({ queryKey: ["profile"] }); }
  };

  const profileFields = ["name", "title", "bio", "email", "phone", "location", "journey_started", "tagline"];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-6">Profile</h1>
      <div className="glass-card rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profileFields.map((key) => (
            <div key={key} className={key === "bio" ? "md:col-span-2" : ""}>
              <label className="text-xs font-medium text-muted-foreground capitalize mb-1 block">{key.replace(/_/g, " ")}</label>
              {key === "bio" ? (
                <textarea value={form[key] || ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} rows={4} className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-sm" />
              ) : (
                <input type="text" value={form[key] || ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-sm" />
              )}
            </div>
          ))}
        </div>
        <button onClick={save} disabled={saving} className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

const MessagesView = ({ messages, onDelete }: any) => {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-6">Messages</h1>
      <div className="space-y-4">
        {messages?.map((msg: any) => (
          <div key={msg.id} className="glass-card rounded-2xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{msg.name}</h3>
                <p className="text-sm text-muted-foreground">{msg.email}</p>
                {msg.subject && <p className="text-sm text-primary mt-1">{msg.subject}</p>}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{new Date(msg.created_at).toLocaleDateString()}</span>
                <button onClick={() => onDelete("messages", msg.id)} className="p-2 hover:bg-destructive/10 text-destructive rounded-lg"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="text-sm mt-3 text-muted-foreground">{msg.message}</p>
          </div>
        ))}
        {(!messages || messages.length === 0) && (
          <div className="glass-card rounded-2xl p-8 text-center text-muted-foreground">No messages yet</div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
