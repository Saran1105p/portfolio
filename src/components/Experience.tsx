import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Frontend Developer",
    company: "ParkQwik",
    period: "Nov 2025 - Dec 2025",
    description:
      "Developed responsive user interfaces and enhanced frontend features for the ParkQwik application.",
  },
  {
    type: "work",
    title: "Full Stack Developer",
    company: "Centre for Data Science, Rajalakshmi Institute of Technology",
    period: "June 2025 - Aug 2025",
    description:
      "Developed full-stack applications, worked with databases and APIs, contributed to data science projects.",
  },
  {
    type: "work",
    title: "Front-End Developer",
    company: "CodexIntern",
    period: "Aug 2025",
    description:
      "Completed a virtual internship in Front-End Development. Gained practical experience in HTML, CSS, and JavaScript for building responsive web pages.",
  },
  {
    type: "education",
    title: "B.E - CSE(AI&ML)",
    company: "Rajalakshmi Institute of Technology, Chennai",
    period: "2023 - 2027",
    description:
      "Specializing in Artificial Intelligence and Machine Learning with focus on Full Stack Development. CGPA: 7.8",
  },
  {
    type: "education",
    title: "HSC",
    company: "Brindhavan Higher Secondary School, Pattukkottai",
    period: "2022 - 2023",
    description:
      "Higher Secondary Education. Score: 80%",
  },
];

const TimelineItem = ({
  item,
  index,
  isInView,
}: {
  item: (typeof experiences)[0];
  index: number;
  isInView: boolean;
}) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`flex items-center gap-8 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Content */}
      <motion.div
        className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}
        whileHover={{ scale: 1.02 }}
      >
        <div className="glass-card p-6 inline-block">
          <div
            className={`flex items-center gap-2 mb-2 ${
              isLeft ? "md:justify-end" : ""
            }`}
          >
            <Calendar size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{item.period}</span>
          </div>
          <h3 className="text-xl font-bold mb-1">{item.title}</h3>
          <p className="text-primary font-medium mb-3">{item.company}</p>
          <p className="text-muted-foreground text-sm">{item.description}</p>
        </div>
      </motion.div>

      {/* Center icon */}
      <motion.div
        className="relative z-10 flex-shrink-0"
        whileHover={{ scale: 1.2, rotate: 360 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <div
          className={`w-12 h-12 rounded-full glass-card flex items-center justify-center ${
            item.type === "work"
              ? "bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20"
              : "bg-gradient-to-br from-neon-purple/20 to-neon-pink/20"
          }`}
        >
          {item.type === "work" ? (
            <Briefcase size={20} className="text-primary" />
          ) : (
            <GraduationCap size={20} className="text-secondary" />
          )}
        </div>
      </motion.div>

      {/* Spacer for opposite side */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
};

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">
            Experience & Education
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="neon-text">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A timeline of my professional career and educational background.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-pink origin-top hidden md:block"
          />

          {/* Mobile timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-pink origin-top md:hidden"
          />

          <div className="space-y-12">
            {experiences.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
