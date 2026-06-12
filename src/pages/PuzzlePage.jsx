import { useEffect, useMemo, useState } from 'react';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  SortableContext,
} from '@dnd-kit/sortable';
import { motion } from 'framer-motion';
import {
  Check,
  ChevronLeft,
  Heart,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell.jsx';
import SortableMemoryCard from '../components/SortableMemoryCard.jsx';
import { couple, relationshipMoments } from '../data/couple.js';
import { useSuccessSound } from '../hooks/useAudio.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { shuffleArray } from '../utils/shuffle.js';

const verificationAnswers = [
  { id: 'wife', label: couple.wifeName, detail: 'Lifetime VIP and favorite person' },
  { id: 'remote', label: 'The TV remote', detail: 'Important, but not this important' },
  { id: 'biryani', label: 'The last biryani serving', detail: 'A tempting but incorrect choice' },
  { id: 'charger', label: 'The missing charger', detail: 'Still missing, still not the answer' },
];

const timelineMoments = relationshipMoments.slice(0, 6);

export default function PuzzlePage() {
  const navigate = useNavigate();
  const playSuccessSound = useSuccessSound();
  const [, setCompletionStored] = useLocalStorage('timeline-puzzle-complete', false);
  const [moments, setMoments] = useState(() => shuffleArray(timelineMoments));
  const [stage, setStage] = useState('timeline');
  const [timelineFeedback, setTimelineFeedback] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [completed, setCompleted] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const correctCount = useMemo(
    () => moments.filter((moment, index) => moment.id === timelineMoments[index].id).length,
    [moments],
  );

  useEffect(() => {
    if (!completed) return undefined;

    const timer = window.setTimeout(() => navigate('/ceremony', { replace: true }), 1900);
    return () => window.clearTimeout(timer);
  }, [completed, navigate]);

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id || stage !== 'timeline') return;

    setMoments((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
    setTimelineFeedback(null);
  };

  const resetPuzzle = () => {
    setStage('timeline');
    setTimelineFeedback(null);
    setSelectedAnswer('');
    setAnswerFeedback(null);
    setCompleted(false);
    setCompletionStored(false);
    setMoments(shuffleArray(timelineMoments));
  };

  const verifyTimeline = () => {
    if (correctCount === timelineMoments.length) {
      setTimelineFeedback(null);
      setStage('question');
      return;
    }

    setTimelineFeedback({
      type: 'error',
      message: `${correctCount} of ${timelineMoments.length} memories are in the right position. Keep arranging.`,
    });
  };

  const verifyAnswer = () => {
    if (!selectedAnswer) {
      setAnswerFeedback({ type: 'error', message: 'Choose one answer before verifying.' });
      return;
    }

    if (selectedAnswer !== 'wife') {
      setAnswerFeedback({
        type: 'error',
        message: 'That answer failed the love-story check. Try the most obvious favorite person.',
      });
      return;
    }

    setAnswerFeedback(null);
    setCompletionStored(true);
    setCompleted(true);
    playSuccessSound();
  };

  return (
    <PageShell className="!h-auto !min-h-screen py-16 md:!h-screen md:py-4">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-4 px-5 text-center">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.32em] text-lightBlue-900 dark:text-lightBlue-200">
            Love Story Security Check
          </p>
          {stage === 'timeline' ? (
            <h1 className="mt-1.5 text-2xl font-black tracking-tight sm:text-4xl">
              Prove you belong in this timeline.
            </h1>
          ) : null}
          <p className="mx-auto mt-1.5 max-w-xl text-sm font-semibold text-lightBlue-950/65 dark:text-lightBlue-100/65">
            Complete both verification steps to unlock the renewal ceremony.
          </p>
        </div>

        <div className="light-surface overflow-hidden rounded-[1.4rem] border border-lightBlue-200/80 bg-[#fafdff] shadow-[0_24px_70px_rgba(2,119,189,0.24)] dark:border-lightBlue-200/40">
          {stage === 'timeline' ? (
            <>
              <div className="blue-panel-header relative overflow-hidden px-5 py-5 text-left sm:px-7 sm:py-6">
                <div className="absolute -right-12 -top-14 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-16 left-1/3 h-32 w-32 rounded-full bg-lightBlue-200/20 blur-2xl" />
                <div className="relative flex items-start gap-3">
                  <span className="mt-0.5 hidden h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/20 bg-white/10 sm:grid">
                    <Sparkles size={20} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-lightBlue-100">Arrange every memory in</p>
                    <h2 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl">
                      chronological order
                    </h2>
                    <p className="mt-1 text-xs text-lightBlue-100/85 sm:text-sm">
                      Drag the photo tiles into the correct sequence.
                    </p>
                  </div>
                </div>
              </div>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={moments.map((moment) => moment.id)}
                  strategy={rectSortingStrategy}
                >
                  <div className="grid grid-cols-3 gap-1 bg-lightBlue-50 p-1">
                    {moments.map((moment, index) => (
                      <SortableMemoryCard
                        key={moment.id}
                        moment={moment}
                        position={index + 1}
                        isCorrect={moment.id === timelineMoments[index].id}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>

              <div className="border-t border-lightBlue-100 bg-gradient-to-b from-white to-lightBlue-50/70 px-4 py-3.5 text-lightBlue-950 sm:px-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-1 text-lightBlue-900/65">
                    <button
                      type="button"
                      onClick={resetPuzzle}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl transition hover:bg-lightBlue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightBlue-500"
                      aria-label="Shuffle the timeline again"
                    >
                      <RotateCcw size={20} />
                    </button>
                    <p className="truncate text-xs font-extrabold sm:text-sm">
                      {correctCount}/{timelineMoments.length} in place
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={verifyTimeline}
                    className="blue-action-button shrink-0 rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-[0.08em] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightBlue-500 focus-visible:ring-offset-2 sm:px-6 sm:text-sm"
                  >
                    Verify order
                  </button>
                </div>

                {timelineFeedback ? (
                  <p
                    className="mt-3 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700"
                    role="status"
                  >
                    {timelineFeedback.message}
                  </p>
                ) : (
                  <p className="mt-2 text-xs font-medium text-lightBlue-900/55">
                    A small green tick marks each correctly placed memory.
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="blue-panel-header relative overflow-hidden px-5 py-5 text-left sm:px-7 sm:py-6">
                <div className="absolute -right-12 -top-14 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-16 left-1/3 h-32 w-32 rounded-full bg-lightBlue-200/20 blur-2xl" />
                <div className="relative">
                  <p className="text-sm font-medium text-lightBlue-100">Final verification</p>
                  <h2 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl">
                    Pick the correct answer
                  </h2>
                  <p className="mt-1 text-xs text-lightBlue-100/85 sm:text-sm">
                    One last check before the ceremony can begin.
                  </p>
                </div>
              </div>

              <div className="p-4 text-lightBlue-950 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-lightBlue-100 text-lightBlue-950">
                    <ShieldCheck size={20} />
                  </span>
                  <div>
                    <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-lightBlue-900/55">
                      Question 1 of 1
                    </p>
                    <h2 className="mt-1 text-lg font-black leading-snug sm:text-xl">
                      Who receives lifetime VIP status in this renewal?
                    </h2>
                  </div>
                </div>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                  {verificationAnswers.map((answer) => {
                    const selected = selectedAnswer === answer.id;

                    return (
                      <label
                        key={answer.id}
                        className={`answer-option relative flex min-h-[4.5rem] items-center gap-3 rounded-xl p-3 text-left transition duration-200 ${
                          selected ? 'answer-option-selected' : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name="renewal-vip"
                          value={answer.id}
                          checked={selected}
                          onChange={() => {
                            setSelectedAnswer(answer.id);
                            setAnswerFeedback(null);
                          }}
                          className="answer-radio"
                        />
                        <span
                          className={`answer-check grid h-7 w-7 shrink-0 place-items-center rounded-lg transition ${
                            selected ? 'answer-check-selected' : ''
                          }`}
                        >
                          <Check size={16} strokeWidth={3} />
                        </span>
                        <span>
                          <span className="block text-sm font-black text-lightBlue-950">
                            {answer.label}
                          </span>
                          <span className="mt-0.5 block text-xs leading-snug text-slate-500">
                            {answer.detail}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>

                {answerFeedback ? (
                  <p
                    className="mt-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700"
                    role="status"
                  >
                    {answerFeedback.message}
                  </p>
                ) : null}
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-lightBlue-100 bg-gradient-to-b from-white to-lightBlue-50/70 px-4 py-3.5 text-lightBlue-950 sm:px-5">
                <button
                  type="button"
                  onClick={() => {
                    setStage('timeline');
                    setSelectedAnswer('');
                    setAnswerFeedback(null);
                  }}
                  className="flex shrink-0 items-center gap-1 px-1 py-2 text-sm font-extrabold text-lightBlue-900/70 transition hover:text-lightBlue-950"
                >
                  <ChevronLeft size={18} />
                  Timeline
                </button>
                <button
                  type="button"
                  onClick={verifyAnswer}
                  className="blue-action-button rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-[0.08em] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightBlue-500 focus-visible:ring-offset-2 sm:px-6 sm:text-sm"
                >
                  Verify answer
                </button>
              </div>
            </>
          )}
        </div>

        <p className="mt-4 px-4 text-center text-[0.62rem] font-bold uppercase tracking-[0.16em] text-lightBlue-900/45 dark:text-lightBlue-100/40 sm:text-xs">
          Private portal verification | {couple.husbandName} + {couple.wifeName}
        </p>
      </div>

      {completed ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-30 grid place-items-center bg-lightBlue-950/70 px-4 backdrop-blur-md"
          role="status"
          aria-live="polite"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="ceremony-loader-card w-full max-w-sm rounded-[2rem] p-8 text-center shadow-2xl"
          >
            <div className="relative mx-auto grid h-28 w-28 place-items-center">
              <motion.span
                animate={{ opacity: [0.5, 0], scale: [0.75, 1.35] }}
                transition={{ duration: 1.15, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full border-2 border-lightBlue-400"
              />
              <motion.span
                animate={{ opacity: [0.35, 0], scale: [0.65, 1.15] }}
                transition={{ duration: 1.15, delay: 0.18, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full bg-lightBlue-200/60"
              />
              <motion.div
                animate={{ scale: [1, 1.24, 1, 1.14, 1] }}
                transition={{ duration: 1.15, repeat: Infinity, ease: 'easeInOut' }}
                className="ceremony-loader-heart relative grid h-20 w-20 place-items-center rounded-full"
              >
                <Heart size={45} fill="currentColor" strokeWidth={2.3} />
              </motion.div>
            </div>

            <h2 className="ceremony-loader-title mt-5 text-2xl font-black">
              Love verified
            </h2>
            <p className="ceremony-loader-copy mt-2 font-semibold leading-relaxed">
              Preparing your renewal ceremony...
            </p>

            <div className="mx-auto mt-6 flex w-fit items-center gap-2" aria-hidden="true">
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                  transition={{ duration: 0.9, delay: dot * 0.16, repeat: Infinity }}
                  className="h-2.5 w-2.5 rounded-full bg-lightBlue-600"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </PageShell>
  );
}
