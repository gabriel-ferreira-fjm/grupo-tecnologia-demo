import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes float-orb   { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-18px) scale(1.04)} }
        @keyframes float-orb-2 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(14px) scale(1.03)} }

        .footer-orb   { animation: float-orb   9s ease-in-out infinite; }
        .footer-orb-2 { animation: float-orb-2 11s ease-in-out infinite; }

        .nav-link { position:relative; display:inline-block; overflow:hidden; }
        .nav-link::before {
          content: attr(data-label);
          position:absolute; top:0; left:0;
          color:#fff;
          transform:translateY(110%);
          transition:transform 0.28s cubic-bezier(0.77,0,0.175,1);
        }
        .nav-link span { display:block; transition:transform 0.28s cubic-bezier(0.77,0,0.175,1); }
        .nav-link:hover::before { transform:translateY(0); }
        .nav-link:hover span    { transform:translateY(-110%); }

        .company-card { transition: all 0.22s ease; }
        .company-card:hover {
          background: rgba(59,130,246,0.09);
          border-color: rgba(96,165,250,0.3);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37,99,235,0.15);
        }
      `}</style>

      <footer
        style={{ fontFamily: "'DM Sans', sans-serif", background: 'linear-gradient(145deg, #06101e 0%, #09162b 60%, #060d1a 100%)' }}
        className="relative overflow-hidden"
      >
        {/* ── Ambient orbs ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="footer-orb absolute top-0 left-[5%] w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.11) 0%, transparent 70%)' }} />
          <div className="footer-orb-2 absolute bottom-0 right-[8%] w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(29,78,216,0.09) 0%, transparent 70%)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.055) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        </div>

        {/* ── Top glow border ── */}
        <div className="relative h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #2563eb 35%, #60a5fa 50%, #2563eb 65%, transparent)' }}>
          <div className="absolute inset-0 blur-sm" style={{ background: 'linear-gradient(90deg, transparent 20%, #3b82f6 50%, transparent 80%)', opacity: 0.55 }} />
        </div>

        {/* ══════════════════════════════════════════
            MAIN BODY
        ══════════════════════════════════════════ */}
        <div className="relative flex flex-col lg:flex-row">

          {/* ── LEFT — Brand + Contact ── */}
          <div
            className="lg:w-[46%] flex flex-col px-10 lg:px-14 pt-12 pb-10 gap-7"
            style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}
          >
            {/* Logo card */}
            <div
              className="inline-block self-start rounded-xl px-5 py-3.5"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)' }}
            >
              <img src="/demo/logo.svg" alt="Órbita" className="w-40 h-auto object-contain" />
            </div>

            {/* Description */}
            <p className="text-[0.82rem] text-slate-400 leading-relaxed max-w-sm">
              {t('footer.desc')}
            </p>

            {/* ── CTA button ABOVE email ── */}
            <div className="flex flex-col gap-3">
              <div>
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-xl overflow-hidden transition-transform duration-200 hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)', boxShadow: '0 0 28px rgba(37,99,235,0.28), inset 0 1px 0 rgba(255,255,255,0.14)' }}
                >
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }} />
                  <span className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
                  <span className="relative text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white">{t('nav.contactUs')}</span>
                  <svg className="relative w-3.5 h-3.5 text-blue-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H9m10.5 0V15" />
                  </svg>
                </Link>
              </div>
              <a
                href="#demo-contact"
                className="text-[0.76rem] text-slate-500 hover:text-slate-300 transition-colors"
                style={{ fontFamily: 'monospace' }}
              >
                info@Órbita Tech.com
              </a>
            </div>
          </div>

          {/* ── RIGHT — Nav, Companies, Presence ── */}
          <div className="lg:w-[54%] flex flex-col px-10 lg:px-14 pt-12 pb-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 flex-1">

              {/* Quick Links */}
              <div>
                <p className="text-[0.58rem] font-bold uppercase tracking-[0.28em] text-blue-400 mb-5 pb-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {t('footer.quickLinks')}
                </p>
                <nav className="flex flex-col gap-3.5">
                  {[
                    { path: '/', key: 'nav.home' },
                    { path: '/about', key: 'nav.about' },
                    { path: '/companies', key: 'nav.companies' },
                    { path: '/contact', key: 'nav.contact' },
                  ].map(({ path, key }) => (
                    <Link key={path} to={path} className="nav-link text-[0.82rem] text-slate-400 h-[1.1rem] leading-[1.1rem]" data-label={t(key)}>
                      <span>{t(key)}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Group Companies — with logos */}
              <div>
                <p className="text-[0.58rem] font-bold uppercase tracking-[0.28em] text-blue-400 mb-5 pb-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {t('footer.groupCompanies')}
                </p>
                <div className="flex flex-col gap-3">

                  {/* Nexo Data */}
                  <a
                    href="#demo-contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="company-card flex items-center gap-3 rounded-xl px-3.5 py-3"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.92)' }}>
                      <img src="/demo/visual.svg" alt="NEXO" className="w-6 h-6 object-contain" />
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-[0.76rem] text-slate-300 font-medium leading-snug truncate">Nexo Data</span>
                    </div>
                  </a>

                  {/* Vetor Labs Empowering Solutions */}
                  <a
                    href="#demo-contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="company-card flex items-center gap-3 rounded-xl px-3.5 py-3"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center shrink-0 bg-black">
                      <img src="/demo/logo.svg" alt="Vetor Labs" className="w-9 h-9 object-cover rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-[0.76rem] text-slate-300 font-medium leading-snug truncate">Vetor Labs Empowering</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Global Presence */}
              <div>
                <p className="text-[0.58rem] font-bold uppercase tracking-[0.28em] text-blue-400 mb-5 pb-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {t('footer.globalPresence')}
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    { code: 'br', label: 'Brazil' },
                    { code: 'pt', label: 'Portugal' },
                    { code: 'us', label: 'USA' },
                  ].map(({ code, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5"
                      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <img
                        src={`https://flagcdn.com/w40/${code}.png`}
                        alt={label}
                        className="w-6 h-auto rounded-sm shrink-0"
                        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
                      />
                      <span className="text-[0.8rem] text-slate-300 font-medium">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            BOTTOM STRIP
        ══════════════════════════════════════════ */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.3)' }}>
          <div className="container mx-auto px-10 lg:px-14 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[0.67rem] tracking-wide" style={{ color: 'rgba(100,116,139,0.6)', fontFamily: 'monospace' }}>
              © {year} Órbita Tech — {t('footer.rights')}
            </p>
            <div className="flex items-center gap-5">
              <a href="#" className="text-[0.67rem] uppercase tracking-[0.18em] hover:text-blue-400 transition-colors" style={{ color: 'rgba(100,116,139,0.6)' }}>
                {t('footer.privacy')}
              </a>
              <span style={{ color: 'rgba(100,116,139,0.2)' }}>|</span>
              <Link to="/contact" className="text-[0.67rem] uppercase tracking-[0.18em] hover:text-blue-400 transition-colors" style={{ color: 'rgba(100,116,139,0.6)' }}>
                {t('nav.contact')}
              </Link>
            </div>
          </div>
        </div>

      </footer>
    </>
  );
};

export default Footer;
