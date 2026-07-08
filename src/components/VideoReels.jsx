import { Film, Play } from 'lucide-react';

const videoModules = import.meta.glob('../assets/videos/*.{mp4,mov,webm}', {
  eager: true,
  import: 'default',
  query: '?url',
});

const formatTitle = (path) => {
  const fileName = path.split('/').pop()?.replace(/\.[^.]+$/, '') || 'Our Memory';
  return fileName
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const reels = Object.entries(videoModules)
  .map(([path, source]) => ({
    id: path,
    source,
    title: formatTitle(path),
  }))
  .sort((a, b) => a.title.localeCompare(b.title));

export default function VideoReels() {
  return (
    <section className="reels-section mt-6 rounded-[2rem] p-4 sm:p-5" aria-labelledby="reels-title">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3 text-left">
          <span className="reels-icon grid h-10 w-10 shrink-0 place-items-center rounded-full">
            <Film size={19} />
          </span>
          <div>
            <p className="reels-kicker text-[0.62rem] font-black uppercase tracking-[0.24em]">
              Memories in motion
            </p>
            <h2 id="reels-title" className="reels-title text-lg font-black">
              Our Reels
            </h2>
          </div>
        </div>

        {reels.length ? (
          <span className="reels-count rounded-full px-3 py-1 text-xs font-black">
            {reels.length} {reels.length === 1 ? 'video' : 'videos'}
          </span>
        ) : null}
      </div>

      {reels.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {reels.map((reel) => (
            <article key={reel.id} className="w-full">
              <div className="reel-video-frame aspect-[9/16] overflow-hidden rounded-[1.4rem]">
                <video
                  src={reel.source}
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                  aria-label={reel.title}
                />
              </div>
              <p className="reel-caption mt-2 truncate px-1 text-xs font-extrabold">
                {reel.title}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="reels-empty mt-4 flex min-h-36 items-center gap-4 rounded-[1.5rem] p-4 text-left">
          <span className="reels-play grid h-14 w-14 shrink-0 place-items-center rounded-full">
            <Play size={23} fill="currentColor" />
          </span>
          <div>
            <p className="reels-empty-title font-black">Video memories coming soon</p>
            <p className="reels-empty-copy mt-1 text-sm font-semibold">
              Your favorite moments will appear here as swipeable reels.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
