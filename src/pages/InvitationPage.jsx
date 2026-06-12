import { motion } from 'framer-motion';
import { ArrowRight, CalendarHeart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard.jsx';
import MemoryGallery from '../components/MemoryGallery.jsx';
import PageShell from '../components/PageShell.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import Typewriter from '../components/Typewriter.jsx';
import VideoReels from '../components/VideoReels.jsx';
import { couple, survivalIncidents } from '../data/couple.js';
import { getYearsTogether } from '../utils/date.js';

export default function InvitationPage() {
  const navigate = useNavigate();
  const yearsTogether = getYearsTogether(couple.weddingDate);

  return (
    <PageShell className="!h-auto !min-h-screen py-12 md:!h-auto md:py-16">
      <div className="w-full">
        <section className="grid w-full items-center gap-10 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-2 text-sm font-extrabold text-lightBlue-900 shadow-lg backdrop-blur-xl dark:border-lightBlue-200/15 dark:bg-lightBlue-900/20 dark:text-lightBlue-100">
              <CalendarHeart size={18} />
              {yearsTogether}+ years of legally adorable chaos
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-lightBlue-950 dark:text-lightBlue-50 sm:text-7xl">
              Marriage Contract Renewal Notice
            </h1>

            <p className="mt-6 max-w-xl text-lg font-semibold leading-relaxed text-lightBlue-950/80 dark:text-lightBlue-100/80">
              <Typewriter text="Dear Wife, your annual love subscription review is ready." />
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.18, ease: 'easeOut' }}
            className="relative"
          >
            <div className="absolute -left-5 -top-5 hidden h-24 w-24 animate-sparkle rounded-full bg-lightBlue-200/60 blur-2xl sm:block" />
            <div className="absolute -bottom-6 -right-3 hidden h-32 w-32 animate-sparkle rounded-full bg-cyan-200/60 blur-2xl [animation-delay:1.2s] sm:block" />

            <GlassCard className="relative overflow-hidden p-6 sm:p-8">
              <div className="absolute right-6 top-6 text-3xl opacity-40">✨</div>
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-lightBlue-200/55 blur-3xl dark:bg-lightBlue-700/25" />
              <div className="relative z-10">
                <p className="text-sm font-black uppercase tracking-[0.28em] text-lightBlue-900 dark:text-lightBlue-200">
                  Official Portal
                </p>
                <h2 className="mt-3 text-2xl font-black sm:text-3xl">Dear Wife, Munnu</h2>
                <p className="mt-4 font-semibold leading-relaxed text-lightBlue-950/80 dark:text-lightBlue-100/85">
                  Our previous marriage contract has successfully survived:
                </p>

                <ul className="mt-5 space-y-3">
                  {survivalIncidents.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + index * 0.08 }}
                      className="flex items-center gap-3 rounded-2xl border border-white/50 bg-white/45 px-4 py-3 font-bold shadow-sm dark:border-white/10 dark:bg-white/5"
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-lightBlue-100 text-sm dark:bg-lightBlue-900/60">
                        💗
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>

                <p className="mt-6 rounded-3xl border border-lightBlue-200/80 bg-lightBlue-50/70 p-4 text-sm font-bold leading-relaxed text-lightBlue-950 dark:border-lightBlue-200/15 dark:bg-lightBlue-300/10 dark:text-lightBlue-50">
                  According to <span className="blue-text">{couple.contractSection}</span>, your
                  marriage agreement has reached its annual renewal date.
                </p>

                <p className="mt-4 text-sm font-semibold text-lightBlue-900/80 dark:text-lightBlue-100/75">
                  Please proceed with the renewal process.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <PrimaryButton onClick={() => navigate('/timeline')} className="w-full sm:w-auto">
                    Renew Contract
                  </PrimaryButton>
                  <button
                    type="button"
                    onClick={() => window.alert('Secret note unlocked: I still get excited when your name lights up my phone. ❤️')}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold text-lightBlue-800 transition hover:bg-white/40 dark:text-lightBlue-100"
                  >
                    <Sparkles size={17} />
                    Section 143
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-16 w-full max-w-5xl border-t border-lightBlue-300/20 pt-10 lg:mt-24 lg:pt-14"
        >
          <MemoryGallery />
          <VideoReels />
        </motion.section>
      </div>
    </PageShell>
  );
}
