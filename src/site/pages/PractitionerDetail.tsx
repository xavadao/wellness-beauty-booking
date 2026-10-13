'use client';

import { useParams, useNavigate, Link } from '@/lib/router-compat';
import { useEffect } from 'react';
import { getPractitionerById } from '../data/practitioners';
import { getServiceById } from '../data/services';
import ServiceCard from '../components/ServiceCard';
import { useReveal } from '../hooks/useReveal';

export default function PractitionerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const practitioner = id ? getPractitionerById(id) : undefined;

  useEffect(() => {
    if (!practitioner) navigate('/practitioners', { replace: true });
  }, [practitioner, navigate]);

  const bioRef = useReveal();
  const certRef = useReveal();
  const treatRef = useReveal();

  if (!practitioner) return null;

  const signatureServices = practitioner.signatureTreatments
    .map((sid) => getServiceById(sid))
    .filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <img
          src={practitioner.image}
          alt={practitioner.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 overlay-dark-warm" />
        <div className="relative z-10 flex flex-col justify-end px-6 pb-12 md:px-16 md:pb-16 min-h-[60vh]">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-xs tracking-luxury uppercase text-cream/60 mb-3">
              {practitioner.yearsExperience} Years of Mastery
            </p>
            <h1 className="font-editorial text-5xl md:text-7xl text-cream mb-3 leading-tight">
              {practitioner.name}
            </h1>
            <p className="text-base text-cream/80 mb-6">{practitioner.title}</p>
            <Link
              to={`/book?practitioner=${practitioner.id}`}
              className="btn-luxury inline-flex items-center px-7 py-3.5 bg-cream text-espresso text-xs tracking-luxury uppercase hover:bg-parchment transition-colors duration-300"
            >
              Book with {practitioner.name.split(' ')[0]}
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Philosophy quote */}
        <div className="mb-16 md:mb-20 text-center">
          <p className="font-editorial text-2xl md:text-3xl text-espresso italic leading-relaxed max-w-2xl mx-auto">
            "{practitioner.philosophy}"
          </p>
        </div>

        <div className="divider-luxury mb-16 md:mb-20" />

        {/* Bio */}
        <div ref={bioRef} className="reveal mb-16 md:mb-20">
          <p className="text-xs tracking-luxury uppercase text-stone mb-4">About</p>
          <h2 className="font-editorial text-3xl md:text-4xl text-espresso mb-6">
            The Story of {practitioner.name.split(' ')[0]}
          </h2>
          <p className="text-base text-stone leading-relaxed">{practitioner.bio}</p>
        </div>

        <div className="divider-luxury mb-16 md:mb-20" />

        {/* Expertise & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 md:mb-20">
          <div ref={bioRef} className="reveal">
            <p className="text-xs tracking-luxury uppercase text-stone mb-4">Areas of Expertise</p>
            <div className="flex flex-wrap gap-2">
              {practitioner.expertise.map((exp) => (
                <span key={exp} className="px-4 py-2 bg-beige/60 text-bark text-sm border border-oat/60 text-xs tracking-wide">
                  {exp}
                </span>
              ))}
            </div>
          </div>
          <div ref={certRef} className="reveal">
            <p className="text-xs tracking-luxury uppercase text-stone mb-4">Certifications</p>
            <div className="space-y-2">
              {practitioner.certifications.map((cert) => (
                <div key={cert} className="flex items-start gap-3">
                  <span className="w-1 h-1 bg-latte mt-2.5 flex-shrink-0" />
                  <p className="text-sm text-espresso leading-relaxed">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="divider-luxury mb-16 md:mb-20" />

        {/* Signature Treatments */}
        {signatureServices.length > 0 && (
          <div ref={treatRef} className="reveal">
            <p className="text-xs tracking-luxury uppercase text-stone mb-4">Signature Treatments</p>
            <h2 className="font-editorial text-3xl md:text-4xl text-espresso mb-8">
              {practitioner.name.split(' ')[0]}'s Specialities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {signatureServices.map((s) =>
                s ? <ServiceCard key={s.id} service={s} /> : null
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

