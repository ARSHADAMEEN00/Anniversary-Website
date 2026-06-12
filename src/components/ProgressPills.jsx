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
                ? 'w-9 bg-gradient-to-r from-lightBlue-700 to-lightBlue-300 shadow-lg shadow-lightBlue-300/40'
                : 'w-2.5 bg-white/60 dark:bg-white/20'
            }`}
          />
        );
      })}
      <span className="ml-2 text-sm font-extrabold text-lightBlue-800 dark:text-lightBlue-100">
        {correct}/{total} restored
      </span>
    </div>
  );
}
