"use client";

import { motion } from "framer-motion";
import { FiHeart, FiGithub, FiLinkedin, FiMail, FiArrowUp, FiCode, FiCoffee } from "react-icons/fi";

const ModernFooter = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FiGithub />,
      href: "https://github.com/YusufVariss",
      label: "GitHub",
      color: "hover:text-gray-400",
    },
    {
      icon: <FiLinkedin />,
      href: "https://www.linkedin.com/in/yusufvaris/",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: <FiMail />,
      href: "mailto:varisyusuff@gmail.com",
      label: "Email",
      color: "hover:text-yellow-400",
    },
  ];

  const quickLinks = [
    { label: "Ana Sayfa", href: "#home" },
    { label: "Hakkımda", href: "#about" },
    { label: "Projeler", href: "#projects" },
    { label: "İletişim", href: "#contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-gradient-to-t from-black via-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-400/20 rounded-full"
          animate={{
            y: [0, -50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 200}px`,
          }}
        />
      ))}

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-2">
                  Yusuf Varış
                </h3>
                <p className="text-yellow-400 font-medium">Full-Stack Developer</p>
              </motion.div>
              
              <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
                Modern web teknolojileri ile kullanıcı dostu, performanslı ve ölçeklenebilir 
                uygulamalar geliştiriyorum. Her projede yaratıcılık ve teknik mükemmelliği bir araya getiriyorum.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center text-gray-300 transition-all duration-300 ${social.color}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h4 className="text-xl font-bold text-yellow-400 mb-6">Hızlı Erişim</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Tech & Services */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h4 className="text-xl font-bold text-yellow-400 mb-6">Teknolojiler</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-400">
                  <FiCode size={16} />
                  <span>React & Next.js</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <FiCode size={16} />
                  <span>JavaScript</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <FiCode size={16} />
                  <span>Node.js & C#</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <FiCode size={16} />
                  <span>MongoDB & SQL</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <motion.div
                className="flex items-center gap-2 text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <span>© {currentYear} Yusuf Varış. Tüm hakları saklıdır.</span>
              </motion.div>

              {/* Back to top button */}
              <motion.button
                onClick={scrollToTop}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-400/30 rounded-full text-yellow-400 hover:bg-gradient-to-r hover:from-yellow-400/30 hover:to-amber-500/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiArrowUp size={16} />
                <span className="text-sm font-medium">Başa Dön</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-px">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;