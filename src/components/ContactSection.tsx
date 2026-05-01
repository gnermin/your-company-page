import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/i18n/LanguageContext";

const ContactSection = () => {
  const { t } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: t.contact.errTitle, description: t.contact.errRequired, variant: "destructive" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast({ title: t.contact.errTitle, description: t.contact.errEmail, variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: form.name.trim().slice(0, 100),
        email: form.email.trim().slice(0, 255),
        company: form.company.trim().slice(0, 100) || null,
        message: form.message.trim().slice(0, 2000),
      };

      const { error } = await supabase.from("contact_messages").insert(payload);
      if (error) throw error;

      // Send email notification (non-blocking — message is already saved)
      supabase.functions
        .invoke("send-contact-email", { body: payload })
        .then(({ error: fnError }) => {
          if (fnError) console.error("Email notification failed:", fnError);
        });

      setSent(true);
      setForm({ name: "", email: "", company: "", message: "" });
      toast({ title: t.contact.okTitle, description: t.contact.okDesc });
    } catch {
      toast({ title: t.contact.errTitle, description: t.contact.errGeneric, variant: "destructive" });
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
            {t.contact.badge}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.contact.title1} <span className="gradient-text">{t.contact.title2}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t.contact.desc}
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
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">{t.contact.thanks}</h3>
                <p className="text-muted-foreground mb-6">{t.contact.thanksDesc}</p>
                <Button onClick={() => setSent(false)} variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                  {t.contact.newMessage}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card/30 border border-border rounded-2xl p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">{t.contact.name} *</label>
                    <Input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={t.contact.namePh}
                      className="bg-secondary/50 border-border focus:border-primary"
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">{t.contact.email} *</label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder={t.contact.emailPh}
                      className="bg-secondary/50 border-border focus:border-primary"
                      maxLength={255}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">{t.contact.company}</label>
                  <Input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder={t.contact.companyPh}
                    className="bg-secondary/50 border-border focus:border-primary"
                    maxLength={100}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">{t.contact.message} *</label>
                  <Textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t.contact.messagePh}
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
                  {loading ? t.contact.sending : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {t.contact.send}
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
              <h3 className="font-heading font-semibold text-foreground text-lg mb-6">{t.contact.info}</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{t.contact.email}</div>
                    <div className="text-foreground">nermin.goran@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{t.contact.phone}</div>
                    <div className="text-foreground">+387 62 225 568</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{t.contact.location}</div>
                    <div className="text-foreground">{t.contact.locationVal}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
              <h3 className="font-heading font-semibold text-primary text-lg mb-2">{t.contact.consultTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.contact.consultDesc}</p>
              <div className="flex items-center gap-2 text-sm text-primary">
                <CheckCircle className="w-4 h-4" />
                <span>{t.contact.noObligation}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
