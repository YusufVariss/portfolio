"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import ModernNavigation from "./components/ModernNavigation";
import ModernHero from "./components/ModernHero";
import ModernAboutSection from "./components/ModernAboutSection";
import ModernProjects from "./components/ModernProjects";
import ModernContact from "./components/ModernContact";
import ModernFooter from "./components/ModernFooter";

// Metadata can still be defined in a client component
// export const metadata: Metadata = {
//   title: "Yusuf - Yazılım Geliştirici",
//   description: "Yusuf'un kişisel portfolyo web sitesi.",
// };

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  if (isLoading) {
    return <LoadingScreen isLoading={isLoading} />;
  }

  return (
    <div className="bg-gray-900 text-white font-sans overflow-x-hidden relative">
      {/* Modern Navigation */}
      <ModernNavigation />
      
      {/* Hero Section */}
      <section id="home">
        <ModernHero />
      </section>

      {/* About Section */}
      <section id="about">
        <ModernAboutSection />
      </section>

      {/* Projects Section */}
      <ModernProjects />

      {/* Contact Section */}
      <ModernContact />

      {/* Footer */}
      <ModernFooter />
    </div>
  );
}