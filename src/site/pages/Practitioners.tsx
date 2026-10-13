'use client';

import { Link } from '@/lib/router-compat';
import { practitioners } from '../data/practitioners';
import PractitionerCard from '../components/PractitionerCard';
import { useReveal } from '../hooks/useReveal';

export default function Practitioners() {
  const heroRef = useReveal();
  const gridRef = useReveal();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1400&q=80)' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div ref={heroRef} className="reveal">
            <p className="text-xs tracking-luxury uppercase text-stone mb-4">The Hands Behind the Ritual</p>
            <h1 className="font-editorial text-5xl md:text-7xl text-espresso mb-6 leading-tight">
              Our Practitioners
            </h1>
            <p className="text-base md:text-lg text-stone leading-relaxed max-w-xl mx-auto">
              Each member of our team is chosen not only for their technical mastery, but for their
              intuition, warmth, and genuine dedication to your wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pt-12 md:pt-20 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto">
          <div ref={gridRef} className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
            {practitioners.map((p) => (
              <PractitionerCard key={p.id} practitioner={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto text-center bg-parchment p-12 md:p-16">
          <p className="text-xs tracking-luxury uppercase text-stone mb-4">Personalised Care</p>
          <h2 className="font-editorial text-4xl md:text-5xl text-espresso mb-6">
            Not sure who to choose?
          </h2>
          <p className="text-base text-stone leading-relaxed mb-8 max-w-md mx-auto">
            Our concierge team will match you with the perfect practitioner based on your needs,
            preferences, and intentions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="btn-luxury px-8 py-4 bg-espresso text-cream text-xs tracking-luxury uppercase hover:bg-bark transition-colors duration-300"
            >
              Book an Experience
            </Link>
            <Link
              to="/contact"
              className="btn-luxury px-8 py-4 border border-oat text-espresso text-xs tracking-luxury uppercase hover:bg-beige/50 transition-colors duration-300"
            >
              Speak to Concierge
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

