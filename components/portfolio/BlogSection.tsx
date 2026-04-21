import { useBlogs } from "@/hooks/usePortfolioData";
import { Clock, ArrowRight } from "lucide-react";
import { getBlogImage } from "@/lib/imageMap";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const { data: blogs, isLoading } = useBlogs();

  return (
    <section id="blog" className="section-padding relative">
      <div className="container mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center tracking-wider">
          Latest <span className="gradient-text">Blog</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 font-light">Thoughts and tutorials</p>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[0, 1, 2].map((i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-muted/20" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-muted/30 rounded w-1/3" />
                  <div className="h-5 bg-muted/30 rounded w-3/4" />
                  <div className="h-4 bg-muted/20 rounded" />
                  <div className="h-4 bg-muted/20 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && (!blogs || blogs.length === 0) && (
          <div className="max-w-md mx-auto glass-card rounded-2xl p-8 text-center text-muted-foreground">
            No blog posts yet — check back soon.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {blogs?.map((blog) => (
            <Link
              to={`/blog/${blog.id}`}
              key={blog.id}
              className="glass-card-3d rounded-2xl overflow-hidden group tilt-3d glow-border block"
            >
              <div className="aspect-video bg-muted/20 overflow-hidden">
                <img
                  src={getBlogImage(blog.title, blog.image)}
                  alt={blog.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  {blog.category && (
                    <span className="px-3 py-1 bg-accent/50 text-accent-foreground rounded-full text-xs font-medium border border-primary/10">{blog.category}</span>
                  )}
                  {blog.read_time && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={12} /> {blog.read_time}
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-base font-semibold mb-2 group-hover:text-primary transition-colors tracking-wide">{blog.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 font-light">{blog.content}</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
