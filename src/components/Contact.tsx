import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, Phone, Github, Linkedin} from "lucide-react";
// Removed EmailJS in favor of FormSubmit

const socialLinks = [
  { icon: Github, href: "https://github.com/Saran1105p?tab=repositories", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/saran-p-b4940a30a/", label: "LinkedIn" },
];

const FloatingLabelInput = ({
  label,
  type = "text",
  name,
  isTextarea = false,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  name: string;
  isTextarea?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const InputComponent = isTextarea ? "textarea" : "input";

  return (
    <div className="relative">
      <InputComponent
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-4 py-4 bg-transparent border border-border rounded-xl focus:border-primary focus:outline-none transition-all duration-300 ${
          isTextarea ? "min-h-[150px] resize-none" : ""
        } ${isFocused || value ? "pt-6" : ""}`}
      />
      <motion.label
        initial={false}
        animate={{
          y: isFocused || value ? -8 : 0,
          scale: isFocused || value ? 0.85 : 1,
          color: isFocused
            ? "hsl(var(--primary))"
            : "hsl(var(--muted-foreground))",
        }}
        className="absolute left-4 top-4 origin-left pointer-events-none transition-colors"
      >
        {label}
      </motion.label>
      {isFocused && (
        <motion.div
          layoutId="input-glow"
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            boxShadow: "0 0 20px hsl(var(--primary) / 0.2)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </div>
  );
};

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using FormSubmit for configuration-free email sending
      const response = await fetch("https://formsubmit.co/ajax/saran.p.r.2005@gmail.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
        }),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[100px]" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-neon-pink/5 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Work <span className="neon-text">Together</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your ideas to
            life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-card p-8 space-y-6">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

              <motion.div
                className="flex items-center gap-4"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href="mailto:saran.p.r.2005@gmail.com" className="font-medium hover:text-primary transition-colors block">
                    saran.p.r.2005@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 flex items-center justify-center">
                  <Phone size={20} className="text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href="tel:+919789719560" className="font-medium hover:text-secondary transition-colors block">
                    +91 9789719560
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-pink/20 to-neon-cyan/20 flex items-center justify-center">
                  <MapPin size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Chennai, India</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 20px hsl(var(--primary) / 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 glass-card rounded-xl flex items-center justify-center hover:bg-primary/20 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
              <FloatingLabelInput 
                label="Your Name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
              />
              <FloatingLabelInput 
                label="Your Email" 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
              />
              <FloatingLabelInput 
                label="Subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
              />
              <FloatingLabelInput
                label="Your Message"
                name="message"
                isTextarea
                value={formData.message}
                onChange={handleChange}
              />

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink text-primary-foreground font-medium rounded-xl relative overflow-hidden group disabled:opacity-70"
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px hsl(190 100% 50% / 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
