import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MoveHorizontal } from 'lucide-react';
import type { BeforeAfterPair } from '../../types/project';
import { useLanguage } from '../../context/LanguageContext';

interface BeforeAfterSliderProps {
  data: BeforeAfterPair;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ data }) => {
  const { localize, t } = useLanguage();
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(600);
  const containerRef = useRef<HTMLDivElement>(null);

  // ResizeObserver to always have exact width for pixel-perfect clipping on all devices
  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const width = rect.width;
      const pos = Math.max(0, Math.min(100, (x / width) * 100));
      setSliderPos(pos);
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', width: '100%' }}>
      <div
        ref={containerRef}
        className="before-after-container"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
      >
        {/* Background Image (After Transformation) */}
        <img
          src={data.afterImage}
          alt={localize(data.afterLabel)}
          className="ba-image"
          loading="lazy"
        />

        {/* Foreground Image (Before - Clipped) */}
        <div
          className="ba-overlay"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={data.beforeImage}
            alt={localize(data.beforeLabel)}
            className="ba-image"
            style={{ width: `${containerWidth}px`, maxWidth: 'none' }}
            loading="lazy"
          />
        </div>

        {/* Divider Handle */}
        <div
          className="ba-handle"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="ba-button" aria-label="Drag to compare before and after">
            <MoveHorizontal size={18} />
          </div>
        </div>

        {/* Labels */}
        <span className="ba-badge ba-badge-before">
          {localize(data.beforeLabel)}
        </span>
        <span className="ba-badge ba-badge-after">
          {localize(data.afterLabel)}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span className="section-badge-dot" />
          {localize(data.description)}
        </p>
        <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
          {t.modal.slideHint}
        </span>
      </div>
    </div>
  );
};
