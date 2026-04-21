import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Star } from "lucide-react";
import { useProject } from "@/hooks/usePortfolioData";
import { getProjectImage } from "@/lib/imageMap";
import Footer from "@/components/portfolio/Footer";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading, error } = useProject(id);

  useEffect(() => {
    if (project?.title) document.title = `${project.title} | CODNEX Project`;
    return () => {
      document.title = "CODNEX | Marium Binte Muhammad — Full-Stack Web Developer";
    };
  }, [project?.title]);

  return (
    <div className="min-h-screen flex flex-col mesh-gradient-bg">
      <header className="container mx-auto px-4 pt-8 relative z-10">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </header>

      <main className="flex-1 container mx-auto px-4 py-10 max-w-4xl relative z-10">
        {isLoading && (
          <div className="space-y-4 animate-pulse">
            <div className="h-8 w-2/3 bg-muted/40 rounded" />
            <div className="aspect-video bg-muted/20 rounded-2xl mt-6" />
            <div className="h-4 bg-muted/20 rounded" />
            <div className="h-4 bg-muted/20 rounded w-5/6" />
          </div>
        )}

        {!isLoading && (error || !project) && (
          <div className="glass-card rounded-2xl p-10 text-center">
            <h1 className="font-heading text-2xl font-bold mb-2">Project not found</h1>
            <p className="text-muted-foreground mb-6">This project doesn't exist or was removed.</p>
            <Link to="/#projects" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
              <ArrowLeft size={14} /> Back to Projects
            </Link>
          </div>
        )}

        {project && (
          <article>
            <div className="flex items-center gap-3 mb-4">
              {project.featured && (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-heading font-semibold rounded-full tracking-wider text-white" style={{ background: 'linear-gradient(135deg, hsl(270 80% 55%), hsl(320 70% 50%))' }}>
                  <Star size={12} /> Featured
                </span>
              )}
            </div>

            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-6 tracking-tight gradient-text">
              {project.title}
            </h1>

            <div className="aspect-video rounded-2xl overflow-hidden mb-8 glow-border">
              <img
                src={getProjectImage(project.title, project.image)}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 font-light whitespace-pre-line">
              {project.description || "No description provided."}
            </p>

            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading text-sm uppercase tracking-wider text-muted-foreground mb-3">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <span key={tech} className="px-3 py-1.5 bg-accent/50 text-accent-foreground rounded-lg text-xs font-medium border border-primary/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {project.live_link && (
                <a
                  href={project.live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-heading font-semibold tracking-wider text-primary-foreground"
                  style={{ background: 'linear-gradient(135deg, hsl(220 90% 55%), hsl(270 80% 55%), hsl(320 70% 50%))' }}
                >
                  <ExternalLink size={16} /> View Live
                </a>
              )}
              {project.github_link && (
                <a
                  href={project.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-heading font-semibold tracking-wider border border-primary/40 hover:bg-accent/30 transition-all"
                >
                  <Github size={16} /> View Code
                </a>
              )}
            </div>
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;