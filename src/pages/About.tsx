import { useLanguage } from '@/contexts/LanguageContext';
import ScrollAnimated from '@/components/ScrollAnimated';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

/* ─────────────────────────────────────────────
   COUNT-UP HOOK
───────────────────────────────────────────── */
const useCountUp = (end: number, duration = 1800, trigger: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, trigger]);
  return count;
};

/* ─────────────────────────────────────────────
   EDITORIAL RULE  —  full-width horizontal line
───────────────────────────────────────────── */
const Rule = ({ className = '' }: { className?: string }) => (
  <div className={`w-full h-px bg-foreground/15 ${className}`} />
);

/* ─────────────────────────────────────────────
   METRIC BLOCK  (editorial data cell)
───────────────────────────────────────────── */
const MetricBlock = ({
  end, suffix, label, note, delay,
}: { end: number; suffix: string; label: string; note: string; delay: number }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(end, 1600, visible);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <ScrollAnimated delay={delay}>
      <div ref={ref} className="py-10 border-r border-foreground/10 last:border-r-0 px-8 first:pl-0 last:pr-0">
        <div className="font-display text-6xl lg:text-8xl font-black tracking-tighter text-foreground tabular-nums leading-none">
          {count}<span className="text-primary">{suffix}</span>
        </div>
        <div className="mt-4 font-sans text-sm font-semibold text-foreground uppercase tracking-widest">{label}</div>
        <div className="mt-1 font-sans text-xs text-muted-foreground">{note}</div>
      </div>
    </ScrollAnimated>
  );
};

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
const About = () => {
  const { t } = useLanguage();

  const values = [
    { num: '01', key: 'value1' },
    { num: '02', key: 'value2' },
    { num: '03', key: 'value3' },
    { num: '04', key: 'value4' },
    { num: '05', key: 'value5' },
  ];

  const steps = [
    { num: '01', key: 'step1' },
    { num: '02', key: 'step2' },
    { num: '03', key: 'step3' },
    { num: '04', key: 'step4' },
  ];

  return (
    <main className="pt-20 bg-background text-foreground">

      {/* ══════════════════════════════════════
          HERO — editorial cover
      ══════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden">
        {/* background */}
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute inset-0 grid-bg opacity-10" />
        {/* giant ghost letter */}
        <div
          className="absolute -right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none"
          aria-hidden
          style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(220px, 30vw, 480px)',
            fontWeight: 900,
            lineHeight: 1,
            color: 'hsl(var(--primary) / 0.05)',
            letterSpacing: '-0.04em',
          }}
        >
          DB
        </div>

        {/* top bar — editorial masthead */}
        <div className="relative z-10 border-b border-foreground/10 px-6 lg:px-16 py-4 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {t('aboutPage.edit.issue')}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {t('nav.about')}
          </span>
        </div>

        {/* main headline */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 lg:px-16 py-16">
          <ScrollAnimated>
            {/* kicker */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-primary" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
                {t('aboutPage.edit.kicker')}
              </span>
            </div>

            {/* headline — enormous, broken across lines editorially */}
            <h1
              className="font-display font-black tracking-tighter leading-[0.92] max-w-4xl"
              style={{ fontSize: 'clamp(52px, 8vw, 120px)' }}
            >
              <span className="block text-foreground">{t('aboutPage.edit.h1line1')}</span>
              <span className="block" style={{ WebkitTextStroke: '1px hsl(var(--foreground) / 0.4)', color: 'transparent' }}>
                {t('aboutPage.edit.h1line2')}
              </span>
              <span className="block text-foreground">{t('aboutPage.edit.h1line3')}</span>
            </h1>

            {/* deck / standfirst */}
            <p className="mt-10 max-w-xl text-base lg:text-lg text-muted-foreground leading-relaxed font-light">
              {t('aboutPage.edit.standfirst')}
            </p>
          </ScrollAnimated>
        </div>

        {/* bottom scroll cue */}
        <div className="relative z-10 border-t border-foreground/10 px-6 lg:px-16 py-4 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Órbita Tech
          </span>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{t('aboutPage.edit.scroll')}</span>
            <ArrowRight size={12} className="rotate-90" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MANIFESTO — full-width pull quote
      ══════════════════════════════════════ */}
      <section className="relative px-6 lg:px-16 py-24 lg:py-36 overflow-hidden">
        <Rule />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />

        <ScrollAnimated>
          <div className="max-w-5xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary block mb-10">
              // {t('aboutPage.edit.manifestoBadge')}
            </span>
            <blockquote
              className="font-display font-bold tracking-tight leading-[1.05] text-foreground"
              style={{ fontSize: 'clamp(28px, 4vw, 60px)' }}
            >
              "{t('aboutPage.edit.manifesto')}"
            </blockquote>
            <div className="mt-10 flex items-center gap-4">
              <div className="w-10 h-px bg-foreground/20" />
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                {t('aboutPage.edit.manifestoAttrib')}
              </span>
            </div>
          </div>
        </ScrollAnimated>
        <Rule className="mt-24 lg:mt-36" />
      </section>

      {/* ══════════════════════════════════════
          METRICS — editorial data spread
      ══════════════════════════════════════ */}
      <section className="px-6 lg:px-16 py-20">
        <ScrollAnimated>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground block mb-12">
            // {t('aboutPage.edit.metricsBadge')}
          </span>
        </ScrollAnimated>
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-foreground/10">
          <MetricBlock end={30}  suffix="+" label={t('aboutPage.edit.m1label')} note={t('aboutPage.edit.m1note')} delay={0}   />
          <MetricBlock end={120} suffix="+" label={t('aboutPage.edit.m2label')} note={t('aboutPage.edit.m2note')} delay={0.1} />
          <MetricBlock end={3}   suffix=""  label={t('aboutPage.edit.m3label')} note={t('aboutPage.edit.m3note')} delay={0.2} />
          <MetricBlock end={99}  suffix="%" label={t('aboutPage.edit.m4label')} note={t('aboutPage.edit.m4note')} delay={0.3} />
        </div>
        <Rule className="mt-20" />
      </section>

      {/* ══════════════════════════════════════
          CULTURE & VALUES — editorial numbered list
      ══════════════════════════════════════ */}
      <section className="px-6 lg:px-16 py-24 lg:py-32">
        {/* section header — asymmetric two-column */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20 mb-16 lg:mb-24">
          <ScrollAnimated>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary block mb-4">
              // {t('aboutPage.edit.cultureSection')}
            </span>
            <h2
              className="font-display font-black tracking-tight leading-[1] text-foreground"
              style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
            >
              {t('aboutPage.edit.cultureTitle')}
            </h2>
          </ScrollAnimated>
          <ScrollAnimated delay={0.1}>
            <div className="lg:pt-14">
              <p className="text-muted-foreground text-base lg:text-lg leading-relaxed max-w-xl">
                {t('aboutPage.edit.cultureIntro')}
              </p>
            </div>
          </ScrollAnimated>
        </div>

        {/* values — large editorial list with ruled separators */}
        <div>
          {values.map((v, i) => (
            <ScrollAnimated key={v.key} delay={i * 0.07}>
              <div className="group">
                <Rule />
                <div className="grid lg:grid-cols-[80px_1fr_1fr] gap-6 lg:gap-12 py-8 lg:py-10 items-start
                  hover:bg-foreground/[0.02] transition-colors duration-300 -mx-4 px-4 rounded-lg">

                  {/* issue number */}
                  <span
                    className="font-display font-black text-foreground/15 group-hover:text-primary/40 transition-colors duration-500 leading-none mt-1"
                    style={{ fontSize: 'clamp(28px, 3vw, 48px)' }}
                  >
                    {v.num}
                  </span>

                  {/* value name */}
                  <h3
                    className="font-display font-bold tracking-tight text-foreground leading-tight"
                    style={{ fontSize: 'clamp(20px, 2.5vw, 34px)' }}
                  >
                    {t(`aboutPage.edit.${v.key}.title`)}
                  </h3>

                  {/* description */}
                  <p className="text-muted-foreground text-sm lg:text-base leading-relaxed lg:pt-1">
                    {t(`aboutPage.edit.${v.key}.text`)}
                  </p>
                </div>
              </div>
            </ScrollAnimated>
          ))}
          <Rule />
        </div>
      </section>

      {/* ══════════════════════════════════════
          INTERLUDE — full-bleed accent band
      ══════════════════════════════════════ */}
      <section className="relative py-20 lg:py-28 bg-primary overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <ScrollAnimated>
          <div className="px-6 lg:px-16 relative z-10">
            <p
              className="font-display font-black tracking-tighter text-primary-foreground leading-[1.0] max-w-4xl"
              style={{ fontSize: 'clamp(28px, 4vw, 58px)' }}
            >
              {t('aboutPage.edit.interlude')}
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-foreground/60">
                {t('aboutPage.edit.interludeSub')}
              </span>
            </div>
          </div>
        </ScrollAnimated>
      </section>

      {/* ══════════════════════════════════════
          METHODOLOGY — horizontal step layout
      ══════════════════════════════════════ */}
      <section className="px-6 lg:px-16 py-24 lg:py-36">
        <Rule />
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20 py-16 lg:py-24">

          {/* sticky label column */}
          <ScrollAnimated>
            <div className="lg:sticky lg:top-32">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary block mb-4">
                // {t('aboutPage.edit.methodSection')}
              </span>
              <h2
                className="font-display font-black tracking-tight leading-[1] text-foreground"
                style={{ fontSize: 'clamp(36px, 4vw, 64px)' }}
              >
                {t('aboutPage.edit.methodTitle')}
              </h2>
              <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-xs">
                {t('aboutPage.edit.methodIntro')}
              </p>
            </div>
          </ScrollAnimated>

          {/* steps column */}
          <div className="space-y-0">
            {steps.map((s, i) => (
              <ScrollAnimated key={s.key} delay={i * 0.1}>
                <div className="group border-b border-foreground/10 py-10 lg:py-12">
                  <div className="flex items-start gap-6 lg:gap-10">
                    {/* step number */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center
                      group-hover:border-primary group-hover:bg-primary/10 transition-colors duration-300">
                      <span className="font-mono text-[11px] text-muted-foreground group-hover:text-primary transition-colors duration-300">
                        {s.num}
                      </span>
                    </div>

                    <div className="flex-1">
                      {/* phase tag */}
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary/70 block mb-3">
                        {t(`aboutPage.edit.${s.key}.phase`)}
                      </span>

                      {/* step title */}
                      <h3
                        className="font-display font-bold tracking-tight text-foreground leading-tight mb-4"
                        style={{ fontSize: 'clamp(22px, 2.5vw, 36px)' }}
                      >
                        {t(`aboutPage.edit.${s.key}.title`)}
                      </h3>

                      {/* description */}
                      <p className="text-muted-foreground text-sm lg:text-base leading-relaxed max-w-lg">
                        {t(`aboutPage.edit.${s.key}.text`)}
                      </p>

                      {/* deliverable tag */}
                      <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/10
                        bg-foreground/[0.03] group-hover:border-primary/30 transition-colors duration-300">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {t('aboutPage.edit.deliverableLabel')}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                          {t(`aboutPage.edit.${s.key}.deliverable`)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimated>
            ))}
          </div>
        </div>
        <Rule />
      </section>

      {/* ══════════════════════════════════════
          CLOSING CTA — editorial back page
      ══════════════════════════════════════ */}
      <section className="relative px-6 lg:px-16 py-24 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute inset-0 grid-bg opacity-10" />

        {/* large ghost number */}
        <div
          className="absolute right-0 bottom-0 select-none pointer-events-none leading-none"
          aria-hidden
          style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(180px, 25vw, 400px)',
            fontWeight: 900,
            color: 'hsl(var(--primary) / 0.04)',
          }}
        >
          ©
        </div>

        <div className="relative z-10 max-w-4xl">
          <ScrollAnimated>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary block mb-8">
              // {t('aboutPage.edit.ctaSection')}
            </span>
            <h2
              className="font-display font-black tracking-tighter leading-[1.0] text-foreground"
              style={{ fontSize: 'clamp(40px, 6vw, 96px)' }}
            >
              {t('aboutPage.edit.ctaTitle')}
            </h2>

            <div className="mt-10 flex flex-col sm:flex-row items-start gap-6">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground
                  font-mono text-xs uppercase tracking-[0.2em] rounded-none
                  hover:bg-primary/90 transition-colors duration-200"
              >
                {t('aboutPage.edit.ctaButton')}
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
              <a
                href="#companies"
                className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em]
                  text-muted-foreground hover:text-foreground transition-colors duration-200 mt-1"
              >
                {t('aboutPage.edit.ctaSecondary')}
                <ArrowRight size={12} />
              </a>
            </div>
          </ScrollAnimated>
        </div>

        {/* bottom masthead */}
        <Rule className="mt-24 lg:mt-36" />
        <div className="mt-6 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Órbita Tech — {t('aboutPage.edit.issue')}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">EST. 1994</span>
        </div>
      </section>

    </main>
  );
};

export default About;
