import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import studioData from '../../data/studioInfo.json';

export const ProcessSection: React.FC = () => {
  const { localize, t } = useLanguage();

  return (
    <section id="process" className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Header with Scroll Reveal */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge">
            <span className="section-badge-dot" />
            <span>{t.process.badge}</span>
          </div>
          <h2 className="section-title">
            {t.process.title}
          </h2>
          <p className="section-subtitle">
            {t.process.subtitle}
          </p>
        </motion.div>

        {/* 4-Step Process Grid with Staggered Entrance */}
        <div className="process-grid">
          {studioData.processSteps.map((step, idx) => (
            <motion.div
              key={idx}
              className="process-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ translateY: -6 }}
            >
              <span className="process-step-num">{step.stepNumber}</span>

              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                {localize(step.title)}
              </h3>

              <p style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '1rem' }}>
                {localize(step.subtitle)}
              </p>

              <div style={{ height: '140px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.25rem' }}>
                <img
                  src={step.image}
                  alt={localize(step.title)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  loading="lazy"
                />
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.25rem', flexGrow: 1 }}>
                {localize(step.description)}
              </p>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.725rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                  {t.process.deliverablesHeader}
                </span>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {step.deliverables.map((deliv, i) => (
                    <li key={i} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.35rem' }}>
                      <CheckCircle2 size={12} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{localize(deliv)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
