import { forwardRef } from 'react';
import { couple } from '../data/couple.js';
import { formatLongDate } from '../utils/date.js';
import { relationshipMoments } from '../data/couple.js';
import certificatePhoto from '../assets/Images/certificate_photo.jpg';

const Signature = ({ label, name }) => (
  <div className="text-center flex-1 min-w-0">
    <div
      className="w-16 sm:w-40"
      style={{
        margin: '0 auto',
        height: 1,
        background: 'linear-gradient(to right, transparent, #C9963A, transparent)',
      }}
    />
    <p
      className="mt-1 sm:mt-2 font-script text-base sm:text-2xl truncate"
      style={{ color: '#3D2314', fontFamily: "'Dancing Script', cursive" }}
    >
      {name}
    </p>
    <p
      style={{
        fontWeight: 700,
        textTransform: 'uppercase',
        color: 'rgba(61,35,20,0.75)',
        fontFamily: "'Cormorant Garamond', serif",
      }}
      className="text-[8px] sm:text-[10px] tracking-wider sm:tracking-widest"
    >
      {label}
    </p>
  </div>
);

const CertificateCard = forwardRef(function CertificateCard(_, ref) {
  return (
    <article
      ref={ref}
      className="certificate-paper relative overflow-hidden px-4 py-8 sm:px-10 sm:py-12 text-center"
      style={{
        border: '3px double rgba(201,150,58,0.55)',
        borderRadius: 4,
        boxShadow: '0 18px 60px rgba(196,145,122,0.24)',
      }}
    >
      {/* Corner flourishes */}
      <div className="absolute inset-3 sm:inset-6 border border-[rgba(201,150,58,0.18)] pointer-events-none" />
      <div className="absolute left-4 top-4 sm:left-6 sm:top-6 text-2xl sm:text-3xl opacity-30 select-none" style={{ color: '#C9963A' }}>✦</div>
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6 text-2xl sm:text-3xl opacity-30 select-none" style={{ color: '#C9963A' }}>✦</div>
      <div className="absolute bottom-4 left-4 sm:left-6 sm:bottom-6 text-2xl sm:text-3xl opacity-30 select-none" style={{ color: '#C9963A' }}>✦</div>
      <div className="absolute bottom-4 right-4 sm:right-6 sm:bottom-6 text-2xl sm:text-3xl opacity-30 select-none" style={{ color: '#C9963A' }}>✦</div>

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

        {/* Photo at the top */}
        <div
          className="mx-auto w-32 h-32 sm:w-40 sm:h-40 bg-white p-1.5 sm:p-2 mt-6 shrink-0"
          style={{
            borderRadius: '50%',
            border: '4px solid rgba(201,150,58,0.55)',
            boxShadow: '0 14px 36px rgba(196,145,122,0.24)',
          }}
        >
          <img src={certificatePhoto} alt="Certificate Portrait" className="aspect-square w-full h-full object-cover rounded-full" />
        </div>

        {/* Certified names layout */}
        <div className="mt-6 text-center">
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 mt-2">
            <h2
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                color: '#2C1A0E',
                lineHeight: 1.1,
              }}
            >
              {couple.wifeName}
            </h2>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '0.82rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.24em',
                color: '#3D2314',
              }}
              className="my-1 sm:my-0"
            >
              and
            </span>
            <h2
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                color: '#2C1A0E',
                lineHeight: 1.1,
              }}
            >
              {couple.husbandName}
            </h2>
          </div>
        </div>

        <p
          className="mx-auto mt-6 max-w-2xl text-sm sm:text-base md:text-lg"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            lineHeight: 1.8,
            color: 'rgba(61,35,20,0.8)',
          }}
        >
          have successfully renewed their marriage contract with full emotional approval,
          premium cuddle coverage, and lifetime adventure privileges.
        </p>

        <div className="mt-8 grid gap-4 grid-cols-2">
          <div
            className="p-3 sm:p-5"
            style={{
              border: '1px solid rgba(201,150,58,0.3)',
              background: 'rgba(253,248,242,0.7)',
              borderRadius: 2,
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#C9963A',
              }}
              className="text-[9px] sm:text-[11px] tracking-wider sm:tracking-widest"
            >
              Renewal Date
            </p>
            <p
              className="mt-1 sm:mt-2 text-xs sm:text-xl font-medium sm:font-normal"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#2C1A0E' }}
            >
              {formatLongDate()}
            </p>
          </div>
          <div
            className="p-3 sm:p-5"
            style={{
              border: '1px solid rgba(201,150,58,0.3)',
              background: 'rgba(253,248,242,0.7)',
              borderRadius: 2,
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#C9963A',
              }}
              className="text-[9px] sm:text-[11px] tracking-wider sm:tracking-widest"
            >
              Status
            </p>
            <p
              className="mt-1 sm:mt-2 text-xs sm:text-xl font-medium sm:font-normal"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#2C1A0E' }}
            >
              ACTIVE FOR LIFE ❤️
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between sm:justify-center gap-2 sm:gap-14">
          <Signature label="Wife Approval" name={couple.wifeName} />
          <div
            className="grid h-12 w-12 sm:h-20 sm:w-20 shrink-0 place-items-center rounded-full text-xl sm:text-3xl"
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
