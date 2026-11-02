import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, ArrowUpRight } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const logo = '/demo/logo.svg';

const flags: Record<Language, string> = {
  'pt-BR': '🇧🇷',
  en: '🇺🇸',
  'pt-PT': '🇵🇹',
};

const langLabels: Record<Language, string> = {
  'pt-BR': 'PT-BR',
  en: 'EN',
  'pt-PT': 'PT-PT',
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const { scrollY } = useScroll();
  const langRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 20));
  useEffect(() => setMobileOpen(false), [location]);
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const navItems = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/companies', label: t('nav.companies') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

        .hdr { font-family: 'Outfit', sans-serif; }

        @keyframes sweep {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(600%) skewX(-15deg); }
        }
        .hdr-sweep { animation: sweep 4s ease-in-out infinite; }

        @keyframes orb-drift {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(30px,-20px) scale(1.05); }
          66%      { transform: translate(-20px,15px) scale(0.97); }
        }
        .orb-1 { animation: orb-drift 12s ease-in-out infinite; }
        .orb-2 { animation: orb-drift 16s ease-in-out infinite reverse; }

        .nav-item {
          font-family: 'Syne', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          position: relative;
        }
        .nav-item::before {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          border-radius: 2px;
          background: rgba(255,255,255,0.9);
          transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-item:hover::before, .nav-item.nav-active::before { width: 100%; }

        @keyframes btn-glow {
          0%,100% { box-shadow: 0 4px 16px rgba(0,0,0,0.2); }
          50%      { box-shadow: 0 4px 28px rgba(255,255,255,0.25); }
        }
        .cta-btn:hover { animation: btn-glow 2s ease-in-out infinite; }
        .cta-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s;
          border-radius: inherit;
        }
        .cta-btn:hover::after { opacity: 1; }

        .hdr-scrolled {
          box-shadow: 0 8px 40px rgba(20,82,200,0.4), 0 1px 0 rgba(255,255,255,0.1) inset;
        }

        .hdr-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          mix-blend-mode: overlay;
        }
      `}</style>

      <motion.header
        className="hdr fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── BLUE BAR ── */}
        <motion.div
          className={`relative transition-shadow duration-500 ${scrolled ? 'hdr-scrolled' : ''}`}
          animate={{
            background: scrolled
              ? 'linear-gradient(135deg, #0f3fa8 0%, #1452c8 40%, #1a5fd4 70%, #1050be 100%)'
              : 'linear-gradient(135deg, #1248b8 0%, #1a5fd8 40%, #2272e8 70%, #155acc 100%)',
          }}
          transition={{ duration: 0.5 }}
        >
          {/* Grain */}
          <div className="hdr-grain absolute inset-0 pointer-events-none" style={{ overflow: 'hidden', borderRadius: 'inherit' }} />

          {/* Ambient orbs */}
          <div className="absolute inset-0 pointer-events-none" style={{ overflow: 'hidden' }}>
            <div className="orb-1 absolute -left-20 -top-16 w-64 h-64 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)', filter: 'blur(40px)' }} />
            <div className="orb-2 absolute -right-10 -bottom-20 w-72 h-72 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)', filter: 'blur(50px)' }} />
            <div className="hdr-sweep absolute top-0 bottom-0 w-24"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)' }} />
          </div>

          <div className="container mx-auto px-4 lg:px-12">
            {/* ── ALTURA RESPONSIVA: 68px mobile / 112px desktop ── */}
            <div className="flex items-center justify-between h-[68px] lg:h-[112px]">

              {/* ── LOGO ── */}
              <Link to="/" className="flex items-center group flex-shrink-0">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                >
                  <div className="absolute -inset-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.12) 0%, transparent 70%)' }} />
                  <div
                    style={{
                      position: 'relative',
                      /* ── PADDING RESPONSIVO via inline style não suporta breakpoints,
                         usamos classes Tailwind no wrapper e valores fixos menores ── */
                      padding: '6px 12px',       /* mobile: compacto */
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.97)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.8) inset',
                      border: '1px solid rgba(255,255,255,0.6)',
                    }}
                    className="lg:!p-[12px_24px]"   /* desktop: padding original */
                  >
                    <img
                      src={logo}
                      alt="Órbita"
                      /* ── ALTURA RESPONSIVA: 36px mobile / 80px desktop ── */
                      className="h-[36px] lg:h-[80px] w-auto object-contain block"
                    />
                  </div>
                </motion.div>
              </Link>

              {/* ── DESKTOP NAV ── */}
              <nav className="hidden lg:flex items-center gap-8">
                {navItems.map((item) => {
                  const active = location.pathname === item.to;
                  return (
                    <Link key={item.to} to={item.to} className="relative py-2 group">
                      <span className={`nav-item transition-colors duration-200 ${active ? 'nav-active text-white' : 'text-blue-100/70 group-hover:text-white'}`}>
                        {item.label}
                      </span>
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/80"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* ── RIGHT SIDE (desktop) ── */}
              <div className="hidden lg:flex items-center gap-3">
                <div className="h-5 w-px bg-white/10" />

                {/* ── LANGUAGE SELECTOR ── */}
                <div className="relative" ref={langRef}>
                  <motion.button
                    onClick={() => setLangOpen((p) => !p)}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200"
                    style={{
                      background: langOpen ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: 'rgba(255,255,255,0.9)',
                    }}
                  >
                    <Globe size={12} style={{ color: '#93c5fd' }} />
                    <span style={{ fontFamily: 'Syne', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                      {langLabels[language]}
                    </span>
                    <motion.span animate={{ rotate: langOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
                      <ChevronDown size={11} />
                    </motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {langOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 8px)',
                          right: 0,
                          minWidth: '160px',
                          zIndex: 9999,
                          borderRadius: '12px',
                          overflow: 'hidden',
                          background: 'linear-gradient(160deg, #1452c8 0%, #0f3fa8 100%)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          backdropFilter: 'blur(24px)',
                          boxShadow: '0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)',
                        }}
                      >
                        {(Object.keys(flags) as Language[]).map((lang, i) => (
                          <motion.button
                            key={lang}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => { setLanguage(lang); setLangOpen(false); }}
                            className="flex items-center gap-3 w-full px-4 py-3 transition-all duration-150"
                            style={{
                              background: language === lang ? 'rgba(147,197,253,0.1)' : 'transparent',
                              borderLeft: `2px solid ${language === lang ? '#93c5fd' : 'transparent'}`,
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = language === lang ? 'rgba(147,197,253,0.1)' : 'transparent'; }}
                          >
                            <span className="text-base">{flags[lang]}</span>
                            <span style={{
                              fontFamily: 'Syne', fontSize: '0.65rem', fontWeight: 700,
                              letterSpacing: '0.1em', textTransform: 'uppercase',
                              color: language === lang ? '#93c5fd' : 'rgba(255,255,255,0.55)',
                            }}>
                              {langLabels[lang]}
                            </span>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ── CTA ── */}
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/contact"
                    className="cta-btn relative inline-flex items-center gap-2 px-5 py-[10px] rounded-xl overflow-hidden transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.96)',
                      fontFamily: 'Syne',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#1248b8',
                      border: '1px solid rgba(255,255,255,0.3)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                    }}
                  >
                    <span className="relative">{t('nav.contactUs')}</span>
                    <ArrowUpRight size={12} className="relative" />
                  </Link>
                </motion.div>
              </div>

              {/* ── MOBILE TOGGLE ── */}
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
                whileTap={{ scale: 0.88 }}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen
                    ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X size={22} /></motion.div>
                    : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><Menu size={22} /></motion.div>
                  }
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Bottom light line */}
          <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(147,197,253,0.3) 30%, rgba(255,255,255,0.25) 50%, rgba(147,197,253,0.3) 70%, transparent)' }} />
          <AnimatePresence>
            {scrolled && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute bottom-0 left-0 right-0 h-[3px] pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, #3b82f6 25%, #60a5fa 50%, #3b82f6 75%, transparent)', filter: 'blur(1px)' }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── MOBILE MENU ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #1452c8 0%, #0f3fa8 100%)',
                borderBottom: '1px solid rgba(147,197,253,0.2)',
                backdropFilter: 'blur(24px)',
              }}
            >
              <div className="container mx-auto px-6 py-5 space-y-0.5">
                {navItems.map((item, i) => (
                  <motion.div key={item.to} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07, duration: 0.3 }}>
                    <Link to={item.to} className="flex items-center gap-3 py-3.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                        style={{ background: location.pathname === item.to ? '#93c5fd' : 'rgba(255,255,255,0.2)' }} />
                      <span style={{
                        fontFamily: 'Syne', fontSize: '0.7rem', fontWeight: 600,
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: location.pathname === item.to ? '#93c5fd' : 'rgba(255,255,255,0.6)',
                      }}>
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}

                {/* ── LANGUAGE SELECTOR MOBILE ── */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-2 pt-5">
                  {(Object.keys(flags) as Language[]).map((lang) => (
                    <button key={lang}
                      onClick={() => { setLanguage(lang); setMobileOpen(false); }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200"
                      style={{
                        fontFamily: 'Syne', fontSize: '0.6rem', fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: language === lang ? '#93c5fd' : 'rgba(255,255,255,0.4)',
                        background: language === lang ? 'rgba(147,197,253,0.12)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${language === lang ? 'rgba(147,197,253,0.3)' : 'rgba(255,255,255,0.08)'}`,
                      }}
                    >
                      <span>{flags[lang]}</span>
                      <span>{langLabels[lang]}</span>
                    </button>
                  ))}
                </motion.div>

                {/* ── CTA MOBILE ── */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="pt-4">
                  <Link to="/contact"
                    className="flex items-center justify-center gap-2 py-3.5 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.95)',
                      fontFamily: 'Syne', fontSize: '0.7rem', fontWeight: 700,
                      letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1248b8',
                    }}
                  >
                    {t('nav.contactUs')}
                    <ArrowUpRight size={14} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
