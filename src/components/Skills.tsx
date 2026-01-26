import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: 95, color: "from-neon-cyan to-neon-blue" },
      { name: "TypeScript", level: 90, color: "from-neon-blue to-neon-purple" },
      { name: "Next.js", level: 85, color: "from-neon-purple to-neon-pink" },
      { name: "Tailwind CSS", level: 92, color: "from-neon-cyan to-neon-purple" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 88, color: "from-neon-cyan to-neon-blue" },
      { name: "Python", level: 82, color: "from-neon-blue to-neon-purple" },
      { name: "PostgreSQL", level: 85, color: "from-neon-purple to-neon-pink" },
      { name: "GraphQL", level: 78, color: "from-neon-pink to-neon-cyan" },
    ],
  },
  {
    category: "Tools & Cloud",
    items: [
      { name: "Docker", level: 80, color: "from-neon-cyan to-neon-blue" },
      { name: "AWS", level: 75, color: "from-neon-blue to-neon-purple" },
      { name: "Git", level: 92, color: "from-neon-purple to-neon-pink" },
      { name: "CI/CD", level: 82, color: "from-neon-pink to-neon-cyan" },
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
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-lg">{skill.name}</h4>
        <span className="text-primary font-medium">{skill.level}%</span>
      </div>
      
      {/* Progress bar */}
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
        >
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-white/20"
            />
          )}
        </motion.div>
      </div>

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
