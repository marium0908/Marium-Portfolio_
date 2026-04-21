import { useProfile } from "@/hooks/usePortfolioData";
import { MapPin, Calendar, Code2 } from "lucide-react";
import logo from "@/assets/logo.png";

const AboutSection = () => {
  const { data: profile } = useProfile();

  return (
    <section id="about" className="section-padding relative mesh-gradient-bg">
      <div className="container mx-auto relative z-10">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center tracking-wider">
          About <span className="gradient-text">Me</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 font-light">Get to know me better</p>

        <div className="max-w-4xl mx-auto glass-card-3d rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
            <img src={logo} alt="Codhex" width={100} height={100} className="w-24 h-24 rounded-2xl object-cover border border-primary/30 lg:hidden" loading="lazy" style={{ boxShadow: '0 0 20px hsl(270 80% 50% / 0.2)' }} />
            <p className="text-lg leading-relaxed text-muted-foreground font-light">
              {profile?.bio ||
                "Started my web development journey in 2024 with a passion for creating innovative digital solutions. I'm constantly learning and evolving, turning ideas into reality through code."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: MapPin, label: "Location", value: profile?.location || "Dhaka, Bangladesh" },
              { icon: Calendar, label: "Journey Started", value: profile?.journey_started || "2024" },
              { icon: Code2, label: "Focus", value: "Full-Stack Development" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className="p-3 rounded-xl bg-accent/50 border border-primary/10 group-hover:border-primary/30 transition-colors">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-medium text-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
