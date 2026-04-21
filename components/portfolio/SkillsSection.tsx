import { useSkills } from "@/hooks/usePortfolioData";

const SkillsSection = () => {
  const { data: skills } = useSkills();

  return (
    <section id="skills" className="section-padding relative mesh-gradient-bg">
      <div className="container mx-auto relative z-10">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center tracking-wider">
          My <span className="gradient-text">Skills</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 font-light">Technologies I work with</p>

        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {skills?.map((skill, i) => (
            <span
              key={skill.id}
              className="px-6 py-3 glass-card-3d rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground cursor-default"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
