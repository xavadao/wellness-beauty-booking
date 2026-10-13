'use client';

import { useState, useEffect } from 'react';
import { Link, useLocation } from '@/lib/router-compat';

const navLinks = [
  { to: '/services', label: 'Experiences' },
  { to: '/practitioners', label: 'Practitioners' },
  { to: '/about', label: 'Our Story' },
  { to: '/contact', label: 'Concierge' },
];

const mobileNavLinks = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/services', label: 'Explore', icon: LeafIcon },
  { to: '/book', label: 'Book', icon: CalendarIcon },
  { to: '/practitioners', label: 'Team', icon: PersonIcon },
  { to: '/contact', label: 'Contact', icon: MessageIcon },
];

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop / Tablet Nav */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? 'bg-cream/95 backdrop-blur-md shadow-luxury border-b border-oat/40'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-editorial text-xl md:text-2xl tracking-luxury text-espresso hover:opacity-70 transition-opacity duration-300"
          >
            SERENOVA
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-xs tracking-luxury uppercase transition-all duration-300 hover:opacity-100 ${
                  location.pathname.startsWith(link.to)
                    ? 'opacity-100 text-espresso border-b border-espresso pb-0.5'
                    : 'opacity-60 text-espresso'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link
              to="/book"
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-espresso text-cream text-xs tracking-luxury uppercase btn-luxury hover:bg-bark transition-colors duration-300"
            >
              Book Now
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 text-espresso"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 bg-cream/98 backdrop-blur-md ${
            menuOpen ? 'max-h-96 border-b border-oat/40' : 'max-h-0'
          }`}
        >
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm tracking-luxury uppercase text-espresso opacity-70 hover:opacity-100 transition-opacity"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/book"
              className="mt-2 inline-flex items-center justify-center px-6 py-3 bg-espresso text-cream text-xs tracking-luxury uppercase btn-luxury"
            >
              Book an Experience
            </Link>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-espresso text-cream/70 pb-24 md:pb-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <p className="font-editorial text-3xl tracking-luxury text-cream mb-4">SERENOVA</p>
              <p className="text-sm leading-relaxed text-cream/60 max-w-xs">
                A sanctuary for those who seek wellness without compromise. Every treatment, every
                moment, crafted with intention.
              </p>
              <div className="mt-6 flex gap-4">
                <a href="#" className="text-cream/40 hover:text-cream/80 transition-colors duration-300 text-xs tracking-luxury uppercase">Instagram</a>
                <span className="text-cream/20">·</span>
                <a href="#" className="text-cream/40 hover:text-cream/80 transition-colors duration-300 text-xs tracking-luxury uppercase">Pinterest</a>
              </div>
            </div>

            {/* Experiences */}
            <div>
              <p className="text-xs tracking-luxury uppercase text-cream/40 mb-4">Experiences</p>
              <div className="flex flex-col gap-2.5">
                {['Facials', 'Massage', 'Body Rituals', 'Hair & Scalp'].map((item) => (
                  <Link
                    key={item}
                    to="/services"
                    className="text-sm text-cream/60 hover:text-cream/90 transition-colors duration-300"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Visit */}
            <div>
              <p className="text-xs tracking-luxury uppercase text-cream/40 mb-4">Visit</p>
              <div className="flex flex-col gap-2 text-sm text-cream/60">
                <p>12 Botanical Lane</p>
                <p>London, W1K 4PL</p>
                <p className="mt-2">Mon–Sat: 9am – 8pm</p>
                <p>Sunday: 10am – 6pm</p>
                <a href="tel:+442071234567" className="mt-2 hover:text-cream/90 transition-colors duration-300">
                  +44 207 123 4567
                </a>
              </div>
            </div>
          </div>

          <div className="divider-luxury mt-12 mb-6 opacity-20" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-cream/30">
            <p>© 2025 Serenova. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-cream/60 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-cream/60 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-cream/97 backdrop-blur-md border-t border-oat/50 shadow-luxury-xl">
        <div className="flex items-center justify-around px-2 py-2 pb-safe">
          {mobileNavLinks.map(({ to, label, icon: Icon }) => {
            const active =
              to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 transition-all duration-300 min-w-[52px] ${
                  active ? 'text-espresso' : 'text-stone'
                }`}
              >
                <Icon />
                <span className={`text-[9px] tracking-luxury uppercase ${active ? 'opacity-100' : 'opacity-60'}`}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
