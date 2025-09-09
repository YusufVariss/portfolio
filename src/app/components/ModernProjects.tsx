"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiChevronLeft, FiChevronRight, FiImage, FiInfo, FiCode } from "react-icons/fi";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  image: string;
  images?: string[]; // Proje görselleri için
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
    title: "Turkish Armed Forces Aircraft Recognition",
    description: "Uçak tanıma ve görselleştirme sistemi",
    longDescription: "Turkish Armed Forces Aircraft Identification and Visualization System developed with Python",
    technologies: ["Python", "OpenCV", "Machine Learning", "TensorFlow", "NumPy"],
    category: "AI & Machine Learning",
    image: "✈️",
    images: ["/project-images/aircraft1.jpg", "/project-images/aircraft2.jpg", "/project-images/aircraft3.jpg"],
    githubUrl: "https://github.com/YusufVariss",
    featured: true,
    stats: {
      duration: "3 ay",
      teamSize: "1 kişi", 
      complexity: "Kompleks"
    }
  },
  {
    id: 2,
    title: "3D Maze Game",
    description: "Unity ve C# ile geliştirilmiş 3D labirent oyunu",
    longDescription: "3D maze game developed with Unity and C#.",
    technologies: ["Unity", "C#", "3D Modeling", "Game Development", "Visual Scripting"],
    category: "Game Development",
    image: "🎮",
    images: ["/project-images/maze1.jpg", "/project-images/maze2.jpg", "/project-images/maze3.jpg"],
    githubUrl: "https://github.com/YusufVariss",
    featured: true,
    stats: {
      duration: "2 ay",
      teamSize: "1 kişi",
      complexity: "Orta"
    }
  },
  {
    id: 3,
    title: "UniGO",
    description: "Kullanıcı odaklı üniversite tercih uygulaması",
    longDescription: "User-focused university preference application developed with Kotlin language using Android Studio",
    technologies: ["Kotlin", "Android Studio", "Firebase", "Material Design", "Cloud Firestore"],
    category: "Mobile Development",
    image: "🎓",
    images: ["/project-images/unigo1.jpg", "/project-images/unigo2.jpg", "/project-images/unigo3.jpg"],
    githubUrl: "https://github.com/YusufVariss",
    featured: false,
    stats: {
      duration: "2 ay",
      teamSize: "1 kişi",
      complexity: "Orta"
    }
  },
  {
    id: 4,
    title: "Inventory Management System",
    description: "Modern Envanter Yönetim Sistemi",
    longDescription: "Modern Inventory Management System – Built with ASP.NET Core Web API and React 18, following Clean Architecture and SOLID principles.",
    technologies: ["ASP.NET Core", "React 18", "C#", "Entity Framework", "JWT"],
    category: "Web Development",
    image: "📦",
    images: ["/project-images/giriş.png", "/project-images/anasayfa.png", "/project-images/ürünler.png", "/project-images/kategoriler.png", "/project-images/raporlar.png", "/project-images/kullanıcılar.png", "/project-images/stok hareketleri.png"],
    githubUrl: "https://github.com/YusufVariss",
    featured: true,
    stats: {
      duration: "3 ay",
      teamSize: "1 kişi",
      complexity: "Kompleks"
    }
  }
];


const ProjectCard = ({ project, index }: { 
  project: Project; 
  index: number;
}) => {
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showDetailPanel) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [showDetailPanel]);

  // Use project images if available, otherwise show placeholder
  const images = project.images && project.images.length > 0 ? project.images : [
    `/api/placeholder/400/250?text=${encodeURIComponent(project.title)}-1`,
    `/api/placeholder/400/250?text=${encodeURIComponent(project.title)}-2`,
    `/api/placeholder/400/250?text=${encodeURIComponent(project.title)}-3`
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getGradient = (index: number) => {
    const gradients = [
      'from-yellow-400 to-amber-500',
      'from-blue-500 to-blue-600', 
      'from-purple-500 to-pink-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-cyan-500 to-teal-500'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <motion.div
      className="card-container group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="relative w-80 h-96 mx-auto bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl overflow-hidden">
        {/* Face 1 - Content */}
        <div className="face face1 absolute bottom-0 left-0 w-full h-full flex justify-center items-center p-5 box-border">
          <div className="content text-center">
            <h2 className="text-2xl font-bold text-white mb-4 m-0 p-0">{project.title}</h2>
            <p className="text-base text-gray-300 leading-relaxed font-medium mb-6">
              {project.description}
            </p>
            
            <button
              onClick={() => setShowDetailPanel(true)}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
            >
              Detayları Gör
            </button>
          </div>
        </div>

        {/* Face 2 - Number with Hover Effect */}
        <div className={`face face2 absolute bottom-0 left-0 w-full h-full flex justify-center items-center bg-gradient-to-br ${getGradient(index)} rounded-2xl transition-all duration-500 group-hover:h-16 group-hover:rounded-none group-hover:rounded-b-2xl`}>
          {/* Light overlay */}
          <div className="absolute top-0 left-0 w-1/2 h-full bg-white bg-opacity-10 rounded-l-2xl group-hover:rounded-bl-2xl group-hover:rounded-tl-none"></div>
          
          <h2 className="text-white font-bold text-9xl transition-all duration-500 group-hover:text-3xl text-shadow-lg m-0 p-0 drop-shadow-md">
            {String(index + 1).padStart(2, '0')}
          </h2>
        </div>
      </div>

      {/* Detail Panel Modal */}
      <AnimatePresence>
        {showDetailPanel && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetailPanel(false)}
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
            style={{ overscrollBehavior: 'none' }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-md border border-white/10 rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowDetailPanel(false)}
                className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white text-2xl bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
              >
                ×
              </button>

              {/* Image Carousel Section - Top Half */}
              <div className="relative h-80 bg-gray-900 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center"
                  >
                    {project.images && project.images.length > 0 ? (
                      <img
                        src={images[currentImageIndex]}
                        alt={`${project.title} - Görsel ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // If image fails to load, show placeholder
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`text-center text-gray-300 ${project.images && project.images.length > 0 ? 'hidden' : ''}`}>
                      <div className="text-6xl mb-4">{project.image}</div>
                      <div className="text-lg font-medium">{project.title}</div>
                      <div className="text-sm text-gray-400 mt-2">Proje Görseli {currentImageIndex + 1}</div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <FiChevronLeft size={20} />
                    </button>
                    
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <FiChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {images.map((_, imageIndex) => (
                      <button
                        key={imageIndex}
                        onClick={() => setCurrentImageIndex(imageIndex)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          currentImageIndex === imageIndex ? 'bg-yellow-400' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Info Section - Bottom Half */}
              <div className="p-8 overflow-y-auto max-h-96">
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                  <p className="text-yellow-400 text-lg">{project.category}</p>
                  <p className="text-gray-300 mt-3 leading-relaxed">{project.longDescription}</p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  {/* Technologies */}
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-400 mb-4">Kullanılan Teknolojiler</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {project.technologies.map((tech) => (
                        <div
                          key={tech}
                          className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <FiCode size={16} className="text-yellow-400" />
                          <span className="text-sm font-medium text-white">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Demo Button */}
                  {project.demoUrl && (
                    <div>
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 font-medium"
                      >
                        <FiExternalLink size={16} />
                        Canlı Demo'yu Görüntüle
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


export default function ModernProjects() {

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


        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}