import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface Hotspot {
  id: string;
  xPercent: number; // 0 to 100
  yPercent: number;
  label: { en: string; bn: string };
  spec: { en: string; bn: string };
  dimension: string;
}

interface ArchitecturalHotspotsProps {
  hotspots?: Hotspot[];
}

const defaultHotspots: Hotspot[] = [
  {
    id: 'hs-1',
    xPercent: 32,
    yPercent: 48,
    label: {
      en: 'Italian Navona Travertine Monolith',
      bn: 'ইতালীয় নাভোনা ট্রাভার্টাইন মনোলিথ'
    },
    spec: {
      en: 'Unfilled honed stone with bookmatched vein continuity (Tivoli Quarry)',
      bn: 'প্রাকৃতিক ইতালীয় ট্রাভার্টাইন মার্বেল ফিনিশ'
    },
    dimension: '6200mm × 1400mm'
  },
  {
    id: 'hs-2',
    xPercent: 74,
    yPercent: 35,
    label: {
      en: 'Acoustic Fluted Smoked Walnut',
      bn: 'ফ্লাটেড স্মোকড ওয়ালনাট উডওয়ার্ক'
    },
    spec: {
      en: '25mm vertical relief channels with moisture-resistant saline sealant',
      bn: 'শব্দ নিয়ন্ত্রণ ও আর্দ্রতারোধক কাস্টম কাঠের কাজ'
    },
    dimension: 'H: +5.80m FFL'
  },
  {
    id: 'hs-3',
    xPercent: 55,
    yPercent: 18,
    label: {
      en: 'Concealed 2700K Ambient Cove Vault',
      bn: 'হিডেন ২৭০০কে আর্কিটেকচারাল লাইটিং'
    },
    spec: {
      en: 'Recessed warm architectural lighting with DALI digital dimming',
      bn: 'সিলিংয়ে লুকানো অ্যাম্বিয়েন্ট মুড লাইটিং'
    },
    dimension: '90 CRI • 2700K'
  },
  {
    id: 'hs-4',
    xPercent: 82,
    yPercent: 72,
    label: {
      en: 'Custom Bouclé & Linen Lounge Seating',
      bn: 'অর্গানিক বুঁক্লে ও লিনেন লাউঞ্জ সোফা'
    },
    spec: {
      en: 'Tailor-made low-slung seating upholstered in Belgian flax wool',
      bn: 'হ্যান্ডমেড আরামদায়ক লাউঞ্জ সিটিং'
    },
    dimension: '3200mm × 1100mm'
  }
];

export const ArchitecturalHotspots: React.FC<ArchitecturalHotspotsProps> = ({
  hotspots = defaultHotspots,
}) => {
  const { localize } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'auto', zIndex: 10 }}>
      {hotspots.map((hs, index) => {
        const isActive = activeId === hs.id;

        return (
          <div
            key={hs.id}
            style={{
              position: 'absolute',
              left: `${hs.xPercent}%`,
              top: `${hs.yPercent}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: isActive ? 20 : 10,
            }}
          >
            {/* Pulsing Hotspot Trigger Pin */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setActiveId(isActive ? null : hs.id);
              }}
              className="architectural-hotspot-pin"
              aria-label={`Inspect material: ${localize(hs.label)}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="hotspot-pulse-wave" />
              <span className="hotspot-center-dot">0{index + 1}</span>
            </motion.button>

            {/* Architectural Callout Card */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  className="hotspot-callout-card"
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 8 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.675rem', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 700, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Compass size={11} /> Material Spec 0{index + 1}
                    </span>
                    <span style={{ fontSize: '0.675rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                      {hs.dimension}
                    </span>
                  </div>

                  <h5 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem', lineHeight: 1.3 }}>
                    {localize(hs.label)}
                  </h5>

                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '0.4rem' }}>
                    {localize(hs.spec)}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.35rem' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                      Khulshi Atelier Spec
                    </span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                      Verified ✓
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
