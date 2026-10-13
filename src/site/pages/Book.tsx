'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, Link } from '@/lib/router-compat';
import { services, getServiceById } from '../data/services';
import { practitioners, getPractitionersForService } from '../data/practitioners';

// ─── Types ───────────────────────────────────────────────────────────────────
interface BookingState {
  serviceId: string;
  practitionerId: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
}

// ─── Step Indicator ──────────────────────────────────────────────────────────
function StepIndicator({ step, total }: { step: number; total: number }) {
  const labels = ['Service', 'Practitioner', 'Date & Time', 'Confirm'];
  return (
    <div className="flex items-center justify-center gap-0 mb-12">
      {labels.map((label, i) => {
        const num = i + 1;
        const active = num === step;
        const done = num < step;
        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 flex items-center justify-center text-xs transition-all duration-500 ${
                  done
                    ? 'bg-espresso text-cream'
                    : active
                    ? 'bg-espresso text-cream ring-4 ring-espresso/20'
                    : 'bg-beige text-stone'
                }`}
              >
                {done ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  num
                )}
              </div>
              <span className={`text-[9px] tracking-luxury uppercase hidden sm:block ${active ? 'text-espresso' : 'text-stone'}`}>
                {label}
              </span>
            </div>
            {i < total - 1 && (
              <div className={`w-12 md:w-20 h-px mx-2 mb-5 transition-all duration-500 ${done ? 'bg-espresso' : 'bg-oat'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 1: Select Service ───────────────────────────────────────────────────
function Step1({ booking, setBooking, onNext }: {
  booking: BookingState;
  setBooking: (b: BookingState) => void;
  onNext: () => void;
}) {
  const mainServices = services.filter((s) => s.duration > 0);
  return (
    <div>
      <h2 className="font-editorial text-3xl md:text-4xl text-espresso mb-2">Choose Your Experience</h2>
      <p className="text-sm text-stone mb-8">Select the treatment you'd like to book.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {mainServices.map((service) => {
          const selected = booking.serviceId === service.id;
          const dur = service.duration < 60
            ? `${service.duration} min`
            : service.duration === 60
            ? '1 hour'
            : `${Math.floor(service.duration / 60)}h ${service.duration % 60 > 0 ? `${service.duration % 60}m` : ''}`.trim();
          return (
            <button
              key={service.id}
              onClick={() => setBooking({ ...booking, serviceId: service.id, practitionerId: '' })}
              className={`text-left p-5 border transition-all duration-300 hover:shadow-luxury ${
                selected
                  ? 'border-espresso bg-espresso/5 shadow-luxury'
                  : 'border-oat bg-card hover:border-latte'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 overflow-hidden flex-shrink-0">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-editorial text-lg text-espresso leading-tight mb-1">{service.name}</p>
                  <p className="text-xs text-stone mb-2">{dur} · £{service.price}</p>
                  <p className="text-xs text-stone leading-relaxed line-clamp-2">{service.tagline}</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-1 transition-all duration-300 ${selected ? 'border-espresso bg-espresso' : 'border-oat'}`} />
              </div>
            </button>
          );
        })}
      </div>
      <button
        onClick={onNext}
        disabled={!booking.serviceId}
        className="btn-luxury w-full sm:w-auto px-10 py-4 bg-espresso text-cream text-xs tracking-luxury uppercase rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-bark transition-colors duration-300"
      >
        Continue →
      </button>
    </div>
  );
}

// ─── Step 2: Choose Practitioner ──────────────────────────────────────────────
function Step2({ booking, setBooking, onNext, onBack }: {
  booking: BookingState;
  setBooking: (b: BookingState) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const available = booking.serviceId
    ? getPractitionersForService(booking.serviceId)
    : practitioners;
  const allPractitioners = available.length > 0 ? available : practitioners;

  return (
    <div>
      <h2 className="font-editorial text-3xl md:text-4xl text-espresso mb-2">Choose Your Practitioner</h2>
      <p className="text-sm text-stone mb-8">Select who you'd like to work with, or let us choose for you.</p>

      {/* Any practitioner option */}
      <button
        onClick={() => setBooking({ ...booking, practitionerId: 'any' })}
        className={`w-full text-left p-5 rounded-2xl border mb-4 transition-all duration-300 ${
          booking.practitionerId === 'any'
            ? 'border-espresso bg-espresso/5 shadow-luxury'
            : 'border-oat bg-card hover:border-latte hover:shadow-luxury'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-beige flex items-center justify-center flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-stone">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <p className="font-editorial text-lg text-espresso">No preference</p>
            <p className="text-xs text-stone">We'll match you with the best available practitioner</p>
          </div>
          <div className={`ml-auto w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all duration-300 ${booking.practitionerId === 'any' ? 'border-espresso bg-espresso' : 'border-oat'}`} />
        </div>
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {allPractitioners.map((p) => {
          const selected = booking.practitionerId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setBooking({ ...booking, practitionerId: p.id })}
              className={`text-left p-5 rounded-2xl border transition-all duration-300 ${
                selected
                  ? 'border-espresso bg-espresso/5 shadow-luxury'
                  : 'border-oat bg-card hover:border-latte hover:shadow-luxury'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-editorial text-lg text-espresso leading-tight mb-0.5">{p.name}</p>
                  <p className="text-xs text-stone mb-2 leading-tight">{p.title}</p>
                  <p className="text-xs text-stone">{p.yearsExperience} years experience</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-1 transition-all duration-300 ${selected ? 'border-espresso bg-espresso' : 'border-oat'}`} />
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-4">
        <button onClick={onBack} className="btn-luxury px-6 py-4 border border-oat text-espresso text-xs tracking-luxury uppercase rounded-full hover:bg-beige/50 transition-colors duration-300">
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!booking.practitionerId}
          className="btn-luxury flex-1 sm:flex-none px-10 py-4 bg-espresso text-cream text-xs tracking-luxury uppercase rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-bark transition-colors duration-300"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Date & Time ──────────────────────────────────────────────────────
function Step3({ booking, setBooking, onNext, onBack }: {
  booking: BookingState;
  setBooking: (b: BookingState) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  const unavailable = ['11:00', '14:00', '17:00'];

  // Generate next 14 days
  const today = new Date();
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return d;
  });

  const formatDate = (d: Date) =>
    d.toISOString().split('T')[0];

  return (
    <div>
      <h2 className="font-editorial text-3xl md:text-4xl text-espresso mb-2">Select Date & Time</h2>
      <p className="text-sm text-stone mb-8">Choose a date and time that works for you.</p>

      {/* Date picker */}
      <div className="mb-8">
        <p className="text-xs tracking-luxury uppercase text-stone mb-4">Date</p>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {dates.map((d) => {
            const val = formatDate(d);
            const selected = booking.date === val;
            const isWeekend = d.getDay() === 0 || d.getDay() === 6;
            return (
              <button
                key={val}
                onClick={() => setBooking({ ...booking, date: val, time: '' })}
                className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-2xl border transition-all duration-300 min-w-[64px] ${
                  selected
                    ? 'border-espresso bg-espresso text-cream'
                    : isWeekend
                    ? 'border-oat bg-beige/40 text-stone'
                    : 'border-oat bg-card text-espresso hover:border-latte hover:shadow-luxury'
                }`}
              >
                <span className="text-[9px] tracking-luxury uppercase mb-1">
                  {d.toLocaleDateString('en-GB', { weekday: 'short' })}
                </span>
                <span className="font-editorial text-xl leading-none">
                  {d.getDate()}
                </span>
                <span className="text-[9px] mt-1">
                  {d.toLocaleDateString('en-GB', { month: 'short' })}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time picker */}
      {booking.date && (
        <div className="mb-8">
          <p className="text-xs tracking-luxury uppercase text-stone mb-4">Available Times</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {times.map((t) => {
              const isUnavailable = unavailable.includes(t);
              const selected = booking.time === t;
              return (
                <button
                  key={t}
                  disabled={isUnavailable}
                  onClick={() => setBooking({ ...booking, time: t })}
                  className={`py-3 rounded-xl text-sm transition-all duration-300 ${
                    isUnavailable
                      ? 'bg-beige/30 text-stone/40 cursor-not-allowed line-through'
                      : selected
                      ? 'bg-espresso text-cream shadow-luxury'
                      : 'bg-card border border-oat text-espresso hover:border-latte hover:shadow-luxury'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button onClick={onBack} className="btn-luxury px-6 py-4 border border-oat text-espresso text-xs tracking-luxury uppercase rounded-full hover:bg-beige/50 transition-colors duration-300">
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!booking.date || !booking.time}
          className="btn-luxury flex-1 sm:flex-none px-10 py-4 bg-espresso text-cream text-xs tracking-luxury uppercase rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-bark transition-colors duration-300"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

// ─── Step 4: Confirm ──────────────────────────────────────────────────────────
function Step4({ booking, setBooking, onBack, onConfirm }: {
  booking: BookingState;
  setBooking: (b: BookingState) => void;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const service = getServiceById(booking.serviceId);
  const practitioner = booking.practitionerId !== 'any'
    ? practitioners.find((p) => p.id === booking.practitionerId)
    : null;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!booking.firstName.trim()) e.firstName = 'First name is required';
    if (!booking.lastName.trim()) e.lastName = 'Last name is required';
    if (!booking.email.trim() || !/\S+@\S+\.\S+/.test(booking.email)) e.email = 'A valid email is required';
    if (!booking.phone.trim()) e.phone = 'Phone number is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onConfirm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-editorial text-3xl md:text-4xl text-espresso mb-2">Confirm Your Booking</h2>
      <p className="text-sm text-stone mb-8">Review your selection and complete your details.</p>

      {/* Summary */}
      <div className="bg-parchment rounded-2xl p-6 mb-8">
        <p className="text-xs tracking-luxury uppercase text-stone mb-4">Booking Summary</p>
        <div className="space-y-3">
          {service && (
            <div className="flex justify-between items-start">
              <div>
                <p className="font-editorial text-lg text-espresso">{service.name}</p>
                <p className="text-xs text-stone">{service.duration} min · £{service.price}</p>
              </div>
              <img src={service.image} alt={service.name} className="w-12 h-12 rounded-xl object-cover" />
            </div>
          )}
          <div className="divider-luxury" />
          {practitioner ? (
            <div className="flex items-center gap-3">
              <img src={practitioner.image} alt={practitioner.name} className="w-8 h-8 rounded-full object-cover" />
              <div>
                <p className="text-sm text-espresso">{practitioner.name}</p>
                <p className="text-xs text-stone">{practitioner.title}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-espresso">Best available practitioner</p>
          )}
          <div className="divider-luxury" />
          <div className="flex justify-between text-sm">
            <span className="text-stone">Date</span>
            <span className="text-espresso">{booking.date ? formatDate(booking.date) : '—'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-stone">Time</span>
            <span className="text-espresso">{booking.time || '—'}</span>
          </div>
          {service && (
            <>
              <div className="divider-luxury" />
              <div className="flex justify-between font-editorial text-xl">
                <span className="text-espresso">Total</span>
                <span className="text-espresso">£{service.price}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Guest details */}
      <div className="mb-8">
        <p className="text-xs tracking-luxury uppercase text-stone mb-4">Your Details</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs tracking-luxury uppercase text-stone block mb-2">First Name</label>
            <input
              type="text"
              value={booking.firstName}
              onChange={(e) => setBooking({ ...booking, firstName: (e.target as HTMLInputElement).value })}
              className={`w-full px-4 py-3 bg-card border rounded-xl text-sm text-espresso focus:outline-none focus:ring-1 focus:ring-latte transition-all duration-300 ${errors.firstName ? 'border-red-400' : 'border-oat'}`}
              placeholder="Your first name"
            />
            {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="text-xs tracking-luxury uppercase text-stone block mb-2">Last Name</label>
            <input
              type="text"
              value={booking.lastName}
              onChange={(e) => setBooking({ ...booking, lastName: (e.target as HTMLInputElement).value })}
              className={`w-full px-4 py-3 bg-card border rounded-xl text-sm text-espresso focus:outline-none focus:ring-1 focus:ring-latte transition-all duration-300 ${errors.lastName ? 'border-red-400' : 'border-oat'}`}
              placeholder="Your last name"
            />
            {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
          </div>
          <div>
            <label className="text-xs tracking-luxury uppercase text-stone block mb-2">Email</label>
            <input
              type="email"
              value={booking.email}
              onChange={(e) => setBooking({ ...booking, email: (e.target as HTMLInputElement).value })}
              className={`w-full px-4 py-3 bg-card border rounded-xl text-sm text-espresso focus:outline-none focus:ring-1 focus:ring-latte transition-all duration-300 ${errors.email ? 'border-red-400' : 'border-oat'}`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="text-xs tracking-luxury uppercase text-stone block mb-2">Phone</label>
            <input
              type="tel"
              value={booking.phone}
              onChange={(e) => setBooking({ ...booking, phone: (e.target as HTMLInputElement).value })}
              className={`w-full px-4 py-3 bg-card border rounded-xl text-sm text-espresso focus:outline-none focus:ring-1 focus:ring-latte transition-all duration-300 ${errors.phone ? 'border-red-400' : 'border-oat'}`}
              placeholder="+44 7700 000000"
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs tracking-luxury uppercase text-stone block mb-2">Special Requests (optional)</label>
            <textarea
              value={booking.notes}
              onChange={(e) => setBooking({ ...booking, notes: (e.target as HTMLTextAreaElement).value })}
              rows={3}
              className="w-full px-4 py-3 bg-card border border-oat rounded-xl text-sm text-espresso focus:outline-none focus:ring-1 focus:ring-latte transition-all duration-300 resize-none"
              placeholder="Any allergies, preferences, or special requests…"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button type="button" onClick={onBack} className="btn-luxury px-6 py-4 border border-oat text-espresso text-xs tracking-luxury uppercase rounded-full hover:bg-beige/50 transition-colors duration-300">
          ← Back
        </button>
        <button
          type="submit"
          className="btn-luxury flex-1 sm:flex-none px-10 py-4 bg-espresso text-cream text-xs tracking-luxury uppercase rounded-full hover:bg-bark transition-colors duration-300"
        >
          Confirm Booking
        </button>
      </div>
    </form>
  );
}

// ─── Confirmation Screen ──────────────────────────────────────────────────────
function ConfirmationScreen({ booking }: { booking: BookingState }) {
  const service = getServiceById(booking.serviceId);
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 rounded-full bg-espresso/10 flex items-center justify-center mx-auto mb-6">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-espresso">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      <h2 className="font-editorial text-4xl md:text-5xl text-espresso mb-4">You're confirmed.</h2>
      <p className="text-base text-stone leading-relaxed max-w-md mx-auto mb-8">
        A confirmation has been sent to <strong className="text-espresso">{booking.email}</strong>.
        We look forward to welcoming you.
      </p>
      {service && (
        <div className="bg-parchment rounded-2xl p-6 max-w-sm mx-auto mb-8 text-left">
          <p className="font-editorial text-xl text-espresso mb-1">{service.name}</p>
          <p className="text-xs text-stone mb-3">{booking.date} at {booking.time}</p>
          <p className="text-sm text-stone">
            {booking.firstName} {booking.lastName} · {booking.email}
          </p>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="btn-luxury px-8 py-4 bg-espresso text-cream text-xs tracking-luxury uppercase rounded-full hover:bg-bark transition-colors duration-300"
        >
          Return Home
        </Link>
        <Link
          to="/services"
          className="btn-luxury px-8 py-4 border border-oat text-espresso text-xs tracking-luxury uppercase rounded-full hover:bg-beige/50 transition-colors duration-300"
        >
          Explore More
        </Link>
      </div>
    </div>
  );
}

// ─── Main Book Page ───────────────────────────────────────────────────────────
export default function Book() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  const [step, setStep] = useState(preselectedService ? 2 : 1);
  const [confirmed, setConfirmed] = useState(false);
  const [booking, setBooking] = useState<BookingState>({
    serviceId: preselectedService,
    practitionerId: '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
  });

  // If service pre-selected, skip to step 2
  useEffect(() => {
    if (preselectedService) {
      setStep(2);
    }
  }, [preselectedService]);

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));
  const handleConfirm = () => setConfirmed(true);

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-32 md:pb-16 px-6 bg-cream">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        {!confirmed && (
          <div className="text-center mb-10">
            <p className="text-xs tracking-luxury uppercase text-stone mb-3">Reserve Your Experience</p>
            <h1 className="font-editorial text-4xl md:text-5xl text-espresso">Book a Treatment</h1>
          </div>
        )}

        {/* Step indicator */}
        {!confirmed && <StepIndicator step={step} total={4} />}

        {/* Step content with fade transition */}
        <div className="animate-fade-in">
          {confirmed ? (
            <ConfirmationScreen booking={booking} />
          ) : step === 1 ? (
            <Step1 booking={booking} setBooking={setBooking} onNext={handleNext} />
          ) : step === 2 ? (
            <Step2 booking={booking} setBooking={setBooking} onNext={handleNext} onBack={handleBack} />
          ) : step === 3 ? (
            <Step3 booking={booking} setBooking={setBooking} onNext={handleNext} onBack={handleBack} />
          ) : (
            <Step4 booking={booking} setBooking={setBooking} onBack={handleBack} onConfirm={handleConfirm} />
          )}
        </div>
      </div>
    </div>
  );
}

