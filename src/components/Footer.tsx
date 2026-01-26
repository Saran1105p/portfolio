import { motion } from "framer-motion";
import { ChevronUp, Heart } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 via-neon-purple/10 to-neon-pink/10 animate-gradient" />
      
      {/* Glass overlay */}
      <div className="absolute inset-0 glass-card rounded-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="text-3xl font-bold neon-text"
            whileHover={{ scale: 1.05 }}
          >
            S
          </motion.a>

       

          {/* Scroll to top */}
          <motion.button
            onClick={scrollToTop}
            className="group p-3 glass-card rounded-full"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 20px hsl(var(--primary) / 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronUp
              size={24}
              className="group-hover:-translate-y-1 transition-transform"
            />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};
