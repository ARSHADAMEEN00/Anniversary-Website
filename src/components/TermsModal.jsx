import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { contractTerms } from '../data/couple.js';
import PrimaryButton from './PrimaryButton.jsx';

const sections = [
  ['Wife Rights', contractTerms.wifeRights],
  ['Husband Rights', contractTerms.husbandRights],
  ['Joint Responsibilities', contractTerms.jointResponsibilities],
];

export default function TermsModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 grid place-items-center px-4 py-8"
          style={{ background: 'rgba(44,26,14,0.62)', backdropFilter: 'blur(8px)' }}
          role="dialog"
          aria-modal="true"
          aria-label="Marriage renewal terms and conditions"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 250, damping: 24 }}
            className="glass max-h-[88vh] w-full max-w-3xl overflow-y-auto p-5 sm:p-7"
            style={{ borderRadius: 4 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.3em',
                    color: '#C9963A',
                  }}
                >
                  Fine Print
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    color: '#2C1A0E',
                    marginTop: 6,
                  }}
                >
                  Terms &amp; Conditions
                </h2>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic',
                    fontSize: '0.9rem',
                    color: 'rgba(61,35,20,0.72)',
                    marginTop: 6,
                  }}
                >
                  Legally binding in the court of feelings, snacks, and dramatic eye contact.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full transition hover:scale-105"
                style={{ background: 'rgba(201,150,58,0.12)', color: '#2C1A0E' }}
                aria-label="Close terms modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Gold divider */}
            <div
              style={{
                width: '100%',
                height: 1,
                background: 'linear-gradient(to right, transparent, rgba(201,150,58,0.4), transparent)',
                margin: '20px 0',
              }}
            />

            <div className="grid gap-4 md:grid-cols-3">
              {sections.map(([title, terms]) => (
                <section
                  key={title}
                  className="p-5"
                  style={{
                    border: '1px solid rgba(201,150,58,0.22)',
                    background: 'rgba(253,248,242,0.7)',
                    borderRadius: 2,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: 'italic',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#2C1A0E',
                    }}
                  >
                    {title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {terms.map((term) => (
                      <li key={term} className="flex gap-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', lineHeight: 1.55, color: '#3D2314' }}>
                        <span>💕</span>
                        <span>{term}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <div className="mt-7 text-center">
              <PrimaryButton onClick={onClose} className="w-full sm:w-auto">
                I Agree ❤️
              </PrimaryButton>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
