import { useLang } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="border-t border-border py-12 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-sm">NG</span>
              </div>
              <span className="font-heading font-bold text-foreground">
                NG <span className="text-primary">Consulting</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4 text-sm">{t.footer.services}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#ai-agents" className="hover:text-primary transition-colors">{t.nav.ai}</a></li>
              <li><a href="#telecom" className="hover:text-primary transition-colors">{t.nav.telecom}</a></li>
              <li><a href="#iot" className="hover:text-primary transition-colors">{t.nav.iot}</a></li>
              <li><a href="#drones" className="hover:text-primary transition-colors">{t.nav.drones}</a></li>
              <li><a href="#digital" className="hover:text-primary transition-colors">{t.nav.digital}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4 text-sm">{t.footer.company}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">{t.footer.about}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t.footer.careers}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t.footer.blog}</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">{t.nav.contact}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4 text-sm">{t.footer.legal}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">{t.footer.privacy}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t.footer.terms}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t.footer.cookies}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {t.footer.rights}
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">LinkedIn</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Twitter</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
