import React, { useState } from 'react';
import { Copy, Check, Layers } from 'lucide-react';
import type { PaletteColor, MaterialItem } from '../../types/project';
import { useLanguage } from '../../context/LanguageContext';

interface MaterialPaletteProps {
  palette: PaletteColor[];
  materials: MaterialItem[];
}

export const MaterialPalette: React.FC<MaterialPaletteProps> = ({ palette, materials }) => {
  const { localize, t } = useLanguage();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Color Palette Section */}
      {palette && palette.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-gold)' }}></span>
            <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)' }}>{t.modal.colorPalette}</h4>
          </div>

          <div className="palette-chips-grid">
            {palette.map((color, idx) => (
              <div key={idx} className="palette-chip">
                <div
                  className="palette-color-block"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="palette-info">
                  <span className="palette-name">{localize(color.name)}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    {localize(color.role)}
                  </span>
                  <button
                    onClick={() => handleCopyHex(color.hex)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.2rem 0.5rem',
                      cursor: 'pointer',
                      fontSize: '0.725rem',
                      fontFamily: 'monospace',
                      color: 'var(--text-primary)',
                      marginTop: 'auto'
                    }}
                    title="Click to copy HEX code"
                  >
                    <span>{color.hex}</span>
                    {copiedHex === color.hex ? (
                      <Check size={12} color="#10B981" />
                    ) : (
                      <Copy size={12} color="var(--text-muted)" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Materials & Textures Section */}
      {materials && materials.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Layers size={16} color="var(--accent-gold)" />
            <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)' }}>{t.modal.materialCuration}</h4>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {materials.map((mat, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {mat.texture && (
                  <div style={{ height: '140px', overflow: 'hidden' }}>
                    <img
                      src={mat.texture}
                      alt={localize(mat.name)}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </div>
                )}
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                    {localize(mat.category)}
                  </span>
                  <h5 style={{ fontSize: '1.05rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
                    {localize(mat.name)}
                  </h5>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {localize(mat.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
