import { forwardRef } from 'react';
import { couple } from '../data/couple.js';
import { formatLongDate } from '../utils/date.js';
import { relationshipMoments } from '../data/couple.js';
import MemoryImage from './MemoryImage.jsx';

const certificateMoment =
  relationshipMoments.find((moment) => moment.id === couple.certificatePhotoMomentId) ||
  relationshipMoments[0];

const Signature = ({ label, name }) => (
  <div className="text-center">
    <div
      style={{
        margin: '0 auto',
        height: 1,
        width: 160,
        background: 'linear-gradient(to right, transparent, #C9963A, transparent)',
      }}
    />
    <p
      className="mt-2 font-script text-2xl"
      style={{ color: '#3D2314', fontFamily: "'Dancing Script', cursive" }}
    >
      {name}
    </p>
    <p
      style={{
        fontSize: '0.66rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.28em',
        color: 'rgba(61,35,20,0.75)',
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      {label}
    </p>
  </div>
);

const CertificateCard = forwardRef(function CertificateCard(_, ref) {
  return (
    <article
      ref={ref}
      className="certificate-paper relative overflow-hidden p-6 text-center sm:p-10"
      style={{
        border: '3px double rgba(201,150,58,0.55)',
        borderRadius: 4,
        boxShadow: '0 18px 60px rgba(196,145,122,0.24)',
      }}
    >
      {/* Corner flourishes */}
      <div
        style={{
          position: 'absolute',
          top: 24, left: 24, right: 24, bottom: 24,
          border: '1px solid rgba(201,150,58,0.18)',
          pointerEvents: 'none',
        }}
      />
      <div className="absolute left-6 top-6 text-3xl opacity-30" style={{ color: '#C9963A' }}>✦</div>
      <div className="absolute right-6 top-6 text-3xl opacity-30" style={{ color: '#C9963A' }}>✦</div>
      <div className="absolute bottom-6 left-6 text-3xl opacity-30" style={{ color: '#C9963A' }}>✦</div>
      <div className="absolute bottom-6 right-6 text-3xl opacity-30" style={{ color: '#C9963A' }}>✦</div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '0.68rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.36em',
            color: '#C9963A',
          }}
        >
          Forever Department of Feelings
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.2rem, 4vw, 2.2rem)',
            fontWeight: 400,
            letterSpacing: '0.08em',
            color: '#2C1A0E',
            marginTop: 12,
          }}
        >
          OFFICIAL MARRIAGE RENEWAL CERTIFICATE
        </h1>
        <div
          style={{
            margin: '20px auto 0',
            height: 4,
            width: 144,
            borderRadius: 999,
            background: 'linear-gradient(to right, transparent, #C9963A, transparent)',
          }}
        />

        <div className="mx-auto mt-8 grid max-w-4xl items-center gap-8 md:grid-cols-[1fr_220px_1fr]">
          <div className="text-center md:text-right">
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '0.82rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.24em',
                color: '#3D2314',
              }}
            >
              This certifies that
            </p>
            <h2
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                color: '#2C1A0E',
                marginTop: 12,
              }}
            >
              {couple.wifeName}
            </h2>
          </div>

          <div
            className="mx-auto w-44 bg-white p-2"
            style={{
              borderRadius: '50%',
              border: '4px solid rgba(201,150,58,0.55)',
              boxShadow: '0 14px 36px rgba(196,145,122,0.24)',
            }}
          >
            <MemoryImage moment={certificateMoment} className="aspect-square w-full" rounded="rounded-full" />
          </div>

          <div className="text-center md:text-left">
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '0.82rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.24em',
                color: '#3D2314',
              }}
            >
              and
            </p>
            <h2
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                color: '#2C1A0E',
                marginTop: 12,
              }}
            >
              {couple.husbandName}
            </h2>
          </div>
        </div>

        <p
          className="mx-auto mt-8 max-w-2xl sm:text-lg"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1rem',
            lineHeight: 1.8,
            color: 'rgba(61,35,20,0.8)',
          }}
        >
          have successfully renewed their marriage contract with full emotional approval,
          premium cuddle coverage, and lifetime adventure privileges.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div
            className="p-5"
            style={{
              border: '1px solid rgba(201,150,58,0.3)',
              background: 'rgba(253,248,242,0.7)',
              borderRadius: 2,
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.28em',
                color: '#C9963A',
              }}
            >
              Renewal Date
            </p>
            <p
              className="mt-2 text-xl"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#2C1A0E' }}
            >
              {formatLongDate()}
            </p>
          </div>
          <div
            className="p-5"
            style={{
              border: '1px solid rgba(201,150,58,0.3)',
              background: 'rgba(253,248,242,0.7)',
              borderRadius: 2,
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.28em',
                color: '#C9963A',
              }}
            >
              Status
            </p>
            <p
              className="mt-2 text-xl"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#2C1A0E' }}
            >
              ACTIVE FOR LIFE ❤️
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-14">
          <Signature label="Wife Approval" name={couple.wifeName} />
          <div
            className="grid h-20 w-20 place-items-center rounded-full text-3xl"
            style={{
              border: '1px solid rgba(201,150,58,0.4)',
              background: 'linear-gradient(135deg, #F2D9CE, #E8C97A)',
              boxShadow: '0 14px 32px rgba(196,145,122,0.24)',
            }}
          >
            ♾️
          </div>
          <Signature label="Husband Approval" name={couple.husbandName} />
        </div>
      </div>
    </article>
  );
});

export default CertificateCard;
