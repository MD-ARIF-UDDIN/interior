import React from 'react';
import { ZoomIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import studioData from '../../data/studioInfo.json';

interface MaterialsSectionProps {
  onInspectImage?: (url: string, title: string) => void;
}

export const MaterialsSection: React.FC<MaterialsSectionProps> = ({ onInspectImage }) => {
  const { localize, t } = useLanguage();
  const materials = studioData.materialsCatalog;

  return (
    <section id="materials" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge">
            <span className="section-badge-dot" />
            <span>{t.materials.badge}</span>
          </div>
          <h2 className="section-title">
            {t.materials.title}
          </h2>
          <p className="section-subtitle">
            {t.materials.subtitle}
          </p>
        </motion.div>

        {/* Materials Grid with Staggered Entrance */}
        <div className="materials-grid">
          {materials.map((mat, idx) => (
            <motion.div
              key={idx}
              className="material-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ translateY: -5 }}
            >
              <div
                className="material-texture-preview"
                onClick={() => onInspectImage && onInspectImage(mat.texture, localize(mat.name))}
                style={{ cursor: onInspectImage ? 'pointer' : 'default' }}
              >
                <img
                  src={mat.texture}
                  alt={localize(mat.name)}
                  loading="lazy"
                  style={{ transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
                {onInspectImage && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      background: 'rgba(0,0,0,0.65)',
                      color: '#FFFFFF',
                      padding: '0.25rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.7rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    <ZoomIn size={12} /> {t.materials.viewTexture}
                  </span>
                )}
              </div>

              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '0.25rem' }}>
                  {localize(mat.category)}
                </span>
                <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  {localize(mat.name)}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, flexGrow: 1 }}>
                  {localize(mat.description)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
