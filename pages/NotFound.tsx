import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 mesh-gradient-bg relative overflow-hidden">
      <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-600/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-[10%] w-80 h-80 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl animate-float-delayed" />

      <div className="relative z-10 text-center max-w-md">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
          <Sparkles size={14} className="text-primary" />
          <span className="text-sm text-muted-foreground font-medium">Lost in space</span>
        </div>
        <h1 className="font-heading text-7xl md:text-9xl font-bold gradient-text neon-glow mb-4">404</h1>
        <p className="font-heading text-xl md:text-2xl mb-2 tracking-wider">Page not found</p>
        <p className="text-muted-foreground mb-8 font-light">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-heading text-sm font-semibold tracking-wider text-primary-foreground"
          style={{ background: 'linear-gradient(135deg, hsl(220 90% 55%), hsl(270 80% 55%), hsl(320 70% 50%))' }}
        >
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
