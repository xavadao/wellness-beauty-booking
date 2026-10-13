'use client';

import { Link } from '@/lib/router-compat';
import { useReveal } from '../hooks/useReveal';

const values = [
  {
    title: 'Botanical Integrity',
    description:
      'Every ingredient we use is traceable, ethically sourced, and chosen for its proven efficacy. We believe that what touches your skin should be as pure as the intention behind it.',
    icon: '🌿',
  },
  {
    title: 'Craft Over Speed',
    description:
      'We refuse to rush. Every treatment is given the time it deserves — because true transformation cannot be hurried. Our practitioners are trained to listen before they act.',
    icon: '✦',
  },
  {
    title: 'Conscious Luxury',
    description:
      'Luxury, to us, means no compromise — not on quality, not on ethics, not on the environment. We are committed to sustainable practices at every level of our operation.',
    icon: '◇',
  },
  {
    title: 'The Whole Person',
    description:
      'We treat the body, but we honour the whole person. Our approach integrates physical, emotional, and energetic wellbeing — because true wellness is never just skin deep.',
    icon: '○',
  },
];

export default function About() {
  const storyRef = useReveal();
  const valuesRef = useReveal();
  const spaceRef = useReveal();
  const ctaRef = useReveal();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] overflow-hidden flex items-end">
        <img
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1400&q=80"
          alt="Serenova sanctuary"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 overlay-dark-warm" />
        <div className="relative z-10 px-6 pb-16 md:px-16 md:pb-20 max-w-4xl animate-fade-up">
          <p className="text-xs tracking-luxury uppercase text-cream/60 mb-4">Our Story</p>
          <h1 className="font-editorial text-5xl md:text-7xl lg:text-8xl text-cream leading-tight mb-6">
            Wellness,<br />Refined.
          </h1>
          <p className="text-base md:text-lg text-cream/80 max-w-lg leading-relaxed">
            Born from a belief that true luxury is not excess, but intention — Serenova is a
            sanctuary for those who seek more from their wellness.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="px-6 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div ref={storyRef} className="reveal">
              <p className="text-xs tracking-luxury uppercase text-stone mb-4">The Beginning</p>
              <h2 className="font-editorial text-4xl md:text-5xl text-espresso mb-6 leading-tight">
                A sanctuary born from a single question
              </h2>
              <p className="text-base text-stone leading-relaxed mb-5">
                Serenova was founded in 2018 by wellness practitioner Isabelle Moreau, who asked a
                simple question: why does luxury so often mean excess, when true indulgence is
                actually about restraint?
              </p>
              <p className="text-base text-stone leading-relaxed mb-5">
                She envisioned a space where every detail — from the temperature of the treatment
                room to the provenance of each botanical ingredient — was considered with the same
                care as the treatments themselves.
              </p>
              <p className="text-base text-stone leading-relaxed">
                What began as a single treatment room in Mayfair has grown into London's most
                quietly celebrated wellness destination — a place where clients return not just for
                results, but for the feeling of being truly cared for.
              </p>
            </div>
            <div className="relative">
              <div className="img-zoom overflow-hidden aspect-portrait shadow-luxury-xl">
                <img
                  src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80"
                  alt="Serenova treatment room"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 overflow-hidden shadow-luxury-lg hidden md:block">
                <img
                  src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80"
                  alt="Botanical ingredients"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-20 md:py-32 bg-parchment">
        <div className="max-w-7xl mx-auto">
          <div ref={valuesRef} className="reveal text-center mb-14 md:mb-16">
            <p className="text-xs tracking-luxury uppercase text-stone mb-4">What We Stand For</p>
            <h2 className="font-editorial text-4xl md:text-5xl text-espresso mb-5">Our Philosophy</h2>
            <p className="text-base text-stone leading-relaxed max-w-2xl mx-auto">
              We believe wellness is not a destination but a practice — one built on honesty,
              restraint, and deep respect for the body. These four principles guide every decision
              we make, from the treatments we offer to the people we invite into our space.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="reveal"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-editorial text-2xl text-espresso mb-3">{v.title}</h3>
                <p className="text-sm text-stone leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Space */}
      <section className="px-6 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div ref={spaceRef} className="reveal text-center mb-12">
            <p className="text-xs tracking-luxury uppercase text-stone mb-4">The Sanctuary</p>
            <h2 className="font-editorial text-4xl md:text-5xl text-espresso mb-6">
              Designed for stillness
            </h2>
            <p className="text-base text-stone leading-relaxed max-w-xl mx-auto">
              Our space was designed by architect Lena Hoffmann with a single brief: create a room
              that feels like a deep exhale. Natural materials, soft light, and considered silence
              are the foundations of every corner.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
              'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
              'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
              'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
              'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80',
              'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
            ].map((src, i) => (
              <div
                key={i}
                className={`img-zoom overflow-hidden shadow-luxury ${i === 0 ? 'col-span-2 md:col-span-1 row-span-2' : ''}`}
              >
                <img
                  src={src}
                  alt={`Serenova space ${i + 1}`}
                  className={`w-full object-cover ${i === 0 ? 'h-full min-h-[300px]' : 'aspect-landscape'}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 md:pb-32">
        <div ref={ctaRef} className="reveal max-w-3xl mx-auto text-center bg-espresso p-12 md:p-16">
          <p className="text-xs tracking-luxury uppercase text-cream/50 mb-4">Begin Your Journey</p>
          <h2 className="font-editorial text-4xl md:text-5xl text-cream mb-6">
            Experience Serenova
          </h2>
          <p className="text-base text-cream/70 leading-relaxed mb-8 max-w-md mx-auto">
            Every visit is a step toward a more intentional relationship with your own wellbeing.
            We'd love to welcome you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="btn-luxury px-8 py-4 bg-cream text-espresso text-xs tracking-luxury uppercase hover:bg-parchment transition-colors duration-300"
            >
              Book an Experience
            </Link>
            <Link
              to="/services"
              className="btn-luxury px-8 py-4 border border-cream/30 text-cream text-xs tracking-luxury uppercase hover:bg-cream/10 transition-colors duration-300"
            >
              Explore Treatments
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

