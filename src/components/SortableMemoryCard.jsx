import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import MemoryImage from './MemoryImage.jsx';

export default function SortableMemoryCard({ moment, position, isCorrect }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: moment.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : undefined,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`group relative overflow-hidden rounded-[1.7rem] border p-2 shadow-xl transition ${
        isDragging ? 'scale-105 border-pink-300 bg-white/80 shadow-glow' : 'bg-white/55'
      } ${
        isCorrect
          ? 'border-emerald-300/80 dark:border-emerald-300/40'
          : 'border-white/60 dark:border-white/10'
      } dark:bg-white/10`}
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-10 grid h-9 w-9 cursor-grab place-items-center rounded-full border border-white/70 bg-white/70 text-rose-500 shadow-lg backdrop-blur-md active:cursor-grabbing dark:border-white/15 dark:bg-black/20 dark:text-pink-100"
        aria-label={`Drag ${moment.title}`}
        {...attributes}
        {...listeners}
      >
        <GripVertical size={18} />
      </button>
      <div className="relative">
        <MemoryImage moment={moment} className="aspect-[4/5] w-full shadow-inner" />
        <div className="absolute inset-x-0 bottom-0 rounded-b-3xl bg-gradient-to-t from-rosewood/80 via-rosewood/25 to-transparent p-4 text-white">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-pink-100">
            Position {position}
          </p>
          <h3 className="mt-1 text-base font-black leading-tight">{moment.title}</h3>
        </div>
      </div>
      <p className="px-2 py-3 text-sm font-medium leading-relaxed text-rose-700 dark:text-pink-100">
        {moment.description}
      </p>
    </article>
  );
}
