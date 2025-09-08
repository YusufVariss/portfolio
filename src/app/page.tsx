
"use client";

import { useState, useEffect } from "react";
import AnimatedSection from "./components/AnimatedSection";
import LoadingScreen from "./components/LoadingScreen";

// Metadata can still be defined in a client component
// export const metadata: Metadata = {
//   title: "Yusuf - Yazılım Geliştirici",
//   description: "Yusuf'un kişisel portfolyo web sitesi.",
// };

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

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

  return (
    <div className="bg-gray-900 text-white font-sans">
      <LoadingScreen isLoading={isLoading} />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-transparent z-20">
        <nav className="w-full px-6 py-4 flex justify-end items-center">
          <ul className="flex items-center space-x-2">
            <li><a href="#home" className="text-yellow-400 px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-yellow-400 hover:text-black">Ana Sayfa</a></li>
            <li><a href="#about" className="text-yellow-400 px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-yellow-400 hover:text-black">Hakkımda</a></li>
            <li><a href="#projects" className="text-yellow-400 px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-yellow-400 hover:text-black">Projelerim</a></li>
            <li><a href="#skills" className="text-yellow-400 px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-yellow-400 hover:text-black">Yeteneklerim</a></li>
            <li><a href="#contact" className="text-yellow-400 px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-yellow-400 hover:text-black">İletişim</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen w-full flex flex-col justify-center items-start text-left overflow-hidden">
          {/* Backgrounds */}
          <div className="absolute top-0 left-0 w-full h-full bg-black z-0"></div>
          <div 
            className="absolute top-0 left-0 w-full h-full bg-yellow-400"
            style={{ clipPath: 'polygon(0 0, 55% 0, 45% 100%, 0% 100%)' }}
          ></div>
          
          {/* Content */}
          <div 
            className={`relative z-10 px-6 md:px-0 md:ml-10 lg:ml-16 transition-all duration-1000 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-black">Merhaba, ben Yusuf</h1>
            <p className="text-xl md:text-2xl text-gray-800 mb-8">Bir Yazılım Geliştirici</p>
            <p className="max-w-xl text-gray-900">
              Modern web teknolojileriyle kullanıcı dostu ve verimli çözümler üretiyorum.
              Kod yazmanın yanı sıra, yeni şeyler öğrenmeyi ve kendimi geliştirmeyi seviyorum.
            </p>
          </div>

          {/* Development Visual */}
          <div className={`absolute top-0 right-0 w-1/2 h-full flex items-center justify-center transition-all duration-1000 ease-out ${isMounted ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: '400ms'}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-4/5 h-4/5 text-gray-800 opacity-50">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
            </svg>
          </div>

        </section>

        {/* Container for the rest of the sections */}
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <section id="about" className="min-h-screen w-full flex items-center justify-center bg-black">
              <div className="w-full flex flex-col md:flex-row items-center justify-center text-center md:text-left md:space-x-16">
                {/* Left Side: Photo Placeholder */}
                <div className="flex-shrink-0 mb-8 md:mb-0">
                  <div className="w-48 h-48 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-28 h-28 text-black">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                </div>
                {/* Right Side: Text Content */}
                <div className="flex-grow max-w-2xl">
                  <h2 className="text-5xl font-bold text-yellow-400 mb-6">Hakkımda</h2>
                  <div className="text-gray-300 space-y-4 text-lg">
                    <p>
                      Merhaba! Teknolojiye ve yazılıma olan tutkumla, fikirleri gerçeğe dönüştürmekten keyif alıyorum.
                      Özellikle React, Next.js ve Node.js gibi teknolojilerle çalışıyorum.
                    </p>
                    <p>
                      Takım çalışmasına yatkın, problem çözme odaklı ve her zaman en iyi kullanıcı deneyimini hedefleyen biriyim.
                      Boş zamanlarımda açık kaynak projelere katkıda bulunuyor ve yeni teknolojileri araştırıyorum.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section id="projects" className="min-h-screen py-20">
              <h2 className="text-4xl font-bold text-center mb-12">Projelerim</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Proje 1 */}
                <div className="bg-gray-800 rounded-lg p-6 transform hover:scale-105 transition-transform">
                  <h3 className="text-2xl font-bold mb-2 text-cyan-400">Proje Adı 1</h3>
                  <p className="text-gray-400">Bu projenin kısa bir açıklaması. Hangi teknolojilerin kullanıldığı ve projenin amacı hakkında bilgi.</p>
                </div>
                {/* Proje 2 */}
                <div className="bg-gray-800 rounded-lg p-6 transform hover:scale-105 transition-transform">
                  <h3 className="text-2xl font-bold mb-2 text-cyan-400">Proje Adı 2</h3>
                  <p className="text-gray-400">Bu projenin kısa bir açıklaması. Hangi teknolojilerin kullanıldığı ve projenin amacı hakkında bilgi.</p>
                </div>
                {/* Proje 3 */}
                <div className="bg-gray-800 rounded-lg p-6 transform hover:scale-105 transition-transform">
                  <h3 className="text-2xl font-bold mb-2 text-cyan-400">Proje Adı 3</h3>
                  <p className="text-gray-400">Bu projenin kısa bir açıklaması. Hangi teknolojilerin kullanıldığı ve projenin amacı hakkında bilgi.</p>
                </div>
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section id="skills" className="min-h-screen py-20">
              <h2 className="text-4xl font-bold text-center mb-12">Yeteneklerim</h2>
              <div className="max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-4">
                <span className="bg-cyan-900 text-cyan-300 text-lg font-medium px-4 py-2 rounded-full">JavaScript</span>
                <span className="bg-cyan-900 text-cyan-300 text-lg font-medium px-4 py-2 rounded-full">TypeScript</span>
                <span className="bg-cyan-900 text-cyan-300 text-lg font-medium px-4 py-2 rounded-full">React</span>
                <span className="bg-cyan-900 text-cyan-300 text-lg font-medium px-4 py-2 rounded-full">Next.js</span>
                <span className="bg-cyan-900 text-cyan-300 text-lg font-medium px-4 py-2 rounded-full">Node.js</span>
                <span className="bg-cyan-900 text-cyan-300 text-lg font-medium px-4 py-2 rounded-full">Tailwind CSS</span>
                <span className="bg-cyan-900 text-cyan-300 text-lg font-medium px-4 py-2 rounded-full">HTML5 & CSS3</span>
                <span className="bg-cyan-900 text-cyan-300 text-lg font-medium px-4 py-2 rounded-full">Git & GitHub</span>
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section id="contact" className="min-h-screen py-20">
              <h2 className="text-4xl font-bold text-center mb-12">İletişim</h2>
              <div className="max-w-lg mx-auto text-center">
                <p className="text-gray-400 mb-8">
                  Benimle çalışmak veya bir proje hakkında konuşmak isterseniz, aşağıdaki e-posta adresinden bana ulaşabilirsiniz.
                </p>
                <a href="mailto:email@example.com" className="inline-block bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-600 transition-colors">
                  E-posta Gönder
                </a>
              </div>
            </section>
          </AnimatedSection>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 w-full">
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
                  <li><a href="#contact" className="hover:text-yellow-400 transition-colors">İletişim</a></li>
                </ul>
              </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
