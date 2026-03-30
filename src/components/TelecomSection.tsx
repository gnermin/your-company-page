import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Network, Radio, Eye, Wifi } from "lucide-react";

const features = [
  { icon: Radio, title: "Radio mreže", desc: "Konsalting i implementacija LoRa, LoRaWAN, NB-IoT i DMR radio komunikacijskih mreža" },
  { icon: Network, title: "FTTH Mreže", desc: "Projektovanje i gradnja fiber-to-the-home optičkih mreža za brzi pristup internetu" },
  { icon: Eye, title: "Nadzor mreže", desc: "24/7 monitoring i upravljanje telekomunikacijskom infrastrukturom u realnom vremenu" },
  { icon: Phone, title: "VoIP Sistemi", desc: "Napredni VoIP sistemi sa kristalno čistim zvukom i niskim latencijama" },
  { icon: Wifi, title: "Networking", desc: "Dizajn i implementacija skalabilnih mrežnih rješenja za vaše poslovanje" },
];

const stats = [
  { label: "Aktivnih linija", value: "500+" },
  { label: "Uptime", value: "99.9%" },
  { label: "Lokacija", value: "30+" },
  { label: "Partnera", value: "15+" },
];

const TelecomSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="telecom" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            TK Rješenja
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Telekomunikacijska <span className="gradient-text">Rješenja</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Kompletna telekomunikacijska infrastruktura i usluge za moderno poslovanje
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card/30 rounded-2xl border border-border p-8 mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.15 }}
                className="text-center"
              >
                <div className="text-3xl font-heading font-bold text-primary mb-2">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
              className="bg-card/50 border border-border rounded-xl p-5 card-glow transition-all hover:border-primary/30"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TelecomSection;
