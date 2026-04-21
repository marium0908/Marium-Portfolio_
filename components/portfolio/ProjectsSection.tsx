import { useProjects } from "@/hooks/usePortfolioData";
import { ExternalLink, Github } from "lucide-react";
import { getProjectImage } from "@/lib/imageMap";
import { Link } from "react-router-dom";

const ProjectsSection = () => {
  const { data: projects, isLoading } = useProjects();

  return (
    <section id="projects" className="section-padding relative mesh-gradient-bg">
      <div className="container mx-auto relative z-10">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center tracking-wider">
          My <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 font-light">Some things I've built</p>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[0, 1, 2].map((i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-muted/20" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-muted/30 rounded w-3/4" />
                  <div className="h-4 bg-muted/20 rounded" />
                  <div className="h-4 bg-muted/20 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && (!projects || projects.length === 0) && (
          <div className="max-w-md mx-auto glass-card rounded-2xl p-8 text-center text-muted-foreground">
            No projects to show yet.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects?.map((project) => (
            <div
              key={project.id}
              className="glass-card-3d rounded-2xl overflow-hidden group tilt-3d glow-border"
            >
              <Link to={`/project/${project.id}`} className="aspect-video bg-muted/20 relative overflow-hidden block">
                <img
                  src={getProjectImage(project.title, project.image)}
                  alt={project.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {project.featured && (
                  <span className="absolute top-3 right-3 px-3 py-1 text-xs font-heading font-semibold rounded-full tracking-wider text-white" style={{ background: 'linear-gradient(135deg, hsl(270 80% 55%), hsl(320 70% 50%))' }}>
                    Featured
                  </span>
                )}
              </Link>

              <div className="p-6">
                <Link to={`/project/${project.id}`} className="block">
                  <h3 className="font-heading text-base font-semibold mb-2 tracking-wide hover:text-primary transition-colors">{project.title}</h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 font-light">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 bg-accent/50 text-accent-foreground rounded-lg text-xs font-medium border border-primary/10">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 items-center">
                  <Link to={`/project/${project.id}`} className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
                    View Details
                  </Link>
                  {project.live_link && (
                    <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-foreground transition-colors font-medium">
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                  {project.github_link && (
                    <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <Github size={14} /> Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
