## Problem

U `DroneSection.tsx`, Mission Control vizualizacija ima nekoliko problema:

1. **Dron ne prati trajektoriju** — dron je statično pozicioniran u sredini (`top-1/3 left-1/2`) sa `animate-float` (samo gore-dolje), dok se SVG path crta odvojeno. Nema sinhronizacije između leta drona i putanje.
2. **Putanja je kratka i ne pokriva canvas** — `M 30 140 Q 80 40, 150 80 T 280 50` koristi fiksne piksele bez `viewBox`, pa ne skalira responzivno.
3. **Nema osjećaja kretanja** — putanja se nacrta jednom (2s) i stane; dron nikad ne "leti".
4. **Scan areas** se samo pojave bez veze sa dronom.

## Rješenje

Prepraviti Mission Control vizualizaciju tako da:

- SVG koristi `viewBox="0 0 300 200"` i `preserveAspectRatio` za pravilno skaliranje.
- Definisati jasnu zatvorenu (loop) trajektoriju koja ide kroz cijeli canvas.
- Dron se animira po toj trajektoriji koristeći Framer Motion `motion.g` sa `offsetPath` ili pomoću `motion` na `<circle>` koji prati path preko `<animateMotion>` (SVG native, najpouzdanije za path-following).
- Putanja se crta jednom (dashed trail), zatim se dron kontinuirano kreće po njoj u petlji (npr. 8s, linear, infinite).
- Dodati "pulse" prsten ispod drona dok leti i mali "scan" pravougaonike koji se aktiviraju kada dron prođe blizu (ili samo statično indikatori zona).
- Dodati suptilan trail iza drona (fade gradient) za bolji osjećaj brzine.

## Tehnički detalji

Fajl: `src/components/DroneSection.tsx`

Promjene unutar "Drone visualization" diva:

```tsx
<svg viewBox="0 0 300 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
  <defs>
    <path id="flightPath" d="M 30 160 Q 90 30, 160 90 T 280 40" fill="none" />
  </defs>

  {/* Static dashed trajectory */}
  <motion.use
    href="#flightPath"
    stroke="hsl(187 100% 50% / 0.35)"
    strokeWidth="1.5"
    strokeDasharray="6 4"
    fill="none"
    initial={{ pathLength: 0 }}
    animate={isInView ? { pathLength: 1 } : {}}
    transition={{ delay: 0.4, duration: 1.5 }}
  />

  {/* Drone following the path */}
  <g>
    <circle r="6" fill="hsl(187 100% 50% / 0.15)" stroke="hsl(187 100% 50%)" strokeWidth="1.5">
      <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
        <mpath href="#flightPath" />
      </animateMotion>
    </circle>
    {/* Pulsing glow */}
    <circle r="10" fill="none" stroke="hsl(187 100% 50% / 0.4)" strokeWidth="1">
      <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
      <animateMotion dur="8s" repeatCount="indefinite">
        <mpath href="#flightPath" />
      </animateMotion>
    </circle>
  </g>
</svg>
```

- Ukloniti zasebni `<motion.div>` sa Navigation ikonom koja je statična (zamjenjuje je SVG dron koji prati path).
- Zadržati grid pattern pozadinu i scan area pravougaonike (oni dobro indiciraju "zone interesa").
- Opcionalno: dodati 2 male tačke (waypoints) na početku i kraju path-a kao markere.

## Rezultat

Dron će kontinuirano letjeti po trajektoriji u petlji, sa pulsirajućim glow-om, što stvarno izgleda kao mission control praćenje drona — umjesto trenutne statične ikone koja samo lebdi gore-dolje.
