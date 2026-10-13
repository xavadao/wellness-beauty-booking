import { Link } from '@/lib/router-compat';
import type { Service } from '../data/services';

interface ServiceCardProps {
  service: Service;
  variant?: 'default' | 'featured' | 'compact';
}

export default function ServiceCard({ service, variant = 'default' }: ServiceCardProps) {
  const durationLabel =
    service.duration === 0
      ? 'Add-on'
      : service.duration < 60
      ? `${service.duration} min`
      : service.duration === 60
      ? '1 hour'
      : `${Math.floor(service.duration / 60)}h ${service.duration % 60 > 0 ? `${service.duration % 60}m` : ''}`.trim();

  if (variant === 'featured') {
    return (
      <Link to={`/services/${service.id}`} className="group block">
        <div className="hover-lift overflow-hidden bg-card shadow-luxury">
          <div className="img-zoom aspect-landscape">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-6 md:p-8">
            <p className="text-xs tracking-luxury uppercase text-stone mb-2">{service.category}</p>
            <h3 className="font-editorial text-2xl md:text-3xl text-espresso mb-2 group-hover:opacity-80 transition-opacity duration-300">
              {service.name}
            </h3>
            <p className="text-sm text-stone leading-relaxed mb-4 line-clamp-2">
              {service.sensoryDescription}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-stone">
                <span>{durationLabel}</span>
                <span className="w-px h-3 bg-oat" />
                <span className="font-editorial text-base text-espresso">£{service.price}</span>
              </div>
              <span className="text-xs tracking-luxury uppercase text-espresso opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                Discover →
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link to={`/services/${service.id}`} className="group flex items-center gap-4 py-4 border-b border-oat/50 last:border-0">
        <div className="img-zoom w-16 h-16 overflow-hidden flex-shrink-0">
          <img src={service.image} alt={service.name} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-editorial text-lg text-espresso group-hover:opacity-70 transition-opacity duration-300 truncate">
            {service.name}
          </p>
          <p className="text-xs text-stone">{durationLabel} · £{service.price}</p>
        </div>
        <span className="text-stone opacity-40 group-hover:opacity-80 transition-opacity duration-300 text-sm">→</span>
      </Link>
    );
  }

  // Default card
  return (
    <Link to={`/services/${service.id}`} className="group block">
      <div className="hover-lift overflow-hidden bg-card shadow-luxury h-full flex flex-col">
        <div className="img-zoom aspect-portrait">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-5 md:p-6 flex flex-col flex-1">
          <p className="text-xs tracking-luxury uppercase text-stone mb-2">{service.category}</p>
          <h3 className="font-editorial text-xl md:text-2xl text-espresso mb-2 group-hover:opacity-80 transition-opacity duration-300">
            {service.name}
          </h3>
          <p className="text-sm text-stone leading-relaxed mb-4 flex-1 line-clamp-3">
            {service.sensoryDescription}
          </p>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-oat/50">
            <div className="flex items-center gap-2 text-xs text-stone">
              <span>{durationLabel}</span>
              <span className="w-px h-3 bg-oat" />
              <span className="font-editorial text-base text-espresso">£{service.price}</span>
            </div>
            <span className="text-xs tracking-luxury uppercase text-espresso opacity-0 group-hover:opacity-60 transition-opacity duration-300">
              View →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
