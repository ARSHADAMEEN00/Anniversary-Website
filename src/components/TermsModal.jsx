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
          className="fixed inset-0 z-40 grid place-items-center bg-rosewood/45 px-4 py-8 backdrop-blur-sm dark:bg-black/55"
          role="dialog"
          aria-modal="true"
          aria-label="Marriage renewal terms and conditions"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 250, damping: 24 }}
            className="glass max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] p-5 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-pink-500 dark:text-pink-200">
                  Fine Print
                </p>
                <h2 className="mt-2 text-2xl font-black sm:text-3xl">Terms & Conditions</h2>
                <p className="mt-2 text-sm font-semibold text-rose-700/80 dark:text-pink-100/80">
                  Legally binding in the court of feelings, snacks, and dramatic eye contact.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/50 text-rose-600 transition hover:scale-105 dark:bg-white/10 dark:text-pink-50"
                aria-label="Close terms modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {sections.map(([title, terms]) => (
                <section
                  key={title}
                  className="rounded-[1.5rem] border border-white/50 bg-white/45 p-5 dark:border-white/10 dark:bg-white/5"
                >
                  <h3 className="font-black text-rose-700 dark:text-pink-100">{title}</h3>
                  <ul className="mt-4 space-y-3">
                    {terms.map((term) => (
                      <li key={term} className="flex gap-2 text-sm font-semibold leading-snug">
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
