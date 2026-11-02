import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Lightbulb, Award, Globe, ExternalLink, ArrowRight, Zap, MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import ScrollAnimated from '@/components/ScrollAnimated';
import CounterAnimation from '@/components/CounterAnimation';

const Globe3D = lazy(() => import('@/components/Globe3D'));
import SpaceBackground from '@/components/SpaceBackground';

/* ── Inline styles ─────────────────────────────────────────────────────── */
const shimmerKeyframes = `
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}
@keyframes ticker {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes float-up {
  0%   { opacity: 0; transform: translateY(0);   }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { opacity: 0; transform: translateY(-80px); }
}
@keyframes pulse-ring {
  0%   { transform: scale(0.8); opacity: 0.8; }
  100% { transform: scale(1.8); opacity: 0; }
}
`;

/* ── Tech ticker data ───────────────────────────────────────────────────── */
const TICKER_ITEMS = [
  'Cloud Architecture', 'DevOps', 'AI & Machine Learning', 'Cybersecurity',
  'SAP Consulting', 'Digital Transformation', 'Data Engineering', 'ERP Solutions',
  'IT Strategy', 'Agile Delivery', 'Microsoft Azure', 'AWS', 'Kubernetes',
];

const Index = () => {
  const { t } = useLanguage();

  return (
    <main>
      <style>{shimmerKeyframes}</style>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#000510] noise-overlay">

        {/* ── Space background: stars + shooting stars + nebula ── */}
        <SpaceBackground />

        {/* ── Globe 3D sits above space, below text ── */}
        <div className="absolute inset-0 z-[2] flex items-center justify-center">
          <Suspense fallback={null}>
            <Globe3D />
          </Suspense>
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 grid-bg opacity-10 z-[3]" />

        {/* Dark vignette: edges dark, centre transparent so globe + stars show */}
        <div
          className="absolute inset-0 z-[4] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 65% 60% at 50% 50%, transparent 35%, #000510aa 65%, #000510ee 100%)',
          }}
        />

        {/* Floating particles — above all overlays */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute z-[6] w-1 h-1 rounded-full bg-primary/60"
            style={{
              left: `${10 + i * 11}%`,
              bottom: '15%',
              animation: `float-up ${3 + (i % 4)}s ease-in-out ${i * 0.7}s infinite`,
            }}
          />
        ))}

        <div className="relative z-[7] container mx-auto px-4 text-center">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl md:text-6xl lg:text-8xl font-bold mb-6 leading-[0.9] tracking-tighter"
          >
            <span style={{ color: '#ffffff' }}>DB</span>
            <span className="text-gradient">Consulting</span>
            <br />
            <span style={{ color: '#e8f4ff' }}>Group</span>
          </motion.h1>

          {/* Slogan */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-base md:text-lg lg:text-xl font-light max-w-2xl mx-auto mb-3 tracking-wide"
            style={{ color: 'rgba(200, 228, 255, 0.92)' }}
          >
            {t('hero.slogan')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-xs md:text-sm max-w-xl mx-auto mb-10 font-mono uppercase tracking-widest"
            style={{ color: 'rgba(140, 190, 255, 0.7)' }}
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* ── CTA buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary — shimmer button */}
            <Link
              to="/companies"
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-primary-foreground rounded overflow-hidden"
              style={{
                background: 'linear-gradient(90deg, hsl(207 90% 40%) 0%, hsl(207 90% 54%) 40%, hsl(185 100% 50%) 60%, hsl(207 90% 54%) 80%, hsl(207 90% 40%) 100%)',
                backgroundSize: '200% auto',
                animation: 'shimmer 3s linear infinite',
                boxShadow: '0 0 25px hsl(207 90% 54% / 0.4)',
              }}
            >
              {t('hero.cta')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Secondary — ghost button */}
            <Link
              to="/about"
              className="group inline-flex items-center gap-3 px-8 py-3.5 text-sm font-bold uppercase tracking-widest rounded border border-primary/40 text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300 backdrop-blur-sm"
            >
              {t('nav.about')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform opacity-60" />
            </Link>
          </motion.div>

          {/* ── Quick KPIs ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-14 flex items-center justify-center gap-8 md:gap-16 flex-wrap"
          >
            {[
              { value: '30+', label: t('stats.years') },
              { value: '300+', label: t('stats.professionals') },
              { value: '3', label: t('stats.countries') },
            ].map((kpi, i) => (
              <div key={i} className="text-center">
                <p
                  className="font-display text-2xl md:text-3xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #fff 0%, hsl(207 90% 74%) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {kpi.value}
                </p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">
                  {kpi.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[7] flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Scroll</span>
          <div
            className="w-5 h-8 rounded-full border border-primary/40 flex items-start justify-center p-1.5"
          >
            <motion.div
              className="w-1 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>

        {/* Side decorative lines */}
        <div className="absolute left-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent z-[7] hidden lg:block" />
        <div className="absolute right-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent z-[7] hidden lg:block" />
      </section>

      {/* ═══════════ TECH TICKER ═══════════ */}
      <div className="relative py-4 bg-primary/5 border-y border-primary/15 overflow-hidden">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(to right, hsl(var(--background)), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(to left, hsl(var(--background)), transparent)' }} />

        <div
          className="flex gap-10 w-max"
          style={{ animation: 'ticker 30s linear infinite' }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-widest text-muted-foreground whitespace-nowrap">
              <Zap size={10} className="text-accent" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════ ABOUT SUMMARY ═══════════ */}
      <section className="relative py-24 lg:py-32 bg-background overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <ScrollAnimated>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4 block">
                // {t('nav.about')}
              </span>
              <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight mb-8">
                {t('about.title')}
              </h2>
            </ScrollAnimated>

            <ScrollAnimated delay={0.1}>
              <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-14 max-w-3xl">
                {t('about.text')}
              </p>
            </ScrollAnimated>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-12">
              {[
                { icon: Lightbulb, label: t('about.innovation'), desc: 'Cutting-edge solutions', color: 'text-primary' },
                { icon: Award, label: t('about.excellence'), desc: '30+ years of expertise', color: 'text-accent' },
                { icon: Globe, label: t('about.globalReach'), desc: '3 continents, 1 vision', color: 'text-primary' },
              ].map((item, i) => (
                <ScrollAnimated key={item.label} delay={i * 0.1}>
                  <div className="group p-6 lg:p-8 rounded-lg bg-gradient-card border-gradient hover-lift scan-line relative overflow-hidden">
                    {/* Corner glow */}
                    <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'radial-gradient(circle at top right, hsl(207 90% 54% / 0.15), transparent 70%)' }} />
                    <item.icon className={`${item.color} mb-4 group-hover:scale-110 transition-transform duration-300`} size={28} strokeWidth={1.5} />
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">{item.label}</h3>
                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{item.desc}</p>
                  </div>
                </ScrollAnimated>
              ))}
            </div>

            <ScrollAnimated>
              <Link
                to="/about"
                className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors"
              >
                <span className="w-8 h-px bg-primary group-hover:w-12 transition-all" />
                {t('about.learnMore')}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </ScrollAnimated>
          </div>
        </div>
      </section>

      {/* ═══════════ COMPANIES ═══════════ */}
      <section className="relative py-24 lg:py-32 bg-gradient-aggressive overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollAnimated>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4 block text-center">
              // {t('nav.companies')}
            </span>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-center tracking-tight mb-16">
              {t('companies.title')}
            </h2>
          </ScrollAnimated>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* NEXO */}
            <ScrollAnimated delay={0.1} direction="left">
              <div className="group relative rounded-lg bg-gradient-card border-gradient p-8 lg:p-10 hover-lift h-full flex flex-col overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-[40px]" />
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at top right, hsl(207 90% 54% / 0.07), transparent 60%)' }} />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/60 mb-4 block">Majority-owned subsidiary</span>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2 tracking-tight">
                  NEXO <span className="text-gradient">IT Consulting</span>
                </h3>
                <div className="w-12 h-px bg-primary/40 mb-6" />
                <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1">
                  {t('companies.NEXO.desc')}
                </p>
                <a
                  href="#demo-contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_25px_hsl(207_90%_54%/0.4)] transition-all w-fit"
                >
                  {t('companies.visitSite')} <ExternalLink size={12} />
                </a>
              </div>
            </ScrollAnimated>

            {/* Vetor Labs */}
            <ScrollAnimated delay={0.2} direction="right">
              <div className="group relative rounded-lg bg-gradient-card border-gradient p-8 lg:p-10 hover-lift h-full flex flex-col overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-bl-[40px]" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at top right, hsl(185 100% 50% / 0.07), transparent 60%)' }} />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/60 mb-4 block">Partner company</span>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2 tracking-tight">
                  Vetor Labs <span className="text-gradient-hot">Empowering Solutions</span>
                </h3>
                <div className="w-12 h-px bg-accent/40 mb-6" />
                <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1">
                  {t('companies.bf2.desc')}
                </p>
                <a
                  href="#demo-contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded bg-accent text-accent-foreground text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_25px_hsl(185_100%_50%/0.4)] transition-all w-fit"
                >
                  {t('companies.visitSite')} <ExternalLink size={12} />
                </a>
              </div>
            </ScrollAnimated>
          </div>
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section className="relative py-24 lg:py-32 bg-background overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* Ambient blobs */}
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] opacity-5 pointer-events-none"
          style={{ background: 'hsl(207 90% 54%)' }} />
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] opacity-5 pointer-events-none"
          style={{ background: 'hsl(185 100% 50%)' }} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollAnimated>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4 block text-center">
              // Impact
            </span>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-center tracking-tight mb-16">
              {t('stats.title')}
            </h2>
          </ScrollAnimated>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <CounterAnimation end={30} suffix="+" label={t('stats.years')} />
            <CounterAnimation end={300} suffix="+" label={t('stats.professionals')} />
            <CounterAnimation end={500} suffix="+" label={t('stats.projects')} />
            <CounterAnimation end={3} label={t('stats.countries')} />
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT SUMMARY ═══════════ */}
      <section className="relative py-24 lg:py-32 bg-gradient-aggressive overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollAnimated>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4 block text-center">
              // {t('nav.contact')}
            </span>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-center tracking-tight mb-3">
              {t('contact.title')}
            </h2>
          </ScrollAnimated>
          <ScrollAnimated delay={0.1}>
            <p className="text-muted-foreground text-center mb-14 text-sm">{t('contact.subtitle')}</p>
          </ScrollAnimated>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
            <ScrollAnimated delay={0.1} direction="left">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {[
                  { type: 'text', key: 'contact.name' },
                  { type: 'email', key: 'contact.email' },
                  { type: 'text', key: 'contact.company' },
                ].map((field) => (
                  <input
                    key={field.key}
                    type={field.type}
                    placeholder={t(field.key)}
                    className="w-full px-4 py-3.5 rounded bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:shadow-[0_0_15px_hsl(207_90%_54%/0.1)] text-sm font-mono transition-all"
                  />
                ))}
                <textarea
                  rows={4}
                  placeholder={t('contact.message')}
                  className="w-full px-4 py-3.5 rounded bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:shadow-[0_0_15px_hsl(207_90%_54%/0.1)] text-sm font-mono resize-none transition-all"
                />
                {/* Submit with shimmer */}
                <button
                  type="submit"
                  className="relative w-full px-6 py-3.5 rounded text-primary-foreground font-bold text-xs uppercase tracking-widest overflow-hidden transition-all"
                  style={{
                    background: 'linear-gradient(90deg, hsl(207 90% 40%) 0%, hsl(207 90% 54%) 40%, hsl(185 100% 50%) 60%, hsl(207 90% 54%) 80%, hsl(207 90% 40%) 100%)',
                    backgroundSize: '200% auto',
                    animation: 'shimmer 3s linear infinite',
                    boxShadow: '0 0 20px hsl(207 90% 54% / 0.3)',
                  }}
                >
                  {t('contact.send')}
                </button>
              </form>
            </ScrollAnimated>

            <ScrollAnimated delay={0.2} direction="right">
              <div className="space-y-5">
                <div className="p-4 rounded bg-card border border-border hover:border-primary/30 transition-colors">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary block mb-1">Email</span>
                  <p className="text-sm text-foreground font-mono">info@Órbita Tech.com</p>
                </div>
                {[
                  { code: 'br', name: t('contact.brazil'), address: t('contactPage.brazil.address'), phone: '000 000 000', email: 'contacto@example.invalid' },
                  { code: 'pt', name: t('contact.portugal'), address: t('contactPage.portugal.address'), phone: '000 000 000', email: 'contacto@example.invalid' },
                  { code: 'us', name: t('contact.usa'), address: t('contactPage.usa.address'), phone: '000 000 000', email: 'contacto@example.invalid' },
                ].map((loc) => (
                  <div key={loc.name} className="p-4 rounded bg-card border border-border hover:border-primary/30 transition-colors group">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={`https://flagcdn.com/w40/${loc.code}.png`}
                        alt={loc.name}
                        className="w-7 h-auto rounded-sm shrink-0"
                        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
                      />
                      <p className="text-sm font-semibold text-foreground">{loc.name}</p>
                      <div className="ml-auto w-2 h-2 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                    </div>
                    <div className="space-y-1.5 text-xs text-muted-foreground font-mono">
                      <div className="flex items-center gap-2">
                        <MapPin size={11} className="text-primary shrink-0" />
                        {loc.address}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={11} className="text-primary shrink-0" />
                        <a href={`#demo-contact'')}`} className="hover:text-primary transition-colors">
                          {loc.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={11} className="text-primary shrink-0" />
                        <a href={`#demo-contact`} className="hover:text-primary transition-colors">
                          {loc.email}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollAnimated>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
