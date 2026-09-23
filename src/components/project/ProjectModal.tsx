import React, { useState, useEffect } from 'react';
import { X, MapPin, Calendar, Maximize, Award, Eye, MessageSquare, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../../types/project';
import { useLanguage } from '../../context/LanguageContext';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { MaterialPalette } from './MaterialPalette';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenLightbox: (images: string[], initialIndex: number, title: string) => void;
  onOpenConsultation: () => void;
}

type TabType = 'overview' | 'beforeAfter' | 'materials' | 'gallery' | 'specs';

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  onOpenLightbox,
  onOpenConsultation,
}) => {
  const { localize, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveTab('overview');
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const phoneNumber = '8801825334505';
  const projectTitle = localize(project.title);
  const waProjectMessage = encodeURIComponent(
    `Hello Lumen Atelier, I am interested in discussing a project similar to "${projectTitle}" (${localize(project.specs.location)}).`
  );
  const waProjectUrl = `https://wa.me/${phoneNumber}?text=${waProjectMessage}`;

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose}>
        <motion.div
          className="modal-dialog"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="modal-header">
            <div className="modal-title-group">
              <span className="project-category-tag" style={{ marginBottom: '0.2rem' }}>
                {localize(project.categoryLabel)} • {localize(project.specs.location)}
              </span>
              <h3 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif)' }}>
                {localize(project.title)}
              </h3>
            </div>
            <button className="icon-btn" onClick={onClose} aria-label={t.modal.close}>
              <X size={20} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div style={{ padding: '0 2rem', paddingTop: '1rem', backgroundColor: 'var(--bg-primary)' }}>
            <div className="modal-tabs">
              <button
                className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                {t.modal.overviewTab}
              </button>

              {project.beforeAfter && (
                <button
                  className={`modal-tab-btn ${activeTab === 'beforeAfter' ? 'active' : ''}`}
                  onClick={() => setActiveTab('beforeAfter')}
                >
                  {t.modal.beforeAfterTab}
                </button>
              )}

              <button
                className={`modal-tab-btn ${activeTab === 'materials' ? 'active' : ''}`}
                onClick={() => setActiveTab('materials')}
              >
                {t.modal.materialsTab}
              </button>

              <button
                className={`modal-tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
                onClick={() => setActiveTab('gallery')}
              >
                {t.modal.galleryTab} ({project.galleryImages.length})
              </button>

              <button
                className={`modal-tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                onClick={() => setActiveTab('specs')}
              >
                {t.modal.specsTab}
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Hero Showcase Image */}
                <div
                  style={{
                    position: 'relative',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    aspectRatio: '16/9',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-md)',
                  }}
                  onClick={() =>
                    onOpenLightbox(project.galleryImages, 0, localize(project.title))
                  }
                >
                  <img
                    src={project.heroImage}
                    alt={localize(project.title)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      padding: '1.5rem',
                      color: '#FFFFFF',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                    }}
                  >
                    <div>
                      <p style={{ fontSize: '1.1rem', fontWeight: 300, fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
                        {localize(project.subtitle)}
                      </p>
                    </div>
                    <span
                      style={{
                        background: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(8px)',
                        padding: '0.4rem 0.8rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <Eye size={14} /> {t.modal.openFullscreen}
                    </span>
                  </div>
                </div>

                {/* Narrative Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ background: 'var(--bg-secondary)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
                    <h4 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-serif)', marginBottom: '0.75rem', color: 'var(--accent-gold)' }}>
                      {t.modal.designBrief}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                      {localize(project.overview)}
                    </p>
                  </div>

                  <div style={{ background: 'var(--bg-secondary)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
                    <h4 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-serif)', marginBottom: '0.75rem', color: 'var(--accent-gold)' }}>
                      {t.modal.spatialChallenge}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                      {localize(project.challenges)}
                    </p>
                  </div>

                  <div style={{ background: 'var(--bg-secondary)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
                    <h4 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-serif)', marginBottom: '0.75rem', color: 'var(--accent-gold)' }}>
                      {t.modal.bespokeSolution}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                      {localize(project.solutions)}
                    </p>
                  </div>
                </div>

                {/* Specs Strip */}
                <div className="specs-matrix">
                  <div className="spec-cell">
                    <span className="spec-key">{t.modal.location}</span>
                    <span className="spec-val" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MapPin size={14} color="var(--accent-gold)" />
                      {localize(project.specs.location)}
                    </span>
                  </div>
                  <div className="spec-cell">
                    <span className="spec-key">{t.modal.area}</span>
                    <span className="spec-val" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Maximize size={14} color="var(--accent-gold)" />
                      {project.specs.areaSqFt.toLocaleString()} {t.portfolio.sqFt}
                    </span>
                  </div>
                  <div className="spec-cell">
                    <span className="spec-key">{t.modal.year}</span>
                    <span className="spec-val" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Calendar size={14} color="var(--accent-gold)" />
                      {project.specs.year}
                    </span>
                  </div>
                </div>

                {/* Awards */}
                {project.awards && project.awards.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--accent-gold-light)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-focus)' }}>
                    <Award size={20} color="var(--accent-gold)" />
                    <div>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, color: 'var(--accent-gold-dark)' }}>
                        {t.modal.awardsHeader}
                      </span>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                        {project.awards.map((a) => localize(a)).join(' • ')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: BEFORE & AFTER */}
            {activeTab === 'beforeAfter' && project.beforeAfter && (
              <div>
                <BeforeAfterSlider data={project.beforeAfter} />
              </div>
            )}

            {/* TAB: MATERIALS & PALETTE */}
            {activeTab === 'materials' && (
              <MaterialPalette palette={project.palette} materials={project.materials} />
            )}

            {/* TAB: FULL GALLERY */}
            {activeTab === 'gallery' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
                  {project.galleryImages.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: 'relative',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        aspectRatio: '4/3',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                      onClick={() =>
                        onOpenLightbox(project.galleryImages, idx, localize(project.title))
                      }
                    >
                      <img
                        src={imgUrl}
                        alt={`${localize(project.title)} view ${idx + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                        loading="lazy"
                        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(0,0,0,0.25)',
                          opacity: 0,
                          transition: 'opacity 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                        onMouseOut={(e) => (e.currentTarget.style.opacity = '0')}
                      >
                        <Eye size={24} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: SPECS */}
            {activeTab === 'specs' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="specs-matrix" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
                  <div className="spec-cell">
                    <span className="spec-key">{t.modal.location}</span>
                    <span className="spec-val">{localize(project.specs.location)}</span>
                  </div>
                  <div className="spec-cell">
                    <span className="spec-key">{t.modal.area}</span>
                    <span className="spec-val">{project.specs.areaSqFt.toLocaleString()} {t.portfolio.sqFt}</span>
                  </div>
                  <div className="spec-cell">
                    <span className="spec-key">{t.modal.year}</span>
                    <span className="spec-val">{project.specs.year}</span>
                  </div>
                  <div className="spec-cell">
                    <span className="spec-key">{t.modal.duration}</span>
                    <span className="spec-val">{localize(project.specs.duration)}</span>
                  </div>
                  <div className="spec-cell">
                    <span className="spec-key">{t.modal.style}</span>
                    <span className="spec-val">{localize(project.specs.style)}</span>
                  </div>
                  <div className="spec-cell">
                    <span className="spec-key">{t.modal.scope}</span>
                    <span className="spec-val">{localize(project.specs.scope)}</span>
                  </div>
                  <div className="spec-cell">
                    <span className="spec-key">{t.modal.clientType}</span>
                    <span className="spec-val">{localize(project.specs.clientType)}</span>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
                  <h5 style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', marginBottom: '0.75rem' }}>
                    {localize(project.title)} — {localize(project.categoryLabel)}
                  </h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="project-tag-pill">
                        #{localize(tag)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom CTA Bar with WhatsApp Direct + Consultation Modal */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="section-badge-dot" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {localize(project.specs.location)}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href={waProjectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ backgroundColor: '#25D366', color: '#FFFFFF', padding: '0.75rem 1.25rem' }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  className="btn btn-gold"
                  onClick={() => {
                    onClose();
                    onOpenConsultation();
                  }}
                >
                  <MessageSquare size={16} />
                  <span>{t.modal.inquireProject}</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
