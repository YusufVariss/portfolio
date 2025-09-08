"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { FiUser, FiBriefcase, FiCode, FiHeart } from "react-icons/fi";

interface AboutCardProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  content: React.ReactNode;
  gradient: string;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
  index: number;
}

const AboutCard = ({ 
  id, 
  icon, 
  title, 
  subtitle, 
  content, 
  gradient, 
  isSelected, 
  onSelect, 
  index 
}: AboutCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouse = (event: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="perspective-1000"
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <motion.div
        className={`relative h-80 w-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 backdrop-blur-md ${gradient} p-8 shadow-2xl transition-all duration-300 hover:border-yellow-400/30`}
        style={{ 
          rotateX, 
          rotateY,
          transformStyle: "preserve-3d"
        }}
        onClick={() => onSelect(isSelected ? null : id)}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(251, 191, 36, 0.25)"
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-blue-400/20 animate-pulse"></div>
        </div>
        
        {/* Glowing Border Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        
        {/* Card Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <motion.div
            className="mb-6 text-6xl"
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.6 }}
          >
            {icon}
          </motion.div>
          
          <motion.h3 
            className="mb-2 text-2xl font-bold text-yellow-400"
            layoutId={`title-${id}`}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="text-gray-300"
            layoutId={`subtitle-${id}`}
          >
            {subtitle}
          </motion.p>
          
          {/* Hover Indicator */}
          <motion.div
            className="mt-4 flex h-1 w-16 rounded-full bg-yellow-400/30"
            whileHover={{ scaleX: 1.5, backgroundColor: "rgba(251, 191, 36, 0.8)" }}
          />
        </div>
        
        {/* Selection Indicator */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-yellow-400 shadow-lg shadow-yellow-400/50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const DetailPanel = ({ selectedCard, onClose }: { selectedCard: string | null; onClose: () => void }) => {
  const getContent = () => {
    switch (selectedCard) {
      case 'who':
        return {
          title: "Ben Kimim?",
          icon: <FiUser className="text-4xl text-yellow-400" />,
          content: (
            <div className="space-y-6">
              <motion.p 
                className="text-lg leading-relaxed text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Merhaba! Ben <span className="bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text font-semibold text-transparent">Yusuf Varış</span>. 
                Yazılım geliştirme dünyasında tutkuyla çalışan bir geliştiriciyim.
              </motion.p>
              
              <motion.p 
                className="text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Teknolojiye olan merakım ve sürekli öğrenme isteğim sayesinde, her gün kendimi geliştirmeye devam ediyorum. 
                Karmaşık problemleri çözmek ve yaratıcı çözümler üretmek beni motive ediyor.
              </motion.p>
              
              <motion.div
                className="rounded-xl bg-gradient-to-r from-yellow-400/10 to-blue-400/10 p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-center italic text-yellow-300">
                  "Kod yazmak benim için sadece bir meslek değil, aynı zamanda bir sanat formu."
                </p>
              </motion.div>
            </div>
          )
        };
      
      case 'experience':
        return {
          title: "Deneyimlerim",
          icon: <FiBriefcase className="text-4xl text-yellow-400" />,
          content: (
            <div className="space-y-6">
              <motion.div 
                className="rounded-xl bg-gradient-to-r from-green-400/10 to-blue-400/10 p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                  <h4 className="text-xl font-bold text-green-400">5+ Yıl Deneyim</h4>
                </div>
                <p className="text-gray-300">
                  Web uygulamaları, mobil uygulamalar ve API'ler geliştirme konusunda uzmanlaştım.
                </p>
              </motion.div>
              
              <motion.div 
                className="rounded-xl bg-gradient-to-r from-blue-400/10 to-purple-400/10 p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                  <h4 className="text-xl font-bold text-blue-400">Full-Stack Development</h4>
                </div>
                <p className="text-gray-300">
                  Frontend'den backend'e, database'den deployment'a kadar tüm süreçlerde deneyim sahibiyim.
                </p>
              </motion.div>
              
              <motion.div 
                className="rounded-xl bg-gradient-to-r from-purple-400/10 to-pink-400/10 p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
                  <h4 className="text-xl font-bold text-purple-400">Takım Liderliği</h4>
                </div>
                <p className="text-gray-300">
                  Proje yönetimi ve mentörlük konularında da aktif rol alıyorum.
                </p>
              </motion.div>
            </div>
          )
        };
      
      case 'tech':
        return {
          title: "Teknoloji Yığınım",
          icon: <FiCode className="text-4xl text-yellow-400" />,
          content: (
            <div className="space-y-6">
              {[
                { title: "Frontend", techs: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"], color: "from-blue-400 to-cyan-400" },
                { title: "Backend", techs: ["Node.js", "C#", "ASP.NET Core"], color: "from-green-400 to-emerald-400" },
                { title: "Mobile", techs: ["React Native", "iOS", "Android"], color: "from-purple-400 to-pink-400" },
                { title: "Database", techs: ["MSSQL", "MongoDB", "Firebase", "SQLite"], color: "from-orange-400 to-red-400" }
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  className={`rounded-xl bg-gradient-to-r ${category.color}/10 p-6`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h4 className={`mb-3 text-lg font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                    {category.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.techs.map((tech) => (
                      <span
                        key={tech}
                        className={`rounded-full bg-gradient-to-r ${category.color}/20 px-3 py-1 text-sm text-white`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )
        };
      
      case 'passion':
        return {
          title: "Tutkularım",
          icon: <FiHeart className="text-4xl text-yellow-400" />,
          content: (
            <div className="space-y-6">
              <motion.div 
                className="rounded-xl bg-gradient-to-r from-red-400/10 to-pink-400/10 p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h4 className="mb-3 text-lg font-bold text-red-400">🎯 Problem Çözme</h4>
                <p className="text-gray-300">
                  Karmaşık problemleri basit ve etkili çözümlere dönüştürmeyi seviyorum.
                </p>
              </motion.div>
              
              <motion.div 
                className="rounded-xl bg-gradient-to-r from-yellow-400/10 to-orange-400/10 p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="mb-3 text-lg font-bold text-yellow-400">🚀 Yenilik</h4>
                <p className="text-gray-300">
                  En son teknolojileri takip ediyor ve projelerimde kullanıyorum.
                </p>
              </motion.div>
              
              <motion.div 
                className="rounded-xl bg-gradient-to-r from-green-400/10 to-teal-400/10 p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="mb-3 text-lg font-bold text-green-400">🌱 Sürekli Öğrenme</h4>
                <p className="text-gray-300">
                  Her gün yeni bir şey öğrenmek ve kendimi geliştirmek için çaba sarf ediyorum.
                </p>
              </motion.div>
            </div>
          )
        };
      
      default:
        return null;
    }
  };

  const content = getContent();
  if (!content) return null;

  return (
    <motion.div
      className="relative h-full rounded-2xl bg-black/40 backdrop-blur-md border border-yellow-400/30 p-8 shadow-2xl"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      {/* Close Button */}
      <motion.button
        className="absolute right-4 top-4 text-2xl text-yellow-400 transition-colors hover:text-yellow-300"
        onClick={onClose}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ×
      </motion.button>
      
      {/* Header */}
      <motion.div 
        className="mb-8 flex items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {content.icon}
        <h3 className="ml-4 text-3xl font-bold text-yellow-400">{content.title}</h3>
      </motion.div>
      
      {/* Content */}
      <div className="overflow-y-auto max-h-[calc(100%-120px)]">
        {content.content}
      </div>
    </motion.div>
  );
};

export default function ModernAboutSection() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const cards = [
    {
      id: 'who',
      icon: <FiUser />,
      title: 'Ben Kimim?',
      subtitle: 'Kişisel hikayem ve vizyonum',
      gradient: 'bg-gradient-to-br from-slate-800/50 to-slate-900/50',
    },
    {
      id: 'experience',
      icon: <FiBriefcase />,
      title: 'Deneyimlerim',
      subtitle: '5+ yıllık profesyonel yolculuğum',
      gradient: 'bg-gradient-to-br from-slate-800/50 to-slate-900/50',
    },
    {
      id: 'tech',
      icon: <FiCode />,
      title: 'Teknolojilerim',
      subtitle: 'Kullandığım araçlar ve frameworkler',
      gradient: 'bg-gradient-to-br from-slate-800/50 to-slate-900/50',
    },
    {
      id: 'passion',
      icon: <FiHeart />,
      title: 'Tutkularım',
      subtitle: 'Beni motive eden şeyler',
      gradient: 'bg-gradient-to-br from-slate-800/50 to-slate-900/50',
    },
  ];

  return (
    <section className="min-h-screen py-20 w-full bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-blue-400/5 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-blue-400 mb-4">
            Hakkımda
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-blue-400 mx-auto rounded-full"></div>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 h-[700px]">
          {/* Cards Grid */}
          <motion.div 
            className={`transition-all duration-500 ease-in-out ${
              selectedCard ? 'w-full lg:w-1/2' : 'w-full'
            }`}
            layout
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              {cards.map((card, index) => (
                <AboutCard
                  key={card.id}
                  {...card}
                  isSelected={selectedCard === card.id}
                  onSelect={setSelectedCard}
                  index={index}
                  content={null}
                />
              ))}
            </div>
          </motion.div>

          {/* Detail Panel */}
          <AnimatePresence>
            {selectedCard && (
              <motion.div 
                className="w-full lg:w-1/2 h-full"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "50%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                layout
              >
                <DetailPanel 
                  selectedCard={selectedCard} 
                  onClose={() => setSelectedCard(null)} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}