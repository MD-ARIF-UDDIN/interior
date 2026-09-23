import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxGalleryProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  projectTitle?: string;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const LightboxGallery: React.FC<LightboxGalleryProps> = ({
  images,
  currentIndex,
  isOpen,
  projectTitle = '',
  onClose,
  onSelectIndex,
}) => {
  const handlePrev = useCallback(() => {
    onSelectIndex((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    onSelectIndex((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onSelectIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Lock body scroll when lightbox is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Top Control Bar */}
        <div className="lightbox-top-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="lightbox-counter">
              {currentIndex + 1} / {images.length}
            </span>
            {projectTitle && (
              <span style={{ fontSize: '0.9rem', color: '#E0DDD7', fontFamily: 'var(--font-serif)' }}>
                {projectTitle}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={onClose}
              className="icon-btn"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }}
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Stage with Image & Navigation */}
        <div className="lightbox-main-stage">
          {images.length > 1 && (
            <button
              className="lightbox-nav-btn lightbox-nav-prev"
              onClick={handlePrev}
              aria-label="Previous Image"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Gallery view ${currentIndex + 1}`}
            className="lightbox-image"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
          />

          {images.length > 1 && (
            <button
              className="lightbox-nav-btn lightbox-nav-next"
              onClick={handleNext}
              aria-label="Next Image"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* Bottom Filmstrip Thumbnails */}
        {images.length > 1 && (
          <div className="lightbox-thumbnails">
            {images.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={`Thumbnail ${idx + 1}`}
                className={`lightbox-thumb ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => onSelectIndex(idx)}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
