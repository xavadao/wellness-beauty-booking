'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/lib/router-compat';
import { getFeaturedServices } from '../data/services';
import { practitioners } from '../data/practitioners';
import ServiceCard from '../components/ServiceCard';
import PractitionerCard from '../components/PractitionerCard';
import { useReveal } from '../hooks/useReveal';

const heroImages = [
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=85',
  'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1600&q=85',
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=85',
];

/** Wrapper that applies the scroll-reveal animation to any child. */
function RevealCard({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function HeroSection() {
  const [currentImg, setCurrentImg] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((i) => (i + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setParallaxY(window.scrollY * 0.35);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Parallax background images */}
      {heroImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: i === currentImg ? 1 : 0 }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            style={{ transform: `translateY(${parallaxY}px) scale(1.1)`, transformOrigin: 'center top' }}
          />
        </div>
      ))}

      {/* Warm overlay */}
      <div className="absolute inset-0 overlay-dark-warm" />
      <div className="absolute inset-0" style={{ background: 'rgba(61,53,48,0.18)' }} />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="animate-fade-in text-xs tracking-luxury uppercase text-cream/70 mb-6">
          Est. 2019 · London
        </p>
        <h1 className="animate-fade-up font-editorial text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-cream leading-none tracking-wide-xl mb-6 max-w-4xl">
          Wellness,<br />Refined.
        </h1>
        <p className="animate-fade-up-delay text-sm md:text-base text-cream/75 max-w-md leading-relaxed mb-10">
          A sanctuary where ancient ritual meets modern science. Every experience, crafted for you.
        </p>
        <div className="animate-fade-up-delay-2 flex flex-col sm:flex-row gap-4 items-center">
          <Link
            to="/book"
            className="btn-luxury px-8 py-4 bg-cream text-espresso text-xs tracking-luxury uppercase shadow-luxury-lg hover:bg-parchment transition-colors duration-300"
          >
            Book an Experience
          </Link>
          <Link
            to="/services"
            className="btn-luxury px-8 py-4 border border-cream/50 text-cream text-xs tracking-luxury uppercase hover:bg-cream/10 transition-colors duration-300"
          >
            Explore Services
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up-delay-3">
        <span className="text-xs tracking-luxury uppercase text-cream/50">Scroll</span>
        <div className="w-px h-8 bg-cream/30 animate-pulse" />
      </div>

      {/* Image dots */}
      <div className="absolute bottom-8 right-8 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImg(i)}
            className={`w-1.5 h-1.5 transition-all duration-500 ${i === currentImg ? 'bg-cream w-4' : 'bg-cream/40'}`}
          />
        ))}
      </div>
    </section>
  );
}

function IntroSection() {
  const ref = useReveal();
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div ref={ref} className="reveal">
          <p className="text-xs tracking-luxury uppercase text-stone mb-6">Our Philosophy</p>
          <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-espresso leading-tight mb-8">
            Where every detail is an act of care.
          </h2>
          <p className="text-base md:text-lg text-stone leading-relaxed max-w-2xl mx-auto">
            Serenova was born from a belief that true wellness is not a luxury — it is a necessity.
            We curate experiences that honour the body, calm the mind, and restore the spirit,
            using only the finest botanical ingredients and the most skilled hands.
          </p>
        </div>
      </div>
    </section>
  );
}

function FeaturedServicesSection() {
  const featured = getFeaturedServices();
  const titleRef = useReveal();

  return (
    <section className="py-16 md:py-24 px-6 bg-parchment">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="reveal flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
          <div>
            <p className="text-xs tracking-luxury uppercase text-stone mb-3">Signature Experiences</p>
            <h2 className="font-editorial text-4xl md:text-5xl text-espresso">Our Finest Rituals</h2>
          </div>
          <Link
            to="/services"
            className="text-xs tracking-luxury uppercase text-espresso opacity-60 hover:opacity-100 transition-opacity duration-300 self-start md:self-auto"
          >
            View All Experiences →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featured.map((service, i) => (
            <RevealCard key={service.id} delay={i * 120}>
              <ServiceCard service={service} variant="featured" />
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorialBanner() {
  const ref = useReveal();
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1400&q=80)' }}
      />
      <div className="absolute inset-0" style={{ background: 'rgba(61,53,48,0.55)' }} />
      <div ref={ref} className="reveal relative z-10 max-w-3xl mx-auto text-center px-6">
        <p className="text-xs tracking-luxury uppercase text-cream/60 mb-6">The Serenova Promise</p>
        <h2 className="font-editorial text-4xl md:text-6xl text-cream leading-tight mb-8">
          "Crafted from nature.<br />Delivered with precision."
        </h2>
        <p className="text-sm md:text-base text-cream/70 leading-relaxed max-w-xl mx-auto mb-10">
          Every product we use is ethically sourced, every technique refined over years of practice.
          We believe the most luxurious thing we can offer is our complete, undivided attention.
        </p>
        <Link
          to="/about"
          className="btn-luxury inline-flex items-center px-8 py-4 border border-cream/50 text-cream text-xs tracking-luxury uppercase hover:bg-cream/10 transition-colors duration-300"
        >
          Our Story
        </Link>
      </div>
    </section>
  );
}

function PractitionersSection() {
  const titleRef = useReveal();
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="reveal flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs tracking-luxury uppercase text-stone mb-3">The Team</p>
            <h2 className="font-editorial text-4xl md:text-5xl text-espresso">Meet Our Practitioners</h2>
          </div>
          <Link
            to="/practitioners"
            className="text-xs tracking-luxury uppercase text-espresso opacity-60 hover:opacity-100 transition-opacity duration-300 self-start md:self-auto"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {practitioners.map((p, i) => (
            <RevealCard key={p.id} delay={i * 100}>
              <PractitionerCard practitioner={p} />
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    { quote: 'The most transformative 90 minutes of my year. I left feeling like a completely different person.', author: 'Charlotte M.', treatment: 'Luminous Renewal Facial' },
    { quote: 'Marcus has hands that seem to know exactly where every knot lives. Truly extraordinary.', author: 'James T.', treatment: 'Signature Massage' },
    { quote: 'Amara\'s Sacred Earth Ritual is unlike anything I\'ve experienced. Pure magic.', author: 'Priya S.', treatment: 'Sacred Earth Body Ritual' },
  ];
  const ref = useReveal();

  return (
    <section className="py-16 md:py-24 px-6 bg-beige/30">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="reveal text-center mb-12">
          <p className="text-xs tracking-luxury uppercase text-stone mb-3">Testimonials</p>
          <h2 className="font-editorial text-4xl md:text-5xl text-espresso">Words from Our Guests</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <RevealCard key={i} delay={i * 120} className="bg-cream p-8 shadow-luxury border border-oat/40">
              <p className="font-editorial text-xl md:text-2xl text-espresso leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <div className="divider-luxury mb-4" />
              <p className="text-sm text-espresso font-medium">{t.author}</p>
              <p className="text-xs text-stone tracking-wide">{t.treatment}</p>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  const ref = useReveal();
  return (
    <section className="py-24 md:py-32 px-6 text-center">
      <div ref={ref} className="reveal max-w-2xl mx-auto">
        <p className="text-xs tracking-luxury uppercase text-stone mb-6">Begin Your Journey</p>
        <h2 className="font-editorial text-4xl md:text-6xl text-espresso mb-6 leading-tight">
          Reserve your moment of stillness.
        </h2>
        <p className="text-base text-stone leading-relaxed mb-10">
          Our concierge team is here to help you find the perfect experience. Book online or speak with us directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/book"
            className="btn-luxury px-10 py-4 bg-espresso text-cream text-xs tracking-luxury uppercase shadow-luxury-lg hover:bg-bark transition-colors duration-300"
          >
            Book an Experience
          </Link>
          <Link
            to="/contact"
            className="btn-luxury px-10 py-4 border border-oat text-espresso text-xs tracking-luxury uppercase hover:bg-beige/50 transition-colors duration-300"
          >
            Speak with Concierge
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <FeaturedServicesSection />
      <EditorialBanner />
      <PractitionersSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}

