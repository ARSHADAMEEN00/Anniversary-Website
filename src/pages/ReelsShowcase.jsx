import { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Play } from 'lucide-react';

import video1 from '../assets/videos/savethedate.mp4';
import video2 from '../assets/videos/savethedatecake.MP4';
import video3 from '../assets/videos/food.mp4';
import video4 from '../assets/videos/ooty.mp4';
import video5 from '../assets/videos/reel.mp4';
import video6 from '../assets/videos/wedding.MP4';
import video7 from '../assets/videos/VIDEO-2025-10-07-14-38-13.mp4';
import video8 from '../assets/videos/VIDEO-2025-10-13-12-11-52.mp4';
import video9 from '../assets/videos/groomtobe.mp4';

/**
 * ===== CUSTOMIZE HERE =====
 * Replace poster / avatar / caption / audio with your real content.
 * - poster: a thumbnail/frame image for the reel (shown until video loads, or used as the
 *   background if you don't have a video yet).
 * - video: (optional) a direct URL to your own hosted .mp4 / .webm file. Leave '' to show
 *   the animated poster instead. Instagram's own reel links won't work here (they expire
 *   and block embedding) — export/download your reels and host the files yourself
 *   (e.g. your CDN, Cloudinary, Supabase storage, S3, etc).
 * - pan: 'left' | 'right' — subtle direction for the poster's slow zoom/pan.
 */
const REELS = [
  {
    id: 1,
    poster: '',
    video: video1,
    username: 'Our Story',
    caption: 'The day we said forever ✨',
    audio: 'Original audio',
    likes: 240,
    comments: 18,
    shares: 5,
    pan: 'left',
  },
  {
    id: 2,
    poster: '',
    video: video2,
    username: 'Our Story',
    caption: 'Save the date! 🎂',
    audio: 'Sweet moments',
    likes: 180,
    comments: 12,
    shares: 2,
    pan: 'right',
  },
  {
    id: 3,
    poster: '',
    video: video6,
    username: 'Our Story',
    caption: 'Our Wedding Day 💍',
    audio: 'Beautiful memories',
    likes: 350,
    comments: 42,
    shares: 10,
    pan: 'left',
  },
  {
    id: 4,
    poster: '',
    video: video4,
    username: 'Our Story',
    caption: 'Ooty trip diaries ⛰️',
    audio: 'Travel diaries',
    likes: 150,
    comments: 8,
    shares: 1,
    pan: 'right',
  },
  {
    id: 5,
    poster: '',
    video: video7,
    username: 'Our Story',
    caption: 'Special moments 💖',
    audio: 'Our playlist',
    likes: 210,
    comments: 15,
    shares: 4,
    pan: 'left',
  },
  {
    id: 6,
    poster: '',
    video: video8,
    username: 'Our Story',
    caption: 'Just us ❤️',
    audio: 'Love songs',
    likes: 190,
    comments: 14,
    shares: 3,
    pan: 'right',
  },
  {
    id: 7,
    poster: '',
    video: video3,
    username: 'Falooda United',
    caption: 'Faloodaeeeeeee! ❤️',
    audio: 'ambient sounds',
    likes: 999,
    comments: 145,
    shares: 120,
    pan: 'left',
  },
  {
    id: 8,
    poster: '',
    video: video5,
    username: 'Munnu',
    caption: 'Special moments 💖',
    audio: 'Our playlist',
    likes: 101,
    comments: 12,
    shares: 40,
    pan: 'right',
  },
   {
    id: 8,
    poster: '',
    video: video9,
    username: 'Groom',
    caption: 'Special moments 💖',
    audio: 'Our playlist',
    likes: 101,
    comments: 12,
    shares: 40,
    pan: 'right',
  },
];

function formatCount(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(n);
}

export default function ReelsShowcase() {
  const [active, setActive] = useState(0);
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const [paused, setPaused] = useState({});
  const [hasStarted, setHasStarted] = useState(false);
  const [popHeart, setPopHeart] = useState(null);
  const [muted, setMuted] = useState(true);

  const itemRefs = useRef([]);
  const videoRefs = useRef([]);
  const lastTap = useRef(0);
  const popTimeout = useRef(null);

  // Track which reel is centered in the viewport
  useEffect(() => {
    const items = itemRefs.current.filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            setActive(Number(entry.target.getAttribute('data-index')));
          }
        });
      },
      { threshold: [0.6] }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const isActuallyPaused = useCallback((id) => !hasStarted || paused[id], [hasStarted, paused]);

  // Play the active video (if any), pause the rest, and keep mute state in sync
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      v.muted = muted;
      if (i === active && !isActuallyPaused(REELS[i].id)) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active, paused, muted, hasStarted, isActuallyPaused]);

  const handleSnap = useCallback((e) => {
    const section = e?.currentTarget?.closest('.film-reel-section');
    if (section) {
      const rect = section.getBoundingClientRect();
      if (Math.abs(rect.top) > 5) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  useEffect(() => {
    const section = document.querySelector('.film-reel-section');
    if (!section) return;

    let timeout;
    const onScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visibleRatio = visibleHeight / windowHeight;
        
        if (visibleRatio > 0.6 && visibleRatio < 0.99) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeout);
    };
  }, []);

  const toggleLike = useCallback((id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const toggleSave = useCallback((id) => {
    setSaved((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const togglePaused = useCallback((id) => {
    setPaused((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleMediaTap = (reel, e) => {
    handleSnap(e);
    const now = Date.now();
    
    if (!hasStarted) {
      setHasStarted(true);
      lastTap.current = now;
      return;
    }

    if (now - lastTap.current < 300) {
      if (!liked[reel.id]) toggleLike(reel.id);
      setPopHeart(reel.id);
      if (popTimeout.current) clearTimeout(popTimeout.current);
      popTimeout.current = setTimeout(() => setPopHeart(null), 700);
    } else {
      togglePaused(reel.id);
    }
    lastTap.current = now;
  };

  return (
    <>
      <style>{css}</style>
      <div className="rs-wrap">
        <div className="rs-phone">
          <div className="rs-screen">
            <div className="rs-topbar">
              <div className="rs-progress">
                {REELS.map((_, i) => (
                  <div
                    key={i}
                    className={`rs-seg ${i === active ? 'is-active' : i < active ? 'is-done' : ''}`}
                  />
                ))}
              </div>
              <div className="rs-counter">
                Reel <span>{String(active + 1).padStart(2, '0')}</span> / {String(REELS.length).padStart(2, '0')}
              </div>
            </div>

            <button
              className="rs-mute"
              onClick={(e) => {
                setMuted((m) => !m);
                handleSnap(e);
              }}
              aria-label={muted ? 'Unmute reels' : 'Mute reels'}
            >
              {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>

            <div className="rs-feed">
              {REELS.map((reel, i) => (
                <div
                  key={reel.id}
                  className={`rs-item ${i === active ? 'is-active' : ''}`}
                  data-index={i}
                  ref={(el) => (itemRefs.current[i] = el)}
                  onClick={(e) => handleMediaTap(reel, e)}
                >
                  {reel.video ? (
                    <video
                      ref={(el) => (videoRefs.current[i] = el)}
                      className={`rs-media rs-video ${isActuallyPaused(reel.id) ? 'is-paused' : ''}`}
                      src={reel.video}
                      poster={reel.poster}
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <div
                      className={`rs-media rs-pan-${reel.pan} ${isActuallyPaused(reel.id) ? 'is-paused' : ''}`}
                      style={{ backgroundImage: `url(${reel.poster})` }}
                    />
                  )}

                  <div className="rs-grain" />
                  <div className="rs-gradient" />

                  {isActuallyPaused(reel.id) && (
                    <div className="rs-playicon">
                      <Play size={28} fill="currentColor" />
                    </div>
                  )}

                  {popHeart === reel.id && <span className="rs-popheart" style={{ fontSize: '88px', color: 'transparent', textShadow: '0 0 0 var(--coral)' }}>🌸</span>}

                  <div className="rs-rail">
                    <div className="rs-railgroup">
                      <button
                        className={`rs-action journal-icon ${liked[reel.id] ? 'is-liked' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(reel.id);
                        }}
                        aria-label="Like"
                        aria-pressed={!!liked[reel.id]}
                      >
                        {liked[reel.id] ? '🌸' : '💮'}
                      </button>
                      <span className="rs-count">{formatCount(reel.likes + (liked[reel.id] ? 1 : 0))}</span>
                    </div>

                    <div className="rs-railgroup">
                      <button className="rs-action journal-icon" onClick={(e) => e.stopPropagation()} aria-label="Comment">
                        💌
                      </button>
                      <span className="rs-count">{formatCount(reel.comments)}</span>
                    </div>

                    <div className="rs-railgroup">
                      <button className="rs-action journal-icon" onClick={(e) => e.stopPropagation()} aria-label="Share">
                        🦋
                      </button>
                      <span className="rs-count">{formatCount(reel.shares)}</span>
                    </div>

                    <div className="rs-railgroup">
                      <button
                        className={`rs-action journal-icon ${saved[reel.id] ? 'is-saved' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSave(reel.id);
                        }}
                        aria-label="Save"
                        aria-pressed={!!saved[reel.id]}
                      >
                        {saved[reel.id] ? '📌' : '📍'}
                      </button>
                    </div>
                  </div>

                  <div className="rs-info">
                    <div className="rs-userrow">
                      <span className="rs-username">@{reel.username}</span>
                    </div>
                    <p className="rs-caption">{reel.caption}</p>
                    <div className="rs-audio">
                      <span className="rs-disc" />
                      <span className="rs-audiotext">{reel.audio}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;600;700;800&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');

.rs-wrap {
  --bg: #FFFEF9;
  --amber: #C5A059;
  --coral: #ff5c49;
  --cream: #f7f3ec;
  --muted: rgba(255, 255, 255, 0.7);
  --glass: rgba(255, 255, 255, 0.15);
  --glass-border: rgba(255, 255, 255, 0.2);

  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  font-family: 'Inter', sans-serif;
}

.rs-wrap * {
  box-sizing: border-box;
}

.rs-phone {
  position: relative;
  width: 100%;
  height: 100%;
  background: transparent;
}

.rs-screen {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--bg);
}

.journal-icon {
  font-size: 22px;
  background: transparent !important;
  border: none !important;
  backdrop-filter: none !important;
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
.journal-icon:active {
  transform: scale(1.1);
}

.rs-topbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 14px 16px 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 6px;
  pointer-events: none;
}

.rs-progress {
  display: flex;
  gap: 4px;
}

.rs-seg {
  flex: 1;
  height: 2px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.22);
}

.rs-seg.is-active,
.rs-seg.is-done {
  background: var(--amber);
}

.rs-counter {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--amber);
  opacity: 0.85;
}

.rs-counter span {
  color: var(--cream);
}

.rs-mute {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 6;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  color: var(--cream);
  backdrop-filter: blur(6px);
  cursor: pointer;
}

.rs-mute:focus-visible,
.rs-action:focus-visible,
.rs-follow:focus-visible {
  outline: 2px solid var(--amber);
  outline-offset: 2px;
}

.rs-feed {
  height: 100%;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.rs-feed::-webkit-scrollbar {
  display: none;
}

.rs-item {
  position: relative;
  height: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  overflow: hidden;
}

.rs-media {
  position: absolute;
  inset: -4%;
  background-size: cover;
  background-position: center;
  animation-duration: 24s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-play-state: paused;
  transition: filter 0.2s ease;
}

.rs-item.is-active .rs-media {
  animation-play-state: running;
}

.rs-media.is-paused {
  animation-play-state: paused !important;
  filter: brightness(0.65);
}

.rs-pan-left {
  animation-name: rs-kenburns-left;
}

.rs-pan-right {
  animation-name: rs-kenburns-right;
}

@keyframes rs-kenburns-left {
  from { transform: scale(1) translate(0, 0); }
  to { transform: scale(1.12) translate(-2%, -1%); }
}

@keyframes rs-kenburns-right {
  from { transform: scale(1) translate(0, 0); }
  to { transform: scale(1.12) translate(2%, -1%); }
}

.rs-video {
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rs-grain {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.05;
  mix-blend-mode: overlay;
  pointer-events: none;
}

.rs-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(14, 13, 17, 0) 35%, rgba(8, 7, 10, 0.55) 70%, rgba(6, 5, 9, 0.92) 100%);
  pointer-events: none;
}

.rs-playicon {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: rgba(255, 255, 255, 0.85);
  pointer-events: none;
}

.rs-popheart {
  position: absolute;
  top: 50%;
  left: 50%;
  color: var(--coral);
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.5);
  animation: rs-pop 0.7s ease-out forwards;
  pointer-events: none;
  filter: drop-shadow(0 4px 24px rgba(255, 92, 73, 0.5));
}

@keyframes rs-pop {
  0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
  35% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
  60% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
}

.rs-rail {
  position: absolute;
  right: 10px;
  bottom: 120px;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.rs-railgroup {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.rs-action {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  color: var(--cream);
  backdrop-filter: blur(6px);
  cursor: pointer;
  transition: transform 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.rs-action:active {
  transform: scale(0.9);
}

.rs-action.is-liked {
  color: var(--coral);
  border-color: rgba(255, 92, 73, 0.5);
}

.rs-action.is-saved {
  color: var(--amber);
  border-color: rgba(242, 184, 75, 0.5);
}

.rs-count {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: var(--cream);
  opacity: 0.85;
}

.rs-info {
  position: absolute;
  left: 16px;
  right: 70px;
  bottom: 22px;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rs-userrow {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rs-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1.5px solid var(--amber);
  object-fit: cover;
}

.rs-username {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: var(--cream);
}

.rs-follow {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid var(--amber);
  background: transparent;
  color: var(--amber);
  cursor: pointer;
  transition: all 0.15s ease;
}

.rs-follow.is-following {
  background: var(--amber);
  color: #1a1409;
}

.rs-caption {
  font-size: 13px;
  line-height: 1.45;
  color: var(--cream);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rs-audio {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rs-disc {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, var(--amber), var(--bezel) 70%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
  animation: rs-spin 3s linear infinite;
  animation-play-state: paused;
}

.rs-item.is-active .rs-disc {
  animation-play-state: running;
}

@keyframes rs-spin {
  to { transform: rotate(360deg); }
}

.rs-audiotext {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (prefers-reduced-motion: reduce) {
  .rs-media,
  .rs-disc,
  .rs-popheart {
    animation: none !important;
  }
}
`;
