import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard.jsx';
import MusicToggle from '../components/MusicToggle.jsx';
import PageShell from '../components/PageShell.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import TermsModal from '../components/TermsModal.jsx';
import { renewalBenefits } from '../data/couple.js';
import { startRomanticMusic, stopRomanticMusic } from '../hooks/useAudio.js';
import { launchConfetti, launchFireworks } from '../utils/confetti.js';

export default function CeremonyPage() {
  const navigate = useNavigate();
  const [termsOpen, setTermsOpen] = useState(false);

  useEffect(() => {
    launchConfetti();
    launchFireworks();

    void startRomanticMusic();

    return () => stopRomanticMusic(true);
  }, []);

  return (
    <PageShell className="grid place-items-center">
      {/* Floating hearts background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 18 }, (_, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 80, scale: 0.6 }}
            animate={{ opacity: [0, 1, 0], y: [-20, -180 - index * 4], scale: [0.6, 1.1, 0.8] }}
            transition={{ duration: 5 + (index % 4), delay: index * 0.22, repeat: Infinity }}
            className="absolute text-2xl"
            style={{ left: `${(index * 29) % 100}%`, bottom: `${(index * 7) % 30}%` }}
          >
            💖
          </motion.span>
        ))}
      </div>

      {/* MusicToggle — floats top-right, doesn't affect layout flow */}
      <div className="absolute right-4 top-4 z-20 md:right-6 md:top-6">
        <MusicToggle />
      </div>

      <div className="w-full max-w-5xl">
        <GlassCard className="overflow-hidden p-5 text-center sm:p-7 md:p-8">
          {/* Ring icon */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 180, damping: 14 }}
            className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-lightBlue-400 to-lightBlue-800 text-4xl text-white shadow-glow md:h-20 md:w-20"
          >
            💍
          </motion.div>

          <p className="mt-4 text-xs font-black uppercase tracking-[0.34em] text-lightBlue-900 dark:text-lightBlue-200 md:mt-5">
            Marriage Renewal Ceremony
          </p>
          <h1 className="mx-auto mt-2 max-w-4xl text-3xl font-black leading-tight sm:text-5xl md:text-[2.6rem]">
            Marriage Contract Successfully Renewed
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-lightBlue-950/75 dark:text-lightBlue-100/80 md:mt-4">
            Congratulations! After careful review and extensive emotional auditing, both parties
            have agreed to continue:
          </p>

          {/* Benefits grid */}
          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 md:mt-6">
            {renewalBenefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.07 }}
                className="rounded-3xl border border-white/50 bg-white/45 p-3 text-left text-sm font-black shadow-sm dark:border-white/10 dark:bg-white/5 md:p-4"
              >
                <span className="mr-2 text-emerald-500">✔</span>
                {benefit}
              </motion.div>
            ))}
          </div>

          {/* Validity */}
          <div className="validity-row mx-auto mt-5 flex max-w-sm items-center justify-between gap-4 rounded-2xl px-4 py-3 md:mt-6">
            <div className="text-left">
              <p className="validity-label text-[0.65rem] font-black uppercase tracking-[0.24em]">
                Validity
              </p>
              <p className="validity-value mt-0.5 text-lg font-black">Forever</p>
            </div>
            <span className="validity-mark grid h-10 w-10 shrink-0 place-items-center rounded-full text-xl">
              ∞
            </span>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row md:mt-7">
            <PrimaryButton onClick={() => navigate('/certificate')} className="w-full sm:w-auto">
              Accept Renewal
            </PrimaryButton>
            <PrimaryButton
              variant="secondary"
              icon={<ScrollText size={18} />}
              onClick={() => setTermsOpen(true)}
              className="w-full sm:w-auto"
            >
              Read Terms &amp; Conditions
            </PrimaryButton>
          </div>
        </GlassCard>
      </div>

      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
    </PageShell>
  );
}
