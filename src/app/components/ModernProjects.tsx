"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { FiExternalLink, FiGithub, FiCode, FiLayers, FiZap, FiUsers } from "react-icons/fi";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  stats: {
    duration: string;
    teamSize: string;
    complexity: 'Basit' | 'Orta' | 'Kompleks';
  };
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Modern ve kullanıcı dostu e-ticaret platformu",
    longDescription: "Tam özellikli e-ticaret platformu. Ürün yönetimi, sepet sistemi, ödeme entegrasyonu ve admin paneli ile birlikte gelir. Responsive tasarım ve performans odaklı geliştirme.",
    technologies: ["Next.js", "TypeScript", "MongoDB", "Stripe", "Tailwind CSS"],
    category: "Web Development",
    image: "🛍️",
    demoUrl: "https://demo.com",
    githubUrl: "https://github.com",
    featured: true,
    stats: {
      duration: "3 ay",
      teamSize: "2 kişi", 
      complexity: "Kompleks"
    }
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Takım çalışması için gelişmiş görev yönetimi",
    longDescription: "Ekip çalışması için tasarlanmış görev yönetim uygulaması. Real-time güncellemeler, proje takibi, zaman yönetimi ve raporlama özellikleri.",
    technologies: ["React", "Node.js", "Socket.io", "PostgreSQL", "Material-UI"],
    category: "Web Application",
    image: "✅",
    demoUrl: "https://demo.com",
    githubUrl: "https://github.com",
    featured: true,
    stats: {
      duration: "2 ay",
      teamSize: "3 kişi",
      complexity: "Orta"
    }
  },
  {
    id: 3,
    title: "Weather App",
    description: "Gelişmiş hava durumu uygulaması",
    longDescription: "7 günlük hava tahmini, interaktif haritalar, hava durumu uyarıları ve kişiselleştirilebilir arayüz ile modern hava durumu uygulaması.",
    technologies: ["React Native", "TypeScript", "OpenWeather API", "Redux"],
    category: "Mobile Development",
    image: "🌤️",
    demoUrl: "https://demo.com",
    githubUrl: "https://github.com",
    featured: false,
    stats: {
      duration: "1 ay",
      teamSize: "1 kişi",
      complexity: "Basit"
    }
  },
  {
    id: 4,
    title: "Real Estate Platform",
    description: "Gayrimenkul arama ve listeleme platformu",
    longDescription: "Gayrimenkul alım-satım ve kiralama platformu. Gelişmiş arama filtreleri, harita entegrasyonu, sanal turlar ve müşteri iletişim sistemi.",
    technologies: ["Vue.js", "Laravel", "MySQL", "Google Maps API", "AWS"],
    category: "Web Development",
    image: "🏠",
    githubUrl: "https://github.com",
    featured: true,
    stats: {
      duration: "4 ay",
      teamSize: "4 kişi",
      complexity: "Kompleks"
    }
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "Interaktif ve modern portfolio sitesi",
    longDescription: "Size özel tasarlanmış bu portfolio sitesi. Modern animasyonlar, responsive tasarım ve yüksek performans odaklı geliştirilmiştir.",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
    category: "Web Design",
    image: "💼",
    demoUrl: "https://current-site.com",
    githubUrl: "https://github.com",
    featured: false,
    stats: {
      duration: "2 hafta",
      teamSize: "1 kişi",
      complexity: "Orta"
    }
  },
  {
    id: 6,
    title: "Chat Application",
    description: "Real-time mesajlaşma uygulaması",
    longDescription: "WebSocket teknolojisi ile real-time mesajlaşma. Grup sohbetleri, dosya paylaşımı, emoji desteği ve push notifications.",
    technologies: ["React", "Socket.io", "Express", "MongoDB", "Redis"],
    category: "Web Application", 
    image: "💬",
    demoUrl: "https://demo.com",
    githubUrl: "https://github.com",
    featured: false,
    stats: {
      duration: "6 hafta",
      teamSize: "2 kişi",
      complexity: "Orta"
    }
  }
];

const categories = ["Tümü", "Web Development", "Web Application", "Mobile Development", "Web Design"];

const ProjectCard = ({ project, isSelected, onSelect }: { 
  project: Project; 
  isSelected: boolean; 
  onSelect: (id: number | null) => void; 
}) => {
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

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Basit': return 'text-green-400 bg-green-400/20';
      case 'Orta': return 'text-yellow-400 bg-yellow-400/20';
      case 'Kompleks': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="perspective-1000"
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 ${
          project.featured ? 'border-yellow-400/30' : 'border-white/10'
        } ${isSelected ? 'border-yellow-400/60 shadow-lg shadow-yellow-400/25' : 'hover:border-yellow-400/20'}`}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onClick={() => onSelect(isSelected ? null : project.id)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
            FEATURED
          </div>
        )}

        {/* Project Icon/Image */}
        <div className="p-8 text-center">
          <div className="text-6xl mb-4">{project.image}</div>
          <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{project.description}</p>
          
          {/* Tech Stack Preview */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-yellow-400/20 text-yellow-400 text-xs rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-yellow-400 text-sm font-semibold">{project.stats.duration}</div>
              <div className="text-gray-500 text-xs">Süre</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 text-sm font-semibold">{project.stats.teamSize}</div>
              <div className="text-gray-500 text-xs">Ekip</div>
            </div>
            <div className="text-center">
              <div className={`text-xs font-semibold px-2 py-1 rounded-full ${getComplexityColor(project.stats.complexity)}`}>
                {project.stats.complexity}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-center">
            {project.demoUrl && (
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black text-sm font-medium rounded-lg hover:bg-yellow-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <FiExternalLink size={14} />
                Demo
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white text-sm font-medium rounded-lg hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <FiGithub size={14} />
                Kod
              </motion.a>
            )}
          </div>
        </div>

        {/* Selection Indicator */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              className="absolute inset-0 border-2 border-yellow-400 rounded-2xl pointer-events-none"
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

const ProjectDetail = ({ project, onClose }: { project: Project | null; onClose: () => void }) => {
  if (!project) return null;

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md rounded-2xl p-8 border border-yellow-400/30 shadow-2xl"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{project.image}</div>
          <div>
            <h3 className="text-3xl font-bold text-yellow-400">{project.title}</h3>
            <p className="text-gray-400">{project.category}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-yellow-400 hover:text-yellow-300 text-2xl"
        >
          ×
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold text-yellow-400 mb-3">Proje Detayları</h4>
          <p className="text-gray-300 leading-relaxed">{project.longDescription}</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-yellow-400 mb-3">Kullanılan Teknolojiler</h4>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gradient-to-r from-blue-400/20 to-purple-400/20 border border-blue-400/30 text-blue-300 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <FiZap className="text-yellow-400" />
              <span className="text-yellow-400 font-semibold">Süre</span>
            </div>
            <p className="text-white">{project.stats.duration}</p>
          </div>
          
          <div className="bg-black/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <FiUsers className="text-yellow-400" />
              <span className="text-yellow-400 font-semibold">Ekip Büyüklüğü</span>
            </div>
            <p className="text-white">{project.stats.teamSize}</p>
          </div>
          
          <div className="bg-black/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <FiLayers className="text-yellow-400" />
              <span className="text-yellow-400 font-semibold">Karmaşıklık</span>
            </div>
            <p className="text-white">{project.stats.complexity}</p>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          {project.demoUrl && (
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-lg hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <FiExternalLink />
              Canlı Demo
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-black transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <FiGithub />
              Kaynak Kodu
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function ModernProjects() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const filteredProjects = selectedCategory === "Tümü" 
    ? projectsData 
    : projectsData.filter(project => project.category === selectedCategory);

  const selectedProjectData = selectedProject 
    ? projectsData.find(p => p.id === selectedProject) 
    : null;

  return (
    <section id="projects" className="min-h-screen py-20 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
            Projelerim
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Geliştirdiğim projeler, kullandığım teknolojiler ve çözüm ürettiğim problemler
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Layout */}
        <div className="flex gap-8">
          {/* Projects Grid */}
          <motion.div 
            className={`transition-all duration-500 ${
              selectedProject ? 'w-1/2' : 'w-full'
            }`}
            layout
          >
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              layout
            >
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isSelected={selectedProject === project.id}
                    onSelect={setSelectedProject}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Project Detail Panel */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                className="w-1/2"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "50%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                layout
              >
                <ProjectDetail
                  project={selectedProjectData}
                  onClose={() => setSelectedProject(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mt-20"
        >
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">
            Birlikte Çalışalım!
          </h3>
          <p className="text-gray-400 mb-8">
            Projeniz için benimle iletişime geçin ve hayalinizdeki uygulamayı birlikte geliştirelim.
          </p>
          <motion.button
            className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold py-4 px-8 rounded-full hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            İletişime Geç
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}