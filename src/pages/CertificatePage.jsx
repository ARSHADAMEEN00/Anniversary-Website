import { useRef, useState } from 'react';
import { Download, FileDown, Share2 } from 'lucide-react';
import CertificateCard from '../components/CertificateCard.jsx';
import GlassCard from '../components/GlassCard.jsx';
import PageShell from '../components/PageShell.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import Typewriter from '../components/Typewriter.jsx';
import {
  downloadElementAsPdf,
  downloadElementAsPng,
  shareCertificate,
} from '../utils/exportCertificate.js';

export default function CertificatePage() {
  const certificateRef = useRef(null);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const runExport = async (task, successMessage) => {
    try {
      setBusy(true);
      setStatus('');
      await task(certificateRef.current);
      setStatus(successMessage);
    } catch (error) {
      setStatus(error?.message || 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <PageShell className="!h-auto !min-h-screen !overflow-visible pb-24 pt-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.34em',
              color: '#C9963A',
            }}
          >
            Renewal Certificate
          </p>

          {/* Gold divider */}
          <div
            style={{
              width: 48,
              height: 1,
              background: 'linear-gradient(to right, transparent, #C9963A, transparent)',
              margin: '14px auto',
            }}
          />

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#2C1A0E',
              lineHeight: 1.1,
              marginTop: 4,
            }}
          >
            Officially renewed. Very serious.
          </h1>
          <p
            className="mx-auto mt-5 max-w-2xl"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'rgba(61,35,20,0.72)',
            }}
          >
            Your certificate is ready for saving, sharing, and emotionally waving around.
          </p>
        </div>

        <CertificateCard ref={certificateRef} />

        <GlassCard className="mx-auto mt-8 max-w-3xl p-6 text-center">
          <p
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
              color: '#3D2314',
              lineHeight: 1.5,
            }}
          >
            <Typewriter
              speed={55}
              text={'I would still choose you. In every lifetime. In every version of our story. Happy Anniversary ❤️'}
            />
          </p>

          {/* Decorative flourish */}
          <div
            style={{
              width: 48,
              height: 1,
              background: 'linear-gradient(to right, transparent, #C9963A, transparent)',
              margin: '20px auto',
            }}
          />

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <PrimaryButton
              disabled={busy}
              icon={<Download size={18} />}
              onClick={() =>
                runExport(downloadElementAsPng, 'Certificate PNG download started.')
              }
            >
              Download PNG
            </PrimaryButton>
            <PrimaryButton
              disabled={busy}
              icon={<FileDown size={18} />}
              onClick={() =>
                runExport(downloadElementAsPdf, 'Certificate PDF download started.')
              }
            >
              Download PDF
            </PrimaryButton>
            <PrimaryButton
              disabled={busy}
              icon={<Share2 size={18} />}
              onClick={() => runExport(shareCertificate, 'Share action ready.')}
            >
              Share
            </PrimaryButton>
          </div>

          {status ? (
            <p
              className="mt-4 text-sm font-bold"
              style={{ color: '#8FAE8B', fontFamily: "'Cormorant Garamond', serif" }}
            >
              {status}
            </p>
          ) : null}
        </GlassCard>
      </div>
    </PageShell>
  );
}
