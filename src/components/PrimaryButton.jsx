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
      ? 'secondary-action-button'
      : 'blue-action-button';

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
