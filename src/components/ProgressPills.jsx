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
                ? 'w-9'
                : 'w-2.5'
            }`}
            style={filled ? { background: 'linear-gradient(to right, #C9963A, #C4917A)', boxShadow: '0 4px 12px rgba(196,145,122,0.4)' } : { background: 'rgba(196,145,122,0.2)' }}
          />
        );
      })}
      <span className="ml-2 text-sm font-extrabold" style={{ color: '#C9963A', fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.08em' }}>
        {correct}/{total} restored
      </span>
    </div>
  );
}
