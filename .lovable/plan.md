

## GNN Company - Identična kopija stranice

Kreiraću identičnu kopiju gnncompany.org sa tamnom temom, svim sekcijama i funkcionalnom kontakt formom.

### Stranica (jedna single-page aplikacija)

**1. Sticky Header/Navigacija**
- Logo "AI TechSolutions" lijevo
- Navigacija: Početna, AI Agenti, IoT Sistemi, Dron Tehnologije, Digitalna Transformacija, Kontakt
- "Kontaktiraj nas" CTA dugme
- Smooth scroll do sekcija

**2. Hero sekcija**
- Tamna pozadina sa animiranim elementima
- Naslov "Budućnost je ovdje" (sa "Budućnost" u cyan/plavo)
- Podnaslov o AI, IoT i drone tehnologijama
- Dva dugmeta: "Istražite rješenja" i "Rezerviši demo"
- 3 feature kartice ispod (AI Automatizacija, Sigurna Integracija, Precizni Rezultati)

**3. AI Agenti (RAG) sekcija**
- Vizuelni dijagram RAG arhitekture (Retrieval Flow, Knowledge Graph, Vector DB, Context Window, Decision Layer)
- Opis i 4 feature kartice (Inteligentno pretraživanje, Kontekstualni odgovori, Učenje u realnom vremenu, Sigurna integracija)

**4. IoT Sistemi sekcija**
- Live Telemetry vizualizacija (Signal, Latency, Sync status)
- 4 kategorije: Uređaji, Gateway, Senzori, Lokacije
- 4 feature kartice (Pametni senzori, Real-time monitoring, Cloud integracija, Automatizacija procesa)

**5. Dron Tehnologije sekcija**
- Mission Control vizualizacija
- Funkcije: 4K Capture, Mapping, Inspection, Autonomy
- 4 feature kartice (Aerial inspekcija, AI prepoznavanje, 4K video streaming, Autonomno mapiranje)

**6. Digitalna Transformacija sekcija**
- Opis i 4 feature kartice
- Vizualni elementi: Integracija, KPI Fokus, Timovi

**7. Kontakt sekcija (funkcionalna)**
- Forma sa poljima: Ime i prezime, Email, Kompanija, Poruka
- Slanje poruka putem Supabase Edge Function (email notifikacija ili čuvanje u bazu)
- Kontakt info: Email, Telefon, Lokacija
- "Besplatne konsultacije" info

### Dizajn
- Tamna tema (#0a0a0f pozadina, #00d4ff cyan akcenti)
- Kartice sa tamnim pozadinama i suptilnim bordurama
- Fade-in animacije pri scrollu
- Montserrat za naslove, Inter za body tekst
- Responsive dizajn

### Backend (kontakt forma)
- Supabase tabela za čuvanje kontakt poruka
- Edge function za slanje email notifikacija (ili samo čuvanje u bazu)

