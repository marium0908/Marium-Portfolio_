import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/hooks/usePortfolioData";
import { Mail, Phone, MapPin, Send, Github, Facebook } from "lucide-react";
import { toast } from "sonner";

const ContactSection = () => {
  const { data: profile } = useProfile();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill all required fields");
      return;
    }
    setSending(true);
    const { error } = await supabase.from("messages").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim() || null,
      message: form.message.trim(),
    });
    setSending(false);
    if (error) {
      toast.error("Failed to send message");
    } else {
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: profile?.email || "mariumbintemuhammad@gmail.com" },
    { icon: Phone, label: "Phone", value: profile?.phone || "01602163796" },
    { icon: MapPin, label: "Location", value: profile?.location || "Dhaka, Bangladesh" },
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/marium0908" },
    { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/marium0908" },
  ];

  return (
    <section id="contact" className="section-padding relative mesh-gradient-bg">
      <div className="container mx-auto relative z-10">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center tracking-wider">
          Get in <span className="gradient-text">Touch</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 font-light">Let's work together</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h3 className="font-heading text-xl font-semibold mb-6 tracking-wide">Contact Information</h3>
            <div className="space-y-6">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="p-3 rounded-xl bg-accent/50 border border-primary/10 group-hover:border-primary/30 transition-colors" style={{ boxShadow: '0 4px 12px hsl(270 80% 40% / 0.1)' }}>
                    <item.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-sm text-muted-foreground mb-3">Find me on</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="p-3 rounded-xl bg-accent/50 border border-primary/10 hover:border-primary/40 hover:bg-accent/70 transition-all group"
                    style={{ boxShadow: '0 4px 12px hsl(270 80% 40% / 0.1)' }}
                  >
                    <item.icon size={20} className="text-primary group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border/50 focus:border-primary/50 focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                maxLength={100}
              />
              <input
                type="email"
                placeholder="Your Email *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border/50 focus:border-primary/50 focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                maxLength={255}
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border/50 focus:border-primary/50 focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
              maxLength={200}
            />
            <textarea
              placeholder="Your Message *"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border/50 focus:border-primary/50 focus:outline-none transition-colors resize-none text-foreground placeholder:text-muted-foreground/50"
              maxLength={1000}
            />
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-heading text-sm font-semibold tracking-wider text-white disabled:opacity-50 transition-all hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, hsl(220 90% 55%), hsl(270 80% 55%), hsl(320 70% 50%))' }}
            >
              <Send size={18} /> {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
