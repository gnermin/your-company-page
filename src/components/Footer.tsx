const Footer = () => {
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
              Inovativna rješenja za digitalnu transformaciju vašeg poslovanja.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4 text-sm">Usluge</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#ai-agents" className="hover:text-primary transition-colors">AI Agenti</a></li>
              <li><a href="#iot" className="hover:text-primary transition-colors">IoT Sistemi</a></li>
              <li><a href="#drones" className="hover:text-primary transition-colors">Dron Tehnologije</a></li>
              <li><a href="#digital" className="hover:text-primary transition-colors">Digitalna Transformacija</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4 text-sm">Kompanija</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">O nama</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Karijere</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Kontakt</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4 text-sm">Pravno</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Politika privatnosti</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Uslovi korištenja</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie politika</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 NG Consulting. Sva prava zadržana.
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
