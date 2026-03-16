import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, Map, Eye, Navigation } from "lucide-react";

const features = [
  { icon: Eye, title: "Aerial inspekcija", desc: "Autonomna inspekcija infrastrukture sa AI detektovanjem oštećenja i anomalija" },
  { icon: Camera, title: "AI prepoznavanje", desc: "Computer vision za automatsko prepoznavanje objekata i analizu terena" },
  { icon: Map, title: "4K video streaming", desc: "Live streaming u 4K rezoluciji sa real-time AI anotacijama i overlay-ima" },
  { icon: Navigation, title: "Autonomno mapiranje", desc: "3D mapiranje terena sa centimetarskom preciznošću koristeći LiDAR tehnologiju" },
];

const missionControls = [
  { label: "4K Capture", status: "active" },
  { label: "Mapping", status: "active" },
  { label: "Inspection", status: "standby" },
  { label: "Autonomy", status: "active" },
];

const DroneSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="drones" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Dron Tehnologije
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Napredne <span className="gradient-text">Dron Operacije</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Autonomni dronovi sa AI navigacijom za inspekciju, mapiranje i analizu terena
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Mission Control */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card/30 rounded-2xl border border-border p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-semibold text-foreground text-sm">Mission Control</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                <span className="text-xs text-primary">ACTIVE</span>
              </div>
            </div>

            {/* Drone visualization */}
            <div className="relative h-48 bg-secondary/30 rounded-xl border border-border mb-6 overflow-hidden">
              <div className="absolute inset-0 grid-pattern opacity-20" />
              {/* Flight path */}
              <svg className="absolute inset-0 w-full h-full">
                <motion.path
                  d="M 30 140 Q 80 40, 150 80 T 280 50"
                  stroke="hsl(187 100% 50% / 0.4)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="8 4"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ delay: 0.5, duration: 2 }}
                />
              </svg>
              {/* Drone icon */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1 }}
                className="absolute top-1/3 left-1/2 -translate-x-1/2"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary flex items-center justify-center animate-float">
                  <Navigation className="w-3 h-3 text-primary" />
                </div>
              </motion.div>
              {/* Scan areas */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 1.2 }}
                className="absolute top-1/4 left-1/4 w-16 h-16 border border-primary/20 rounded-lg"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 1.4 }}
                className="absolute bottom-1/4 right-1/4 w-20 h-12 border border-primary/20 rounded-lg"
              />
            </div>

            {/* Control modules */}
            <div className="grid grid-cols-2 gap-3">
              {missionControls.map((mc, i) => (
                <motion.div
                  key={mc.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="bg-secondary/50 rounded-lg p-3 border border-border flex items-center justify-between"
                >
                  <span className="text-xs text-foreground">{mc.label}</span>
                  <div className={`w-2 h-2 rounded-full ${mc.status === "active" ? "bg-green-500" : "bg-yellow-500"} animate-pulse`} />
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

export default DroneSection;
