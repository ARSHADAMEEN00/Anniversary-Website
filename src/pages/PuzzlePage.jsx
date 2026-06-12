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
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '0.68rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.32em',
              color: '#C9963A',
            }}
          >
            Love Story Security Check
          </p>
          {stage === 'timeline' ? (
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#2C1A0E',
                marginTop: 6,
              }}
            >
              Prove you belong in this timeline.
            </h1>
          ) : null}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '0.9rem',
              color: 'rgba(61,35,20,0.65)',
              marginTop: 6,
              maxWidth: 480,
              margin: '6px auto 0',
            }}
          >
            Complete both verification steps to unlock the renewal ceremony.
          </p>
        </div>

        {/* Main card */}
        <div
          className="light-surface overflow-hidden"
          style={{
            borderRadius: 4,
            border: '1px solid rgba(201,150,58,0.25)',
            background: '#FFFEF9',
            boxShadow: '0 24px 70px rgba(44,26,14,0.14)',
          }}
        >
          {stage === 'timeline' ? (
            <>
              {/* Timeline panel header */}
              <div className="blue-panel-header relative overflow-hidden px-5 py-5 text-left sm:px-7 sm:py-6">
                <div className="absolute -right-12 -top-14 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-16 left-1/3 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                <div className="relative flex items-start gap-3">
                  <span
                    className="mt-0.5 hidden h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/20 bg-white/10 sm:grid"
                  >
                    <Sparkles size={20} />
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '0.85rem',
                        color: 'rgba(253,248,242,0.8)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Arrange every memory in
                    </p>
                    <h2
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                        fontWeight: 400,
                        fontStyle: 'italic',
                        color: '#FDF8F2',
                        lineHeight: 1.1,
                      }}
                    >
                      chronological order
                    </h2>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '0.85rem',
                        color: 'rgba(232,197,181,0.85)',
                        marginTop: 4,
                      }}
                    >
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
                  <div
                    className="grid grid-cols-3 gap-1 p-1"
                    style={{ background: '#EDE0CC' }}
                  >
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

              <div
                className="px-4 py-3.5 sm:px-5"
                style={{
                  borderTop: '1px solid rgba(201,150,58,0.2)',
                  background: 'linear-gradient(to bottom, #FFFEF9, rgba(253,248,242,0.7))',
                  color: '#2C1A0E',
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-1" style={{ color: 'rgba(44,26,14,0.6)' }}>
                    <button
                      type="button"
                      onClick={resetPuzzle}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl transition focus-visible:outline-none"
                      style={{ transition: 'background 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#EDE0CC'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      aria-label="Shuffle the timeline again"
                    >
                      <RotateCcw size={20} />
                    </button>
                    <p
                      className="truncate"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 700,
                        fontSize: '0.9rem',
                      }}
                    >
                      {correctCount}/{timelineMoments.length} in place
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={verifyTimeline}
                    className="blue-action-button shrink-0 rounded-none px-4 py-2.5 transition hover:-translate-y-0.5 focus-visible:outline-none sm:px-6"
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                    }}
                  >
                    Verify order
                  </button>
                </div>

                {timelineFeedback ? (
                  <p
                    className="mt-3 px-3 py-2 text-sm font-semibold"
                    style={{
                      borderRadius: 2,
                      border: '1px solid rgba(196,145,122,0.3)',
                      background: '#FDF1E6',
                      color: '#8B4513',
                    }}
                    role="status"
                  >
                    {timelineFeedback.message}
                  </p>
                ) : (
                  <p
                    className="mt-2 text-xs font-medium"
                    style={{ color: 'rgba(44,26,14,0.5)', fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    A small green tick marks each correctly placed memory.
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Question panel header */}
              <div className="blue-panel-header relative overflow-hidden px-5 py-5 text-left sm:px-7 sm:py-6">
                <div className="absolute -right-12 -top-14 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-16 left-1/3 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                <div className="relative">
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '0.85rem',
                      color: 'rgba(253,248,242,0.8)',
                    }}
                  >
                    Final verification
                  </p>
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      color: '#FDF8F2',
                      lineHeight: 1.1,
                    }}
                  >
                    Pick the correct answer
                  </h2>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '0.85rem',
                      color: 'rgba(232,197,181,0.85)',
                      marginTop: 4,
                    }}
                  >
                    One last check before the ceremony can begin.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-6" style={{ color: '#2C1A0E' }}>
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl"
                    style={{ background: 'rgba(201,150,58,0.12)', color: '#C9963A' }}
                  >
                    <ShieldCheck size={20} />
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        color: 'rgba(44,26,14,0.5)',
                      }}
                    >
                      Question 1 of 1
                    </p>
                    <h2
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(1rem, 3vw, 1.3rem)',
                        fontWeight: 600,
                        fontStyle: 'italic',
                        color: '#2C1A0E',
                        marginTop: 4,
                        lineHeight: 1.3,
                      }}
                    >
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
                        className={`answer-option relative flex min-h-[4.5rem] items-center gap-3 rounded-none p-3 text-left transition duration-200 ${
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
                          className={`answer-check grid h-7 w-7 shrink-0 place-items-center transition ${
                            selected ? 'answer-check-selected' : ''
                          }`}
                          style={{ borderRadius: 2 }}
                        >
                          <Check size={16} strokeWidth={3} />
                        </span>
                        <span>
                          <span
                            style={{
                              display: 'block',
                              fontFamily: "'Playfair Display', serif",
                              fontSize: '0.95rem',
                              fontWeight: 600,
                              color: '#2C1A0E',
                            }}
                          >
                            {answer.label}
                          </span>
                          <span
                            style={{
                              display: 'block',
                              marginTop: 2,
                              fontSize: '0.78rem',
                              lineHeight: 1.4,
                              color: 'rgba(61,35,20,0.6)',
                              fontFamily: "'Cormorant Garamond', serif",
                              fontStyle: 'italic',
                            }}
                          >
                            {answer.detail}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>

                {answerFeedback ? (
                  <p
                    className="mt-4 px-3 py-2 text-sm font-semibold"
                    style={{
                      borderRadius: 2,
                      border: '1px solid rgba(196,145,122,0.3)',
                      background: '#FDF1E6',
                      color: '#8B4513',
                    }}
                    role="status"
                  >
                    {answerFeedback.message}
                  </p>
                ) : null}
              </div>

              <div
                className="flex items-center justify-between gap-3 px-4 py-3.5 sm:px-5"
                style={{
                  borderTop: '1px solid rgba(201,150,58,0.2)',
                  background: 'linear-gradient(to bottom, #FFFEF9, rgba(253,248,242,0.7))',
                  color: '#2C1A0E',
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setStage('timeline');
                    setSelectedAnswer('');
                    setAnswerFeedback(null);
                  }}
                  className="flex shrink-0 items-center gap-1 px-1 py-2 transition"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: 'rgba(44,26,14,0.65)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#2C1A0E'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(44,26,14,0.65)'}
                >
                  <ChevronLeft size={18} />
                  Timeline
                </button>
                <button
                  type="button"
                  onClick={verifyAnswer}
                  className="blue-action-button rounded-none px-4 py-2.5 transition hover:-translate-y-0.5 focus-visible:outline-none sm:px-6"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                  }}
                >
                  Verify answer
                </button>
              </div>
            </>
          )}
        </div>

        <p
          className="mt-4 px-4 text-center"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '0.62rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            color: 'rgba(44,26,14,0.4)',
          }}
        >
          Private portal verification | {couple.husbandName} + {couple.wifeName}
        </p>
      </div>

      {completed ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-30 grid place-items-center px-4"
          style={{ background: 'rgba(44,26,14,0.72)', backdropFilter: 'blur(10px)' }}
          role="status"
          aria-live="polite"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="ceremony-loader-card w-full max-w-sm p-8 text-center shadow-2xl"
            style={{ borderRadius: 4 }}
          >
            <div className="relative mx-auto grid h-28 w-28 place-items-center">
              <motion.span
                animate={{ opacity: [0.5, 0], scale: [0.75, 1.35] }}
                transition={{ duration: 1.15, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full"
                style={{ border: '2px solid rgba(196,145,122,0.6)' }}
              />
              <motion.span
                animate={{ opacity: [0.35, 0], scale: [0.65, 1.15] }}
                transition={{ duration: 1.15, delay: 0.18, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full"
                style={{ background: 'rgba(232,197,181,0.4)' }}
              />
              <motion.div
                animate={{ scale: [1, 1.24, 1, 1.14, 1] }}
                transition={{ duration: 1.15, repeat: Infinity, ease: 'easeInOut' }}
                className="ceremony-loader-heart relative grid h-20 w-20 place-items-center rounded-full"
              >
                <Heart size={45} fill="currentColor" strokeWidth={2.3} />
              </motion.div>
            </div>

            <h2 className="ceremony-loader-title mt-5 text-2xl">
              Love verified
            </h2>
            <p className="ceremony-loader-copy mt-2 leading-relaxed">
              Preparing your renewal ceremony...
            </p>

            <div className="mx-auto mt-6 flex w-fit items-center gap-2" aria-hidden="true">
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                  transition={{ duration: 0.9, delay: dot * 0.16, repeat: Infinity }}
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: '#C4917A' }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </PageShell>
  );
}
