import React, { useEffect, useRef } from 'react';
import { couple } from '../data/couple.js';
import TornPaperEdge from '../components/TornPaperEdge.jsx';
import WashiTape from '../components/WashiTape.jsx';
import Paperclip from '../components/Paperclip.jsx';
import Stamp from '../components/Stamp.jsx';
import DriedFlower from '../components/DriedFlower.jsx';
import firstMeetImg from '../assets/Images/first_meet.png';
import firstPhotoImg from '../assets/Images/first_photo.jpg';
import firstEidImg from '../assets/Images/first_eid.jpg';
import fav1Img from '../assets/Images/fav/fav_1.jpg';
import fav2Img from '../assets/Images/fav/fav_2.jpg';
import fav3Img from '../assets/Images/fav/fav_3.png';
import fav4Img from '../assets/Images/fav/fav_4.jpeg';
import fav5Img from '../assets/Images/fav/fav_5.jpeg';
import fav6Img from '../assets/Images/fav/fav_6.jpeg';

import { showcaseData } from '../data/showcaseData.js';

import TimelineStackedPhoto from '../components/TimelineStackedPhoto.jsx';
import { timelineData } from '../data/timelineData.js';
import ReelsShowcase from './ReelsShowcase.jsx';

import './LandingPage.css';

// Synthesize a realistic mechanical camera shutter click using Web Audio API
const playCameraShutter = (audioCtx) => {
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }

  const now = audioCtx.currentTime;

  const playClick = (time, duration, filterFreq, gainVal) => {
    const bufferSize = audioCtx.sampleRate * duration;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = audioCtx.createBufferSource();
    source.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = filterFreq;
    filter.Q.value = 2.0;

    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(gainVal, time + 0.002);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + duration);

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    source.start(time);
    source.stop(time + duration);
  };

  // Click 1: Shutter curtain opens (crisp, higher pitch)
  playClick(now, 0.04, 3800, 0.25);

  // Click 2: Shutter curtain closes (slightly lower pitch, mechanical rebound)
  playClick(now + 0.065, 0.05, 2600, 0.20);
};

export default function LandingPage() {
  const today = new Date();
  const weddingDateObj = new Date(couple.weddingDate);
  const timeDiff = Math.max(0, today.getTime() - weddingDateObj.getTime());
  const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
  const diffYears = Math.floor(diffDays / 365);
  const displayDays = diffDays.toLocaleString();

  const audioCtxRef = useRef(null);

  useEffect(() => {
    // Initialize AudioContext and setup interaction listeners to resume it
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const resume = () => {
        if (ctx.state === 'suspended') {
          ctx.resume().catch(() => {});
        }
      };

      window.addEventListener('click', resume, { once: true });
      window.addEventListener('touchstart', resume, { once: true });
      window.addEventListener('keydown', resume, { once: true });
      window.addEventListener('wheel', resume, { once: true });
    }

    const cards = document.querySelectorAll('.polaroid, .memory-card');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains('pinned')) {
            const el = entry.target;
            el.classList.add('pinned');

            const isPolaroid = el.classList.contains('polaroid');
            const swingDuration = isPolaroid ? 1800 : 1600;
            const delayProp = isPolaroid ? '--swing-delay' : '--note-delay';
            const delay = parseInt(
              getComputedStyle(el).getPropertyValue(delayProp) || '0',
              10
            );

            if (isPolaroid) {
              setTimeout(() => {
                if (audioCtxRef.current) {
                  playCameraShutter(audioCtxRef.current);
                }
              }, delay);
            }

            setTimeout(() => {
              el.classList.add('idle-sway');
            }, swingDuration + delay + 200);

            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="nav-brand">Our <span>Story</span></div>
        <div className="nav-heart">♥</div>
        <div className="nav-year">Est. 2025 July 24</div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="float-hearts">
          <span className="fh" style={{ left: '15%', bottom: '20%', animationDelay: '0s' }}>♥</span>
          <span className="fh" style={{ left: '72%', bottom: '30%', animationDelay: '3s' }}>♥</span>
          <span className="fh" style={{ left: '40%', bottom: '10%', animationDelay: '6s' }}>♥</span>
        </div>
        <div className="hero-eyebrow">✦ Our Anniversary Journal ✦</div>
        <h1 className="hero-title" style={{ fontSize: '3.5rem' }}>
          To My <em style={{ fontFamily: '"Dancing Script", cursive', fontSize: '1.3em', fontWeight: 600, color: 'var(--gold)', fontStyle: 'normal' }}>Love</em><br/>Munnu
        </h1>
        <div className="hero-divider" />
        <div className="hero-date">2025 — Infinity</div>
        <div className="hero-subtitle">A lifetime of us, written in moments</div>
      </section>

      {/* RIBBON */}
      <div className="ribbon">July 24, 2025</div>

      {/* STATS */}
      <div className="stats-row">
        <div className="stat-item">
          <span className="stat-num">{diffYears}</span>
          <span className="stat-label">Years</span>
        </div>
        <div className="stat-div" />
        <div className="stat-item">
          <span className="stat-num">{displayDays}</span>
          <span className="stat-label">Days Together</span>
        </div>
        <div className="stat-div" />
        <div className="stat-item">
          <span className="stat-num">∞</span>
          <span className="stat-label">Memories</span>
        </div>
      </div>

      {/* RIPPED PAPER DIVIDER */}
      <TornPaperEdge topColor="var(--espresso)" bottomColor="var(--ivory)" />

      {/* JOURNAL SPREAD */}
      <section className="journal-spread">
        <div className="spread-header">
          <div className="section-label">✦ pinned with love</div>
          <h2 className="section-title">Our Favourite Frames</h2>
          <div className="spread-rule" />
        </div>
        <div className="polaroid-grid">
          {/* Card 1 */}
          <div className="polaroid">
            <Paperclip top="-15px" left="20px" rotation="-12deg" />
            <DriedFlower top="30%" right="-30px" rotation="25deg" scale={0.7} />
            <div className="sticker" style={{ top: '10px', right: '10px' }}>🌹</div>
            <div className="photo-placeholder">
              <img src={fav1Img} alt="The Wedding Day" className="polaroid-photo" />
            </div>
            <div className="polaroid-caption">
              <span className="caption-text">The Eid Day</span>
            </div>
          </div>
          {/* Card 2 */}
          <div className="polaroid">
            <div className="washi washi-sage" />
            <div className="sticker" style={{ bottom: '46px', right: '8px' }}>🌊</div>
            <div className="photo-placeholder">
              <img src={fav2Img} alt="Calicut Beach, 2020" className="polaroid-photo" />
            </div>
            <div className="polaroid-caption">
              <span className="caption-text">Calicut Beach, Dec 2025</span>
            </div>
          </div>
          {/* Card 3 */}
          <div className="polaroid">
            <div className="washi washi-gold" />
            <Stamp top="65%" right="-10px" rotation="15deg" size="80px" />
            <div className="sticker" style={{ top: '12px', left: '10px' }}>✨</div>
            <div className="photo-placeholder">
              <img src={fav3Img} alt="Anniversary Trip" className="polaroid-photo" style={{
                objectPosition: '0 -40px',
              }}/>
            </div>
            <div className="polaroid-caption">
              <span className="caption-text">Vava's Wedding Day</span>
            </div>
          </div>
          {/* Card 4 */}
          <div className="polaroid">
            <div className="washi washi-sage" />
            <div className="sticker" style={{ bottom: '40px', left: '10px' }}>🌿</div>
            <div className="photo-placeholder">
              <img src={fav4Img} alt="First Home" className="polaroid-photo" />
            </div>
            <div className="polaroid-caption">
              <span className="caption-text">@ T&T</span>
            </div>
          </div>
          {/* Card 5 */}
          <div className="polaroid">
            <div className="washi washi-rose" />
            <div className="sticker" style={{ top: '15px', right: '12px' }}>🍷</div>
            <div className="photo-placeholder">
              <img src={fav5Img} alt="Late Night Talks" className="polaroid-photo" />
            </div>
            <div className="polaroid-caption">
              <span className="caption-text">Beaches 🌊</span>
            </div>
          </div>
          {/* Card 6 */}
          <div className="polaroid">
            <div className="washi washi-gold" />
            <div className="sticker" style={{ bottom: '45px', right: '10px' }}>🤍</div>
            <div className="photo-placeholder">
              <img src={fav6Img} alt="Forever & Always" className="polaroid-photo" />
            </div>
            <div className="polaroid-caption">
              <span className="caption-text">Forever & Always</span>
            </div>
          </div>
        </div>
      </section>

      {/* MEMORY CARDS */}
      <section className="memory-section">
        <div className="spread-header" style={{ marginBottom: '28px' }}>
          <div className="section-label">✦ journal entries</div>
          <h2 className="section-title">Written in the Heart</h2>
          <div className="spread-rule" />
        </div>
        <div className="memory-card">
          <Paperclip top="-20px" right="40px" rotation="8deg" />
          <DriedFlower bottom="10px" right="-20px" rotation="-30deg" scale={0.8} />
          
          {/* Cute Cartoon Image at bottom right */}
          <img 
            src={firstMeetImg} 
            alt="Lovebirds doodle" 
            style={{
              position: 'absolute',
              bottom: '-15px',
              right: '-10px',
              width: '110px',
              opacity: 0.9,
              mixBlendMode: 'multiply',
              transform: 'rotate(-5deg)',
              pointerEvents: 'none',
              zIndex: 5
            }}
          />

          <div className="memory-date-tag">May 30, 2025</div>
          <div className="memory-title">The Day Everything Changed</div>
          <div className="memory-text">
            {/* We were both trying not to smile too much. We failed. ❤️ */}
            We stood a few feet apart, yet somehow it felt like destiny had already brought us together. Between shy smiles and stolen glances, our story quietly began.
            {/* You walked down that aisle in white and I forgot how to breathe. Every promise felt like a forever I was ready for. */}
          </div>
          <div className="memory-stickers">
            <span className="sticker-pill">💍 Beginning of Forever</span>
          </div>
        </div>
        <div className="memory-card" style={{ borderLeftColor: 'var(--sage)', minHeight: '220px' }}>
          <WashiTape top="-12px" left="30px" color="var(--sage-light)" width="120px" height="30px" rotation="-2deg" />
          <Stamp top="62%" right="-8%" size="100px" color="rgba(121, 137, 115, 0.4)" rotation="-25deg" />
          
          {/* Photo floated to the left to let text wrap around it */}
          <img 
            src={firstPhotoImg} 
            alt="First Photo" 
            style={{
              float: 'left',
              width: '95px',
              border: '6px solid #FFFEF9',
              boxShadow: '0 4px 12px rgba(44, 26, 14, 0.15)',
              transform: 'rotate(-4deg)',
              margin: '15px 20px 10px -5px',
              position: 'relative',
              zIndex: 5
            }}
          />

          <div style={{ position: 'relative', zIndex: 6 }}>
            <div className="memory-date-tag" style={{ color: 'var(--sage)' }}>July 24 2025</div>
            <div className="memory-title">Our First Photo, and hug</div>
            <div className="memory-text" style={{ paddingRight: '10px' }}>
              Our First Hug 🤗, Home at Last 
              I still remember the warmth of your arms the first time we hugged. 
            </div>
            <div className="memory-stickers">
              {/* Keeping empty stickers if user wants to fill them later */}
            </div>
          </div>
          <div style={{ clear: 'both' }}></div>
        </div>
        <div className="memory-card" style={{ borderLeftColor: 'var(--gold)' }}>
          {/* Cute Cartoon Image peeking from the top */}
          <img 
            src={firstEidImg} 
            alt="Lovebirds doodle" 
            style={{
              position: 'absolute',
              top: '-30px',
              right: '30px',
              width: '115px',
              opacity: 0.9,
              mixBlendMode: 'multiply',
              transform: 'rotate(-8deg)',
              pointerEvents: 'none',
              zIndex: 5
            }}
          />
          <div className="memory-date-tag" style={{ color: 'var(--gold)' }}>03 . 21 . 2026</div>
          <div className="memory-title">The First EID</div>
          <div className="memory-text">
            Our first Eid. Our first blessing together.
            A blessed day, a beautiful memory, a forever kind of love. ❤️🌙
          </div>
          <div className="memory-stickers">
            {/* <span className="sticker-pill"></span> */}
            {/* <span className="sticker-pill"></span> */}
          </div>
        </div>
      </section>

      {/* TIMELINE — NOTICEBOARD */}
      <section className="timeline-section">
        <div className="tl-line" />
        <div className="spread-header" style={{ marginBottom: '48px' }}>
          <div className="section-label">✦ our chapters</div>
          <h2 className="section-title">The Timeline of Us</h2>
          <div className="spread-rule" />
        </div>

        {timelineData.map((item, i) => {
          const isEven = i % 2 === 0;
          const tilt = isEven ? '-1.8deg' : '1.4deg';
          const delay = `${(i % 5) * 100}ms`;
          
          return (
            <div className="tl-item" key={i}>
              <div className="tl-node">
                <div className="tl-dot" style={{ background: item.color, boxShadow: `0 0 0 4px ${item.color}40` }} />
                <div className="tl-year-label" style={{ background: item.color, fontSize: '0.8rem', padding: '2px 8px' }}>
                  {item.date.split(',')[0].split(' ')[0].substring(0, 3)} {item.date.split(',')[0].split(' ')[1]}
                </div>
              </div>
              <div className="tl-pin-card" style={{ '--card-tilt': tilt, '--pin-delay': delay, '--pin-color': item.color }}>
                <div className="tl-pushpin" />
                <TimelineStackedPhoto images={item.images} title={item.title} />
                <div className="tl-card-body">
              <span className="tl-card-emoji">{item.emoji}</span>
                  <div className="tl-card-title">{item.title}</div>
                  <p className="tl-card-event">{item.description}</p>
                </div>
              </div>
            </div>
          );
        })}

      </section>

      {/* NEW PHOTO SHOWCASE SECTION */}
      <section className="photo-showcase-section" style={{ position: 'relative' }}>
        <div className="floating-circles">
          {showcaseData.floatingCircles.map((circle) => (
            <img 
              key={circle.id} 
              src={circle.src} 
              className="float-circle" 
              style={circle.style} 
              alt={`float ${circle.id}`} 
            />
          ))}
        </div>

        <div className="spread-header" style={{ marginBottom: '20px', position: 'relative', zIndex: 2 }}>
          <div className="section-label">✦ beautiful memories</div>
          <h2 className="section-title">The Journey in Frames</h2>
          <div className="spread-rule" />
        </div>

        {/* Layout 1: Journey Row */}
        <div className="layout-row">
          {showcaseData.journeyRow.map((imgSrc, index) => (
            <div className="row-item" key={`row-${index}`}>
              <img src={imgSrc} alt={`Memory ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* Layout 2: Bento Grid */}
        <div className="layout-bento">
          {showcaseData.bentoGrid.map((imgSrc, index) => (
            <div className={`bento-item bento-${index + 1}`} key={`bento-${index}`}>
              <img src={imgSrc} alt={`Memory ${index + 6}`} />
            </div>
          ))}
        </div>

        {/* Layout 3: Masonry Grid */}
        <div className="layout-masonry">
          {showcaseData.masonryGrid.map((item, index) => {
            const imgSrc = typeof item === 'string' ? item : item.src;
            const rotation = typeof item === 'object' && item.rotation ? item.rotation : '0deg';

            return (
              <div 
                className="masonry-item" 
                key={`masonry-${index}`}
                style={{ transform: `rotate(${rotation})` }}
              >
                <img src={imgSrc} alt={`Memory ${index + 11}`} />
              </div>
            );
          })}
        </div>
      </section>

      {/* CHAPTER TRANSITION SECTION */}
      <section className="chapter-transition-section">
        <div className="chapter-transition-container">
          <div className="chapter-flourish">❦</div>
          <h2 className="chapter-title">And so, our first chapter finds its beautiful end...</h2>
          <h3 className="chapter-subtitle">giving way to a new chapter we’ve only just begun to write.</h3>
          <div className="chapter-divider-line"></div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="quote-section">
        <span className="quote-mark">&quot;</span>
        <p className="quote-text">
          In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.
        </p>
        <div className="quote-attr">— Anonymous</div>
      </section>

      {/* RIPPED PAPER DIVIDER */}
      <TornPaperEdge topColor="var(--espresso)" bottomColor="var(--ivory)" />

      {/* LOVE FOOTER */}
      <section className="love-footer">
        <span className="love-footer-icon">🌹</span>
        <div className="flourish">~ ~ ~</div>
        <div className="love-footer-title">To my forever</div>
        <p className="love-footer-text">
          Every page of this journal is proof that choosing you was the best story I ever started.
        </p>
        <a href="/timeline" className="love-cta">Renew Contract</a>
        <div className="footer-note">with love, always — July 24, 2025</div>
      </section>
      {/* FILM REEL SECTION */}
      <section className="film-reel-section" style={{ padding: 0, height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--ivory, #FFFEF9)' }}>
        <div style={{ paddingTop: '20px', paddingBottom: '20px', flexShrink: 0 }}>
          <div className="section-label" style={{ color: 'var(--gold, #C5A059)' }}>✦ a glimpse inside</div>
          <h2 className="section-title" style={{ color: 'var(--espresso, #2C1A0E)' }}>Moments in Motion</h2>
          <div className="spread-rule" style={{ width: '40px', height: '2px', background: 'var(--gold, #C5A059)', margin: '14px auto 0' }} />
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <ReelsShowcase />
        </div>
      </section>
    </>
  );
}



    //  <section className="film-reel-section">
    //     <div className="section-label">✦ a glimpse inside</div>
    //     <h2 className="section-title">Moments in Motion</h2>
    //     <div className="spread-rule" style={{ width: '40px', height: '2px', background: 'var(--gold)', margin: '14px auto 30px' }} />
        
    //     <div className="film-strip">
    //       <div className="sprocket-holes left"></div>
    //       <div className="film-frames-container">
    //         {showcaseData.filmReelVideos.map((videoSrc, index) => (
    //           <div className="film-frame" key={`film-${index}`}>
    //             <video 
    //               src={videoSrc} 
    //               autoPlay 
    //               loop 
    //               muted 
    //               playsInline
    //               className="film-video"
    //             />
    //           </div>
    //         ))}
    //       </div>
    //       <div className="sprocket-holes right"></div>
    //     </div>
    //   </section>