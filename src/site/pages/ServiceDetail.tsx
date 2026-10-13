'use client';

import { useParams, Link, useNavigate } from '@/lib/router-compat';
import { useState, useEffect } from 'react';
import { getServiceById, services } from '../data/services';
import { getPractitionersForService } from '../data/practitioners';
import ServiceCard from '../components/ServiceCard';
import PractitionerCard from '../components/PractitionerCard';
import { useReveal } from '../hooks/useReveal';

function StickyBookCta({ serviceId, price }: { serviceId: string; price: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-20 md:bottom-8 right-6 z-40 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <Link
        to={`/book?service=${serviceId}`}
        className="btn-luxury flex items-center gap-3 px-6 py-3.5 bg-espresso text-cream rounded-full shadow-luxury-xl hover:bg-bark transition-colors duration-300"
      >
        <span className="text-xs tracking-luxury uppercase">Book Now</span>
        <span className="font-editorial text-lg">£{price}</span>
      </Link>
    </div>
  );
}

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = id ? getServiceById(id) : undefined;

  useEffect(() => {
    if (!service) navigate('/services', { replace: true });
  }, [service, navigate]);

  const practitioners = service ? getPractitionersForService(service.id) : [];
  const addOnServices = service
    ? service.addOns.map((aId) => services.find((s) => s.id === aId)).filter(Boolean)
    : [];

  const overviewRef = useReveal();
  const benefitsRef = useReveal();
  const expectRef = useReveal();
  const addOnsRef = useReveal();
  const practitionersRef = useReveal();

  if (!service) return null;

  const durationLabel =
    service.duration === 0
      ? 'Add-on'
      : service.duration < 60
      ? `${service.duration} min`
      : service.duration === 60
      ? '1 hour'
      : `${Math.floor(service.duration / 60)}h ${service.duration % 60 > 0 ? `${service.duration % 60}m` : ''}`.trim();

  return (
    <>
      <StickyBookCta serviceId={service.id} price={service.price} />

      {/* Full-bleed hero */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 overlay-dark-warm" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-12 md:px-16 md:pb-16">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-xs tracking-luxury uppercase text-cream/60 mb-3">{service.category}</p>
            <h1 className="font-editorial text-5xl md:text-7xl text-cream mb-4 leading-tight">
              {service.name}
            </h1>
            <p className="font-editorial text-xl md:text-2xl text-cream/80 italic mb-6">
              {service.tagline}
            </p>
            <div className="flex items-center gap-4 text-cream/70 text-sm">
              <span>{durationLabel}</span>
              <span className="w-px h-4 bg-cream/30" />
              <span className="font-editorial text-xl text-cream">£{service.price}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Overview */}
        <div ref={overviewRef} className="reveal mb-16 md:mb-20">
          <p className="text-xs tracking-luxury uppercase text-stone mb-4">Overview</p>
          <p className="font-editorial text-2xl md:text-3xl text-espresso leading-relaxed mb-6">
            {service.description}
          </p>
          <p className="text-base text-stone leading-relaxed italic border-l-2 border-oat pl-6">
            {service.sensoryDescription}
          </p>
        </div>

        <div className="divider-luxury mb-16 md:mb-20" />

        {/* What to Expect */}
        <div ref={expectRef} className="reveal mb-16 md:mb-20">
          <p className="text-xs tracking-luxury uppercase text-stone mb-4">What to Expect</p>
          <h2 className="font-editorial text-3xl md:text-4xl text-espresso mb-6">Your Journey</h2>
          <p className="text-base text-stone leading-relaxed">{service.whatToExpect}</p>
        </div>

        <div className="divider-luxury mb-16 md:mb-20" />

        {/* Benefits */}
        <div ref={benefitsRef} className="reveal mb-16 md:mb-20">
          <p className="text-xs tracking-luxury uppercase text-stone mb-4">Benefits</p>
          <h2 className="font-editorial text-3xl md:text-4xl text-espresso mb-8">What You'll Gain</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-parchment rounded-2xl">
                <span className="w-1.5 h-1.5 rounded-full bg-latte mt-2 flex-shrink-0" />
                <p className="text-sm text-espresso leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Duration & Pricing */}
        <div className="reveal mb-16 md:mb-20 bg-beige/40 rounded-2xl p-8 md:p-10" ref={useReveal()}>
          <p className="text-xs tracking-luxury uppercase text-stone mb-6">Duration & Pricing</p>
          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <p className="font-editorial text-4xl text-espresso mb-1">{durationLabel}</p>
              <p className="text-xs text-stone tracking-wide">Treatment Duration</p>
            </div>
            <div className="w-px bg-oat hidden sm:block" />
            <div>
              <p className="font-editorial text-4xl text-espresso mb-1">£{service.price}</p>
              <p className="text-xs text-stone tracking-wide">Per Session</p>
            </div>
          </div>
          <div className="mt-8">
            <Link
              to={`/book?service=${service.id}`}
              className="btn-luxury inline-flex items-center px-8 py-4 bg-espresso text-cream text-xs tracking-luxury uppercase rounded-full shadow-luxury hover:bg-bark transition-colors duration-300"
            >
              Reserve This Experience
            </Link>
          </div>
        </div>

        {/* Practitioners */}
        {practitioners.length > 0 && (
          <div ref={practitionersRef} className="reveal mb-16 md:mb-20">
            <p className="text-xs tracking-luxury uppercase text-stone mb-4">Your Practitioners</p>
            <h2 className="font-editorial text-3xl md:text-4xl text-espresso mb-8">
              Specialists in This Treatment
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {practitioners.map((p) => (
                <PractitionerCard key={p.id} practitioner={p} variant="compact" />
              ))}
            </div>
          </div>
        )}

        {/* Add-ons */}
        {addOnServices.length > 0 && (
          <div ref={addOnsRef} className="reveal">
            <p className="text-xs tracking-luxury uppercase text-stone mb-4">Enhance Your Experience</p>
            <h2 className="font-editorial text-3xl md:text-4xl text-espresso mb-8">
              Thoughtful Additions
            </h2>
            <div className="bg-parchment rounded-2xl p-6 md:p-8">
              {addOnServices.map((addon) =>
                addon ? (
                  <ServiceCard key={addon.id} service={addon} variant="compact" />
                ) : null
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

