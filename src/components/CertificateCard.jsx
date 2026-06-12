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
    <div className="mx-auto h-px w-40 bg-gradient-to-r from-transparent via-lightBlue-500 to-transparent" />
    <p className="mt-2 font-script text-2xl text-lightBlue-900 dark:text-lightBlue-100">{name}</p>
    <p className="text-[0.66rem] font-black uppercase tracking-[0.28em] text-lightBlue-900/80 dark:text-lightBlue-200/80">
      {label}
    </p>
  </div>
);

const CertificateCard = forwardRef(function CertificateCard(_, ref) {
  return (
    <article
      ref={ref}
      className="certificate-paper premium-border relative overflow-hidden rounded-[2rem] border-4 border-double border-lightBlue-400/70 p-6 text-center shadow-soft-blue dark:border-lightBlue-400/50 sm:p-10"
    >
      <div className="absolute left-6 top-6 text-3xl opacity-30">✦</div>
      <div className="absolute right-6 top-6 text-3xl opacity-30">✦</div>
      <div className="absolute bottom-6 left-6 text-3xl opacity-30">✦</div>
      <div className="absolute bottom-6 right-6 text-3xl opacity-30">✦</div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <p className="text-[0.68rem] font-black uppercase tracking-[0.36em] text-lightBlue-900 dark:text-lightBlue-300">
          Forever Department of Feelings
        </p>
        <h1 className="mt-3 text-2xl font-black tracking-wide text-lightBlue-950 dark:text-lightBlue-50 sm:text-4xl">
          OFFICIAL MARRIAGE RENEWAL CERTIFICATE
        </h1>
        <div className="mx-auto mt-5 h-1 w-36 rounded-full bg-gradient-to-r from-transparent via-lightBlue-500 to-transparent" />

        <div className="mx-auto mt-8 grid max-w-4xl items-center gap-8 md:grid-cols-[1fr_220px_1fr]">
          <div className="text-center md:text-right">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-lightBlue-900 dark:text-lightBlue-200">
              This certifies that
            </p>
            <h2 className="mt-3 font-script text-4xl text-lightBlue-900 dark:text-lightBlue-100 sm:text-5xl">
              {couple.wifeName}
            </h2>
          </div>

          <div className="mx-auto w-44 rounded-full border-4 border-lightBlue-400/70 bg-white p-2 shadow-soft-blue dark:bg-white/10">
            <MemoryImage moment={certificateMoment} className="aspect-square w-full" rounded="rounded-full" />
          </div>

          <div className="text-center md:text-left">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-lightBlue-900 dark:text-lightBlue-200">
              and
            </p>
            <h2 className="mt-3 font-script text-4xl text-lightBlue-900 dark:text-lightBlue-100 sm:text-5xl">
              {couple.husbandName}
            </h2>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-base font-semibold leading-relaxed text-lightBlue-950 dark:text-lightBlue-50/90 sm:text-lg">
          have successfully renewed their marriage contract with full emotional approval,
          premium cuddle coverage, and lifetime adventure privileges.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-lightBlue-400/30 bg-white/50 p-5 dark:bg-white/5">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-lightBlue-900 dark:text-lightBlue-300">Renewal Date</p>
            <p className="mt-2 text-xl font-black">{formatLongDate()}</p>
          </div>
          <div className="rounded-3xl border border-lightBlue-400/30 bg-white/50 p-5 dark:bg-white/5">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-lightBlue-900 dark:text-lightBlue-300">Status</p>
            <p className="mt-2 text-xl font-black">ACTIVE FOR LIFE ❤️</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-14">
          <Signature label="Wife Approval" name={couple.wifeName} />
          <div className="grid h-20 w-20 place-items-center rounded-full border border-lightBlue-400/40 bg-gradient-to-br from-lightBlue-100 to-cyan-100 text-3xl shadow-soft-blue dark:from-lightBlue-950 dark:to-cyan-950">
            ♾️
          </div>
          <Signature label="Husband Approval" name={couple.husbandName} />
        </div>
      </div>
    </article>
  );
});

export default CertificateCard;
