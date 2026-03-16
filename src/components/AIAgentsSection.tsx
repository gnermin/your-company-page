import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, MessageSquare, Zap, Lock } from "lucide-react";

const features = [
  { icon: Search, title: "Inteligentno pretraživanje", desc: "RAG arhitektura za precizno pronalaženje informacija iz vaših dokumenata i baza podataka" },
  { icon: MessageSquare, title: "Kontekstualni odgovori", desc: "AI agenti koji razumiju kontekst i pružaju relevantne, tačne odgovore" },
  { icon: Zap, title: "Učenje u realnom vremenu", desc: "Kontinuirano poboljšanje kroz feedback loop i adaptivno učenje" },
  { icon: Lock, title: "Sigurna integracija", desc: "Enterprise-grade sigurnost sa potpunom kontrolom nad vašim podacima" },
];

const ragNodes = [
  { label: "Retrieval Flow", x: "10%", y: "20%", delay: 0 },
  { label: "Knowledge Graph", x: "60%", y: "10%", delay: 0.2 },
  { label: "Vector DB", x: "75%", y: "45%", delay: 0.4 },
  { label: "Context Window", x: "15%", y: "60%", delay: 0.6 },
  { label: "Decision Layer", x: "50%", y: "70%", delay: 0.8 },
];

const AIAgentsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ai-agents" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            AI Agenti
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Inteligentni <span className="gradient-text">RAG Agenti</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Naši AI agenti koriste najnoviju RAG arhitekturu za precizno razumijevanje i obradu vaših podataka
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* RAG Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-80 bg-card/30 rounded-2xl border border-border overflow-hidden"
          >
            <div className="absolute inset-0 grid-pattern opacity-20" />
            {ragNodes.map((node, i) => (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + node.delay, duration: 0.5 }}
                className="absolute px-3 py-2 bg-secondary border border-primary/20 rounded-lg text-xs text-primary font-medium"
                style={{ left: node.x, top: node.y }}
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow absolute -top-1 -right-1" />
                {node.label}
              </motion.div>
            ))}
            {/* Connection lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <line x1="25%" y1="28%" x2="65%" y2="18%" stroke="hsl(187 100% 50% / 0.15)" strokeWidth="1" />
              <line x1="75%" y1="20%" x2="80%" y2="48%" stroke="hsl(187 100% 50% / 0.15)" strokeWidth="1" />
              <line x1="25%" y1="35%" x2="22%" y2="62%" stroke="hsl(187 100% 50% / 0.15)" strokeWidth="1" />
              <line x1="30%" y1="68%" x2="55%" y2="75%" stroke="hsl(187 100% 50% / 0.15)" strokeWidth="1" />
              <line x1="70%" y1="55%" x2="60%" y2="72%" stroke="hsl(187 100% 50% / 0.15)" strokeWidth="1" />
            </svg>
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

export default AIAgentsSection;
