import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { useProfile } from "@/hooks/usePortfolioData";
import logo from "@/assets/logo.png";

const techIcons = ["React", "Node.js", "Next.js", "MongoDB", "Tailwind", "Firebase"];

const HeroSection = () => {
  const { data: profile } = useProfile();

  return (
    <section id="hero" className="min-h-screen flex items-center section-padding pt-32 relative overflow-hidden mesh-gradient-bg">
      {/* Floating orbs */}
      <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-600/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-[10%] w-80 h-80 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-blue-600/5 to-pink-500/5 blur-3xl" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 particle-bg opacity-30" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 animate-fade-in-up">
              <Sparkles size={14} className="text-primary" />
              <span className="text-sm text-muted-foreground font-medium">Full-Stack Web Developer</span>
            </div>

            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up tracking-tight">
              Hi, I'm{" "}
              <span className="gradient-text neon-glow block mt-2">
                {profile?.name || "Marium"}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-2 font-body animate-fade-in-up font-light tracking-wide">
              {profile?.title || "Full-Stack Web Developer"}
            </p>
            <p className="text-lg text-muted-foreground/70 mb-8 animate-fade-in-up">
              {profile?.tagline || "Crafting Digital Experiences from Bangladesh 🇧🇩"}
            </p>

            <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-heading text-sm font-semibold tracking-wider text-primary-foreground relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, hsl(220 90% 55%), hsl(270 80% 55%), hsl(320 70% 50%))' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-primary/40 text-foreground rounded-xl font-heading text-sm font-semibold tracking-wider hover:bg-accent/30 hover:border-primary/60 transition-all"
              >
                Let's Work Together <ExternalLink size={18} />
              </a>
            </div>

            <div className="flex flex-wrap gap-3 animate-fade-in-up">
              {techIcons.map((tech, i) => (
                <span
                  key={tech}
                  className="px-4 py-2 glass-card rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all cursor-default"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="relative sticky top-32 self-start">
              {/* Outer themed glow halo */}
              <div
                className="absolute -inset-16 rounded-full blur-3xl opacity-80"
                style={{
                  background:
                    'radial-gradient(circle at center, hsl(270 80% 55% / 0.45), hsl(220 90% 55% / 0.3) 40%, hsl(320 70% 50% / 0.25) 65%, transparent 80%)',
                }}
              />

              {/* Inner gradient disc that matches the theme */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle at 30% 30%, hsl(220 90% 60% / 0.35), hsl(270 80% 55% / 0.25) 45%, hsl(320 70% 50% / 0.15) 70%, transparent 85%)',
                  filter: 'blur(8px)',
                }}
              />

              {/* Logo display - static, fully visible, themed glow */}
              <div
                className="relative w-[28rem] xl:w-[32rem] aspect-square flex items-center justify-center"
                style={{
                  filter:
                    'drop-shadow(0 0 35px hsl(270 80% 60% / 0.6)) drop-shadow(0 0 70px hsl(220 90% 55% / 0.4)) drop-shadow(0 0 100px hsl(320 70% 50% / 0.3))',
                }}
              >
                <img
                  src={logo}
                  alt="CODNEX by Marium"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
