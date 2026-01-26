import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, MapPin, Calendar, Briefcase } from "lucide-react";

const stats = [
  { label: "Years Experience", value: "5+" },
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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image/Avatar area */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative perspective-1000">
              <motion.div
                className="glass-card p-8 neon-border"
                whileHover={{ rotateY: 5, rotateX: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="aspect-square rounded-xl bg-gradient-to-br from-neon-cyan/20 via-neon-purple/20 to-neon-pink/20 flex items-center justify-center overflow-hidden">
                  <div className="text-[200px] font-bold neon-text opacity-20">PS</div>
                </div>
                
                {/* Floating badges */}
                <motion.div
                  className="absolute -top-4 -right-4 glass-card px-4 py-2 flex items-center gap-2"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Briefcase size={16} className="text-primary" />
                  <span className="text-sm font-medium">Open to Work</span>
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-4 -left-4 glass-card px-4 py-2 flex items-center gap-2"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                >
                  <MapPin size={16} className="text-accent" />
                  <span className="text-sm font-medium">Chennai, India</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate full-stack developer with over 5 years of
              experience in building scalable web applications. I specialize in
              React, Node.js, and cloud technologies, with a keen eye for
              creating intuitive user experiences.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              My journey in tech started with a curiosity for how things work,
              which evolved into a career building solutions that make a
              difference. I believe in writing clean, maintainable code and
              staying updated with the latest industry trends.
            </p>

            <div className="flex items-center gap-4 text-muted-foreground">
              <Calendar size={18} className="text-primary" />
              <span>Coding since 2018</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="glass-card p-4 text-center"
                >
                  <div className="text-3xl font-bold neon-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Download Resume Button */}
            <motion.button
              className="group mt-8 px-6 py-3 glass-card neon-border font-medium flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={20} className="group-hover:animate-bounce" />
              Download Resume
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
