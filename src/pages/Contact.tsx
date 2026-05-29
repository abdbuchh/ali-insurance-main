import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { quoteFormSchema, formatPhone } from "@/lib/quote-form";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const contactInfo = [
  { icon: Phone, label: "Phone", value: "(313) 992-0006", href: "tel:3139920006" },
  { icon: Mail, label: "Email", value: "Use the form below or call", href: "tel:3139920006" },
  { icon: MapPin, label: "Office", value: "29525 W Nine Mile Rd, Farmington Hills, MI 48336", href: "https://maps.google.com/?q=29525+W+Nine+Mile+Rd+Farmington+Hills+MI+48336" },
  { icon: Clock, label: "Hours", value: "Mon–Fri 9am–5pm · Sat & Sun closed" },
] as const;

const MAX_MESSAGE = 2000;
const emptyForm = { name: "", phone: "", email: "", type: "", message: "", website: "" };
type FormErrors = Partial<Record<keyof typeof emptyForm, string>>;

const FieldError = ({ msg }: { msg?: string }) =>
  msg ? <p className="text-xs text-destructive mt-1 font-sans">{msg}</p> : null;

const Contact = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const clearError = (field: keyof typeof emptyForm) =>
    setErrors((e) => ({ ...e, [field]: undefined }));

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const parsed = quoteFormSchema.safeParse({
        name: form.name,
        phone: form.phone,
        email: form.email,
        type: form.type,
        message: form.message || undefined,
      });

      if (!parsed.success) {
        const fieldErrors: FormErrors = {};
        for (const issue of parsed.error.issues) {
          const field = issue.path[0] as keyof typeof emptyForm;
          if (!fieldErrors[field]) fieldErrors[field] = issue.message;
        }
        setErrors(fieldErrors);
        return;
      }

      setErrors({});
      setSubmitting(true);

      try {
        const res = await fetch("/api/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...parsed.data, website: form.website }),
        });

        const data = (await res.json().catch(() => ({}))) as { error?: string };

        if (!res.ok) {
          toast({
            title: "Could not send request",
            description: data.error ?? "Please try again or call (313) 992-0006.",
            variant: "destructive",
          });
          return;
        }

        setSubmitted(true);
      } catch {
        toast({
          title: "Network error",
          description: "Please check your connection or call (313) 992-0006.",
          variant: "destructive",
        });
      } finally {
        setSubmitting(false);
      }
    },
    [form, toast],
  );

  return (
    <Layout>
      <section className="py-20 lg:py-28 bg-subtle-gradient">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial="hidden" animate="visible" className="text-center mb-14">
            <motion.h1 variants={fadeUp} custom={0} className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-3">
              Get a Free Quote
            </motion.h1>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground font-sans max-w-lg mx-auto">
              Fill out the form below and I'll get back to you within 24 hours with a personalized quote.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
            {/* ── Form ── */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className="lg:col-span-3 bg-card rounded-2xl p-8 shadow-card"
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle size={48} className="text-accent mb-4" />
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">Thank You!</h3>
                  <p className="text-muted-foreground font-sans">Your request has been received. Ali will be in touch shortly.</p>
                  <Button
                    onClick={() => { setSubmitted(false); setForm(emptyForm); setErrors({}); }}
                    variant="outline"
                    className="mt-6 font-sans"
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-sans font-medium text-foreground mb-1.5 block">Full Name *</label>
                      <Input
                        value={form.name}
                        onChange={(e) => { setForm({ ...form, name: e.target.value }); clearError("name"); }}
                        placeholder="John Doe"
                        autoComplete="name"
                        className={`font-sans ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        disabled={submitting}
                      />
                      <FieldError msg={errors.name} />
                    </div>

                    <div>
                      <label className="text-sm font-sans font-medium text-foreground mb-1.5 block">Phone Number *</label>
                      <Input
                        value={form.phone}
                        onChange={(e) => { setForm({ ...form, phone: formatPhone(e.target.value) }); clearError("phone"); }}
                        placeholder="(313) 555-0000"
                        inputMode="tel"
                        autoComplete="tel"
                        maxLength={14}
                        className={`font-sans ${errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        disabled={submitting}
                      />
                      <FieldError msg={errors.phone} />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-sans font-medium text-foreground mb-1.5 block">Email Address *</label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); clearError("email"); }}
                      placeholder="john@example.com"
                      autoComplete="email"
                      className={`font-sans ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      disabled={submitting}
                    />
                    <FieldError msg={errors.email} />
                  </div>

                  <div>
                    <label className="text-sm font-sans font-medium text-foreground mb-1.5 block">Insurance Type *</label>
                    <Select
                      value={form.type}
                      onValueChange={(v) => { setForm({ ...form, type: v }); clearError("type"); }}
                      disabled={submitting}
                    >
                      <SelectTrigger className={`font-sans ${errors.type ? "border-destructive focus-visible:ring-destructive" : ""}`}>
                        <SelectValue placeholder="Select insurance type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto Insurance</SelectItem>
                        <SelectItem value="home">Home Insurance</SelectItem>
                        <SelectItem value="life">Life Insurance</SelectItem>
                        <SelectItem value="bundle">Bundle (Auto + Home)</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError msg={errors.type} />
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <label className="text-sm font-sans font-medium text-foreground">Message</label>
                      <span className={`text-xs font-sans ${form.message.length > MAX_MESSAGE * 0.9 ? "text-destructive" : "text-muted-foreground"}`}>
                        {form.message.length} / {MAX_MESSAGE}
                      </span>
                    </div>
                    <Textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value.slice(0, MAX_MESSAGE) })}
                      placeholder="Tell me about your coverage needs..."
                      rows={4}
                      className="font-sans"
                      disabled={submitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="w-full bg-accent-gradient text-accent-foreground hover:opacity-90 font-sans font-semibold"
                  >
                    {submitting
                      ? <><Loader2 className="mr-2 animate-spin" size={18} /> Sending…</>
                      : <><Send className="mr-2" size={18} /> Request My Free Quote</>
                    }
                  </Button>
                </form>
              )}
            </motion.div>

            {/* ── Contact info sidebar ── */}
            <motion.div initial="hidden" animate="visible" className="lg:col-span-2 space-y-6">
              {contactInfo.map((c, i) => (
                <motion.div key={c.label} variants={fadeUp} custom={i + 3}>
                  {"href" in c ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <c.icon size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-wider">{c.label}</p>
                        <p className="text-sm font-sans text-foreground group-hover:text-primary transition-colors">{c.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                        <c.icon size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-wider">{c.label}</p>
                        <p className="text-sm font-sans text-foreground">{c.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              <motion.div variants={fadeUp} custom={7} initial="hidden" animate="visible" className="rounded-xl overflow-hidden shadow-card mt-4">
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2943.5!2d-83.408!3d42.461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s29525+W+Nine+Mile+Rd+Farmington+Hills+MI!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
