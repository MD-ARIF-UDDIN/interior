import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { FeaturedProjects } from './components/home/FeaturedProjects';
import { LiveAtelierSandbox } from './components/home/LiveAtelierSandbox';
import { ProcessSection } from './components/home/ProcessSection';
import { MaterialsSection } from './components/home/MaterialsSection';
import { Testimonials } from './components/home/Testimonials';
import { ProjectModal } from './components/project/ProjectModal';
import { LightboxGallery } from './components/project/LightboxGallery';
import { ConsultationModal } from './components/layout/ConsultationModal';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import type { LightingMood } from './components/ui/AmbientLightingController';
import type { Project } from './types/project';

const PortfolioApp: React.FC = () => {
  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('lumen_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Spatial Lighting Mood State
  const [ambientMood, setAmbientMood] = useState<LightingMood>('golden');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lumen_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Modal & Lightbox States
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);

  // Lightbox State
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [lightboxTitle, setLightboxTitle] = useState<string>('');
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  const handleOpenLightbox = (images: string[], initialIndex: number, title: string) => {
    setLightboxImages(images);
    setLightboxIndex(initialIndex);
    setLightboxTitle(title);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <div
      className="portfolio-app"
      data-lighting-mood={ambientMood}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* Sticky Frosted Header */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* Main Content Sections */}
      <main style={{ flexGrow: 1 }}>
        <HeroSection
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenConsultation={() => setIsConsultationOpen(true)}
          ambientMood={ambientMood}
          onSelectMood={(m) => setAmbientMood(m)}
        />

        <FeaturedProjects
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* Live Interior Material & Spatial Light Atelier Sandbox */}
        <LiveAtelierSandbox
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        <ProcessSection />

        <MaterialsSection
          onInspectImage={(url, title) => handleOpenLightbox([url], 0, title)}
        />

        <Testimonials />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Deep-Dive Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        onOpenLightbox={handleOpenLightbox}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* Fullscreen Lightbox Gallery */}
      <LightboxGallery
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        projectTitle={lightboxTitle}
        onClose={handleCloseLightbox}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
      />

      {/* Consultation Booking & Estimator Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <PortfolioApp />
    </LanguageProvider>
  );
}

