import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Wifi, Radio, Cpu, MapPin } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const featureIcons = [Cpu, Radio, Wifi, MapPin];

const AnimatedCounter = ({ target, inView }: { target: number; inView: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span>{count.toLocaleString()}</span>;
};

const IoTSection = () => {
  const { t } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = t.iot.f.map((f, i) => ({ icon: featureIcons[i], title: f.t, desc: f.d }));
  const stats = [
    { label: t.iot.stats.devices, value: 50, icon: Cpu },
    { label: t.iot.stats.gateway, value: 25, icon: Radio },
    { label: t.iot.stats.sensors, value: 100, icon: Wifi },
    { label: t.iot.stats.locations, value: 10, icon: MapPin },
  ];

  return (
    <section id="iot" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t.iot.badge}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.iot.title1} <span className="gradient-text">{t.iot.title2}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-cyan-50 text-2xl">
            {t.iot.desc}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Telemetry visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card/30 rounded-2xl border border-border p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-semibold text-foreground text-sm">{t.iot.live}</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs text-muted-foreground">{t.iot.online}</span>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="bg-secondary/50 rounded-lg p-4 border border-border"
                >
                  <s.icon className="w-4 h-4 text-primary mb-2" />
                  <div className="text-2xl font-heading font-bold text-foreground">
                    <AnimatedCounter target={s.value} inView={isInView} />
                  </div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Signal bars */}
            <div className="space-y-3">
              {[
                { label: t.iot.bars.signal, value: 94 },
                { label: t.iot.bars.latency, value: 12, suffix: "ms" },
                { label: t.iot.bars.sync, value: 99.8, suffix: "%" },
              ].map((bar) => (
                <div key={bar.label} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-16">{bar.label}</span>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${Math.min(bar.value, 100)}%` } : {}}
                      transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                  <span className="text-xs text-foreground w-14 text-right">
                    {bar.value}{bar.suffix || "%"}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Feature cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
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
      </div>
    </section>
  );
};

export default IoTSection;
