import { useLanguage } from '@/contexts/LanguageContext';
import ScrollAnimated from '@/components/ScrollAnimated';
import { ExternalLink, MapPin, CheckCircle, ArrowUpRight } from 'lucide-react';

const Companies = () => {
  const { t } = useLanguage();

  const companies = [
    {
      name: t('companiesPage.NEXO.title'),
      role: t('companiesPage.NEXO.role'),
      desc: t('companiesPage.NEXO.desc'),
      services: [
        t('companiesPage.NEXO.service1'),
        t('companiesPage.NEXO.service2'),
        t('companiesPage.NEXO.service3'),
        t('companiesPage.NEXO.service4'),
      ],
      location: t('companiesPage.NEXO.location'),
      url: '#demo-contact',
      isPrimary: true,
    },
    {
      name: t('companiesPage.bf2.title'),
      role: t('companiesPage.bf2.role'),
      desc: t('companiesPage.bf2.desc'),
      services: [
        t('companiesPage.bf2.service1'),
        t('companiesPage.bf2.service2'),
        t('companiesPage.bf2.service3'),
        t('companiesPage.bf2.service4'),
      ],
      location: t('companiesPage.bf2.location'),
      url: '#demo-contact',
      isPrimary: false,
    },
  ];

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-gradient-dark noise-overlay overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <ScrollAnimated>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4 block">
              // {t('nav.companies')}
            </span>
            <h1 className="font-display text-4xl lg:text-6xl font-bold tracking-tighter mb-4">
              {t('companiesPage.title')}
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              {t('companiesPage.subtitle')}
            </p>
            <div className="w-20 h-px bg-primary mx-auto mt-6" />
          </ScrollAnimated>
        </div>
      </section>

      {/* Companies */}
      <section className="relative py-24 lg:py-32 bg-background">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl space-y-12">
          {companies.map((company, i) => (
            <ScrollAnimated key={company.name} delay={i * 0.15}>
              <div className="group rounded-lg bg-primary p-8 lg:p-12 hover-lift overflow-hidden relative border-0">
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-[60px] bg-white/10" />

                <div className="relative z-10">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3 block text-white/70">
                    {company.role}
                  </span>

                  <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-2 text-white">
                    {company.name}
                  </h2>

                  <div className="w-16 h-px mb-6 bg-white/40" />

                  <p className="leading-relaxed mb-6 max-w-2xl text-white/80">
                    {company.desc}
                  </p>

                  <div className="flex items-center gap-2 text-xs mb-8 font-mono uppercase tracking-wider text-white/70">
                    <MapPin size={14} className="text-white" />
                    {company.location}
                  </div>

                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-4 text-white">
                    {t('companiesPage.services')}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-10">
                    {company.services.map((s) => (
                      <div key={s} className="flex items-start gap-2.5 text-sm text-white/80">
                        <CheckCircle size={14} className="mt-0.5 shrink-0 text-white" />
                        {s}
                      </div>
                    ))}
                  </div>

                  
                    <a href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded text-xs font-bold uppercase tracking-widest transition-all bg-white text-primary hover:bg-white/90 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                  >
                    {t('companies.visitSite')} <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </ScrollAnimated>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Companies;
