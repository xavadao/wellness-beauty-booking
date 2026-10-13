'use client';

import { useState, useMemo } from 'react';
import { services, categories } from '../data/services';
import ServiceCard from '../components/ServiceCard';
import { useReveal } from '../hooks/useReveal';

const durations = [
  { value: 'all', label: 'Any Duration' },
  { value: 'short', label: 'Under 60 min' },
  { value: 'medium', label: '60–90 min' },
  { value: 'long', label: '90+ min' },
];

const priceRanges = [
  { value: 'all', label: 'Any Price' },
  { value: 'low', label: 'Under £150' },
  { value: 'mid', label: '£150–£250' },
  { value: 'high', label: '£250+' },
];

function HeroSection() {
  const ref = useReveal();
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1400&q=80)' }}
      />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div ref={ref} className="reveal">
          <p className="text-xs tracking-luxury uppercase text-stone mb-4">Our Offerings</p>
          <h1 className="font-editorial text-5xl md:text-7xl text-espresso mb-6 leading-tight">
            Curated Experiences
          </h1>
          <p className="text-base md:text-lg text-stone leading-relaxed max-w-xl mx-auto">
            Each treatment is a carefully composed ritual — designed to restore, transform, and elevate.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  const [category, setCategory] = useState('all');
  const [duration, setDuration] = useState('all');
  const [price, setPrice] = useState('all');

  const filtered = useMemo(() => {
    return services.filter((s) => {
      if (category !== 'all' && s.category !== category) return false;
      if (duration === 'short' && s.duration >= 60) return false;
      if (duration === 'medium' && (s.duration < 60 || s.duration > 90)) return false;
      if (duration === 'long' && s.duration <= 90) return false;
      if (price === 'low' && s.price >= 150) return false;
      if (price === 'mid' && (s.price < 150 || s.price > 250)) return false;
      if (price === 'high' && s.price <= 250) return false;
      return true;
    });
  }, [category, duration, price]);


  return (
    <>
      <HeroSection />

      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="sticky top-16 md:top-20 z-30 bg-cream/95 backdrop-blur-md py-4 mb-10 -mx-6 px-6 border-b border-oat/40">
            <div className="flex flex-wrap gap-3 md:gap-4 items-center">
              {/* Category filter */}
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value)}
                    className={`px-4 py-1.5 rounded-full text-xs tracking-luxury uppercase transition-all duration-300 btn-luxury ${
                      category === cat.value
                        ? 'bg-espresso text-cream'
                        : 'bg-beige/60 text-bark hover:bg-beige'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="hidden md:block w-px h-5 bg-oat mx-1" />

              {/* Duration filter */}
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="text-xs tracking-luxury uppercase bg-beige/60 text-bark border-0 rounded-full px-4 py-1.5 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-latte"
              >
                {durations.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>

              {/* Price filter */}
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="text-xs tracking-luxury uppercase bg-beige/60 text-bark border-0 rounded-full px-4 py-1.5 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-latte"
              >
                {priceRanges.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>

              <span className="ml-auto text-xs text-stone">
                {filtered.length} experience{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-editorial text-3xl text-espresso mb-3">No experiences found</p>
              <p className="text-stone text-sm">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

