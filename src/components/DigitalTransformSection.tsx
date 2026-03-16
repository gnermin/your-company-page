import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, BarChart3, Users, Workflow } from "lucide-react";

const features = [
  { icon: Workflow, title: "Proces optimizacija", desc: "Analiza i optimizacija poslovnih procesa sa AI-driven uvid i automatizacijom" },
  { icon: Layers, title: "Sistem integracija", desc: "Besprijekorna integracija postojećih sistema u unified digitalnu platformu" },
  { icon: BarChart3, title: "Data analitika", desc: "Napredna analitika sa predictive modelima za informirano donošenje odluka" },
  { icon: Users, title: "Tim transformacija", desc: "Upskilling programa i change management za uspješnu digitalnu tranziciju" },
];

const pillars = [
  { label: "Integracija", value: "98%", color: "bg-primary" },
  { label: "KPI Fokus", value: "15+", color: "bg-primary" },
  { label: "Timovi", value: "50+", color: "bg-primary" },
];

const DigitalTransformSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="digital" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Digitalna Transformacija
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Kompletna <span className="gradient-text">Digitalna Evolucija</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            End-to-end digitalna transformacija vašeg poslovanja sa mjerljivim rezultatima
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card/30 rounded-2xl border border-border p-8"
          >
            <h3 className="font-heading font-semibold text-foreground mb-8 text-center">Transformacioni Rezultati</h3>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="text-center"
                >
                  <div className="text-3xl font-heading font-bold text-primary mb-2">{p.value}</div>
                  <div className="text-xs text-muted-foreground">{p.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Process flow */}
            <div className="flex items-stretch justify-between gap-2">
              {["Analiza", "Strategija", "Implementacija", "Optimizacija"].map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.15 }}
                  className="flex-1"
                >
                  <div className="bg-secondary/50 border border-border rounded-lg p-3 text-center h-full flex flex-col items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 mx-auto mb-2 flex items-center justify-center">
                      <span className="text-xs text-primary font-bold">{i + 1}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{step}</span>
                  </div>
                </motion.div>
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

export default DigitalTransformSection;
