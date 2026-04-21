import { useServices } from "@/hooks/usePortfolioData";
import { Globe, Layout, Server, ShoppingCart, Wrench, Code2 } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Globe, Layout, Server, ShoppingCart, Wrench, Code2,
};

const gradients = [
  "from-blue-500/20 to-purple-500/20",
  "from-purple-500/20 to-pink-500/20",
  "from-pink-500/20 to-cyan-500/20",
  "from-cyan-500/20 to-blue-500/20",
  "from-blue-400/20 to-indigo-500/20",
  "from-violet-500/20 to-fuchsia-500/20",
];

const ServicesSection = () => {
  const { data: services } = useServices();

  return (
    <section id="services" className="section-padding relative">
      <div className="container mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center tracking-wider">
          My <span className="gradient-text">Services</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 font-light">What I can do for you</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services?.map((service, i) => {
            const Icon = iconMap[service.icon || "Code2"] || Code2;
            return (
              <div key={service.id} className="glass-card-3d rounded-2xl p-8 group tilt-3d glow-border">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradients[i % gradients.length]} w-fit mb-5 border border-primary/10`}>
                  <Icon size={28} className="text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2 tracking-wide">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
