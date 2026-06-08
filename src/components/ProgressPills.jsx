export default function ProgressPills({ total, correct }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {Array.from({ length: total }, (_, index) => {
        const filled = index < correct;
        return (
          <span
            key={index}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              filled
                ? 'w-9 bg-gradient-to-r from-pink-500 to-amber-300 shadow-lg shadow-pink-300/40'
                : 'w-2.5 bg-white/60 dark:bg-white/20'
            }`}
          />
        );
      })}
      <span className="ml-2 text-sm font-extrabold text-rose-600 dark:text-pink-100">
        {correct}/{total} restored
      </span>
    </div>
  );
}
