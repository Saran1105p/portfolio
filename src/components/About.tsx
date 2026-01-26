import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, MapPin, Calendar, Briefcase } from "lucide-react";

const stats = [
  { label: "Years Experience", value:"5"  },
  { label: "Projects Completed", value: "50+" },
  { label: "Happy Clients", value: "30+" },
  { label: "Technologies", value: "20+" },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Passionate About Creating{" "}
            <span className="neon-text">Digital Excellence</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Image/Avatar area */}
          <img
            src="/my_image.jpeg"
            alt="Profile"
            className="w-full max-w-sm h-auto rounded-xl shadow-lg justify-self-center"
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-base text-muted-foreground leading-relaxed text-justify">
             I am a dedicated third-year undergraduate specializing in Artificial Intelligence and Machine Learning, with strong interests in Full Stack Development. I am passionate about building scalable, user-friendly applications that combine intelligent systems with modern web technologies. I enjoy solving real-world problems using data-driven approaches and continuously improving my technical and problem-solving skills. I am currently seeking an internship opportunity where I can contribute to impactful projects, gain hands-on industry experience, and grow as a professional developer
            </p>
           <motion.a
            href="/resume.saran.pdf"
            download
            className="group mt-8 px-6 py-3 glass-card neon-border font-medium flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
            >
            <Download size={20} className="group-hover:animate-bounce" />
            Download Resume
            <motion.div
             className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
            />
          </motion.a>

          </motion.div>
        </div>
      </div>
    </section>
  );
};
