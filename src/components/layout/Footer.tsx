import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Studio Monogram & Tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="wooden-monogram" style={{ width: '44px', height: '44px', fontSize: '1.2rem' }}>
                RI
              </span>
              <div>
                <span className="brand-name" style={{ fontSize: '1.6rem' }}>
                  {t.nav.brandName}
                </span>
                <p className="brand-sub" style={{ fontSize: '0.75rem', marginTop: '0.15rem' }}>
                  {t.nav.brandSub}
                </p>
              </div>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '340px', lineHeight: 1.7 }}>
              {t.footer.tagline}
            </p>
          </div>

          {/* Col 2: Studio Locations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
              {t.footer.studioLocations}
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {t.footer.dhakaStudio}
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {t.footer.londonStudio}
            </p>
          </div>

          {/* Col 3: Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
              {t.footer.quickLinks}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <a href="#projects" className="nav-link" style={{ alignSelf: 'flex-start' }}>
                {t.nav.projects}
              </a>
              <a href="#process" className="nav-link" style={{ alignSelf: 'flex-start' }}>
                {t.nav.process}
              </a>
              <a href="#materials" className="nav-link" style={{ alignSelf: 'flex-start' }}>
                {t.nav.materials}
              </a>
              <a href="#testimonials" className="nav-link" style={{ alignSelf: 'flex-start' }}>
                {t.nav.testimonials}
              </a>
            </div>
          </div>

          {/* Col 4: Newsletter / Journal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
              {t.footer.newsletterTitle}
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t.footer.newsletterSub}
            </p>

            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input
                type="email"
                required
                placeholder={t.footer.newsletterPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                style={{ padding: '0.65rem 1rem', fontSize: '0.85rem' }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: '0.65rem 1rem' }}
                aria-label="Subscribe"
              >
                <Send size={15} />
              </button>
            </form>

            {subscribed && (
              <p style={{ fontSize: '0.8rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Check size={14} />
                {t.footer.newsletterSuccess}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>{t.footer.rights} © {new Date().getFullYear()}</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="nav-link">
              Instagram
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="nav-link">
              Pinterest
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="nav-link">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
