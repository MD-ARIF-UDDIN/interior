import React, { useState, useMemo } from 'react';
import { LayoutGrid, Layers, Search, MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import projectsData from '../../data/projects.json';
import type { Project } from '../../types/project';
import { ProjectCard } from '../project/ProjectCard';

interface FeaturedProjectsProps {
  onSelectProject: (project: Project) => void;
  onOpenLightbox: (images: string[], initialIndex: number, title: string) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  onSelectProject,
  onOpenLightbox,
}) => {
  const { localize, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [layoutMode, setLayoutMode] = useState<'magazine' | 'grid'>('magazine');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const projects = projectsData as Project[];

  const popularLocations = [
    { name: 'South Khulshi', label: { en: 'South Khulshi', bn: 'দক্ষিণ খুলশী' } },
    { name: 'Nasirabad', label: { en: 'Nasirabad Housing', bn: 'নাসিরাবাদ' } },
    { name: 'O.R. Nizam', label: { en: 'O.R. Nizam Road', bn: 'ও.আর. নিজাম রোড' } },
    { name: 'Agrabad', label: { en: 'Agrabad C/A', bn: 'আগ্রাবাদ' } },
    { name: 'Patenga', label: { en: 'Patenga Seafront', bn: 'পতেঙ্গা' } },
  ];

  const categories = [
    {
      id: 'all',
      label: t.portfolio.filterAll,
      count: projects.length,
    },
    {
      id: 'penthouse',
      label: t.portfolio.filterPenthouse,
      count: projects.filter((p) => p.category === 'penthouse').length,
    },
    {
      id: 'residential',
      label: t.portfolio.filterResidential,
      count: projects.filter((p) => p.category === 'residential').length,
    },
    {
      id: 'minimalist',
      label: t.portfolio.filterMinimalist,
      count: projects.filter((p) => p.category === 'minimalist').length,
    },
    {
      id: 'commercial',
      label: t.portfolio.filterCommercial,
      count: projects.filter((p) => p.category === 'commercial').length,
    },
    {
      id: 'hospitality',
      label: t.portfolio.filterHospitality,
      count: projects.filter((p) => p.category === 'hospitality').length,
    },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchesCategory =
        selectedCategory === 'all' || proj.category === selectedCategory;

      if (!searchQuery.trim()) return matchesCategory;

      const q = searchQuery.toLowerCase().trim();
      const titleMatch =
        proj.title.en.toLowerCase().includes(q) ||
        proj.title.bn.toLowerCase().includes(q);
      const subMatch =
        proj.subtitle.en.toLowerCase().includes(q) ||
        proj.subtitle.bn.toLowerCase().includes(q);
      const locationMatch =
        proj.specs.location.en.toLowerCase().includes(q) ||
        proj.specs.location.bn.toLowerCase().includes(q);
      const tagsMatch = proj.tags.some(
        (tag) => tag.en.toLowerCase().includes(q) || tag.bn.toLowerCase().includes(q)
      );

      return matchesCategory && (titleMatch || subMatch || locationMatch || tagsMatch);
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
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
            <span>{t.portfolio.badge}</span>
          </div>
          <h2 className="section-title">
            {t.portfolio.title}
          </h2>
          <p className="section-subtitle">
            {t.portfolio.subtitle}
          </p>
        </motion.div>

        {/* Search & Location Quick-Pills with subtle spring reveal */}
        <motion.div
          style={{ maxWidth: '800px', margin: '0 auto 2.5rem auto' }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="portfolio-search-box">
            <Search size={18} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.portfolio.searchPlaceholder}
              className="portfolio-search-input"
              aria-label="Search projects"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="search-clear-btn"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Quick Location Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.75rem', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <MapPin size={12} />
              Chattogram:
            </span>
            {popularLocations.map((loc, idx) => (
              <motion.button
                key={idx}
                onClick={() => setSearchQuery(loc.name)}
                className={`quick-loc-pill ${searchQuery.toLowerCase().includes(loc.name.toLowerCase()) ? 'active' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {localize(loc.label)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Filters & View Mode Controls Bar */}
        <div className="portfolio-controls">
          {/* Category Filter Pills with counts */}
          <div className="category-filters">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <span>{cat.label}</span>
                <span className="filter-count-badge">{cat.count}</span>
              </motion.button>
            ))}
          </div>

          {/* Right Side: View Mode Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="view-mode-toggle">
              <button
                className={`view-btn ${layoutMode === 'magazine' ? 'active' : ''}`}
                onClick={() => setLayoutMode('magazine')}
                title={t.portfolio.viewMagazine}
              >
                <Layers size={14} />
                <span>{t.portfolio.viewMagazine}</span>
              </button>

              <button
                className={`view-btn ${layoutMode === 'grid' ? 'active' : ''}`}
                onClick={() => setLayoutMode('grid')}
                title={t.portfolio.viewGrid}
              >
                <LayoutGrid size={14} />
                <span>{t.portfolio.viewGrid}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Projects Render with Framer Motion AnimatePresence & layout */}
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <motion.div
              key="empty"
              style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)', maxWidth: '600px', margin: '0 auto' }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <MapPin size={32} color="var(--accent-gold)" style={{ marginBottom: '1rem', opacity: 0.6 }} />
              <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>
                No projects found
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Try searching for "Khulshi", "Nasirabad", "Penthouse" or clear the search filter.
              </p>
              <button className="btn btn-outline" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                Reset Filters
              </button>
            </motion.div>
          ) : layoutMode === 'magazine' ? (
            <motion.div
              key={`magazine-${selectedCategory}-${searchQuery}`}
              className="magazine-layout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {filteredProjects.map((proj, idx) => (
                <ProjectCard
                  key={proj.id}
                  project={proj}
                  layoutMode="magazine"
                  index={idx}
                  onSelectProject={onSelectProject}
                  onOpenGallery={(images, title) => onOpenLightbox(images, 0, title)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`grid-${selectedCategory}-${searchQuery}`}
              className="masonry-layout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {filteredProjects.map((proj, idx) => (
                <ProjectCard
                  key={proj.id}
                  project={proj}
                  layoutMode="grid"
                  index={idx}
                  onSelectProject={onSelectProject}
                  onOpenGallery={(images, title) => onOpenLightbox(images, 0, title)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
