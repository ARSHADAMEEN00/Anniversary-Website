import React from 'react';
import { couple } from '../data/couple.js';
import TornPaperEdge from '../components/TornPaperEdge.jsx';
import WashiTape from '../components/WashiTape.jsx';
import Paperclip from '../components/Paperclip.jsx';
import Stamp from '../components/Stamp.jsx';
import DriedFlower from '../components/DriedFlower.jsx';
import './LandingPage.css';

export default function LandingPage() {
  const today = new Date();
  const weddingDateObj = new Date(couple.weddingDate);
  const timeDiff = Math.max(0, today.getTime() - weddingDateObj.getTime());
  const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
  const diffYears = Math.floor(diffDays / 365);
  const displayDays = diffDays.toLocaleString();

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
            <div className="photo-placeholder bg-rose-grad">
              <span className="photo-icon">📷</span>
            </div>
            <div className="polaroid-caption">
              <span className="caption-text">The Wedding Day</span>
            </div>
          </div>
          {/* Card 2 */}
          <div className="polaroid">
            <div className="washi washi-sage" />
            <div className="sticker" style={{ bottom: '46px', right: '8px' }}>🌊</div>
            <div className="photo-placeholder bg-sage-grad">
              <span className="photo-icon">📷</span>
            </div>
            <div className="polaroid-caption">
              <span className="caption-text">Goa, 2020</span>
            </div>
          </div>
          {/* Card 3 */}
          <div className="polaroid">
            <div className="washi washi-gold" />
            <Stamp top="65%" right="-10px" rotation="15deg" size="80px" />
            <div className="sticker" style={{ top: '12px', left: '10px' }}>✨</div>
            <div className="photo-placeholder bg-gold-grad">
              <span className="photo-icon">📷</span>
            </div>
            <div className="polaroid-caption">
              <span className="caption-text">Anniversary Trip</span>
            </div>
          </div>
          {/* Card 4 */}
          <div className="polaroid">
            <div className="washi washi-sage" />
            <div className="sticker" style={{ bottom: '40px', left: '10px' }}>🌿</div>
            <div className="photo-placeholder bg-cream-grad">
              <span className="photo-icon">📷</span>
            </div>
            <div className="polaroid-caption">
              <span className="caption-text">First Home</span>
            </div>
          </div>
          {/* Card 5 */}
          <div className="polaroid">
            <div className="washi washi-rose" />
            <div className="sticker" style={{ top: '15px', right: '12px' }}>🍷</div>
            <div className="photo-placeholder bg-mix-grad">
              <span className="photo-icon">📷</span>
            </div>
            <div className="polaroid-caption">
              <span className="caption-text">Late Night Talks</span>
            </div>
          </div>
          {/* Card 6 */}
          <div className="polaroid">
            <div className="washi washi-gold" />
            <div className="sticker" style={{ bottom: '45px', right: '10px' }}>🤍</div>
            <div className="photo-placeholder" style={{ background: 'linear-gradient(135deg, var(--blush), var(--parchment))' }}>
              <span className="photo-icon">📷</span>
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
          <div className="memory-date-tag">✦ July 24, 2025</div>
          <div className="memory-title">The Day Everything Changed</div>
          <div className="memory-text">
            You walked down that aisle in white and I forgot how to breathe. Every promise felt like a forever I was ready for.
          </div>
          <div className="memory-stickers">
            <span className="sticker-pill">💍 Kerala</span>
            <span className="sticker-pill">🌸 Monsoon</span>
            <span className="sticker-pill">💒 Church Wedding</span>
          </div>
        </div>
        <div className="memory-card" style={{ borderLeftColor: 'var(--sage)' }}>
          <WashiTape top="-12px" left="30px" color="var(--sage-light)" width="120px" height="30px" rotation="-2deg" />
          <Stamp top="20%" right="5%" size="100px" color="rgba(121, 137, 115, 0.4)" rotation="-25deg" />
          <div className="memory-date-tag" style={{ color: 'var(--sage)' }}>✦ December 2020</div>
          <div className="memory-title">Our First Home, Our First Christmas</div>
          <div className="memory-text">
            Tiny kitchen, mismatched mugs, fairy lights strung by hand. That was the best version of home we've ever made.
          </div>
          <div className="memory-stickers">
            <span className="sticker-pill">🏠 New Home</span>
            <span className="sticker-pill">🎄 First Christmas</span>
          </div>
        </div>
        <div className="memory-card" style={{ borderLeftColor: 'var(--gold)' }}>
          <div className="memory-date-tag" style={{ color: 'var(--gold)' }}>✦ 2023</div>
          <div className="memory-title">The Year We Grew</div>
          <div className="memory-text">
            Late nights and quiet mornings. You held everything together with a grace I still can't find words for.
          </div>
          <div className="memory-stickers">
            <span className="sticker-pill">🌿 Growth</span>
            <span className="sticker-pill">💛 Together</span>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="timeline-section">
        <div className="timeline-line" />
        <div className="spread-header" style={{ marginBottom: '36px' }}>
          <div className="section-label">✦ our chapters</div>
          <h2 className="section-title">The Timeline of Us</h2>
          <div className="spread-rule" />
        </div>
        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <span className="timeline-emoji">💍</span>
            <div className="timeline-year">2025</div>
            <div className="timeline-event">We said I do. The world stopped for a moment, just for us.</div>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot" style={{ background: 'var(--sage)', boxShadow: '0 0 0 3px var(--sage-light)' }} />
          <div className="timeline-content">
            <span className="timeline-emoji">🏠</span>
            <div className="timeline-year" style={{ color: 'var(--sage)' }}>2020</div>
            <div className="timeline-event">Our first home. Painted walls and second-hand furniture that felt like heaven.</div>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot" style={{ background: 'var(--gold)', boxShadow: '0 0 0 3px var(--gold-light)' }} />
          <div className="timeline-content">
            <span className="timeline-emoji">✈️</span>
            <div className="timeline-year" style={{ color: 'var(--gold)' }}>2022</div>
            <div className="timeline-event">First big trip together. You made every airport feel like an adventure.</div>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot" style={{ background: 'var(--rose)' }} />
          <div className="timeline-content">
            <span className="timeline-emoji">🌟</span>
            <div className="timeline-year">2026</div>
            <div className="timeline-event">Seven years deep, still learning why I love you more each morning.</div>
          </div>
        </div>
      </section>

      {/* COLLAGE SECTION */}
      <section className="collage-section">
        <div className="section-label">✦ a glimpse inside</div>
        <h2 className="section-title">Moments, Pinned</h2>
        <div className="spread-rule" style={{ width: '40px', height: '2px', background: 'var(--gold)', margin: '14px auto 0' }} />
        <div className="collage-grid">
          <div className="collage-item tall bg-rose-grad" style={{ gridColumn: '1' }}>
            <span className="photo-icon">📷</span>
            <div className="collage-label">First Dance</div>
          </div>
          <div className="collage-item bg-sage-grad">
            <span className="photo-icon">📷</span>
            <div className="collage-label">Morning Chai</div>
          </div>
          <div className="collage-item bg-gold-grad">
            <span className="photo-icon">📷</span>
            <div className="collage-label">Sunsets Together</div>
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="quote-section">
        <span className="quote-mark">"</span>
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
        <div className="footer-note">with love, always — June 12, 2026</div>
      </section>
    </>
  );
}
