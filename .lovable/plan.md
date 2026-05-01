## Cilj
Slanje email notifikacija putem Resend-a kada neko pošalje poruku preko kontakt forme. Email ide na **nermin.goran@gmail.com** sa adrese **info@gnnvision.com**.

## Koraci

### 1. Dodavanje Resend API ključa
Zatražit ću `RESEND_API_KEY` kroz siguran dialog (vrijednost se pohranjuje u Lovable Cloud secrets, ne u kodu).

### 2. Edge funkcija `send-contact-email`
Kreirat ću novu edge funkciju koja:
- Prima: `name`, `email`, `company`, `message`
- Validira ulazne podatke (Zod)
- Šalje email putem Resend API-ja:
  - **From:** `NG Consulting <info@gnnvision.com>`
  - **To:** `nermin.goran@gmail.com`
  - **Reply-To:** email pošiljaoca (da možete direktno odgovoriti)
  - **Subject:** `Nova poruka sa sajta — {ime}`
  - **HTML body:** lijepo formatirana poruka sa svim detaljima (ime, email, kompanija, poruka, datum)
- CORS headers postavljeni
- `verify_jwt = false` (forma je javna)

### 3. Ažuriranje `ContactSection.tsx`
Nakon uspješnog upisa u `contact_messages` tabelu, pozvati edge funkciju:
```ts
await supabase.functions.invoke('send-contact-email', { body: {...} })
```
Ako slanje email-a ne uspije, korisnik i dalje vidi success toast (poruka je već sačuvana u bazi) — greška se samo loguje.

### 4. Test
Testirat ću edge funkciju direktno da potvrdim da email stiže prije nego što završim.

## Šta NE radim
- Ne mijenjam tabelu `contact_messages` (ostaje kako jeste)
- Ne šaljem potvrdni email korisniku (samo notifikacija na vaš email) — ako želite i to, recite pa dodam

## Napomena o Lovable Emails
Lovable ima i ugrađen email sistem (bez Resend računa), ali pošto već imate verificiranu domenu na Resend-u i API ključ — idemo sa Resend-om kako ste tražili.