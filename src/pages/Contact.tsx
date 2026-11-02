import { useLanguage } from '@/contexts/LanguageContext';
import ScrollAnimated from '@/components/ScrollAnimated';
import { MapPin, Phone, Mail, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();

  const offices = [
    { code: 'br', name: t('contact.brazil'), address: t('contactPage.brazil.address'), phone: '000 000 000', email: 'contacto@example.invalid' },
    { code: 'pt', name: t('contact.portugal'), address: t('contactPage.portugal.address'), phone: '000 000 000', email: 'contacto@example.invalid' },
    { code: 'us', name: t('contact.usa'), address: t('contactPage.usa.address'), phone: '000 000 000', email: 'contacto@example.invalid' },
  ];

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-gradient-dark noise-overlay overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <ScrollAnimated>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4 block">
              // {t('nav.contact')}
            </span>
            <h1 className="font-display text-4xl lg:text-6xl font-bold tracking-tighter mb-4">
              {t('contactPage.title')}
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">{t('contactPage.subtitle')}</p>
            <div className="w-20 h-px bg-primary mx-auto mt-6" />
          </ScrollAnimated>
        </div>
      </section>

      {/* Form + Offices */}
      <section className="relative py-24 lg:py-32 bg-background">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <ScrollAnimated direction="left">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-6 block">
                // {t('contactPage.formTitle')}
              </span>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {[
                  { label: t('contact.name'), type: 'text' },
                  { label: t('contact.email'), type: 'email' },
                  { label: t('contact.company'), type: 'text' },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      className="w-full px-4 py-3.5 rounded bg-card border border-border text-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_15px_hsl(207_90%_54%/0.1)] text-sm font-mono transition-all"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">{t('contact.message')}</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3.5 rounded bg-card border border-border text-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_15px_hsl(207_90%_54%/0.1)] text-sm font-mono resize-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-4 rounded bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_30px_hsl(207_90%_54%/0.4)] transition-all"
                >
                  {t('contact.send')}
                </button>
              </form>
            </ScrollAnimated>

            {/* Offices */}
            <ScrollAnimated direction="right" delay={0.2}>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-6 block">
                // {t('contactPage.officesTitle')}
              </span>
              <div className="space-y-4">
                {offices.map((office) => (
                  <div key={office.name} className="p-6 rounded-lg bg-gradient-card border-gradient hover-lift group">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={`https://flagcdn.com/w40/${office.code}.png`}
                        alt={office.name}
                        className="w-7 h-auto rounded-sm shrink-0"
                        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
                      />
                      <h3 className="font-display text-lg font-bold text-foreground tracking-tight">{office.name}</h3>
                      <div className="ml-auto w-2 h-2 rounded-full bg-primary/30 group-hover:bg-primary transition-colors animate-pulse-glow" />
                    </div>
                    <div className="space-y-2 text-xs text-muted-foreground font-mono">
                      <div className="flex items-center gap-2">
                        <MapPin size={12} className="text-primary shrink-0" />
                        {office.address}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={12} className="text-primary shrink-0" />
                        <a href={`#demo-contact'')}`} className="hover:text-primary transition-colors">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={12} className="text-primary shrink-0" />
                        <a href={`#demo-contact`} className="hover:text-primary transition-colors">
                          {office.email}
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

export default Contact;
