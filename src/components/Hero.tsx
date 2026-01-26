import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ExternalLink, Mail } from "lucide-react";

const FloatingShape = ({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 1, ease: "easeOut" }}
    className={className}
  />
);

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX - innerWidth / 2) / 50,
        y: (clientY - innerHeight / 2) / 50,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[100px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-pink/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
        </div>
      </div>

      {/* 3D Floating elements with parallax */}
      <motion.div
        style={{ x: mousePosition.x * 2, y: mousePosition.y * 2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <FloatingShape
          delay={0.5}
          className="absolute top-20 left-[15%] w-20 h-20 border border-neon-cyan/30 rounded-xl rotate-12 floating-element"
        />
        <FloatingShape
          delay={0.7}
          className="absolute top-40 right-[20%] w-16 h-16 bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 rounded-full floating-element-delayed"
        />
        <FloatingShape
          delay={0.9}
          className="absolute bottom-32 left-[25%] w-24 h-24 border border-neon-pink/20 rounded-2xl -rotate-12 floating-element-slow"
        />
        <FloatingShape
          delay={1.1}
          className="absolute bottom-40 right-[15%] w-12 h-12 bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 rounded-lg rotate-45 floating-element"
        />
        <FloatingShape
          delay={1.3}
          className="absolute top-1/3 left-[10%] w-8 h-8 bg-neon-cyan/20 rounded-full floating-element-delayed"
        />
        <FloatingShape
          delay={1.5}
          className="absolute top-1/4 right-[10%] w-14 h-14 border border-neon-purple/30 rounded-xl rotate-6 floating-element-slow"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 glass-card text-sm font-medium text-primary">
            ✨ Available for freelance work
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          Hi, I'm{" "}
          <span className="neon-text relative">
            John Doe
            <motion.span
              className="absolute -inset-2 bg-gradient-to-r from-neon-cyan/20 via-neon-purple/20 to-neon-pink/20 blur-xl -z-10"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          A <span className="text-primary">Full Stack Developer</span> crafting
          exceptional digital experiences with modern technologies and creative
          design
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#projects"
            className="group relative px-8 py-4 glass-card neon-border overflow-hidden font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 via-neon-purple/20 to-neon-pink/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.a
            href="#contact"
            className="group px-8 py-4 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink font-medium text-primary-foreground rounded-2xl"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(190 100% 50% / 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              Contact Me
              <Mail size={18} className="group-hover:rotate-12 transition-transform" />
            </span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-sm">Scroll down</span>
          <ArrowDown size={20} />
        </motion.a>
      </motion.div>
    </section>
  );
};
