import { Link } from '@/lib/router-compat';
import type { Practitioner } from '../data/practitioners';

interface PractitionerCardProps {
  practitioner: Practitioner;
  variant?: 'default' | 'compact';
}

export default function PractitionerCard({ practitioner, variant = 'default' }: PractitionerCardProps) {
  if (variant === 'compact') {
    return (
      <Link to={`/practitioners/${practitioner.id}`} className="group flex items-center gap-4">
        <div className="img-zoom w-14 h-14 overflow-hidden flex-shrink-0">
          <img
            src={practitioner.image}
            alt={practitioner.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <p className="font-editorial text-lg text-espresso group-hover:opacity-70 transition-opacity duration-300">
            {practitioner.name}
          </p>
          <p className="text-xs text-stone">{practitioner.title}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/practitioners/${practitioner.id}`} className="group block h-full">
      <div className="hover-lift overflow-hidden bg-card shadow-luxury flex flex-col h-full">
        {/* Fixed-ratio portrait — identical across all cards */}
        <div className="img-zoom aspect-portrait flex-shrink-0">
          <img
            src={practitioner.image}
            alt={practitioner.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        {/* Content grows to fill remaining height so all cards bottom-align */}
        <div className="p-5 md:p-6 flex flex-col flex-1">
          <h3 className="font-editorial text-2xl text-espresso mb-1 group-hover:opacity-80 transition-opacity duration-300">
            {practitioner.name}
          </h3>
          <p className="text-xs tracking-luxury uppercase text-stone mb-3">{practitioner.title}</p>
          {/* Bio takes all available space — no line-clamp so height is consistent */}
          <p className="text-sm text-stone leading-relaxed mb-4 flex-1">
            {practitioner.shortBio}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {practitioner.expertise.slice(0, 2).map((exp) => (
              <span
                key={exp}
                className="text-xs px-3 py-1 bg-beige/60 text-bark border border-beige"
              >
                {exp}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
