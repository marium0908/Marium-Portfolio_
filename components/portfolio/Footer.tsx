import { Heart } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/30">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <img src={logo} alt="Codhex" className="w-8 h-8 rounded-full" />
          <span className="font-heading text-sm font-bold gradient-text tracking-wider">CODNEX BY MARIUM</span>
        </div>
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
          © {new Date().getFullYear()} Marium Binte Muhammad. Built with <Heart size={14} className="text-primary fill-primary" /> and code.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
