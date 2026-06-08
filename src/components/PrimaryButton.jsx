import { Heart } from 'lucide-react';

export default function PrimaryButton({
  children,
  variant = 'primary',
  icon = <Heart size={18} fill="currentColor" />,
  className = '',
  ...props
}) {
  const styles =
    variant === 'secondary'
      ? 'border border-pink-200/70 bg-white/45 text-rosewood hover:bg-white/70 dark:border-white/15 dark:bg-white/10 dark:text-pink-50 dark:hover:bg-white/15'
      : 'bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white shadow-glow hover:shadow-pink-300/60';

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold transition duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 ${styles} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
