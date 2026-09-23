import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface MaterialOption {
  id: string;
  name: { en: string; bn: string };
  category: { en: string; bn: string };
  hex: string;
  texture: string;
  renderImage: string;
  description: { en: string; bn: string };
}

export const LiveAtelierSandbox: React.FC<{ onOpenConsultation: () => void }> = ({
  onOpenConsultation,
}) => {
  const { localize, language } = useLanguage();

  const materials: MaterialOption[] = [
    {
      id: 'travertine',
      name: { en: 'Navona Roman Travertine', bn: 'রোমান নাভোনা ট্রাভার্টাইন' },
      category: { en: 'Primary Stone', bn: 'মূল পাথর' },
      hex: '#D8CAB8',
      texture: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=300&q=80',
      renderImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
      description: {
        en: 'Warm, tactile Italian honed stone with organic natural striations. Ideal for double-height Khulshi residences.',
        bn: 'ইতালীয় ট্রাভার্টাইন মার্বেল যা স্পেসে নিয়ে আসে রাজকীয় আভিজাত্য।'
      }
    },
    {
      id: 'walnut-oak',
      name: { en: 'Smoked Fluted Walnut & Oak', bn: 'ফ্লাটেড স্মোকড ওয়ালনাট' },
      category: { en: 'Architectural Timber', bn: 'কাঠের কারুশিল্প' },
      hex: '#4A3B32',
      texture: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=300&q=80',
      renderImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
      description: {
        en: 'Acoustically tuned vertical wood channels with deep chocolate tones and moisture-sealed protection.',
        bn: 'ভার্টিক্যাল উড প্যানেলিং যা ঘরে নিয়ে আসে গভীর স্নিগ্ধতা ও শব্দহীন পরিবেশ।'
      }
    },
    {
      id: 'nero-marquina',
      name: { en: 'Obsidian Nero Marquina', bn: 'নেরো মারকুইনা মার্বেল' },
      category: { en: 'Sculptural Marble', bn: 'কালো মার্বেল' },
      hex: '#1C1D21',
      texture: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=300&q=80',
      renderImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
      description: {
        en: 'Dramatic high-contrast Spanish marble with lightning white veins. Creates an imposing chef atelier island.',
        bn: 'সাদা শিরার রাজকীয় কালো মার্বেল যা রান্নাঘর ও ডাইনিংকে করে তোলে অনন্য।'
      }
    },
    {
      id: 'sandstone-linen',
      name: { en: 'Patenga Coastal Sandstone', bn: 'পতেঙ্গা কোস্টাল স্যান্ডস্টোন' },
      category: { en: 'Coastal Natural Stone', bn: 'কোস্টাল পাথর' },
      hex: '#D1C7BD',
      texture: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=300&q=80',
      renderImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85',
      description: {
        en: 'Soft velvety mineral texture engineered against saline coastal breezes for sea-facing bedroom suites.',
        bn: 'লবণাক্ত বাতাস প্রতিরোধী প্রাকৃতিক পাথর যা সি-ভিউ বেডরুমের জন্য নিখুঁত।'
      }
    }
  ];

  const [selectedMaterial, setSelectedMaterial] = useState<MaterialOption>(materials[0]);
  const [activeLighting, setActiveLighting] = useState<'2700K' | '3500K' | '4000K'>('2700K');

  return (
    <section id="atelier-sandbox" className="section-padding" style={{ backgroundColor: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge">
            <Compass size={12} />
            <span>{language === 'bn' ? 'লাইভ ডিজাইন স্টুডিও' : 'LIVE DESIGN ATELIER'}</span>
          </div>
          <h2 className="section-title">
            {language === 'bn' ? 'ইন্টেরিয়র ম্যাটেরিয়াল স্যান্ডবক্স' : 'Interactive Materiality & Spatial Light'}
          </h2>
          <p className="section-subtitle">
            {language === 'bn'
              ? 'নিচে বিভিন্ন মেটেরিয়াল ও লাইটিং সিলেক্ট করে দেখুন স্পেসের পরিবর্তন।'
              : 'Select architectural materials and lighting kelvin to experience live spatial transformation.'}
          </p>
        </motion.div>

        {/* Sandbox Studio Workstation Grid */}
        <div className="atelier-sandbox-grid">
          {/* Left: Live Interactive Room Perspective Render Stage */}
          <div className="sandbox-stage-card">
            <div className="sandbox-stage-viewport">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedMaterial.id}
                  src={selectedMaterial.renderImage}
                  alt={localize(selectedMaterial.name)}
                  className="sandbox-stage-image"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
              </AnimatePresence>

              {/* Lighting Temperature Filter Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  mixBlendMode: 'soft-light',
                  backgroundColor:
                    activeLighting === '2700K'
                      ? 'rgba(255, 180, 80, 0.22)'
                      : activeLighting === '3500K'
                      ? 'rgba(255, 230, 180, 0.14)'
                      : 'rgba(200, 230, 255, 0.16)',
                  transition: 'background-color 0.5s ease',
                }}
              />

              {/* Live Architectural Metadata HUD */}
              <div className="sandbox-hud-overlay">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="section-badge-dot" />
                  <span style={{ fontSize: '0.725rem', fontFamily: 'monospace', color: '#FFFFFF', letterSpacing: '0.08em' }}>
                    SPEC: {localize(selectedMaterial.name)} • {activeLighting}
                  </span>
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                  CHATTOGRAM ATELIER RENDER 1:50
                </span>
              </div>
            </div>

            {/* Lighting Kelvin Selector Bar */}
            <div className="sandbox-lighting-strip">
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {language === 'bn' ? 'কালার টেম্পারেচার:' : 'Lighting Temperature:'}
              </span>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {(['2700K', '3500K', '4000K'] as const).map((k) => (
                  <button
                    key={k}
                    onClick={() => setActiveLighting(k)}
                    className={`lighting-kelvin-btn ${activeLighting === k ? 'active' : ''}`}
                  >
                    {k} {k === '2700K' ? '(Warm Golden)' : k === '3500K' ? '(Neutral)' : '(Daylight)'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Tactile Material Selector Board */}
          <div className="sandbox-swatch-board">
            <h4 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              {language === 'bn' ? 'ম্যাটেরিয়াল নির্বাচন করুন' : 'Architectural Finishes'}
            </h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              {language === 'bn'
                ? 'আপনার পছন্দের উপাদানে ক্লিক করে রিয়েল-টাইমে স্পেসের লুক দেখুন:'
                : 'Click on any finish to live-preview spatial materiality and tone:'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {materials.map((mat) => {
                const isSelected = selectedMaterial.id === mat.id;

                return (
                  <motion.div
                    key={mat.id}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`sandbox-swatch-card ${isSelected ? 'selected' : ''}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden',
                        flexShrink: 0,
                        border: '1px solid var(--border-medium)',
                      }}
                    >
                      <img
                        src={mat.texture}
                        alt={localize(mat.name)}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>

                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.06em' }}>
                          {localize(mat.category)}
                        </span>
                        {isSelected && <Check size={14} color="var(--accent-gold)" />}
                      </div>
                      <h5 style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {localize(mat.name)}
                      </h5>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                        {mat.hex} • Verified Sourcing
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Selected Spec Overview Box */}
            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', marginTop: '1.25rem', border: '1px solid var(--border-subtle)' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {localize(selectedMaterial.description)}
              </p>
            </div>

            {/* Inquire CTA Button */}
            <motion.button
              className="btn btn-gold"
              onClick={onOpenConsultation}
              style={{ width: '100%', marginTop: '1.25rem' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{language === 'bn' ? 'এই ফিনিশে কনসেপ্ট বুক করুন' : 'Inquire for Custom Interior'}</span>
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};
