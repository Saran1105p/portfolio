import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const skills = [
  {
    category: "Machine Learning",
    items: [
      { name: "SVM", level: 80, color: "from-neon-cyan to-neon-blue" },
      { name: "KNN", level: 78, color: "from-neon-blue to-neon-purple" },
      { name: "Random Forest", level: 82, color: "from-neon-purple to-neon-pink" },
      { name: "PCA", level: 75, color: "from-neon-pink to-neon-cyan" },
      { name: "K-Means Clustering", level: 77, color: "from-neon-cyan to-neon-purple" },
    ],
  },
  {
    category: "Machine Learning",
    items: [
      { name: "Data Visualization", level: 85, color: "from-neon-cyan to-neon-blue" },
      { name: "Predictive Modeling", level: 80, color: "from-neon-blue to-neon-purple" },
      { name: "Data Analysis", level: 88, color: "from-neon-purple to-neon-pink" },
      { name: "NLP", level: 85, color: "from-neon-pink to-neon-cyan" },
    ],
  },
  {
    category: "Programming Languages",
    items: [
      { name: "Python", level: 90, color: "from-neon-cyan to-neon-blue" },
      { name: "JavaScript", level: 88, color: "from-neon-blue to-neon-purple" },
      { name: "C", level: 85, color: "from-neon-purple to-neon-pink" },
      { name: "MySQL", level: 82, color: "from-neon-pink to-neon-cyan" },
      { name: "Java", level: 92, color: "from-neon-pink to-neon-cyan" },
    ],
  },
  {
    category: "Tools & Frameworks",
    items: [
      { name: "Jupyter Notebook", level: 88, color: "from-neon-cyan to-neon-blue" },
      { name: "TensorFlow", level: 80, color: "from-neon-blue to-neon-purple" },
      { name: "Matplotlib", level: 85, color: "from-neon-purple to-neon-pink" },
      { name: "VS Code", level: 95, color: "from-neon-pink to-neon-cyan" },
    ],
  },
];

const SkillCard = ({
  skill,
  index,
  isInView,
}: {
  skill: { name: string; level: number; color: string };
  index: number;
  isInView: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 20, y: -x * 20 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: "preserve-3d",
      }}
      className="glass-card p-6 cursor-pointer transition-all duration-200 hover:shadow-lg"
    >
      <h4 className="font-semibold text-lg">{skill.name}</h4>

      {/* 3D shine effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: isHovered
            ? "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)"
            : "none",
          transform: "translateZ(20px)",
        }}
      />
    </motion.div>
  );
};

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">My Skills</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Technologies I{" "}
            <span className="neon-text">Work With</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm constantly learning and expanding my skill set. Here are the
            technologies I use to bring ideas to life.
          </p>
        </motion.div>

        <div className="space-y-12">
          {skills.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, x: catIndex % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-12 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full" />
                {category.category}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.items.map((skill, index) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={index}
                    isInView={isInView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
