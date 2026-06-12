export default function BackgroundAura() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,195,247,0.38),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(179,229,252,0.42),transparent_28%),linear-gradient(135deg,#e1f5fe_0%,#f4fbfe_45%,#b3e5fc_100%)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(3,169,244,0.28),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(2,119,189,0.28),transparent_28%),linear-gradient(135deg,#031c2b_0%,#06324a_52%,#02131e_100%)]" />
      <div className="absolute left-[8%] top-[13%] h-56 w-56 animate-blob rounded-full bg-lightBlue-300/45 blur-3xl dark:bg-lightBlue-700/25" />
      <div className="absolute right-[5%] top-[18%] h-64 w-64 animate-blob rounded-full bg-lightBlue-100/60 blur-3xl [animation-delay:4s] dark:bg-lightBlue-500/20" />
      <div className="absolute bottom-[5%] left-[28%] h-72 w-72 animate-blob rounded-full bg-cyan-200/45 blur-3xl [animation-delay:8s] dark:bg-cyan-500/15" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30 dark:opacity-10" />
    </div>
  );
}
