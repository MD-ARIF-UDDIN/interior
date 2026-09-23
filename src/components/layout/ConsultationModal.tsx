import React, { useState } from 'react';
import { X, CheckCircle, Home, Building2, Coffee, Hotel, ArrowRight, ArrowLeft, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../context/LanguageContext';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Form State
  const [projectType, setProjectType] = useState<string>('residential');
  const [areaSqFt, setAreaSqFt] = useState<number>(3000);
  const [stylePreference, setStylePreference] = useState<string>('japandi');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B68E56', '#FAF8F5', '#191716'],
      });
    }, 1200);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setStep(1);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose}>
        <motion.div
          className="modal-dialog"
          style={{ maxWidth: '720px' }}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="modal-header">
            <div>
              <span className="section-badge" style={{ marginBottom: '0.4rem' }}>
                <span className="section-badge-dot" />
                <span>{t.consultation.badge}</span>
              </span>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)' }}>
                {t.consultation.title}
              </h3>
            </div>
            <button className="icon-btn" onClick={onClose} aria-label={t.modal.close}>
              <X size={20} />
            </button>
          </div>

          <div className="modal-body" style={{ padding: '2rem' }}>
            {isSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--accent-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)' }}>
                  <CheckCircle size={36} />
                </div>
                <h4 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)' }}>
                  {t.consultation.successTitle}
                </h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '480px', lineHeight: 1.7 }}>
                  {t.consultation.successDesc}
                </p>
                <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', width: '100%', maxWidth: '440px', textAlign: 'left', fontSize: '0.85rem' }}>
                  <p><strong>Space Type:</strong> {projectType}</p>
                  <p><strong>Area:</strong> {areaSqFt} sq ft</p>
                  <p><strong>Style:</strong> {stylePreference}</p>
                  <p><strong>Contact:</strong> {fullName} ({phone || email})</p>
                </div>
                <button className="btn btn-primary" onClick={handleReset} style={{ marginTop: '1rem' }}>
                  {t.consultation.closeBtn}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Stepper Indicator */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: step >= 1 ? 600 : 400, color: step >= 1 ? 'var(--accent-gold)' : 'var(--text-muted)' }}>
                    {t.consultation.step1}
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: step >= 2 ? 600 : 400, color: step >= 2 ? 'var(--accent-gold)' : 'var(--text-muted)' }}>
                    {t.consultation.step2}
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: step >= 3 ? 600 : 400, color: step >= 3 ? 'var(--accent-gold)' : 'var(--text-muted)' }}>
                    {t.consultation.step3}
                  </span>
                </div>

                {/* STEP 1: Project Type Selection */}
                {step === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <label className="form-label">{t.consultation.selectTypeLabel}</label>
                    <div className="choice-grid">
                      <div
                        className={`choice-tile ${projectType === 'residential' ? 'selected' : ''}`}
                        onClick={() => setProjectType('residential')}
                      >
                        <Home size={22} />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.consultation.typeResidential}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Apartments, Duplexes</div>
                        </div>
                      </div>

                      <div
                        className={`choice-tile ${projectType === 'penthouse' ? 'selected' : ''}`}
                        onClick={() => setProjectType('penthouse')}
                      >
                        <Building2 size={22} />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.consultation.typePenthouse}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Sky Mansions & Villas</div>
                        </div>
                      </div>

                      <div
                        className={`choice-tile ${projectType === 'commercial' ? 'selected' : ''}`}
                        onClick={() => setProjectType('commercial')}
                      >
                        <Coffee size={22} />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.consultation.typeCommercial}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Boutique Offices & Studios</div>
                        </div>
                      </div>

                      <div
                        className={`choice-tile ${projectType === 'hospitality' ? 'selected' : ''}`}
                        onClick={() => setProjectType('hospitality')}
                      >
                        <Hotel size={22} />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.consultation.typeHospitality}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Cafes, Lounges & Resorts</div>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setStep(2)}
                      >
                        <span>{t.consultation.nextStep}</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Space & Style */}
                {step === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="form-group">
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <label className="form-label">{t.consultation.areaLabel}</label>
                        <span style={{ fontWeight: 600, color: 'var(--accent-gold)' }}>
                          {areaSqFt.toLocaleString()} sq ft
                        </span>
                      </div>
                      <input
                        type="range"
                        min="800"
                        max="15000"
                        step="200"
                        value={areaSqFt}
                        onChange={(e) => setAreaSqFt(Number(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--accent-gold)' }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        <span>800 sq ft</span>
                        <span>5,000 sq ft</span>
                        <span>15,000+ sq ft</span>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">{t.consultation.styleLabel}</label>
                      <select
                        className="form-select"
                        value={stylePreference}
                        onChange={(e) => setStylePreference(e.target.value)}
                      >
                        <option value="japandi">{t.consultation.styleJapandi}</option>
                        <option value="contemporary">{t.consultation.styleContemporary}</option>
                        <option value="industrial">{t.consultation.styleIndustrial}</option>
                        <option value="classic">{t.consultation.styleClassic}</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => setStep(1)}
                      >
                        <ArrowLeft size={16} />
                        <span>{t.consultation.prevStep}</span>
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setStep(3)}
                      >
                        <span>{t.consultation.nextStep}</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Contact & Message */}
                {step === 3 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">{t.consultation.nameLabel} *</label>
                        <input
                          type="text"
                          required
                          placeholder={t.consultation.namePlaceholder}
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">{t.consultation.phoneLabel} *</label>
                        <input
                          type="tel"
                          required
                          placeholder={t.consultation.phonePlaceholder}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">{t.consultation.emailLabel} *</label>
                      <input
                        type="email"
                        required
                        placeholder={t.consultation.emailPlaceholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">{t.consultation.messageLabel}</label>
                      <textarea
                        placeholder={t.consultation.messagePlaceholder}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="form-textarea"
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => setStep(2)}
                        disabled={isSubmitting}
                      >
                        <ArrowLeft size={16} />
                        <span>{t.consultation.prevStep}</span>
                      </button>
                      <button
                        type="submit"
                        className="btn btn-gold"
                        disabled={isSubmitting}
                      >
                        <Send size={15} />
                        <span>
                          {isSubmitting ? t.consultation.submitting : t.consultation.submitBtn}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
