"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const TypewriterText = ({ texts }: { texts: string[] }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentTextIndex];
      
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts]);

  return (
    <span className="text-yellow-400">
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  );
};

const FloatingCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -10 }}
      className="relative"
    >
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const SkillOrb = ({ skill, index }: { skill: string; index: number }) => {
  const colors = [
    "from-blue-400 to-cyan-400",
    "from-purple-400 to-pink-400", 
    "from-green-400 to-emerald-400",
    "from-orange-400 to-red-400",
    "from-yellow-400 to-amber-400",
    "from-indigo-400 to-purple-400"
  ];

  return (
    <motion.div
      className={`absolute bg-gradient-to-r ${colors[index % colors.length]} rounded-full flex items-center justify-center text-white font-semibold shadow-lg`}
      style={{
        width: "80px",
        height: "80px",
        top: `${Math.sin((index * Math.PI * 2) / 6) * 150 + 150}px`,
        left: `${Math.cos((index * Math.PI * 2) / 6) * 150 + 150}px`,
      }}
      animate={{
        rotate: [0, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        scale: { duration: 2, repeat: Infinity, delay: index * 0.2 },
      }}
      whileHover={{ scale: 1.2, zIndex: 10 }}
    >
      <span className="text-xs text-center px-2">{skill}</span>
    </motion.div>
  );
};

export default function ModernHero() {
  const skills = ["React", "Next.js", "TypeScript", "Node.js", "C#", "MongoDB"];
  const roles = [
    "Full-Stack Developer",
    "Frontend Specialist", 
    "Backend Developer",
    "UI/UX Enthusiast"
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl animate-spin" style={{ animationDuration: "30s" }}></div>
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 200 - 100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">
          {/* Left Side - Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Greeting */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-yellow-400 font-medium"
              >
                👋 Merhaba, ben
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-5xl lg:text-7xl font-bold leading-tight"
              >
                <span className="bg-gradient-to-r from-white via-yellow-100 to-yellow-400 bg-clip-text text-transparent">
                  Yusuf Varış
                </span>
              </motion.h1>

              {/* Dynamic Role */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-2xl lg:text-4xl text-gray-300 h-16 flex items-center justify-center lg:justify-start"
              >
                <TypewriterText texts={roles} />
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-lg text-gray-400 max-w-2xl leading-relaxed"
              >
                Modern web teknolojileri ile kullanıcı dostu, performanslı ve ölçeklenebilir 
                uygulamalar geliştiriyorum. Her projede yaratıcılık ve teknik mükemmelliği bir araya getiriyorum.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold py-4 px-8 rounded-full hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Projelerimi Gör
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-yellow-400 text-yellow-400 font-bold py-4 px-8 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  İletişime Geç
                </motion.button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex gap-6 justify-center lg:justify-start"
              >
                {[
                  { icon: FiGithub, href: "https://github.com", label: "GitHub" },
                  { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: FiMail, href: "mailto:email@example.com", label: "Email" }
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -5 }}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300"
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side - Interactive Skills Orbit */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-[400px] h-[400px]">
              {/* Center Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-4xl z-10"
              >
                👨‍💻
              </motion.div>

              {/* Orbiting Skills */}
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
                >
                  <SkillOrb skill={skill} index={index} />
                </motion.div>
              ))}

              {/* Orbital Rings */}
              {[1, 2].map((ring) => (
                <motion.div
                  key={ring}
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-yellow-400/20 rounded-full`}
                  style={{
                    width: `${200 + ring * 100}px`,
                    height: `${200 + ring * 100}px`,
                  }}
                  animate={{ rotate: ring % 2 === 0 ? [0, 360] : [360, 0] }}
                  transition={{ duration: 30 + ring * 10, repeat: Infinity, ease: "linear" }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-yellow-400 cursor-pointer"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <FiArrowDown size={24} />
            <p className="text-sm mt-2">Keşfetmeye devam et</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}