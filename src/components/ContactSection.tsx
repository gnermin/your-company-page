import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Greška", description: "Molimo popunite sva obavezna polja.", variant: "destructive" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast({ title: "Greška", description: "Unesite validnu email adresu.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: form.name.trim().slice(0, 100),
        email: form.email.trim().slice(0, 255),
        company: form.company.trim().slice(0, 100) || null,
        message: form.message.trim().slice(0, 2000),
      });
      if (error) throw error;
      setSent(true);
      setForm({ name: "", email: "", company: "", message: "" });
      toast({ title: "Uspješno!", description: "Vaša poruka je poslana. Javit ćemo vam se uskoro." });
    } catch {
      toast({ title: "Greška", description: "Došlo je do greške. Pokušajte ponovo.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Kontakt
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Razgovarajmo o <span className="gradient-text">vašem projektu</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Besplatne konsultacije za vaš sljedeći projekat. Javite nam se danas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {sent ? (
              <div className="bg-card/50 border border-primary/30 rounded-2xl p-12 text-center">
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Hvala vam!</h3>
                <p className="text-muted-foreground mb-6">Vaša poruka je uspješno poslana. Javit ćemo vam se u najkraćem roku.</p>
                <Button onClick={() => setSent(false)} variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                  Pošalji novu poruku
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card/30 border border-border rounded-2xl p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Ime i prezime *</label>
                    <Input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Vaše ime"
                      className="bg-secondary/50 border-border focus:border-primary"
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Email *</label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="vas@email.com"
                      className="bg-secondary/50 border-border focus:border-primary"
                      maxLength={255}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Kompanija</label>
                  <Input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Naziv kompanije"
                    className="bg-secondary/50 border-border focus:border-primary"
                    maxLength={100}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Poruka *</label>
                  <Textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Opišite vaš projekat ili pitanje..."
                    rows={5}
                    className="bg-secondary/50 border-border focus:border-primary"
                    maxLength={2000}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/80 py-6"
                >
                  {loading ? "Slanje..." : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Pošalji poruku
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-card/30 border border-border rounded-2xl p-8">
              <h3 className="font-heading font-semibold text-foreground text-lg mb-6">Kontakt informacije</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="text-foreground">nermin.goran@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Telefon</div>
                    <div className="text-foreground">+387 62 225 568</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Lokacija</div>
                    <div className="text-foreground">Travnik, Bosna i Hercegovina</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
              <h3 className="font-heading font-semibold text-primary text-lg mb-2">Besplatne konsultacije</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Zakažite besplatni 30-minutni poziv sa našim stručnjacima i saznajte kako AI i IoT mogu transformisati vaše poslovanje.
              </p>
              <div className="flex items-center gap-2 text-sm text-primary">
                <CheckCircle className="w-4 h-4" />
                <span>Bez obaveza</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
