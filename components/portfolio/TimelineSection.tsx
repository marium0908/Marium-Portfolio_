import { GraduationCap, BookOpen, Rocket } from "lucide-react";

const timelineData = [
  { year: "2024 - Present", title: "Programming Hero", desc: "Advanced web development course", icon: GraduationCap, color: "from-blue-500 to-purple-500" },
  { year: "2024", title: "Shikhbe Shobai", desc: "Foundational programming course", icon: BookOpen, color: "from-purple-500 to-pink-500" },
  { year: "2024", title: "Journey Started", desc: "Began web development path", icon: Rocket, color: "from-pink-500 to-cyan-500" },
];

const TimelineSection = () => {
  return (
    <section className="section-padding relative">
      <div className="container mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center tracking-wider">
          Education & <span className="gradient-text">Timeline</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 font-light">My learning journey</p>

        <div className="max-w-2xl mx-auto relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5" style={{ background: 'linear-gradient(to bottom, hsl(220 90% 55%), hsl(270 80% 55%), hsl(320 70% 50%))' }} />
          {timelineData.map((item, i) => (
            <div key={i} className="relative flex items-start gap-6 mb-10 last:mb-0">
              <div className={`relative z-10 p-3 rounded-xl bg-gradient-to-br ${item.color} text-white shrink-0 shadow-lg`} style={{ boxShadow: '0 8px 20px hsl(270 80% 40% / 0.3)' }}>
                <item.icon size={20} />
              </div>
              <div className="glass-card-3d rounded-xl p-6 flex-1">
                <span className="text-xs font-heading font-medium text-primary tracking-wider">{item.year}</span>
                <h3 className="font-heading text-lg font-semibold mt-1 tracking-wide">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 font-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
