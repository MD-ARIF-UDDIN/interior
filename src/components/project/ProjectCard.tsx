import React from 'react';
import { ArrowUpRight, Image as ImageIcon, MapPin, Maximize, MoveHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '../../types/project';
import { useLanguage } from '../../context/LanguageContext';

interface ProjectCardProps {
  project: Project;
  layoutMode: 'magazine' | 'grid';
  index: number;
  onSelectProject: (project: Project) => void;
  onOpenGallery: (images: string[], title: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  layoutMode,
  index,
  onSelectProject,
  onOpenGallery,
}) => {
  const { localize, t } = useLanguage();
  const isEven = index % 2 === 1;

  if (layoutMode === 'magazine') {
    return (
      <motion.article
        className={`magazine-project-card ${isEven ? 'reverse' : ''}`}
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ translateY: -4 }}
      >
        {/* Media Column */}
        <motion.div
          className="project-media-col"
          onClick={() => onSelectProject(project)}
          role="button"
          tabIndex={0}
          aria-label={`Open project details for ${localize(project.title)}`}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={project.heroImage}
            alt={localize(project.title)}
            loading="lazy"
            style={{ transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}
          />

          {/* Floating Badges */}
          <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.4rem', zIndex: 2, flexWrap: 'wrap' }}>
            <span className="card-location-badge">
              <MapPin size={11} />
              {localize(project.specs.location)}
            </span>

            {project.beforeAfter && (
              <span className="card-ba-badge">
                <MoveHorizontal size={11} />
                Before/After
              </span>
            )}
          </div>

          <button
            className="gallery-count-chip"
            onClick={(e) => {
              e.stopPropagation();
              onOpenGallery(project.galleryImages, localize(project.title));
            }}
            title={t.portfolio.exploreAllImages}
          >
            <ImageIcon size={14} />
            <span>
              {project.galleryImages.length} {t.portfolio.imagesCount}
            </span>
          </button>
        </motion.div>

        {/* Info Column */}
        <div className="project-info-col">
          <div className="project-meta-row">
            <span className="project-category-tag">
              {localize(project.categoryLabel)}
            </span>
            <span style={{ color: 'var(--border-medium)' }}>•</span>
            <span className="project-specs-badge">
              <Maximize size={12} color="var(--accent-gold)" />
              {project.specs.areaSqFt.toLocaleString()} {t.portfolio.sqFt}
            </span>
            <span style={{ color: 'var(--border-medium)' }}>•</span>
            <span className="project-specs-badge">
              {project.specs.year}
            </span>
          </div>

          <h3
            className="project-card-title"
            onClick={() => onSelectProject(project)}
          >
            {localize(project.title)}
          </h3>

          <p className="project-card-subtitle">
            {localize(project.subtitle)}
          </p>

          {/* Color Palette Preview Swatches */}
          {project.palette && project.palette.length > 0 && (
            <div className="palette-preview-row">
              <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Palette:
              </span>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {project.palette.map((c, i) => (
                  <motion.span
                    key={i}
                    className="palette-swatch-dot"
                    style={{ backgroundColor: c.hex }}
                    title={`${localize(c.name)} (${c.hex})`}
                    whileHover={{ scale: 1.25 }}
                    transition={{ duration: 0.15 }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="project-tags-list">
            {project.tags.slice(0, 4).map((tag, i) => (
              <span key={i} className="project-tag-pill">
                #{localize(tag)}
              </span>
            ))}
          </div>

          {/* Action Row */}
          <div>
            <motion.button
              className="btn btn-primary"
              onClick={() => onSelectProject(project)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>{t.portfolio.viewProjectBtn}</span>
              <ArrowUpRight size={16} />
            </motion.button>
          </div>
        </div>
      </motion.article>
    );
  }

  // Masonry Grid View
  return (
    <motion.article
      className="grid-card"
      onClick={() => onSelectProject(project)}
      role="button"
      tabIndex={0}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ translateY: -6 }}
    >
      <div className="grid-card-media">
        <img
          src={project.heroImage}
          alt={localize(project.title)}
          loading="lazy"
        />
        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.3rem', zIndex: 2 }}>
          <span className="card-location-badge" style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem' }}>
            <MapPin size={10} />
            {localize(project.specs.location).split(',')[0]}
          </span>
        </div>
        <div className="gallery-count-chip">
          <ImageIcon size={13} />
          <span>{project.galleryImages.length}</span>
        </div>
      </div>

      <div className="grid-card-body">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span className="project-category-tag">
            {localize(project.categoryLabel)}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {project.specs.year}
          </span>
        </div>

        <h4 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
          {localize(project.title)}
        </h4>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', flexGrow: 1, lineClamp: 2 }}>
          {localize(project.subtitle)}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Maximize size={12} color="var(--accent-gold)" />
            {project.specs.areaSqFt.toLocaleString()} {t.portfolio.sqFt}
          </span>

          <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-gold)' }}>
            {t.portfolio.viewProjectBtn}
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </motion.article>
  );
};
