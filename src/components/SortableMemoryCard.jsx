import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Check } from 'lucide-react';
import MemoryImage from './MemoryImage.jsx';

export default function SortableMemoryCard({ moment, position, isCorrect }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: moment.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : undefined,
    touchAction: 'none',
    background: '#EDE0CC',
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`group relative min-w-0 transition ${
        isDragging ? 'z-20 scale-[1.03] shadow-2xl' : ''
      }`}
    >
      <button
        type="button"
        className="relative block aspect-square w-full touch-none select-none cursor-grab overflow-hidden text-left outline-none active:cursor-grabbing"
        style={{ outlineOffset: 0 }}
        aria-label={`Drag ${moment.title}, currently in position ${position}`}
        {...attributes}
        {...listeners}
      >
        <MemoryImage moment={moment} className="absolute inset-0 h-full w-full" rounded="" />

        {isCorrect ? (
          <Check
            size={14}
            strokeWidth={4}
            className="absolute left-1.5 top-1.5 text-emerald-500 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]"
          />
        ) : null}
      </button>
    </article>
  );
}
