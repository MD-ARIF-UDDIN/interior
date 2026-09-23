import React from 'react';
import { ArrowRight, Award, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { SunlightParticles } from '../ui/SunlightParticles';
import { ArchitecturalHotspots } from '../ui/ArchitecturalHotspots';
import { AmbientLightingController } from '../ui/AmbientLightingController';
import type { LightingMood } from '../ui/AmbientLightingController';
import studioData from '../../data/studioInfo.json';
import projectsData from '../../data/projects.json';
import type { Project } from '../../types/project';

interface HeroSectionProps {
  onSelectProject: (project: Project) => void;
  onOpenConsultation: () => void;
  ambientMood: LightingMood;
  onSelectMood: (mood: LightingMood) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectProject,
  onOpenConsultation,
  ambientMood,
  onSelectMood,
}) => {
  const { localize, t } = useLanguage();
  const featuredProject = (projectsData as Project[]).find((p) => p.featured) || (projectsData[0] as Project);

  const phoneNumber = '8801825334505';
  const encodedMessage = encodeURIComponent(t.whatsapp.greeting);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <section className="hero-section">
      {/* Live Interior Sunlit Particles & Volumetric Light Beam */}
      <SunlightParticles mood={ambientMood} />

      {/* Atmospheric Background Ambient Glow */}
      <motion.div
        className="hero-bg-accent"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.85, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        {/* Spatial Lighting Controller Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '1.75rem', display: 'flex', justifyContent: 'center' }}
        >
          <AmbientLightingController
            currentMood={ambientMood}
            onSelectMood={onSelectMood}
          />
        </motion.div>

        <div className="hero-grid">
          {/* Left Column: Animated Editorial Headline & Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <motion.div
              className="section-badge"
              style={{ marginBottom: '1.25rem' }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="section-badge-dot" />
              <span>{t.hero.badge}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="hero-headline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {t.hero.headlinePart1} <br />
              <em>{t.hero.headlinePart2}</em>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="hero-lead"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t.hero.subheadline}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a href="#projects" className="btn btn-primary">
                <span>{t.hero.exploreProjects}</span>
                <ArrowRight size={16} />
              </a>

              <button className="btn btn-gold" onClick={onOpenConsultation}>
                <span>{t.nav.consultation}</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ borderColor: 'rgba(37, 211, 102, 0.4)', color: 'var(--text-primary)' }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#25D366"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                </svg>
                <span>WhatsApp: 01825334505</span>
              </a>
            </motion.div>

            {/* Studio Metrics Row with Staggered Count-In */}
            <motion.div
              className="hero-metrics"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              {studioData.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="metric-item"
                  whileHover={{ translateY: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="metric-value">{stat.value}</span>
                  <span className="metric-label">{localize(stat.label)}</span>
                  <span className="metric-desc">{localize(stat.description)}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Floating Breathing Hero Card with Interactive CAD Hotspots */}
          <motion.div
            className="hero-card-wrapper"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="hero-card"
              style={{ position: 'relative' }}
            >
              <img
                src={featuredProject.heroImage}
                alt={localize(featuredProject.title)}
                loading="eager"
              />

              {/* Interactive Architectural CAD Hotspots Pin Overlay */}
              <ArchitecturalHotspots />

              <div className="hero-floating-badge" style={{ zIndex: 12 }}>
                <Award size={14} color="var(--accent-gold)" />
                <span>Featured • South Khulshi</span>
              </div>

              <div
                className="hero-card-overlay"
                style={{ zIndex: 8, cursor: 'pointer' }}
                onClick={() => onSelectProject(featuredProject)}
              >
                <span className="hero-card-tag" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPin size={12} />
                  {localize(featuredProject.specs.location)} • {featuredProject.specs.year}
                </span>
                <h3 className="hero-card-title">
                  {localize(featuredProject.title)}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#E0DDD7', fontStyle: 'italic', marginBottom: '0.75rem' }}>
                  {localize(featuredProject.subtitle)}
                </p>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                  {t.portfolio.viewProjectBtn} <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
