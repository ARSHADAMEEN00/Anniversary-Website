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
          <p className="text-sm font-black uppercase tracking-[0.34em] text-lightBlue-900 dark:text-lightBlue-200">
            Renewal Certificate
          </p>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">Officially renewed. Very serious.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-relaxed text-lightBlue-950/75 dark:text-lightBlue-100/75">
            Your certificate is ready for saving, sharing, and emotionally waving around.
          </p>
        </div>

        <CertificateCard ref={certificateRef} />

        <GlassCard className="mx-auto mt-8 max-w-3xl p-6 text-center">
          <p className="font-script text-4xl text-lightBlue-900 dark:text-lightBlue-100 sm:text-5xl">
            <Typewriter
              speed={55}
              text={'I would still choose you. In every lifetime. In every version of our story. Happy Anniversary ❤️'}
            />
          </p>

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
            <p className="mt-4 text-sm font-bold text-lightBlue-800 dark:text-lightBlue-100">{status}</p>
          ) : null}
        </GlassCard>
      </div>
    </PageShell>
  );
}
