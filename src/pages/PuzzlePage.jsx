import { useEffect, useMemo, useState } from 'react';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
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
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard.jsx';
import PageShell from '../components/PageShell.jsx';
import ProgressPills from '../components/ProgressPills.jsx';
import SortableMemoryCard from '../components/SortableMemoryCard.jsx';
import { relationshipMoments } from '../data/couple.js';
import { useSuccessSound } from '../hooks/useAudio.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { shuffleArray } from '../utils/shuffle.js';

export default function PuzzlePage() {
  const navigate = useNavigate();
  const playSuccessSound = useSuccessSound();
  const [completionStored, setCompletionStored] = useLocalStorage('timeline-puzzle-complete', false);
  const [moments, setMoments] = useState(() => shuffleArray(relationshipMoments));
  const [solved, setSolved] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const correctCount = useMemo(
    () => moments.filter((moment, index) => moment.id === relationshipMoments[index].id).length,
    [moments],
  );

  useEffect(() => {
    if (correctCount !== relationshipMoments.length || solved) return;

    setSolved(true);
    setCompletionStored(true);
    playSuccessSound();

    const timer = window.setTimeout(() => navigate('/ceremony', { replace: true }), 2200);
    return () => window.clearTimeout(timer);
  }, [correctCount, navigate, playSuccessSound, setCompletionStored, solved]);

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id || solved) return;

    setMoments((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const resetPuzzle = () => {
    setSolved(false);
    setCompletionStored(false);
    setMoments(shuffleArray(relationshipMoments));
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.34em] text-pink-500 dark:text-pink-200">
          Relationship Timeline Puzzle
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">
          Arrange our love story in the correct order to continue.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-relaxed text-rose-800/75 dark:text-pink-100/75">
          Drag the photos into chronological order. The portal will unlock the renewal ceremony
          when every chapter is back where it belongs.
        </p>
      </div>

      <GlassCard className="mx-auto mt-8 max-w-6xl p-4 sm:p-6">
        <div className="flex flex-col items-center justify-between gap-4 border-b border-white/40 pb-5 dark:border-white/10 sm:flex-row">
          <ProgressPills total={relationshipMoments.length} correct={correctCount} />
          <button
            type="button"
            onClick={resetPuzzle}
            className="rounded-full bg-white/45 px-4 py-2 text-sm font-extrabold text-rose-700 transition hover:bg-white/70 dark:bg-white/10 dark:text-pink-100 dark:hover:bg-white/15"
          >
            Shuffle Again
          </button>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={moments.map((moment) => moment.id)} strategy={rectSortingStrategy}>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {moments.map((moment, index) => (
                <SortableMemoryCard
                  key={moment.id}
                  moment={moment}
                  position={index + 1}
                  isCorrect={moment.id === relationshipMoments[index].id}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </GlassCard>

      {solved ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-30 grid place-items-center bg-rosewood/35 px-4 backdrop-blur-md dark:bg-black/50"
        >
          <div className="glass max-w-lg rounded-[2rem] p-8 text-center shadow-glow">
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 6, -6, 0] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              className="text-6xl"
            >
              ❤️
            </motion.div>
            <h2 className="mt-5 text-3xl font-black">Timeline Restored Successfully</h2>
            <p className="mt-3 font-semibold text-rose-700 dark:text-pink-100">
              Emotional audit complete. Proceeding to the ceremony...
            </p>
          </div>
        </motion.div>
      ) : null}

      {completionStored ? (
        <p className="mt-5 text-center text-sm font-bold text-rose-600 dark:text-pink-100">
          Saved: timeline completion state is stored on this device.
        </p>
      ) : null}
    </PageShell>
  );
}
