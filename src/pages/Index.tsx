import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ParticleBackground";

const Index = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative min-h-screen"
      >
        {/* Particle animation background */}
        <ParticleBackground />

        {/* Navigation */}
        <Navigation />

        {/* Main content */}
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
