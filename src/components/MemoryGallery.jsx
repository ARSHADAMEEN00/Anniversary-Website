import { motion } from 'framer-motion';
import { relationshipMoments } from '../data/couple.js';
import MemoryImage from './MemoryImage.jsx';

export default function MemoryGallery() {
  return (
    <section className="history-section mt-10" aria-labelledby="history-title">
      <div className="mb-7 px-1 text-left">
        <p className="history-kicker text-[0.65rem] font-black uppercase tracking-[0.28em]">
          Written together
        </p>
        <h2 id="history-title" className="history-heading mt-1 text-2xl font-black">
          Our History
        </h2>
      </div>

      <div className="history-list relative">
        {relationshipMoments.map((moment, index) => (
          <motion.article
            key={moment.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -18 : 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.2) }}
            className={`history-entry relative pb-10 last:pb-0 ${
              index % 2 === 0 ? 'history-entry-left' : 'history-entry-right'
            }`}
          >
            <span className="history-dot absolute top-0 grid h-7 w-7 place-items-center rounded-full">
              <span className="h-2 w-2 rounded-full" />
            </span>

            {index < relationshipMoments.length - 1 ? (
              <span className="history-connector" aria-hidden="true" />
            ) : null}

            <div className="history-content">
              <div className="history-copy">
                <p className="history-label text-[0.62rem] font-black uppercase tracking-[0.22em]">
                  {moment.label}
                </p>
                <h3 className="history-title mt-1 text-lg font-black">{moment.title}</h3>
              </div>

              <div className="history-photo mt-3 overflow-hidden rounded-[1.5rem]">
                <MemoryImage
                  moment={moment}
                  className="aspect-[16/10] w-full transition duration-500 hover:scale-[1.02] lg:aspect-[4/3]"
                  rounded=""
                />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
