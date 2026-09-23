import React from 'react';
import { Sun, Sunset, Moon, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export type LightingMood = 'dawn' | 'golden' | 'dusk' | 'blueprint';

interface AmbientLightingControllerProps {
  currentMood: LightingMood;
  onSelectMood: (mood: LightingMood) => void;
}

export const AmbientLightingController: React.FC<AmbientLightingControllerProps> = ({
  currentMood,
  onSelectMood,
}) => {
  const { language } = useLanguage();

  const moods: Array<{
    id: LightingMood;
    icon: React.ReactNode;
    fullName: { en: string; bn: string };
    shortName: { en: string; bn: string };
    kelvin: string;
  }> = [
    {
      id: 'dawn',
      icon: <Sun size={13} />,
      fullName: { en: 'Dawn (3000K)', bn: 'ভোর (৩০০০K)' },
      shortName: { en: 'Dawn', bn: 'ভোর' },
      kelvin: '3000K',
    },
    {
      id: 'golden',
      icon: <Sunset size={13} />,
      fullName: { en: 'Golden (2700K)', bn: 'গোল্ডেন (২৭০০K)' },
      shortName: { en: 'Golden', bn: 'গোল্ডেন' },
      kelvin: '2700K',
    },
    {
      id: 'dusk',
      icon: <Moon size={13} />,
      fullName: { en: 'Noir (2200K)', bn: 'ভেলভেট (২২০০K)' },
      shortName: { en: 'Noir', bn: 'ভেলভেট' },
      kelvin: '2200K',
    },
    {
      id: 'blueprint',
      icon: <Compass size={13} />,
      fullName: { en: 'CAD 1:50', bn: 'CAD ব্লুপ্রিন্ট' },
      shortName: { en: 'CAD', bn: 'CAD' },
      kelvin: 'CAD 1:50',
    },
  ];

  return (
    <div className="ambient-lighting-bar" title="Interior Ambient Lighting Tuner">
      <span className="lighting-bar-label">
        <span className="lighting-indicator-dot" />
        <span className="lighting-bar-title">
          {language === 'bn' ? 'লাইটিং:' : 'Spatial Light:'}
        </span>
      </span>

      <div className="lighting-options-group">
        {moods.map((m) => {
          const isActive = currentMood === m.id;

          return (
            <motion.button
              key={m.id}
              onClick={() => onSelectMood(m.id)}
              className={`lighting-option-pill ${isActive ? 'active' : ''}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {m.icon}
              <span className="lighting-text-full">{m.fullName[language] || m.fullName.en}</span>
              <span className="lighting-text-short">{m.shortName[language] || m.shortName.en}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

