import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenConsultation,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const phoneNumber = '8801825334505';
  const encodedMessage = encodeURIComponent(t.whatsapp.greeting);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Architectural Brand Monogram & Title */}
        <a href="#" className="brand-logo" onClick={closeMobileMenu}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span className="wooden-monogram">RI</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="brand-name">{t.nav.brandName}</span>
              <span className="brand-sub">{t.nav.brandSub}</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-links">
          <a href="#projects" className="nav-link">
            {t.nav.projects}
          </a>
          <a href="#process" className="nav-link">
            {t.nav.process}
          </a>
          <a href="#materials" className="nav-link">
            {t.nav.materials}
          </a>
          <a href="#testimonials" className="nav-link">
            {t.nav.testimonials}
          </a>
        </nav>

        {/* Header Actions (Language, WhatsApp, Theme, Consultation CTA) */}
        <div className="nav-actions">
          {/* Bilingual Language Switcher */}
          <div className="pill-toggle" title="Switch Language / ভাষা পরিবর্তন করুন">
            <button
              className={`pill-option ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <button
              className={`pill-option ${language === 'bn' ? 'active' : ''}`}
              onClick={() => setLanguage('bn')}
            >
              বাংলা
            </button>
          </div>

          {/* WhatsApp Direct Link Button in Navbar */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-whatsapp-btn"
            title={t.whatsapp.tooltip}
            aria-label="Chat on WhatsApp (01825334505)"
          >
            <svg
              width="18"
              height="18"
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
            <span className="navbar-whatsapp-label">{t.nav.whatsapp}</span>
          </a>

          {/* Theme Mode Toggle */}
          <button
            className="icon-btn"
            onClick={onToggleTheme}
            title={theme === 'light' ? t.theme.darkMode : t.theme.lightMode}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>

          {/* Book Consultation CTA Button */}
          <button
            className="btn btn-primary"
            style={{ display: 'none', padding: '0.65rem 1.35rem', fontSize: '0.825rem' }}
            onClick={onOpenConsultation}
            id="desktop-consultation-btn"
          >
            <span>{t.nav.consultation}</span>
            <ArrowUpRight size={14} />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          #desktop-consultation-btn {
            display: inline-flex !important;
          }
        }
      `}</style>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <a href="#projects" className="mobile-nav-link" onClick={closeMobileMenu}>
            {t.nav.projects}
          </a>
          <a href="#process" className="mobile-nav-link" onClick={closeMobileMenu}>
            {t.nav.process}
          </a>
          <a href="#materials" className="mobile-nav-link" onClick={closeMobileMenu}>
            {t.nav.materials}
          </a>
          <a href="#testimonials" className="mobile-nav-link" onClick={closeMobileMenu}>
            {t.nav.testimonials}
          </a>

          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              <svg
                width="18"
                height="18"
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
              <span>{t.nav.whatsapp} (01825334505)</span>
            </a>

            <button
              className="btn btn-gold"
              style={{ width: '100%' }}
              onClick={() => {
                closeMobileMenu();
                onOpenConsultation();
              }}
            >
              <span>{t.nav.consultation}</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
