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
import { launchConfetti, launchFireworks } from '../utils/confetti.js';

export default function CeremonyPage() {
  const navigate = useNavigate();
  const [termsOpen, setTermsOpen] = useState(false);

  useEffect(() => {
    launchConfetti();
    launchFireworks();
  }, []);

  return (
    <PageShell className="grid place-items-center">
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

      <div className="w-full max-w-5xl">
        <div className="mb-5 flex justify-center">
          <MusicToggle />
        </div>

        <GlassCard className="overflow-hidden p-6 text-center sm:p-10">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 180, damping: 14 }}
            className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-500 text-5xl text-white shadow-glow"
          >
            💍
          </motion.div>

          <p className="mt-7 text-sm font-black uppercase tracking-[0.34em] text-pink-500 dark:text-pink-200">
            Marriage Renewal Ceremony
          </p>
          <h1 className="mx-auto mt-3 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
            Marriage Contract Successfully Renewed
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base font-semibold leading-relaxed text-rose-800/75 dark:text-pink-100/80">
            Congratulations! After careful review and extensive emotional auditing, both parties
            have agreed to continue:
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {renewalBenefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.07 }}
                className="rounded-3xl border border-white/50 bg-white/45 p-4 text-left font-black shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <span className="mr-2 text-emerald-500">✔</span>
                {benefit}
              </motion.div>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-sm rounded-[2rem] border border-gold/40 bg-gradient-to-br from-amber-50/70 to-pink-50/70 p-5 shadow-gold dark:from-amber-200/10 dark:to-pink-200/10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">Validity</p>
            <p className="mt-2 text-4xl font-black">Forever ♾️</p>
          </div>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <PrimaryButton onClick={() => navigate('/certificate')} className="w-full sm:w-auto">
              Accept Renewal
            </PrimaryButton>
            <PrimaryButton
              variant="secondary"
              icon={<ScrollText size={18} />}
              onClick={() => setTermsOpen(true)}
              className="w-full sm:w-auto"
            >
              Read Terms & Conditions
            </PrimaryButton>
          </div>
        </GlassCard>
      </div>

      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
    </PageShell>
  );
}
