"use client";

import { useState, useEffect } from "react";
import AnimatedSection from "./components/AnimatedSection";
import LoadingScreen from "./components/LoadingScreen";
import RotatingText from "./components/RotatingText";
import ElectricBorder from "./components/ElectricBorder";
import GlowButton from "./components/GlowButton";
import BlurText from "./components/BlurText";
import CardNav from "./components/CardNav";
import CardSwap from "./components/CardSwap";
import AutoCardSwap, { Card } from "./components/AutoCardSwap";

// Metadata can still be defined in a client component
// export const metadata: Metadata = {
//   title: "Yusuf - Yazılım Geliştirici",
//   description: "Yusuf'un kişisel portfolyo web sitesi.",
// };

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    // Simulate a loading time
    const loadingTimer = setTimeout(() => setIsLoading(false), 2000); // 2 seconds

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    // After loading is finished, start the mount animation for the hero section
    if (!isLoading) {
      const mountTimer = setTimeout(() => setIsMounted(true), 200);
      return () => clearTimeout(mountTimer);
    }
  }, [isLoading]);

  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      
      console.log('Scroll position:', scrollTop, 'Header visible:', isHeaderVisible);
      
      // 100px scroll sonrası stil değişiklikleri
      setIsScrolled(scrollTop > 100);
      
      // Header görünürlük kontrolü
      if (scrollTop <= 50) {
        // Ana sayfa (top 50px) - her zaman göster
        console.log('At top, showing header');
        setIsHeaderVisible(true);
      } else if (scrollTop > lastScrollY && scrollTop > 100) {
        // Aşağı scroll ve 100px'den fazla - gizle
        console.log('Scrolling down, hiding header');
        setIsHeaderVisible(false);
      } else if (scrollTop < lastScrollY) {
        // Yukarı scroll - göster
        console.log('Scrolling up, showing header');
        setIsHeaderVisible(true);
      }
      
      lastScrollY = scrollTop;
    };

    // İlk yükleme için pozisyon kontrolü
    const initialScrollTop = window.scrollY;
    setIsScrolled(initialScrollTop > 100);
    setIsHeaderVisible(true); // Ana sayfada başlangıçta göster
    console.log('Initial load - Header visible set to true');
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gray-900 text-white font-sans">
      <LoadingScreen isLoading={isLoading} />

      <CardNav
        logoComponent={<span className="text-lg font-bold text-white">Yusuf Varış</span>}
        className={`transition-all duration-1000 ease-out ${
          isLoading 
            ? 'opacity-0 -translate-y-10' 
            : isHeaderVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-100 -translate-y-20'
        }`}
          items={[
            {
              label: "About",
              bgColor: "#0D0716",
              textColor: "#fff",
              links: [
                { 
                  label: "About Me", 
                  ariaLabel: "About Me",
                  onClick: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                },
                { 
                  label: "Experience", 
                  ariaLabel: "Experience",
                  onClick: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                }
              ]
            },
            {
              label: "Projects", 
              bgColor: "#170D27",
              textColor: "#fff",
              links: [
                { 
                  label: "Featured", 
                  ariaLabel: "Featured Projects",
                  onClick: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                },
                { 
                  label: "All Projects", 
                  ariaLabel: "All Projects",
                  onClick: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }
              ]
            },
            {
              label: "Contact",
              bgColor: "#271E37", 
              textColor: "#fff",
              links: [
                { 
                  label: "Email", 
                  ariaLabel: "Email me",
                  onClick: () => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })
                },
                { 
                  label: "Skills", 
                  ariaLabel: "My Skills",
                  onClick: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
                }
              ]
            }
          ]}
          baseColor="rgba(255, 255, 255, 0.9)"
          menuColor="#000"
          buttonBgColor="#fbbf24"
          buttonTextColor="#000"
        />

      {/* Main Content */}
      <main className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen w-full">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent"></div>
          </div>
          
          {/* Main Content */}
          <div className="relative z-10 h-screen flex items-center">
            {/* Left Side - Text Content */}
            <div className="w-1/2 pl-16 pr-8">
              <div className={`transition-all duration-1000 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <BlurText
                  text="Hello, I'm Yusuf"
                  className="text-5xl md:text-6xl font-bold text-white mb-6"
                  delay={100}
                  animateBy="words"
                  direction="top"
                />
                <BlurText
                  text="Software Developer"
                  className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-8"
                  delay={150}
                  animateBy="words"
                  direction="top"
                />
                <BlurText
                  text="I create user-friendly and efficient solutions with modern web technologies. Besides coding, I love learning new things and constantly improving myself."
                  className="text-gray-300 text-xl leading-relaxed max-w-xl"
                  delay={80}
                  animateBy="words"
                  direction="top"
                />
              </div>
            </div>

            {/* Right Side - Changing Cards */}
            <div className="w-1/2 flex items-start justify-center pt-20">
              <AutoCardSwap
                width={350}
                height={250}
                cardDistance={60}
                verticalDistance={70}
                delay={3000}
                pauseOnHover={true}
              >
                <Card>
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-yellow-400 mx-auto mb-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                    </svg>
                    <h3 className="text-white text-2xl font-bold mb-3">Frontend</h3>
                    <p className="text-yellow-400 text-lg">React, Next.js, TypeScript</p>
                    <div className="flex flex-wrap gap-2 justify-center mt-4">
                      <span className="px-3 py-1 bg-yellow-400/20 rounded-full text-yellow-400 text-sm">React</span>
                      <span className="px-3 py-1 bg-yellow-400/20 rounded-full text-yellow-400 text-sm">Next.js</span>
                      <span className="px-3 py-1 bg-yellow-400/20 rounded-full text-yellow-400 text-sm">TypeScript</span>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-yellow-400 mx-auto mb-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3" />
                    </svg>
                    <h3 className="text-white text-2xl font-bold mb-3">Backend</h3>
                    <p className="text-yellow-400 text-lg">Node.js, Python, APIs</p>
                    <div className="flex flex-wrap gap-2 justify-center mt-4">
                      <span className="px-3 py-1 bg-yellow-400/20 rounded-full text-yellow-400 text-sm">Node.js</span>
                      <span className="px-3 py-1 bg-yellow-400/20 rounded-full text-yellow-400 text-sm">Python</span>
                      <span className="px-3 py-1 bg-yellow-400/20 rounded-full text-yellow-400 text-sm">APIs</span>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-yellow-400 mx-auto mb-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>
                    <h3 className="text-white text-2xl font-bold mb-3">Mobile</h3>
                    <p className="text-yellow-400 text-lg">React Native, Flutter</p>
                    <div className="flex flex-wrap gap-2 justify-center mt-4">
                      <span className="px-3 py-1 bg-yellow-400/20 rounded-full text-yellow-400 text-sm">React Native</span>
                      <span className="px-3 py-1 bg-yellow-400/20 rounded-full text-yellow-400 text-sm">Flutter</span>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-yellow-400 mx-auto mb-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694 4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
                    </svg>
                    <h3 className="text-white text-2xl font-bold mb-3">Database</h3>
                    <p className="text-yellow-400 text-lg">MongoDB, PostgreSQL</p>
                    <div className="flex flex-wrap gap-2 justify-center mt-4">
                      <span className="px-3 py-1 bg-yellow-400/20 rounded-full text-yellow-400 text-sm">MongoDB</span>
                      <span className="px-3 py-1 bg-yellow-400/20 rounded-full text-yellow-400 text-sm">PostgreSQL</span>
                    </div>
                  </div>
                </Card>
              </AutoCardSwap>
            </div>
          </div>
        </section>

        {/* About Section - Full Width */}
        <AnimatedSection>
          <section id="about" className="min-h-screen w-full flex items-center justify-center bg-gray-900 px-8 md:px-16">
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center text-center md:text-left md:space-x-16">
              {/* Left Side: Photo */}
              <div className="flex-shrink-0 mb-8 md:mb-0">
                <img 
                  className="w-48 h-48 rounded-full object-cover shadow-lg"
                  src="https://picsum.photos/400"
                  alt="Yusuf Varış portre"
                />
              </div>
              {/* Right Side: Text Content */}
              <div className="flex-grow max-w-2xl">
                <h2 className="text-5xl font-bold text-yellow-400 mb-6">About Me</h2>
                <div className="text-gray-300 space-y-4 text-lg">
                  <p>
                    Hello! With my passion for technology and software, I enjoy turning ideas into reality.
                    I particularly work with technologies like React, Next.js, and Node.js.
                  </p>
                  <p>
                    I'm team-oriented, problem-solving focused, and always aim for the best user experience.
                    In my free time, I contribute to open-source projects and research new technologies.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Projelerim Section - Full Width */}
        <AnimatedSection>
          <section id="projects" className="min-h-screen py-20 w-full bg-gray-900">
            <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">Projelerim</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-8">
                {/* Proje 1 */}
                <ElectricBorder>
                  <div className="bg-gray-800 rounded-lg flex flex-col h-[500px]">
                    <div className="h-60 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-t-lg flex items-center justify-center">
                      <div className="text-white text-6xl">📱</div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-3 text-cyan-400">E-Ticaret Mobil App</h3>
                      <p className="text-gray-400 text-sm flex-grow">React Native ile geliştirilen modern e-ticaret uygulaması. Firebase backend, kullanıcı dostu arayüz ve güvenli ödeme sistemi.</p>
                      <div className="mt-4">
                        <GlowButton color="#22d3ee" size="2px" radius="6px">
                          Görüntüle
                        </GlowButton>
                      </div>
                    </div>
                  </div>
                </ElectricBorder>
                {/* Proje 2 */}
                <ElectricBorder>
                  <div className="bg-gray-800 rounded-lg flex flex-col h-[500px]">
                    <div className="h-60 bg-gradient-to-br from-green-400 to-emerald-600 rounded-t-lg flex items-center justify-center">
                      <div className="text-white text-6xl">💼</div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-3 text-cyan-400">Portfolio Websitesi</h3>
                      <p className="text-gray-400 text-sm flex-grow">Next.js ve Tailwind CSS kullanarak geliştirilen responsive portfolio sitesi. Modern animasyonlar ve optimizasyon.</p>
                      <div className="mt-4">
                        <GlowButton color="#10b981" size="2px" radius="6px">
                          Görüntüle
                        </GlowButton>
                      </div>
                    </div>
                  </div>
                </ElectricBorder>
                {/* Proje 3 */}
                <ElectricBorder>
                  <div className="bg-gray-800 rounded-lg flex flex-col h-[500px]">
                    <div className="h-60 bg-gradient-to-br from-purple-400 to-pink-600 rounded-t-lg flex items-center justify-center">
                      <div className="text-white text-6xl">🎵</div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-3 text-cyan-400">Müzik Çalar App</h3>
                      <p className="text-gray-400 text-sm flex-grow">Flutter ile geliştirilmiş çevrimiçi müzik çalar uygulaması. Spotify API entegrasyonu ve özel çalma listeleri.</p>
                      <div className="mt-4">
                        <GlowButton color="#a855f7" size="2px" radius="6px">
                          Görüntüle
                        </GlowButton>
                      </div>
                    </div>
                  </div>
                </ElectricBorder>
                {/* Proje 4 */}
                <ElectricBorder>
                  <div className="bg-gray-800 rounded-lg flex flex-col h-[500px]">
                    <div className="h-60 bg-gradient-to-br from-orange-400 to-red-600 rounded-t-lg flex items-center justify-center">
                      <div className="text-white text-6xl">🔧</div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-3 text-cyan-400">Stok Takip Sistemi</h3>
                      <p className="text-gray-400 text-sm flex-grow">Node.js ve MongoDB ile geliştirilen web tabanlı stok yönetim sistemi. RESTful API ve gerçek zamanlı güncellemeler.</p>
                      <div className="mt-4">
                        <GlowButton color="#f97316" size="2px" radius="6px">
                          Görüntüle
                        </GlowButton>
                      </div>
                    </div>
                  </div>
                </ElectricBorder>
            </div>
          </section>
        </AnimatedSection>

        {/* Container for the rest of the sections */}
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <section id="skills" className="min-h-screen py-20 w-full">
              <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">Yeteneklerim</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-6">
                {/* Web Development Card */}
                <ElectricBorder className="transform hover:scale-105 transition-all duration-300">
                  <div className="bg-gray-800 rounded-lg p-8 h-80 flex flex-col">
                    <h3 className="text-3xl font-bold text-yellow-400 mb-6 text-center h-20 flex items-center justify-center">Web Development</h3>
                    <ul className="text-gray-300 space-y-3 text-lg text-center flex-grow flex flex-col justify-center">
                      <li>JavaScript (ES6+)</li>
                      <li>TypeScript</li>
                      <li>React & Next.js</li>
                      <li>HTML5 & CSS3</li>
                      <li>Tailwind CSS</li>
                    </ul>
                  </div>
                </ElectricBorder>
                {/* Mobile Development Card */}
                <ElectricBorder className="transform hover:scale-105 transition-all duration-300">
                  <div className="bg-gray-800 rounded-lg p-8 h-80 flex flex-col">
                    <h3 className="text-3xl font-bold text-yellow-400 mb-6 text-center h-20 flex items-center justify-center">Mobile Development</h3>
                    <ul className="text-gray-300 space-y-3 text-lg text-center flex-grow flex flex-col justify-center">
                      <li>React Native</li>
                      <li>Flutter (Dart)</li>
                      <li>Swift / Kotlin (Native)</li>
                    </ul>
                  </div>
                </ElectricBorder>
                {/* Backend Development Card */}
                <ElectricBorder className="transform hover:scale-105 transition-all duration-300">
                  <div className="bg-gray-800 rounded-lg p-8 h-80 flex flex-col">
                    <h3 className="text-3xl font-bold text-yellow-400 mb-6 text-center h-20 flex items-center justify-center">Backend Development</h3>
                    <ul className="text-gray-300 space-y-3 text-lg text-center flex-grow flex flex-col justify-center">
                      <li>Node.js (Express)</li>
                      <li>Python (Flask/Django)</li>
                      <li>RESTful APIs</li>
                      <li>Databases (SQL/NoSQL)</li>
                    </ul>
                  </div>
                </ElectricBorder>
              </div>
            </section>
          </AnimatedSection>

        </div>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-gray-800 w-full">
        <div className="container mx-auto px-6">
            <div className="py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
              {/* Left Side */}
              <div>
                <h3 className="text-2xl font-bold text-yellow-400">Yusuf Varış</h3>
                <p className="text-gray-400">Yazılım Geliştirici</p>
              </div>
              {/* Right Side */}
              <div>
                <ul className="flex space-x-6">
                  <li><a href="#" className="hover:text-yellow-400 transition-colors">Hizmetler</a></li>
                  <li><a href="mailto:email@example.com" className="hover:text-yellow-400 transition-colors">İletişim</a></li>
                </ul>
              </div>
            </div>
        </div>
      </footer>
    </div>
  );
}