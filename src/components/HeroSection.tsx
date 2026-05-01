import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bot, Shield, Target } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const { t } = useLang();
  const features = [
    { icon: Bot, title: t.hero.f1Title, desc: t.hero.f1Desc },
    { icon: Shield, title: t.hero.f2Title, desc: t.hero.f2Desc },
    { icon: Target, title: t.hero.f3Title, desc: t.hero.f3Desc },
  ];

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary mb-6 text-4xl font-semibold"
          >
            {t.hero.badge}
          </motion.div>

          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text cyan-glow">{t.hero.title1}</span>{" "}
            <span className="text-foreground">{t.hero.title2}</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.hero.desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => scrollTo("#digital")}
              className="bg-primary text-primary-foreground hover:bg-primary/80 text-base px-8 py-6"
            >
              {t.hero.ctaPrimary}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("#contact")}
              className="border-primary/30 text-primary hover:bg-primary/10 text-base px-8 py-6"
            >
              {t.hero.ctaSecondary}
            </Button>
          </div>
        </motion.div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 card-glow transition-all duration-300 hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
