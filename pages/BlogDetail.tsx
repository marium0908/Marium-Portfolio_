import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { useBlog } from "@/hooks/usePortfolioData";
import { getBlogImage } from "@/lib/imageMap";
import Footer from "@/components/portfolio/Footer";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: blog, isLoading, error } = useBlog(id);

  useEffect(() => {
    if (blog?.title) document.title = `${blog.title} | CODNEX Blog`;
    return () => {
      document.title = "CODNEX | Marium Binte Muhammad — Full-Stack Web Developer";
    };
  }, [blog?.title]);

  return (
    <div className="min-h-screen flex flex-col mesh-gradient-bg">
      <header className="container mx-auto px-4 pt-8 relative z-10">
        <Link
          to="/#blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </header>

      <main className="flex-1 container mx-auto px-4 py-10 max-w-3xl relative z-10">
        {isLoading && (
          <div className="space-y-4 animate-pulse">
            <div className="h-8 w-2/3 bg-muted/40 rounded" />
            <div className="h-4 w-1/3 bg-muted/30 rounded" />
            <div className="aspect-video bg-muted/20 rounded-2xl mt-6" />
            <div className="h-4 bg-muted/20 rounded" />
            <div className="h-4 bg-muted/20 rounded w-5/6" />
            <div className="h-4 bg-muted/20 rounded w-4/6" />
          </div>
        )}

        {!isLoading && (error || !blog) && (
          <div className="glass-card rounded-2xl p-10 text-center">
            <h1 className="font-heading text-2xl font-bold mb-2">Post not found</h1>
            <p className="text-muted-foreground mb-6">This blog post doesn't exist or was removed.</p>
            <Link to="/#blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
              <ArrowLeft size={14} /> Back to Blog
            </Link>
          </div>
        )}

        {blog && (
          <article>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {blog.category && (
                <span className="px-3 py-1 bg-accent/50 text-accent-foreground rounded-full text-xs font-medium border border-primary/10">
                  {blog.category}
                </span>
              )}
              {blog.read_time && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={12} /> {blog.read_time}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar size={12} /> {new Date(blog.created_at).toLocaleDateString()}
              </span>
            </div>

            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-6 tracking-tight gradient-text">
              {blog.title}
            </h1>

            <div className="aspect-video rounded-2xl overflow-hidden mb-8 glow-border">
              <img
                src={getBlogImage(blog.title, blog.image)}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-invert max-w-none">
              {(blog.content || "").split("\n").filter(Boolean).map((para, i) => (
                <p key={i} className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5 font-light">
                  {para}
                </p>
              ))}
              {!blog.content && (
                <p className="text-muted-foreground italic">No content available for this post yet.</p>
              )}
            </div>
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetail;