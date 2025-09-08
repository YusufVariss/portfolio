"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiTwitter, FiSend, FiCheck } from "react-icons/fi";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactCard = ({ 
  icon, 
  title, 
  value, 
  href, 
  delay = 0 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  href?: string; 
  delay?: number; 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative group"
    >
      <motion.div 
        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-yellow-400/30 transition-all duration-300 h-full"
        whileHover={{ boxShadow: "0 20px 40px rgba(251, 191, 36, 0.1)" }}
      >
        {/* Glowing Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-blue-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 text-center">
          <motion.div 
            className="mb-4 mx-auto w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-black text-2xl"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            {icon}
          </motion.div>
          
          <h3 className="text-xl font-bold text-yellow-400 mb-3">{title}</h3>
          
          {href ? (
            <motion.a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 break-words"
              whileHover={{ scale: 1.05 }}
            >
              {value}
            </motion.a>
          ) : (
            <p className="text-gray-300 break-words">{value}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const SocialLink = ({ 
  icon, 
  href, 
  label, 
  color,
  delay = 0 
}: { 
  icon: React.ReactNode; 
  href: string; 
  label: string; 
  color: string;
  delay?: number;
}) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative w-14 h-14 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-full border border-white/10 hover:border-${color}-400/50 flex items-center justify-center text-gray-300 hover:text-${color}-400 transition-all duration-300`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-xl">{icon}</div>
      
      {/* Tooltip */}
      <motion.div
        className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ y: 10 }}
        whileHover={{ y: 0 }}
      >
        {label}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
      </motion.div>
    </motion.a>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      borderColor: "rgba(251, 191, 36, 0.5)",
      transition: { duration: 0.3 }
    },
    blur: {
      scale: 1,
      borderColor: "rgba(255, 255, 255, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative"
    >
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-2xl p-8 border border-white/10">
        <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Mesaj Gönder</h3>
        
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={inputVariants} whileFocus="focus" initial="blur">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                İsim Soyisim
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-all duration-300"
                placeholder="Adınız"
              />
            </motion.div>
            
            <motion.div variants={inputVariants} whileFocus="focus" initial="blur">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                E-posta
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-all duration-300"
                placeholder="email@example.com"
              />
            </motion.div>
          </div>

          {/* Subject */}
          <motion.div variants={inputVariants} whileFocus="focus" initial="blur">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
              Konu
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-all duration-300"
              placeholder="Proje hakkında..."
            />
          </motion.div>

          {/* Message */}
          <motion.div variants={inputVariants} whileFocus="focus" initial="blur">
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Mesaj
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-all duration-300 resize-none"
              placeholder="Projeniz hakkında detayları yazabilirsiniz..."
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div className="text-center">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center justify-center gap-3 bg-green-500 text-white font-bold py-4 px-8 rounded-full"
                >
                  <FiCheck />
                  Mesaj Gönderildi!
                </motion.div>
              ) : (
                <motion.button
                  key="submit"
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold py-4 px-8 rounded-full hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <FiSend />
                      Mesaj Gönder
                    </>
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default function ModernContact() {
  const contactInfo = [
    {
      icon: <FiMail />,
      title: "E-posta",
      value: "yusuf@example.com",
      href: "mailto:yusuf@example.com",
    },
    {
      icon: <FiPhone />,
      title: "Telefon",
      value: "+90 555 123 45 67",
      href: "tel:+905551234567",
    },
    {
      icon: <FiMapPin />,
      title: "Konum",
      value: "İstanbul, Türkiye",
    },
  ];

  const socialLinks = [
    {
      icon: <FiGithub />,
      href: "https://github.com",
      label: "GitHub",
      color: "gray",
    },
    {
      icon: <FiLinkedin />,
      href: "https://linkedin.com",
      label: "LinkedIn", 
      color: "blue",
    },
    {
      icon: <FiTwitter />,
      href: "https://twitter.com",
      label: "Twitter",
      color: "blue",
    },
  ];

  return (
    <section id="contact" className="min-h-screen py-20 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-300 to-blue-400 bg-clip-text text-transparent">
            İletişime Geçin
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Projeleriniz için benimle iletişime geçebilir, işbirliği önerilerinizi paylaşabilirsiniz
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((info, index) => (
                <ContactCard
                  key={info.title}
                  {...info}
                  delay={index * 0.2}
                />
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-xl font-bold text-yellow-400 mb-6 text-center">
                Sosyal Medya
              </h3>
              <div className="flex justify-center gap-6">
                {socialLinks.map((social, index) => (
                  <SocialLink
                    key={social.label}
                    {...social}
                    delay={0.8 + index * 0.1}
                  />
                ))}
              </div>
            </motion.div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="bg-gradient-to-r from-green-400/10 to-emerald-400/10 backdrop-blur-md rounded-2xl p-6 border border-green-400/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <h3 className="text-lg font-bold text-green-400">
                  Yeni Projeler İçin Uygunum
                </h3>
              </div>
              <p className="text-gray-300">
                Freelance projeler ve uzun vadeli işbirlikleri için açığım. 
                Projeniz hakkında konuşmak için mesaj gönderin!
              </p>
            </motion.div>
          </div>

          {/* Right Side - Contact Form */}
          <ContactForm />
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">
              Bir Proje Planınız mı Var?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Web uygulaması, mobil uygulama veya API geliştirme konularında yardımcı olabilirim. 
              Projenizi hayata geçirmek için hemen iletişime geçelim!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:yusuf@example.com"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold py-4 px-8 rounded-full hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMail />
                Hemen E-posta Gönder
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-yellow-400 text-yellow-400 font-bold py-4 px-8 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiLinkedin />
                LinkedIn'den Bağlan
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}