export default function BackgroundAura() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,114,182,0.34),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(216,180,254,0.3),transparent_28%),linear-gradient(135deg,#fff1f7_0%,#fff7ed_45%,#f5d0fe_100%)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(190,24,93,0.34),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(126,34,206,0.3),transparent_28%),linear-gradient(135deg,#170817_0%,#2b1028_52%,#120614_100%)]" />
      <div className="absolute left-[8%] top-[13%] h-56 w-56 animate-blob rounded-full bg-pink-300/45 blur-3xl dark:bg-pink-700/25" />
      <div className="absolute right-[5%] top-[18%] h-64 w-64 animate-blob rounded-full bg-purple-300/45 blur-3xl [animation-delay:4s] dark:bg-purple-700/25" />
      <div className="absolute bottom-[5%] left-[28%] h-72 w-72 animate-blob rounded-full bg-amber-200/45 blur-3xl [animation-delay:8s] dark:bg-amber-500/15" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30 dark:opacity-10" />
    </div>
  );
}
