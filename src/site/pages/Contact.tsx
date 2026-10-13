'use client';

import { useState } from 'react';
import { Link } from '@/lib/router-compat';
import { useReveal } from '../hooks/useReveal';

type FormMode = 'general' | 'custom';

export default function Contact() {
  const heroRef = useReveal();
  const formRef = useReveal();
  const infoRef = useReveal();

  const [mode, setMode] = useState<FormMode>('general');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    customRequest: '',
    preferredDate: '',
    budget: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'A valid email is required';
    if (!form.message.trim() && mode === 'general') e.message = 'Please tell us how we can help';
    if (!form.customRequest.trim() && mode === 'custom') e.customRequest = 'Please describe your vision';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: '' }));
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1400&q=80)' }}
        />
        <div ref={heroRef} className="reveal relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-luxury uppercase text-stone mb-4">We're Here For You</p>
          <h1 className="font-editorial text-5xl md:text-7xl text-espresso mb-6 leading-tight">
            Your Concierge
          </h1>
          <p className="text-base text-stone leading-relaxed max-w-lg mx-auto">
            Whether you have a question, a special request, or simply want to talk through your
            wellness journey — our team is here to listen.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div ref={formRef} className="reveal lg:col-span-3">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-espresso/10 flex items-center justify-center mx-auto mb-6">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-espresso">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h2 className="font-editorial text-4xl text-espresso mb-4">Demo message complete.</h2>
                  <p className="text-base text-stone leading-relaxed max-w-sm mx-auto mb-8">
                    This demo shows the contact flow. No message was sent.
                  </p>
                  <Link
                    to="/"
                    className="btn-luxury inline-flex px-8 py-4 bg-espresso text-cream text-xs tracking-luxury uppercase hover:bg-bark transition-colors duration-300"
                  >
                    Return Home
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <p className="text-sm text-stone mb-6">Demo contact form. Use fictional information; no message is sent.</p>
                  {/* Mode toggle */}
                  <div className="flex mb-8 border border-oat">
                    <button
                      type="button"
                      onClick={() => setMode('general')}
                      className={`flex-1 py-3 text-xs tracking-luxury uppercase transition-colors duration-300 ${
                        mode === 'general' ? 'bg-espresso text-cream' : 'text-stone hover:bg-parchment hover:text-espresso'
                      }`}
                    >
                      General Enquiry
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('custom')}
                      className={`flex-1 py-3 text-xs tracking-luxury uppercase border-l border-oat transition-colors duration-300 ${
                        mode === 'custom' ? 'bg-espresso text-cream' : 'text-stone hover:bg-parchment hover:text-espresso'
                      }`}
                    >
                      Custom Experience
                    </button>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs tracking-luxury uppercase text-stone block mb-2">Name</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => update('name', (e.target as HTMLInputElement).value)}
                          className={`w-full px-4 py-3 bg-card border text-sm text-espresso focus:outline-none focus:border-latte transition-all duration-300 ${errors.name ? 'border-red-400' : 'border-oat'}`}
                          placeholder="Your full name"
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="text-xs tracking-luxury uppercase text-stone block mb-2">Email</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => update('email', (e.target as HTMLInputElement).value)}
                          className={`w-full px-4 py-3 bg-card border text-sm text-espresso focus:outline-none focus:border-latte transition-all duration-300 ${errors.email ? 'border-red-400' : 'border-oat'}`}
                          placeholder="your@email.com"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs tracking-luxury uppercase text-stone block mb-2">Phone (optional)</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update('phone', (e.target as HTMLInputElement).value)}
                        className="w-full px-4 py-3 bg-card border border-oat text-sm text-espresso focus:outline-none focus:border-latte transition-all duration-300"
                        placeholder="+44 7700 000000"
                      />
                    </div>

                    {mode === 'general' ? (
                      <div>
                        <label className="text-xs tracking-luxury uppercase text-stone block mb-2">Message</label>
                        <textarea
                          value={form.message}
                          onChange={(e) => update('message', (e.target as HTMLTextAreaElement).value)}
                          rows={5}
                          className={`w-full px-4 py-3 bg-card border text-sm text-espresso focus:outline-none focus:border-latte transition-all duration-300 resize-none ${errors.message ? 'border-red-400' : 'border-oat'}`}
                          placeholder="How can we help you today?"
                        />
                        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                      </div>
                    ) : (
                      <>
                        <div>
                          <label className="text-xs tracking-luxury uppercase text-stone block mb-2">Describe Your Vision</label>
                          <textarea
                            value={form.customRequest}
                            onChange={(e) => update('customRequest', (e.target as HTMLTextAreaElement).value)}
                            rows={4}
                            className={`w-full px-4 py-3 bg-card border text-sm text-espresso focus:outline-none focus:border-latte transition-all duration-300 resize-none ${errors.customRequest ? 'border-red-400' : 'border-oat'}`}
                            placeholder="Tell us about the experience you have in mind — occasion, preferences, intentions…"
                          />
                          {errors.customRequest && <p className="text-xs text-red-500 mt-1">{errors.customRequest}</p>}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="text-xs tracking-luxury uppercase text-stone block mb-2">Preferred Date</label>
                            <input
                              type="date"
                              value={form.preferredDate}
                              onChange={(e) => update('preferredDate', (e.target as HTMLInputElement).value)}
                              className="w-full px-4 py-3 bg-card border border-oat text-sm text-espresso focus:outline-none focus:border-latte transition-all duration-300"
                            />
                          </div>
                          <div>
                            <label className="text-xs tracking-luxury uppercase text-stone block mb-2">Budget Range</label>
                            <select
                              value={form.budget}
                              onChange={(e) => update('budget', (e.target as HTMLSelectElement).value)}
                              className="w-full px-4 py-3 bg-card border border-oat text-sm text-espresso focus:outline-none focus:border-latte transition-all duration-300"
                            >
                              <option value="">Select a range</option>
                              <option value="100-250">£100 – £250</option>
                              <option value="250-500">£250 – £500</option>
                              <option value="500-1000">£500 – £1,000</option>
                              <option value="1000+">£1,000+</option>
                            </select>
                          </div>
                        </div>
                      </>
                    )}

                    <button
                      type="submit"
                      className="btn-luxury w-full py-4 bg-espresso text-cream text-xs tracking-luxury uppercase hover:bg-bark transition-colors duration-300"
                    >
                      {mode === 'general' ? 'Send Message' : 'Request Custom Experience'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <div ref={infoRef} className="reveal lg:col-span-2 space-y-8">
              {/* WhatsApp */}
              <div className="bg-parchment p-6 border border-oat">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#25D366]/15 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-editorial text-lg text-espresso">WhatsApp Concierge</p>
                    <p className="text-xs text-stone">Instant messaging support</p>
                  </div>
                </div>
                <p className="text-sm text-stone leading-relaxed mb-4">
                  Prefer to chat? Message our concierge team directly on WhatsApp for immediate
                  assistance with bookings, recommendations, and bespoke requests.
                </p>
                <a
                  href="https://wa.me/442071234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white text-xs tracking-luxury uppercase hover:bg-[#20b858] transition-colors duration-300"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Message Us
                </a>
              </div>

              {/* Visit */}
              <div className="bg-parchment p-6 border border-oat">
                <p className="text-xs tracking-luxury uppercase text-stone mb-4">Visit Us</p>
                <div className="space-y-2 text-sm text-espresso mb-4">
                  <p>12 Botanical Lane</p>
                  <p>Mayfair, London W1K 4PL</p>
                </div>
                <div className="divider-luxury mb-4" />
                <p className="text-xs tracking-luxury uppercase text-stone mb-3">Opening Hours</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone">Monday – Friday</span>
                    <span className="text-espresso">9:00 – 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone">Saturday</span>
                    <span className="text-espresso">9:00 – 19:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone">Sunday</span>
                    <span className="text-espresso">10:00 – 18:00</span>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-parchment p-6 border border-oat">
                <p className="text-xs tracking-luxury uppercase text-stone mb-3">Call Us</p>
                <a
                  href="tel:+442071234567"
                  className="font-editorial text-2xl text-espresso hover:opacity-70 transition-opacity duration-300 block mb-1"
                >
                  +44 207 123 4567
                </a>
                <p className="text-xs text-stone">Available during opening hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

