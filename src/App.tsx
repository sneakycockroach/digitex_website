import React, { useState, useEffect, useRef } from 'react';

// Contact & Social Links
const WHATSAPP_URL = 'https://wa.me/256772761953';
const PHONE_1 = '+256772761953';
const PHONE_1_DISPLAY = '+256 772 761 953';
const PHONE_2 = '+256763649512';
const PHONE_2_DISPLAY = '+256 763 649 512';
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Digitex+Mbale+opposite+FINCA+Bank';

// Official Logo Assets from Google Drive
const LOGO_HORIZONTAL_WHITE = '/assets/logo/digitex_1080x540px_logo_white.png';

// Hook to detect prefers-reduced-motion
function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return prefersReduced;
}

// Fade-up reveal on scroll component
function FadeUpReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const current = elementRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [prefersReduced]);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={elementRef}
      style={{
        transitionDuration: '600ms',
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`transition-all transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Staggered Headline for About Section with word-by-word fade up
function StaggeredAboutHeadline({
  inView,
  prefersReduced,
}: {
  inView: boolean;
  prefersReduced: boolean;
}) {
  const words = [
    { text: 'Independent' },
    { text: 'creative' },
    { text: 'studio' },
    { text: 'in' },
    { text: 'Mbale.', isRed: true },
  ];

  return (
    <h2 className="text-[9.5vw] sm:text-[6vw] lg:text-[4.8vw] font-bold font-heading text-[#0B0B0B] tracking-tight leading-[1.05]">
      {words.map((w, idx) => (
        <span
          key={idx}
          className="inline-block mr-[0.25em] last:mr-0 transition-all select-none"
          style={{
            transitionDuration: prefersReduced ? '0ms' : '650ms',
            transitionDelay: prefersReduced ? '0ms' : `${idx * 75}ms`,
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: inView || prefersReduced ? 1 : 0,
            transform: inView || prefersReduced ? 'translateY(0)' : 'translateY(22px)',
          }}
        >
          {w.isRed ? (
            <>
              <span className="text-[#DC2626]">Mbale</span>
              <span className="text-[#0B0B0B]">.</span>
            </>
          ) : (
            w.text
          )}
        </span>
      ))}
    </h2>
  );
}

// Minimal Stat Component with 1.4s ease-out count-up (runs once)
function MinimalStat({
  target,
  hasPlus = false,
  label,
  inView,
  prefersReduced,
}: {
  target: number;
  hasPlus?: boolean;
  label: string;
  inView: boolean;
  prefersReduced: boolean;
}) {
  const [count, setCount] = useState(prefersReduced ? target : 0);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (prefersReduced) {
      setCount(target);
      return;
    }

    if (inView && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      let startTimestamp: number | null = null;
      const duration = 1400; // 1.4s ease-out

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // standard cubic ease-out
        const ease = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(ease * target));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(target);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, [inView, target, prefersReduced]);

  return (
    <div className="flex flex-col justify-start">
      <div className="text-[14vw] sm:text-[10vw] lg:text-[7vw] font-bold font-heading text-[#0B0B0B] tracking-tight leading-none select-none">
        <span>{count}</span>
        {hasPlus && <span className="text-[#DC2626] font-heading">+</span>}
      </div>
      <div className="text-sm sm:text-base text-[#6B6B6B] font-medium mt-3 sm:mt-4">
        {label}
      </div>
    </div>
  );
}

// Redesigned Minimal About Section
function AboutSection({ prefersReduced }: { prefersReduced: boolean }) {
  const headlineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [headlineInView, setHeadlineInView] = useState(false);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    if (prefersReduced) {
      setHeadlineInView(true);
      setStatsInView(true);
      return;
    }

    const headlineObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadlineInView(true);
          headlineObserver.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (headlineRef.current) headlineObserver.observe(headlineRef.current);

    const statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          statsObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (statsRef.current) statsObserver.observe(statsRef.current);

    return () => {
      headlineObserver.disconnect();
      statsObserver.disconnect();
    };
  }, [prefersReduced]);

  return (
    <section id="about" className="bg-white py-[120px] border-t border-[#E6E6E6]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top: Small red label, Large Headline on left, Grey line aligned bottom-right on desktop */}
        <div
          ref={headlineRef}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16 mb-16 lg:mb-24"
        >
          <div className="max-w-2xl lg:max-w-3xl">
            <div className="text-xs uppercase tracking-widest font-bold text-[#DC2626] mb-3">
              About
            </div>
            <StaggeredAboutHeadline inView={headlineInView} prefersReduced={prefersReduced} />
          </div>

          <p className="text-[#6B6B6B] text-base lg:text-lg max-w-sm lg:text-right font-normal leading-relaxed pb-1">
            Opposite FINCA Bank. Design, branding, photography and software.
          </p>
        </div>

        {/* Full-width stats row with drawing 1px black line at top */}
        <div ref={statsRef} className="w-full">
          <div className="relative w-full overflow-hidden">
            <div
              style={{
                width: statsInView || prefersReduced ? '100%' : '0%',
                transition: prefersReduced ? 'none' : 'width 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="h-[1px] bg-[#0B0B0B]"
            />
          </div>

          {/* Stats: 1 row on desktop with 1px #E6E6E6 vertical lines; 2x2 grid on mobile with 1px dividers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 w-full">
            {/* 75+ Projects */}
            <div className="py-8 sm:py-10 lg:py-12 pr-4 sm:pr-6 lg:pr-8 lg:pl-0 border-r border-b lg:border-b-0 border-[#E6E6E6]">
              <MinimalStat
                target={75}
                hasPlus={true}
                label="Projects"
                inView={statsInView}
                prefersReduced={prefersReduced}
              />
            </div>

            {/* 50+ Clients */}
            <div className="py-8 sm:py-10 lg:py-12 pl-4 sm:pl-6 lg:px-8 border-b lg:border-b-0 lg:border-r border-[#E6E6E6]">
              <MinimalStat
                target={50}
                hasPlus={true}
                label="Clients"
                inView={statsInView}
                prefersReduced={prefersReduced}
              />
            </div>

            {/* 8 Years */}
            <div className="py-8 sm:py-10 lg:py-12 pr-4 sm:pr-6 lg:px-8 border-r lg:border-r border-[#E6E6E6]">
              <MinimalStat
                target={8}
                hasPlus={false}
                label="Years"
                inView={statsInView}
                prefersReduced={prefersReduced}
              />
            </div>

            {/* 4 Disciplines */}
            <div className="py-8 sm:py-10 lg:py-12 pl-4 sm:pl-6 lg:pl-8 lg:pr-0">
              <MinimalStat
                target={4}
                hasPlus={false}
                label="Disciplines"
                inView={statsInView}
                prefersReduced={prefersReduced}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isPhonePopoverOpen, setIsPhonePopoverOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('services');

  const [quoteName, setQuoteName] = useState('');
  const [quoteService, setQuoteService] = useState('Graphic Design');
  const [quoteDetails, setQuoteDetails] = useState('');

  const navContainerRef = useRef<HTMLDivElement>(null);
  const phonePopoverRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const navLinks = [
    { label: 'Services', href: '#services', id: 'services', num: '01' },
    { label: 'About', href: '#about', id: 'about', num: '02' },
    { label: 'Reviews', href: '#reviews', id: 'reviews', num: '03' },
    { label: 'Quote', href: '#quote', id: 'quote', num: '04' },
    { label: 'Contact', href: '#contact', id: 'contact', num: '05' },
  ];

  // Active pill position tracking for smooth sliding transform
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // Scroll listener for shrink and scroll-spy
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > 40);

      const sections = ['contact', 'quote', 'reviews', 'about', 'services'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 260 && rect.bottom >= 120) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (currentScroll < 400) {
        setActiveSection('services');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update sliding pill indicator position whenever active section changes
  useEffect(() => {
    if (!navContainerRef.current) return;
    const activeEl = navContainerRef.current.querySelector(
      `[data-nav-id="${activeSection}"]`
    ) as HTMLElement | null;

    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  }, [activeSection, isScrolled]);

  // Dismiss phone popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        phonePopoverRef.current &&
        !phonePopoverRef.current.contains(event.target as Node)
      ) {
        setIsPhonePopoverOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Quote submission via WhatsApp
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName.trim() || !quoteDetails.trim()) return;

    const message = `Hello Digitex Studio,

Name: ${quoteName.trim()}
Service: ${quoteService}
Project Details: ${quoteDetails.trim()}`;

    const encoded = encodeURIComponent(message);
    window.open(`${WHATSAPP_URL}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const services = [
    {
      title: 'Graphic Design',
      tagline: 'Print, packaging and visual assets.', // 5 words
      iconClass: 'fa-solid fa-pen-ruler',
    },
    {
      title: 'Branding',
      tagline: 'Identities, guidelines and market positioning.', // 5 words
      iconClass: 'fa-solid fa-fingerprint',
    },
    {
      title: 'Photography',
      tagline: 'Commercial, studio and event coverage.', // 5 words
      iconClass: 'fa-solid fa-camera',
    },
    {
      title: 'Software',
      tagline: 'Web apps, systems and tools.', // 5 words
      iconClass: 'fa-solid fa-code',
    },
  ];

  const testimonials = [
    {
      sentence: '“Digitex doubled our retail inquiries within weeks.”',
      author: 'Grace Namukose',
      role: 'Boutique Owner',
    },
    {
      sentence: '“The best commercial photography in Eastern Uganda.”',
      author: 'David Wanyama',
      role: 'Event Producer',
    },
    {
      sentence: '“Their software streamlined our entire student onboarding.”',
      author: 'Sarah Kisakye',
      role: 'School Administrator',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0B0B0B] flex flex-col relative selection:bg-[#DC2626] selection:text-white">
      {/* =========================================================================
          1. NAVIGATION: DESKTOP
          Centered slim floating bar 20px from top + separate 44px round black phone button
      ========================================================================== */}
      <header className="hidden md:flex fixed top-5 left-1/2 -translate-x-1/2 z-50 items-center gap-3">
        {/* Floating pill navigation bar */}
        <div
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            backgroundColor: 'rgba(255, 255, 255, 0.82)',
            borderColor: '#E6E6E6',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
          }}
          className={`flex items-center rounded-full border transition-all duration-300 ${
            isScrolled ? 'py-1.5 px-5' : 'py-2 px-6'
          }`}
        >
          {/* Wordmark */}
          <a
            href="#"
            className="font-heading font-black tracking-tight text-[15px] text-[#0B0B0B] mr-4 flex items-center gap-1.5 focus:outline-none"
            aria-label="Digitex Studio Home"
          >
            <span>digitex</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"></span>
          </a>

          {/* Links with sliding black pill indicator */}
          <nav
            ref={navContainerRef}
            className="flex items-center relative py-0.5"
            aria-label="Main Navigation"
          >
            {/* Smooth Sliding Black Pill */}
            {indicatorStyle.width > 0 && (
              <span
                style={{
                  transform: `translateX(${indicatorStyle.left}px)`,
                  width: `${indicatorStyle.width}px`,
                  transition: prefersReduced
                    ? 'none'
                    : 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), width 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="absolute top-0 bottom-0 left-0 bg-[#0B0B0B] rounded-full -z-0"
              />
            )}

            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  data-nav-id={link.id}
                  href={link.href}
                  className={`relative px-4 py-1.5 rounded-full text-[14px] font-medium transition-colors duration-200 z-10 select-none ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-[#444444] hover:text-[#0B0B0B]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Separate round 44px black button with white phone icon */}
        <div
          ref={phonePopoverRef}
          className="relative flex items-center"
          onMouseEnter={() => setIsPhonePopoverOpen(true)}
          onMouseLeave={() => setIsPhonePopoverOpen(false)}
        >
          <button
            onClick={() => setIsPhonePopoverOpen(!isPhonePopoverOpen)}
            aria-label="Call Digitex"
            className="w-11 h-11 rounded-full bg-[#0B0B0B] hover:bg-black text-white flex items-center justify-center flex-shrink-0 transition-transform active:scale-95 shadow-md focus:outline-none cursor-pointer"
          >
            <i className="fa-solid fa-phone text-sm text-white"></i>
          </button>

          {/* Small white popover with two tap-to-call rows */}
          {isPhonePopoverOpen && (
            <div className="absolute top-13 right-0 w-64 bg-white border border-[#E6E6E6] rounded-xl shadow-2xl p-3 z-50 transition-all duration-200">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#888888] px-2 py-1 border-b border-[#F0F0F0] mb-2 flex items-center justify-between">
                <span>Direct Calling</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"></span>
              </div>
              <div className="space-y-1">
                <a
                  href={`tel:${PHONE_1}`}
                  className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-[#0B0B0B] hover:bg-[#F6F6F6] rounded-lg transition-colors group"
                >
                  <span className="group-hover:text-[#DC2626] transition-colors">{PHONE_1_DISPLAY}</span>
                  <i className="fa-solid fa-phone text-xs text-[#888888] group-hover:text-[#DC2626]"></i>
                </a>
                <a
                  href={`tel:${PHONE_2}`}
                  className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-[#0B0B0B] hover:bg-[#F6F6F6] rounded-lg transition-colors group"
                >
                  <span className="group-hover:text-[#DC2626] transition-colors">{PHONE_2_DISPLAY}</span>
                  <i className="fa-solid fa-phone text-xs text-[#888888] group-hover:text-[#DC2626]"></i>
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* =========================================================================
          2. NAVIGATION: MOBILE
          Slim full-width white bar (80% opacity, blur 16px, 1px bottom border)
          Left: wordmark | Right: round black phone icon button + 2-line morphing menu
      ========================================================================== */}
      <header className="md:hidden fixed top-0 left-0 w-full z-50 h-16 px-5 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-[#E6E6E6]">
        {/* Wordmark */}
        <a href="#" className="font-heading font-black tracking-tight text-xl text-[#0B0B0B] flex items-center gap-1">
          <span>digitex</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"></span>
        </a>

        {/* Right actions: Phone button + Morphing menu button */}
        <div className="flex items-center gap-3">
          {/* Tap-to-call direct phone icon button */}
          <a
            href={`tel:${PHONE_1}`}
            aria-label={`Call ${PHONE_1_DISPLAY}`}
            className="w-9 h-9 rounded-full bg-[#0B0B0B] text-white flex items-center justify-center text-xs active:scale-95 transition-transform"
          >
            <i className="fa-solid fa-phone"></i>
          </a>

          {/* Morphing 2-line Menu Button */}
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <span
              style={{
                transition: 'transform 300ms ease, margin 300ms ease',
                transform: isMobileNavOpen ? 'translateY(4px) rotate(45deg)' : 'none',
              }}
              className="w-5 h-[2px] bg-[#0B0B0B] block"
            />
            <span
              style={{
                transition: 'transform 300ms ease, margin 300ms ease',
                transform: isMobileNavOpen ? 'translateY(-4px) rotate(-45deg)' : 'none',
              }}
              className="w-5 h-[2px] bg-[#0B0B0B] block"
            />
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen White Overlay (Sliding down from the top in 400ms) */}
      <div
        style={{
          transition: prefersReduced ? 'none' : 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isMobileNavOpen ? 'translateY(0)' : 'translateY(-100%)',
        }}
        className="md:hidden fixed inset-0 bg-white z-40 flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto"
      >
        <div className="flex flex-col">
          <nav className="flex flex-col divide-y divide-[#F0F0F0]">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setIsMobileNavOpen(false)}
                className="py-4 flex items-center justify-between text-[12vw] font-bold font-heading text-[#0B0B0B] leading-none tracking-tight group active:text-[#DC2626] transition-colors"
              >
                <span>{link.label}</span>
                <span className="text-xs font-bold text-[#DC2626] tracking-wider uppercase font-sans">
                  {link.num}
                </span>
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom of mobile overlay: Solid red WhatsApp button + Address */}
        <div className="pt-6 flex flex-col gap-4 border-t border-[#E6E6E6]">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileNavOpen(false)}
            className="w-full bg-[#DC2626] text-white py-4 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 rounded-none active:scale-[0.99] transition-transform"
          >
            <i className="fa-brands fa-whatsapp text-base"></i>
            <span>Chat on WhatsApp</span>
          </a>

          <p className="text-center text-xs text-[#888888] font-medium tracking-wide">
            Opposite FINCA Bank, Mbale City
          </p>
        </div>
      </div>

      {/* =========================================================================
          3. HERO SECTION
          Pure white background, full viewport height, content vertically centered,
          left aligned, generous padding.
          Faint 1px vertical grid lines at 12-col spacing in #F0F0F0.
          Staggered entrance clip-mask animation + red underline drawing under "remember".
          Hairline 1px #E6E6E6 rule at bottom with 4 items & animated down-arrow. NO marquee.
      ========================================================================== */}
      {/* =========================================================================
          3. HERO SECTION (Minimal Two-Column Layout with 2x2 Interactive Grid)
          Left (55%): Headline at ~6vw (13vw mobile), subline in #6B6B6B, buttons.
          Right (45%): 2x2 square service tiles with 12px gap, 80ms stagger,
          6px hover lift, 45° arrow rotation, right-column 4px slow vertical drift.
      ========================================================================== */}
      <section className="min-h-screen bg-white relative flex items-center pt-28 sm:pt-32 pb-16 px-6 sm:px-12 lg:px-20 overflow-hidden">
        <div className="max-w-7xl w-full mx-auto my-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 z-10">
          {/* Left Column (55% on desktop) */}
          <div className="w-full lg:w-[55%] flex flex-col items-start">
            {/* Headline with clip-mask staggered slide-up */}
            <h1 className="text-[13vw] sm:text-[8vw] lg:text-[5.8vw] font-bold tracking-tighter leading-[0.92] font-heading text-[#0B0B0B] text-left select-none mb-6">
              {/* Line 1 */}
              <div className="overflow-hidden pb-1">
                <div className="animate-slide-up-1">We design</div>
              </div>
              {/* Line 2 */}
              <div className="overflow-hidden pb-1">
                <div className="animate-slide-up-2">what people</div>
              </div>
              {/* Line 3: "remember" in red with black period */}
              <div className="overflow-hidden pb-2">
                <div className="animate-slide-up-3">
                  <span className="text-[#DC2626]">remember</span>
                  <span className="text-[#0B0B0B]">.</span>
                </div>
              </div>
            </h1>

            {/* Subline in grey #6B6B6B */}
            <FadeUpReveal delay={200} className="w-full">
              <p className="text-[#6B6B6B] text-base sm:text-xl font-normal leading-relaxed mb-8 max-w-xl text-left">
                Design, branding, photography and software in Uganda.
              </p>
            </FadeUpReveal>

            {/* Buttons: solid black "Get a Quote" & 1px black outline "Chat on WhatsApp" */}
            <FadeUpReveal delay={280} className="w-full">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full">
                <a
                  href="#quote"
                  className="bg-[#0B0B0B] hover:bg-black text-white text-sm sm:text-base font-bold py-4 px-8 text-center uppercase tracking-wider transition-all active:scale-[0.99] rounded-none flex items-center justify-center gap-3 group"
                >
                  <span>Get a Quote</span>
                  <i className="fa-solid fa-arrow-right text-xs transition-transform duration-200 group-hover:translate-x-1.5"></i>
                </a>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#0B0B0B] text-[#0B0B0B] hover:bg-[#0B0B0B] hover:text-white text-sm sm:text-base font-bold py-4 px-8 text-center uppercase tracking-wider flex items-center justify-center gap-3 transition-all active:scale-[0.99] rounded-none group"
                >
                  <i className="fa-brands fa-whatsapp text-lg text-[#25D366] group-hover:text-white transition-colors"></i>
                  <span>Chat on WhatsApp</span>
                  <i className="fa-solid fa-arrow-right text-xs transition-transform duration-200 group-hover:translate-x-1.5"></i>
                </a>
              </div>
            </FadeUpReveal>
          </div>

          {/* Right Column (45% on desktop): 2x2 Grid of Square Tiles */}
          <div className="w-full lg:w-[45%] max-w-[500px] lg:max-w-none mx-auto lg:mx-0 mt-6 lg:mt-0">
            <div className="grid grid-cols-2 gap-[12px] w-full">
              {/* Tile 1: Graphic Design (solid black tile, white text) */}
              <FadeUpReveal delay={80} className="w-full">
                <a
                  href="#services"
                  className="aspect-square bg-[#0B0B0B] text-white p-5 sm:p-6 lg:p-7 flex flex-col justify-between hover:-translate-y-[6px] transition-transform duration-200 group cursor-pointer block rounded-none"
                >
                  <div className="flex items-start justify-between">
                    <i className="fa-solid fa-pen-nib text-2xl sm:text-3xl text-white"></i>
                    <i className="fa-solid fa-arrow-right text-sm text-white transition-transform duration-200 group-hover:-rotate-45"></i>
                  </div>
                  <div className="text-[17px] sm:text-[20px] font-bold font-heading leading-tight text-white">
                    Graphic Design
                  </div>
                </a>
              </FadeUpReveal>

              {/* Tile 2: Branding (solid red tile, white text - right column drifts 4px slow) */}
              <FadeUpReveal delay={160} className="w-full">
                <div className={prefersReduced ? 'w-full' : 'animate-drift-slow-1 w-full'}>
                  <a
                    href="#services"
                    className="aspect-square bg-[#DC2626] text-white p-5 sm:p-6 lg:p-7 flex flex-col justify-between hover:-translate-y-[6px] transition-transform duration-200 group cursor-pointer block rounded-none"
                  >
                    <div className="flex items-start justify-between">
                      <i className="fa-solid fa-shapes text-2xl sm:text-3xl text-white"></i>
                      <i className="fa-solid fa-arrow-right text-sm text-white transition-transform duration-200 group-hover:-rotate-45"></i>
                    </div>
                    <div className="text-[17px] sm:text-[20px] font-bold font-heading leading-tight text-white">
                      Branding
                    </div>
                  </a>
                </div>
              </FadeUpReveal>

              {/* Tile 3: Photography (light grey #F4F4F4 tile, black text) */}
              <FadeUpReveal delay={240} className="w-full">
                <a
                  href="#services"
                  className="aspect-square bg-[#F4F4F4] text-[#0B0B0B] p-5 sm:p-6 lg:p-7 flex flex-col justify-between hover:-translate-y-[6px] transition-transform duration-200 group cursor-pointer block rounded-none"
                >
                  <div className="flex items-start justify-between">
                    <i className="fa-solid fa-camera text-2xl sm:text-3xl text-[#0B0B0B]"></i>
                    <i className="fa-solid fa-arrow-right text-sm text-[#0B0B0B] transition-transform duration-200 group-hover:-rotate-45"></i>
                  </div>
                  <div className="text-[17px] sm:text-[20px] font-bold font-heading leading-tight text-[#0B0B0B]">
                    Photography
                  </div>
                </a>
              </FadeUpReveal>

              {/* Tile 4: Software (white tile with 1px black border, black text - right column drifts 4px slow) */}
              <FadeUpReveal delay={320} className="w-full">
                <div className={prefersReduced ? 'w-full' : 'animate-drift-slow-2 w-full'}>
                  <a
                    href="#services"
                    className="aspect-square bg-white border border-[#0B0B0B] text-[#0B0B0B] p-5 sm:p-6 lg:p-7 flex flex-col justify-between hover:-translate-y-[6px] transition-transform duration-200 group cursor-pointer block rounded-none"
                  >
                    <div className="flex items-start justify-between">
                      <i className="fa-solid fa-code text-2xl sm:text-3xl text-[#0B0B0B]"></i>
                      <i className="fa-solid fa-arrow-right text-sm text-[#0B0B0B] transition-transform duration-200 group-hover:-rotate-45"></i>
                    </div>
                    <div className="text-[17px] sm:text-[20px] font-bold font-heading leading-tight text-[#0B0B0B]">
                      Software
                    </div>
                  </a>
                </div>
              </FadeUpReveal>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. WHAT WE DO SECTION (4 Icon-Led Tiles with 5-word lines)
      ========================================================================== */}
      <section id="services" className="bg-white py-24 sm:py-32 border-t border-[#E6E6E6]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUpReveal>
            <div className="mb-14 sm:mb-20">
              <h2 className="text-4xl sm:text-6xl font-bold text-[#0B0B0B] tracking-tight font-heading mb-3">
                What we do.
              </h2>
              <p className="text-base sm:text-lg text-[#666666]">
                Creative and technical solutions for growth.
              </p>
            </div>
          </FadeUpReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <FadeUpReveal key={index} delay={index * 80}>
                <a
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                    `Hello Digitex Studio, I would like to inquire about ${service.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#F4F4F4] hover:bg-white border border-[#E5E5E5] hover:border-[#0B0B0B] p-8 sm:p-10 flex flex-col justify-between h-72 sm:h-80 hover-lift group transition-colors block rounded-none"
                >
                  <div>
                    <div className="w-12 h-12 bg-[#0B0B0B] text-white flex items-center justify-center mb-6">
                      <i className={`${service.iconClass} text-xl text-white`}></i>
                    </div>
                    <h3 className="text-2xl font-bold text-[#0B0B0B] font-heading mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#555555] font-medium leading-relaxed">
                      {service.tagline}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#0B0B0B] pt-4 border-t border-[#E5E5E5]">
                    <span>Inquire</span>
                    <i className="fa-solid fa-arrow-right text-sm text-[#DC2626] transition-transform group-hover:translate-x-1.5"></i>
                  </div>
                </a>
              </FadeUpReveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. ABOUT DIGITEX SECTION (Minimal Redesign with 1px Dividers & 1.4s Count-Up)
      ========================================================================== */}
      <AboutSection prefersReduced={prefersReduced} />

      {/* =========================================================================
          6. TESTIMONIALS SECTION (One-Sentence Reviews)
      ========================================================================== */}
      <section id="reviews" className="bg-[#0B0B0B] text-white py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUpReveal>
            <div className="mb-14 sm:mb-20">
              <h2 className="text-4xl sm:text-6xl font-bold text-white tracking-tight font-heading mb-3">
                Trusted across Uganda.
              </h2>
              <p className="text-base sm:text-lg text-[#888888]">
                Real words from our partners.
              </p>
            </div>
          </FadeUpReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <FadeUpReveal key={index} delay={index * 100}>
                <div className="bg-[#141414] border border-[#222222] p-8 sm:p-10 flex flex-col justify-between h-64 sm:h-72 hover-lift rounded-none">
                  <div>
                    <div className="flex items-center gap-1.5 text-[#DC2626] mb-4">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star text-xs"></i>
                      ))}
                    </div>
                    <p className="text-base sm:text-lg text-white font-medium leading-snug">
                      {t.sentence}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#222222]">
                    <div className="text-sm font-bold text-white">{t.author}</div>
                    <div className="text-xs text-[#777777]">{t.role}</div>
                  </div>
                </div>
              </FadeUpReveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. GET A QUOTE SECTION
      ========================================================================== */}
      <section id="quote" className="bg-white py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <FadeUpReveal>
            <div className="mb-10 text-center">
              <h2 className="text-4xl sm:text-6xl font-bold text-[#0B0B0B] tracking-tight font-heading mb-3">
                Get a quote.
              </h2>
              <p className="text-base sm:text-lg text-[#666666]">
                Tell us about your project.
              </p>
            </div>
          </FadeUpReveal>

          <FadeUpReveal delay={100}>
            <form onSubmit={handleQuoteSubmit} className="space-y-5">
              <div>
                <label htmlFor="quote-name" className="block text-xs uppercase tracking-widest font-bold text-[#0B0B0B] mb-2">
                  Your Name
                </label>
                <input
                  id="quote-name"
                  type="text"
                  required
                  value={quoteName}
                  onChange={(e) => setQuoteName(e.target.value)}
                  placeholder="Samuel Mugabi"
                  className="w-full bg-[#F4F4F4] border border-[#E5E5E5] px-5 py-4 text-sm text-[#0B0B0B] focus:bg-white focus:border-[#0B0B0B] outline-none transition-colors rounded-none"
                />
              </div>

              <div>
                <label htmlFor="quote-service" className="block text-xs uppercase tracking-widest font-bold text-[#0B0B0B] mb-2">
                  Service Needed
                </label>
                <div className="relative">
                  <select
                    id="quote-service"
                    value={quoteService}
                    onChange={(e) => setQuoteService(e.target.value)}
                    className="w-full bg-[#F4F4F4] border border-[#E5E5E5] px-5 py-4 text-sm text-[#0B0B0B] focus:bg-white focus:border-[#0B0B0B] outline-none transition-colors appearance-none cursor-pointer rounded-none"
                  >
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Branding">Branding</option>
                    <option value="Photography">Photography</option>
                    <option value="Software">Software</option>
                    <option value="Full Package">Full Package</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-[#666666]">
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="quote-details" className="block text-xs uppercase tracking-widest font-bold text-[#0B0B0B] mb-2">
                  Project Details
                </label>
                <textarea
                  id="quote-details"
                  rows={4}
                  required
                  value={quoteDetails}
                  onChange={(e) => setQuoteDetails(e.target.value)}
                  placeholder="Scope, deliverables, timeline..."
                  className="w-full bg-[#F4F4F4] border border-[#E5E5E5] px-5 py-4 text-sm text-[#0B0B0B] focus:bg-white focus:border-[#0B0B0B] outline-none transition-colors resize-none rounded-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#DC2626] hover:bg-[#b80323] text-white font-bold py-5 px-8 text-center flex items-center justify-center gap-3 transition-all active:scale-[0.99] cursor-pointer text-sm uppercase tracking-wider rounded-none"
              >
                <span>Request Quote on WhatsApp</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </button>
            </form>
          </FadeUpReveal>
        </div>
      </section>

      {/* =========================================================================
          8. CONTACT SECTION (Let's talk.)
          Three large equal tiles + Embedded Google Map in Visit tile
      ========================================================================== */}
      <section id="contact" className="w-full bg-white py-24 sm:py-32 border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUpReveal>
            <div className="mb-14 sm:mb-20">
              <h2 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight text-[#0B0B0B] font-heading leading-none mb-4">
                Let's talk.
              </h2>
              <p className="text-lg sm:text-2xl text-[#666666] font-normal">
                Opposite FINCA Bank, Mbale City.
              </p>
            </div>
          </FadeUpReveal>

          {/* Three Large Equal Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tile 1: WhatsApp (Solid red tile, white text) */}
            <FadeUpReveal delay={50}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#DC2626] text-white p-8 sm:p-12 flex flex-col justify-between min-h-[340px] hover-lift group transition-all block rounded-none"
              >
                <div className="flex items-start justify-between">
                  <i className="fa-brands fa-whatsapp text-4xl sm:text-5xl text-white"></i>
                  <i className="fa-solid fa-arrow-right text-xl transition-transform group-hover:translate-x-2 text-white"></i>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-widest font-bold opacity-80 mb-2">
                    WhatsApp
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold tracking-tight font-heading">
                    Chat now
                  </div>
                </div>
              </a>
            </FadeUpReveal>

            {/* Tile 2: Call (Solid black tile, white text) */}
            <FadeUpReveal delay={100}>
              <div className="bg-[#0B0B0B] text-white p-8 sm:p-12 flex flex-col justify-between min-h-[340px] hover-lift group transition-all rounded-none">
                <div className="flex items-start justify-between">
                  <i className="fa-solid fa-phone text-3xl sm:text-4xl text-[#DC2626]"></i>
                  <a
                    href={`tel:${PHONE_1}`}
                    aria-label="Call Line 1"
                    className="text-white hover:text-[#DC2626] transition-colors"
                  >
                    <i className="fa-solid fa-arrow-right text-xl transition-transform group-hover:translate-x-2 text-white"></i>
                  </a>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-widest font-bold opacity-80 mb-2">
                    Call
                  </div>
                  <a
                    href={`tel:${PHONE_1}`}
                    className="text-2xl sm:text-3xl font-bold tracking-tight font-heading hover:text-[#DC2626] transition-colors block"
                  >
                    {PHONE_1_DISPLAY}
                  </a>
                  <a
                    href={`tel:${PHONE_2}`}
                    className="text-sm sm:text-base font-medium opacity-80 hover:opacity-100 hover:text-[#DC2626] transition-colors mt-2 block"
                  >
                    {PHONE_2_DISPLAY}
                  </a>
                </div>
              </div>
            </FadeUpReveal>

            {/* Tile 3: Visit / Location (Refined minimal architectural card with blurred map) */}
            <FadeUpReveal delay={150}>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-[#0B0B0B] text-[#0B0B0B] flex flex-col justify-between min-h-[340px] hover-lift group transition-all rounded-none relative overflow-hidden block"
              >
                {/* Map filling entire card backdrop, scaled & cropped to eliminate Google UI controls and clutter */}
                <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4015.08907028401!2d34.17442479678956!3d1.0733435999999967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1778b7308ef2aadd%3A0x11b3133a6f0315da!2sDigitex!5e1!3m2!1sen!2sug!4v1794096394803!5m2!1sen!2sug"
                    className="absolute -top-[25%] -left-[25%] w-[150%] h-[150%]"
                    style={{
                      border: 0,
                      filter: 'blur(3px) grayscale(35%) contrast(105%)',
                      opacity: 0.65,
                    }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Digitex Mbale Location Map"
                  />
                  {/* Flat light tint overlay for soft map detail and clean visual balance */}
                  <div className="absolute inset-0 bg-[#F4F4F4]/55 mix-blend-multiply" />
                </div>

                {/* Top Row: Framed Location Pin + Interactive Arrow */}
                <div className="relative z-10 p-6 sm:p-8 flex items-start justify-between">
                  <div className="w-12 h-12 bg-white border border-[#0B0B0B] flex items-center justify-center shadow-sm">
                    <i className="fa-solid fa-location-dot text-2xl text-[#DC2626]"></i>
                  </div>
                  <div className="w-12 h-12 bg-white border border-[#0B0B0B] flex items-center justify-center text-[#0B0B0B] group-hover:bg-[#0B0B0B] group-hover:text-white transition-all shadow-sm">
                    <i className="fa-solid fa-arrow-right text-xl transition-transform group-hover:translate-x-1.5"></i>
                  </div>
                </div>

                {/* Bottom Architectural Dock: Seamless edge-to-edge panel with crisp 1px border */}
                <div className="relative z-10 bg-white border-t border-[#0B0B0B] p-6 sm:p-8 transition-colors group-hover:bg-[#FAFAFA]">
                  <div className="text-xs uppercase tracking-widest font-bold text-[#DC2626] mb-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#DC2626] inline-block"></span>
                    Visit Studio
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight font-heading text-[#0B0B0B] group-hover:text-[#DC2626] transition-colors">
                    Our Location
                  </div>
                  <div className="text-xs sm:text-sm text-[#555555] font-medium mt-1 leading-snug">
                    Mbale City Republic Street, Opposite FINCA Bank
                  </div>
                </div>
              </a>
            </FadeUpReveal>
          </div>

          <FadeUpReveal delay={200}>
            <div className="text-center text-xs sm:text-sm text-[#777777] font-medium tracking-wide mt-12 sm:mt-16">
              Mon-Sat · 8AM-6PM
            </div>
          </FadeUpReveal>
        </div>
      </section>

      {/* =========================================================================
          9. MINIMAL OBSIDIAN FOOTER
      ========================================================================== */}
      <footer className="bg-[#0B0B0B] border-t border-[#1A1A1A] text-white py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-[#1A1A1A]">
            <a href="#" className="flex items-center" aria-label="Digitex Studio">
              <img
                src={LOGO_HORIZONTAL_WHITE}
                alt="Digitex Creative Studio"
                className="h-9 sm:h-11 w-auto max-w-[170px] sm:max-w-[210px] object-contain"
              />
            </a>

            <div className="flex flex-wrap items-center justify-center gap-8 text-xs uppercase tracking-widest text-[#777777]">
              <a href="#services" className="hover:text-white transition-colors">
                Services
              </a>
              <a href="#about" className="hover:text-white transition-colors">
                About
              </a>
              <a href="#reviews" className="hover:text-white transition-colors">
                Reviews
              </a>
              <a href="#quote" className="hover:text-white transition-colors">
                Quote
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>

            <a
              href={`tel:${PHONE_1}`}
              className="text-xs font-bold text-white hover:text-[#DC2626] flex items-center gap-2 transition-colors"
            >
              <i className="fa-solid fa-phone text-[#DC2626]"></i>
              <span>{PHONE_1_DISPLAY}</span>
            </a>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#555555] gap-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Digitex Creative Studio. Mbale City, Uganda.</p>
            <p>Graphic Design · Branding · Photography · Software</p>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          10. ONLY FLOATING BUTTON: Round green WhatsApp button bottom right
      ========================================================================== */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring pointer-events-none"></div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Direct Chat on WhatsApp"
            className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            title="Chat with Digitex on WhatsApp"
          >
            <i className="fa-brands fa-whatsapp text-3xl"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
