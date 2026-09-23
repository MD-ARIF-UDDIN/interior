import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import studioData from '../../data/studioInfo.json';

export const Testimonials: React.FC = () => {
  const { localize, t } = useLanguage();

  return (
    <section id="testimonials" className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
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
            <span>{t.testimonials.badge}</span>
          </div>
          <h2 className="section-title">
            {t.testimonials.title}
          </h2>
          <p className="section-subtitle">
            {t.testimonials.subtitle}
          </p>
        </motion.div>

        {/* Testimonials Grid with Staggered Entrance */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
          {studioData.testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ translateY: -6, boxShadow: 'var(--shadow-md)' }}
            >
              {/* Rating Stars with Subtle Scale */}
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.25rem' }}>
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={15} fill="var(--accent-gold)" color="var(--accent-gold)" />
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--text-primary)',
                  lineHeight: 1.7,
                  marginBottom: '1.75rem',
                  flexGrow: 1,
                }}
              >
                "{localize(item.quote)}"
              </p>

              {/* Client Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
                <img
                  src={item.avatar}
                  alt={localize(item.clientName)}
                  style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover' }}
                  loading="lazy"
                />
                <div>
                  <h4 style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {localize(item.clientName)}
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>
                    {localize(item.projectTitle)} • {localize(item.location)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
