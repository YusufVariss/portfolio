"use client";

import { useState, useEffect } from "react";
import AnimatedSection from "./components/AnimatedSection";
import LoadingScreen from "./components/LoadingScreen";
import GradientText from "./components/GradientText";
import RotatingText from "./components/RotatingText";
import ElectricBorder from "./components/ElectricBorder";
import GlowButton from "./components/GlowButton";
import BlurText from "./components/BlurText";
import CardNav from "./components/CardNav";
import CircularGallery from "../components/CircularGallery";
import LightRays from "../components/LightRays";
import "./components/ProjectCarousel.css";
import "./components/CircularGallery.css";
import "./components/CurvedCardDesign.css";
import "./components/RainbowArcDesign.css";
import "./components/ScrollStackDesign.css";
import "./components/SpotlightCardDesign.css";
import "./components/CardSwap.css";

// Metadata can still be defined in a client component
// export const metadata: Metadata = {
//   title: "Yusuf - Yazılım Geliştirici",
//   description: "Yusuf'un kişisel portfolyo web sitesi.",
// };

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavBar, setShowNavBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 100);
      
      // Check which section is currently visible
      const sections = ['home', 'projects', 'about', 'contact'];
      const windowHeight = window.innerHeight;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setCurrentSection(sectionId);
            break;
          }
        }
      }
      
      // Always show navigation on home section
      if (currentSection === 'home') {
        setShowNavBar(true);
      } else if (currentScrollY < lastScrollY || currentScrollY < 50) {
        // Yukarı scroll veya üst kısımda - göster
        setShowNavBar(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Aşağı scroll ve 50px'den fazla - gizle
        setShowNavBar(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  if (!isMounted) {
    return null;
  }

  if (isLoading) {
    return <LoadingScreen isLoading={isLoading} />;
  }

  return (
    <div className="bg-gray-900 text-white font-sans overflow-x-hidden relative">
      {/* Background Light Rays */}
      <LightRays count={16} />
      
      {/* Card Navigation */}
      <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${
        showNavBar 
          ? 'transform -translate-x-1/2 translate-y-0 opacity-100' 
          : 'transform -translate-x-1/2 -translate-y-full opacity-0'
      }`}>
        <CardNav
          items={[
            {
              label: "Ana Sayfa",
              bgColor: "#1f2937",
              textColor: "#fbbf24",
              links: [
                { label: "Hoş Geldin", ariaLabel: "Ana sayfa", href: "#home" }
              ]
            },
            {
              label: "Hakkımda",
              bgColor: "#374151",
              textColor: "#fbbf24",
              links: [
                { label: "Deneyim", ariaLabel: "Deneyimlerim", href: "#about" },
                { label: "Yetenekler", ariaLabel: "Yeteneklerim", href: "#about" }
              ]
            },
            {
              label: "Projeler",
              bgColor: "#4b5563",
              textColor: "#fbbf24",
              links: [
                { label: "Portfolyo", ariaLabel: "Projelerim", href: "#projects" },
                { label: "İletişim", ariaLabel: "İletişim", href: "#contact" }
              ]
            }
          ]}
          logoComponent={
            <a href="#home" className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
              Yusuf Varış
            </a>
          }
          baseColor="rgba(17, 24, 39, 0.95)"
          menuColor="#fbbf24"
          buttonBgColor="#fbbf24"
          buttonTextColor="#111827"
        />
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Left Side - Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 lg:pr-16">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <GradientText
                    colors={["#fbbf24", "#f59e0b", "#d97706"]}
                  >
                    Merhaba, Ben Yusuf
                  </GradientText>
                </h1>
                <div className="text-2xl lg:text-3xl text-gray-300">
                  <span>Yazılım Geliştirici</span>
                </div>
                <p className="text-lg text-gray-400 max-w-lg mx-auto lg:mx-0">
                  Modern web teknolojileri ile kullanıcı dostu, performanslı ve ölçeklenebilir uygulamalar geliştiriyorum.
                </p>
              </div>
            </div>

            {/* Right Side - Skills Gallery */}
            <div className="w-1/2 flex items-center justify-center pt-8">
              <CircularGallery
                items={[
                  {
                    id: 1,
                    icon: "⚛️",
                    title: "Frontend Development",
                    skills: ["React", "Next.js", "HTML", "CSS", "JavaScript"],
                    backgroundColor: "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(251, 191, 36, 0.3) 100%)"
                  },
                  {
                    id: 2,
                    icon: "🔧",
                    title: "Backend Development", 
                    skills: ["C#", "ASP.NET", "Node.js"],
                    backgroundColor: "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(251, 191, 36, 0.3) 100%)"
                  },
                  {
                    id: 3,
                    icon: "📱",
                    title: "Mobile Development",
                    skills: ["React Native", "iOS", "Android"],
                    backgroundColor: "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(251, 191, 36, 0.3) 100%)"
                  },
                  {
                    id: 4,
                    icon: "🗄️",
                    title: "Database",
                    skills: ["MSSQL", "MongoDB", "Firebase", "SQLite"],
                    backgroundColor: "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(251, 191, 36, 0.3) 100%)"
                  }
                ]}
                radius={160}
                autoRotate={true}
                rotationSpeed={0.2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Full Width */}
      <AnimatedSection>
        <section id="about" className="min-h-screen py-20 w-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-16 text-yellow-400 text-center">Hakkımda</h2>
            
            <div className="flex transition-all duration-500 ease-in-out">
              {/* Left Side - Cards */}
              <div className={`transition-all duration-500 ease-in-out ${
                selectedCard ? 'w-1/2 pr-4' : 'w-full'
              }`}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Ben Kimim Kartı */}
                  <div 
                    onClick={() => setSelectedCard(selectedCard === 'who' ? null : 'who')}
                    className={`bg-black/20 backdrop-blur-sm border rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedCard === 'who' 
                        ? 'border-yellow-400/60 shadow-lg shadow-yellow-400/30' 
                        : 'border-yellow-400/20 hover:border-yellow-400/40'
                    }`}
                  >
                    <div className="text-center h-full flex flex-col justify-center items-center">
                      <div className="text-6xl mb-6">👨‍💻</div>
                      <h3 className="text-2xl font-bold text-yellow-400">Ben Kimim?</h3>
                    </div>
                  </div>

                  {/* Deneyim Kartı */}
                  <div 
                    onClick={() => setSelectedCard(selectedCard === 'experience' ? null : 'experience')}
                    className={`bg-black/20 backdrop-blur-sm border rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedCard === 'experience' 
                        ? 'border-yellow-400/60 shadow-lg shadow-yellow-400/30' 
                        : 'border-yellow-400/20 hover:border-yellow-400/40'
                    }`}
                  >
                    <div className="text-center h-full flex flex-col justify-center items-center">
                      <div className="text-6xl mb-6">💼</div>
                      <h3 className="text-2xl font-bold text-yellow-400">Deneyimim</h3>
                    </div>
                  </div>

                  {/* Teknolojiler Kartı */}
                  <div 
                    onClick={() => setSelectedCard(selectedCard === 'tech' ? null : 'tech')}
                    className={`bg-black/20 backdrop-blur-sm border rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedCard === 'tech' 
                        ? 'border-yellow-400/60 shadow-lg shadow-yellow-400/30' 
                        : 'border-yellow-400/20 hover:border-yellow-400/40'
                    }`}
                  >
                    <div className="text-center h-full flex flex-col justify-center items-center">
                      <div className="text-6xl mb-6">🚀</div>
                      <h3 className="text-2xl font-bold text-yellow-400">Teknolojilerim</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Detail Panel */}
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                selectedCard ? 'w-1/2 pl-4' : 'w-0'
              }`}>
                {selectedCard && (
                  <div className="bg-black/30 backdrop-blur-md border border-yellow-400/30 rounded-2xl p-8 h-full">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-3xl font-bold text-yellow-400">
                        {selectedCard === 'who' && 'Ben Kimim?'}
                        {selectedCard === 'experience' && 'Deneyimlerim'}  
                        {selectedCard === 'tech' && 'Teknoloji Yığınım'}
                      </h3>
                      <button
                        onClick={() => setSelectedCard(null)}
                        className="text-yellow-400 hover:text-yellow-300 text-2xl"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="space-y-4 text-gray-300 leading-relaxed">
                      {selectedCard === 'who' && (
                        <>
                          <p>Merhaba! Ben <span className="text-yellow-400 font-semibold">Yusuf Varış</span>. Yazılım geliştirme dünyasında tutkuyla çalışan bir geliştiriciyim.</p>
                          <p>Teknolojiye olan merakım ve sürekli öğrenme isteğim sayesinde, her gün kendimi geliştirmeye devam ediyorum. Karmaşık problemleri çözmek ve yaratıcı çözümler üretmek beni motive ediyor.</p>
                          <p>Kod yazmak benim için sadece bir meslek değil, aynı zamanda bir sanat formu. Her projeyi bir başyapıt yaratma fırsatı olarak görüyorum.</p>
                        </>
                      )}
                      
                      {selectedCard === 'experience' && (
                        <>
                          <p><span className="text-yellow-400 font-semibold">5+ yıllık</span> yazılım geliştirme deneyimim boyunca onlarca proje geliştirdim.</p>
                          <p>Web uygulamaları, mobil uygulamalar ve API'ler geliştirme konusunda uzmanlaştım. Modern web teknolojileriyle kullanıcı dostu, performanslı ve ölçeklenebilir uygulamalar yaratıyorum.</p>
                          <p>Proje yönetiminden deployment'a kadar yazılım geliştirme sürecinin her aşamasında deneyim sahibiyim.</p>
                          <p>Takım çalışması ve mentörlük konularında da aktif rol alıyorum.</p>
                        </>
                      )}
                      
                      {selectedCard === 'tech' && (
                        <>
                          <div className="mb-4">
                            <h4 className="text-yellow-400 font-semibold mb-2">Frontend:</h4>
                            <p>React.js, Next.js, TypeScript, HTML5, CSS3, Tailwind CSS ile modern ve responsive kullanıcı arayüzleri geliştiriyorum.</p>
                          </div>
                          <div className="mb-4">
                            <h4 className="text-yellow-400 font-semibold mb-2">Backend:</h4>
                            <p>Node.js, C#, ASP.NET Core ile güçlü ve ölçeklenebilir API'ler ve servisler yazıyorum.</p>
                          </div>
                          <div className="mb-4">
                            <h4 className="text-yellow-400 font-semibold mb-2">Mobile:</h4>
                            <p>React Native ile iOS ve Android platformları için cross-platform uygulamalar geliştiriyorum.</p>
                          </div>
                          <div>
                            <h4 className="text-yellow-400 font-semibold mb-2">Database:</h4>
                            <p>MSSQL, MongoDB, Firebase ve SQLite ile veri yönetimi konusunda uzmanım.</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Projelerim Section - Full Width */}
      <AnimatedSection>
        <section id="projects" className="min-h-screen py-20 w-full bg-gray-900">
          <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">Projelerim</h2>
          <div className="px-8">
            <div className="text-center text-white">
              <p className="text-lg">Projelerim yakında eklenecek...</p>
            </div>
          </div>
        </section>
      </AnimatedSection>


      {/* Contact Section - Full Width */}
      <AnimatedSection>
        <section id="contact" className="min-h-screen py-20 w-full bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-12 text-yellow-400">İletişim</h2>
            <div className="space-y-8">
              <p className="text-lg text-gray-300">
                Projeleriniz için benimle iletişime geçebilirsiniz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlowButton
                  color="#fbbf24"
                >
                  <a href="mailto:email@example.com">Email Gönder</a>
                </GlowButton>
                <GlowButton
                  color="#3b82f6"
                >
                  <a href="https://linkedin.com/in/yusuf">LinkedIn</a>
                </GlowButton>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-4">Yusuf</div>
            <div className="text-gray-400 mb-4">
              <p>© 2024 Yusuf. Tüm hakları saklıdır.</p>
            </div>
            <div className="flex justify-center space-x-6">
              <ul className="flex space-x-6 text-sm">
                <li><a href="#home" className="hover:text-yellow-400 transition-colors">Ana Sayfa</a></li>
                <li><a href="#about" className="hover:text-yellow-400 transition-colors">Hakkımda</a></li>
                <li><a href="#projects" className="hover:text-yellow-400 transition-colors">Projelerim</a></li>
                <li><a href="#contact" className="hover:text-yellow-400 transition-colors">İletişim</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}