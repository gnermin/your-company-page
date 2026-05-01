import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, Map, Eye, Navigation } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const featureIcons = [Eye, Camera, Map, Navigation];

const DroneSection = () => {
  const { t } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = t.drones.f.map((f, i) => ({ icon: featureIcons[i], title: f.t, desc: f.d }));
  const missionControls = [
    { label: t.drones.controls.capture, status: "active" },
    { label: t.drones.controls.mapping, status: "active" },
    { label: t.drones.controls.inspection, status: "standby" },
    { label: t.drones.controls.autonomy, status: "active" },
  ];

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
            {t.drones.badge}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.drones.title1} <span className="gradient-text">{t.drones.title2}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-cyan-50 text-2xl">
            {t.drones.desc}
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
              <h3 className="font-heading font-semibold text-foreground text-sm">{t.drones.mission}</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                <span className="text-xs text-primary">{t.drones.active}</span>
              </div>
            </div>

            {/* Drone visualization */}
            <div className="relative h-48 bg-secondary/30 rounded-xl border border-border mb-6 overflow-hidden">
              <div className="absolute inset-0 grid-pattern opacity-20" />
              <svg
                viewBox="0 0 300 200"
                preserveAspectRatio="xMidYMid meet"
                className="absolute inset-0 w-full h-full"
              >
                <defs>
                  <path
                    id="droneFlightPath"
                    d="M 30 160 Q 90 30, 160 100 T 280 40"
                    fill="none"
                  />
                </defs>

                {/* Scan zones */}
                <motion.rect
                  x="55" y="40" width="55" height="50" rx="6"
                  fill="none" stroke="hsl(187 100% 50% / 0.25)" strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.2 }}
                />
                <motion.rect
                  x="190" y="110" width="70" height="45" rx="6"
                  fill="none" stroke="hsl(187 100% 50% / 0.25)" strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.4 }}
                />

                {/* Trajectory (dashed) */}
                <motion.path
                  d="M 30 160 Q 90 30, 160 100 T 280 40"
                  stroke="hsl(187 100% 50% / 0.4)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ delay: 0.4, duration: 1.5 }}
                />

                {/* Waypoints */}
                <circle cx="30" cy="160" r="3" fill="hsl(187 100% 50% / 0.6)" />
                <circle cx="280" cy="40" r="3" fill="hsl(187 100% 50% / 0.6)" />

                {/* Pulsing glow following the path (with capture pauses) */}
                <circle r="6" fill="hsl(187 100% 50% / 0.25)">
                  <animate attributeName="r" values="5;12;5" dur="1.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="1.2s" repeatCount="indefinite" />
                  <animateMotion
                    dur="10s"
                    repeatCount="indefinite"
                    begin="2s"
                    keyTimes="0; 0.25; 0.45; 0.65; 0.85; 1"
                    keyPoints="0; 0.244; 0.345; 0.616; 0.765; 1"
                    calcMode="linear"
                  >
                    <mpath href="#droneFlightPath" />
                  </animateMotion>
                </circle>

                {/* Drone marker following the path */}
                <g>
                  <circle r="5" fill="hsl(187 100% 50% / 0.2)" stroke="hsl(187 100% 50%)" strokeWidth="1.5" />
                  <circle r="1.5" fill="hsl(187 100% 50%)" />
                  <animateMotion
                    dur="10s"
                    repeatCount="indefinite"
                    rotate="auto"
                    begin="2s"
                    keyTimes="0; 0.25; 0.45; 0.65; 0.85; 1"
                    keyPoints="0; 0.244; 0.345; 0.616; 0.765; 1"
                    calcMode="linear"
                  >
                    <mpath href="#droneFlightPath" />
                  </animateMotion>
                </g>

                {/* CAPTURE label for Zone 1 */}
                <g opacity="0">
                  <rect x="55" y="22" width="55" height="14" rx="3"
                    fill="hsl(187 100% 50% / 0.15)" stroke="hsl(187 100% 50%)" strokeWidth="0.8" />
                  <text x="82.5" y="32" textAnchor="middle"
                    fill="hsl(187 100% 50%)" fontSize="8" fontWeight="700"
                    fontFamily="monospace" letterSpacing="0.5">CAPTURE</text>
                  <animate attributeName="opacity"
                    values="0; 0; 1; 1; 0; 0; 0; 0"
                    keyTimes="0; 0.249; 0.26; 0.44; 0.46; 0.85; 0.99; 1"
                    dur="10s" begin="2s" repeatCount="indefinite" />
                </g>

                {/* CAPTURE label for Zone 2 */}
                <g opacity="0">
                  <rect x="190" y="92" width="70" height="14" rx="3"
                    fill="hsl(187 100% 50% / 0.15)" stroke="hsl(187 100% 50%)" strokeWidth="0.8" />
                  <text x="225" y="102" textAnchor="middle"
                    fill="hsl(187 100% 50%)" fontSize="8" fontWeight="700"
                    fontFamily="monospace" letterSpacing="0.5">CAPTURE</text>
                  <animate attributeName="opacity"
                    values="0; 0; 1; 1; 0; 0"
                    keyTimes="0; 0.649; 0.66; 0.84; 0.86; 1"
                    dur="10s" begin="2s" repeatCount="indefinite" />
                </g>
              </svg>
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
