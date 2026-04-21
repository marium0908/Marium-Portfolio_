import { Folder, Cpu, BookOpen, Heart } from "lucide-react";

const stats = [
  { icon: Folder, value: "15+", label: "Projects", color: "from-blue-400 to-blue-600" },
  { icon: Cpu, value: "13+", label: "Technologies", color: "from-purple-400 to-purple-600" },
  { icon: BookOpen, value: "2", label: "Courses", color: "from-pink-400 to-pink-600" },
  { icon: Heart, value: "100%", label: "Dedication", color: "from-cyan-400 to-cyan-600" },
];

const StatsSection = () => {
  return (
    <section className="section-padding relative">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card-3d rounded-2xl p-8 text-center group">
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg`} style={{ boxShadow: '0 8px 24px hsl(270 80% 40% / 0.2)' }}>
                <stat.icon size={28} className="text-white" />
              </div>
              <h3 className="font-heading text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
