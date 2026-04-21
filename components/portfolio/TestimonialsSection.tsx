import { useTestimonials } from "@/hooks/usePortfolioData";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const { data: testimonials } = useTestimonials();

  return (
    <section className="section-padding relative mesh-gradient-bg">
      <div className="container mx-auto relative z-10">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center tracking-wider">
          Client <span className="gradient-text">Testimonials</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 font-light">What people say about my work</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials?.map((t) => (
            <div key={t.id} className="glass-card-3d rounded-2xl p-8 relative tilt-3d glow-border">
              <Quote size={32} className="text-primary/15 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating || 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-light">"{t.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-heading font-bold text-sm" style={{ background: 'linear-gradient(135deg, hsl(220 90% 55%), hsl(270 80% 55%))' }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}{t.company ? `, ${t.company}` : ""}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
