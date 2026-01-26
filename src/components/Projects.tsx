import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "Autodash AI",
    description:
      "Developing the Front-end interface for AutodashAI using HTML, CSS, React to create a responsive, user-friendly design. Built interactive dashboards and integrated AI chatbot features, focusing on smooth user experience and visual appeal.",
    image: "🚗",
    tags: ["React", "HTML", "CSS", "AI Integration", "Dashboard"],
    liveUrl: "#",
    githubUrl: "#",
    color: "from-neon-cyan to-neon-purple",
  },
  {
    title: "AI Integrated Chatbot",
    description:
      "Developed a machine-learning enabled chatbot with real-time interaction features. Integrated with APIs and trained with custom datasets for improved user response accuracy.",
    image: "🤖",
    tags: ["Machine Learning", "Python", "API Integration", "NLP"],
    liveUrl: "#",
    githubUrl: "#",
    color: "from-neon-purple to-neon-pink",
  },
];

const ProjectCard = ({
  project,
  index,
  isInView,
}: {
  project: (typeof projects)[0];
  index: number;
  isInView: boolean;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="perspective-1000 h-[400px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden">
          <div className="glass-card h-full p-6 flex flex-col">
            <div
              className={`h-40 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-7xl mb-6`}
            >
              {project.image}
            </div>
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2 flex-1">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div
            className={`glass-card h-full p-6 flex flex-col justify-center items-center bg-gradient-to-br ${project.color} bg-opacity-20`}
          >
            <h3 className="text-2xl font-bold mb-4 text-center">
              {project.title}
            </h3>
            <p className="text-foreground/80 text-center mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium glass-card"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <motion.a
                href={project.liveUrl}
                className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={16} />
                Live Demo
              </motion.a>
              <motion.a
                href={project.githubUrl}
                className="flex items-center gap-2 px-4 py-2 glass-card rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={16} />
                Code
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neon-pink/5 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">
            My Projects
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="neon-text">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects. Hover over the cards to see
            more details and explore the tech stack.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 glass-card neon-border font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
            <ChevronRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
