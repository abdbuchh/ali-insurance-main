import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Home, Heart, Shield, Users, Award, Star, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import aliPortrait from "@/assets/agent-headshot.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const services = [
  { icon: Car, title: "Auto Insurance", desc: "Comprehensive coverage to keep you protected on Michigan roads — from liability to full collision." },
  { icon: Home, title: "Home Insurance", desc: "Safeguard your biggest investment with policies tailored to Michigan homeowners." },
  { icon: Heart, title: "Life Insurance", desc: "Secure your family's future with flexible term and whole life options." },
];

const stats = [
  { value: "500+", label: "Families Protected" },
  { value: "3", label: "Coverage Types" },
  { value: "4.9★", label: "Google Rating" },
  { value: "MI", label: "Local & Trusted" },
];

const testimonials = [
  { name: "Mohsen Qassim", text: "Ali was excellent. He answered the phone quickly, was very professional, and took the time to explain everything clearly. He also gave me a great price and saved me 30% compared to my previous policy. Highly recommend Ali if you’re looking for fast service and real savings.", rating: 5 },
  { name: "Nadia", text: "I had an amazing experience with Ali. He was extremely helpful and found me the lowest rate possible for my auto insurance. He even gave me a few tips on how to lower my rate even more in the future. Ali is very polite, professional, and genuinely treats you like a person, not just a customer. You can tell he really cares about helping you. I definitely recommend him to anyone looking for great service and great prices!", rating: 5 },
  { name: "Adam Murphy", text: "Ali made my whole experience seamless and completely stress free. I was very anxious about a lot of changes at the time, Ali and his professionalism and calmness were one of the main reasons the whole stressful time went well. This is the man you want to take care of your insurance. Thanks Ali!", rating: 5 },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative overflow-hidden bg-hero-gradient min-h-[75vh] flex items-center">
      <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" className="text-primary-foreground order-last lg:order-first">
            <motion.p variants={fadeUp} custom={0} className="text-sm font-sans font-semibold uppercase tracking-widest opacity-70 mb-4">
              Licensed Insurance Agent — Farmington Hills, MI
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Protect What Matters Most
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg opacity-85 max-w-lg mb-8 font-sans">
              I'm Ali Alawlaqi — your local insurance agent. I help Michigan families find the right Auto, Home, and Life insurance at the best rates.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-accent-gradient text-accent-foreground hover:opacity-90 shadow-hero font-sans font-semibold">
                <Link to="/contact">Get a Free Quote <ArrowRight className="ml-2" size={18} /></Link>
              </Button>
              <Button asChild size="lg" className="bg-accent-gradient text-accent-foreground hover:opacity-90 shadow-hero font-sans font-semibold">
                <a href="tel:3139920006"><Phone className="mr-2" size={18} /> (313) 992-0006</a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center order-first lg:order-last"
          >
            <div className="relative overflow-hidden">
              <div className="absolute -inset-4 bg-primary-foreground/10 rounded-2xl blur-2xl" />
              <img
                src={aliPortrait}
                alt="Ali Alawlaqi — Insurance Agent"
                className="relative rounded-2xl shadow-hero w-[280px] sm:w-[340px] md:w-[360px] lg:w-[380px] max-w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-16 bg-card border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="text-center"
            >
              <p className="text-3xl lg:text-4xl font-serif font-bold text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1 font-sans">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="py-20 bg-subtle-gradient">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-3">Insurance Solutions</h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-sans">Comprehensive auto, home, and life coverage tailored to Michigan families.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="bg-card rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <s.icon size={24} />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm font-sans leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Why Ali */}
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} custom={0} className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Why Work With Ali?
            </motion.h2>
            <div className="space-y-5">
              {[
                { icon: Shield, title: "Licensed & Trusted", desc: "Professional guidance you can count on for coverage that fits your needs and budget." },
                { icon: Users, title: "Personalized Service", desc: "I take the time to understand your needs and find the coverage that fits your life." },
                { icon: Award, title: "Local Expertise", desc: "Based in Farmington Hills, I understand Michigan's unique insurance landscape." },
              ].map((item, i) => (
                <motion.div key={item.title} variants={fadeUp} custom={i + 1} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground font-sans">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-secondary rounded-2xl p-10 text-center"
          >
            <h3 className="font-serif text-2xl font-bold text-foreground mb-3">Ready to Save?</h3>
            <p className="text-muted-foreground font-sans mb-6">Get a personalized quote in minutes. No obligation, no pressure — just honest advice.</p>
            <Button asChild size="lg" className="bg-accent-gradient text-accent-foreground hover:opacity-90 font-sans font-semibold">
              <Link to="/contact">Request a Free Quote <ArrowRight className="ml-2" size={18} /></Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-20 bg-subtle-gradient">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-3">What Clients Say</h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-sans">Real feedback from Michigan families I've had the pleasure of helping.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="bg-card rounded-xl p-8 shadow-card"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-foreground font-sans leading-relaxed mb-4">"{t.text}"</p>
              <p className="text-sm font-semibold text-primary font-sans">— {t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-hero-gradient text-primary-foreground text-center">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h2 variants={fadeUp} custom={0} className="font-serif text-3xl lg:text-4xl font-bold mb-4">
            Let's Protect Your Future Together
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="opacity-80 max-w-lg mx-auto mb-8 font-sans">
            Whether you need auto, home, or life insurance — I'm here to help you find the right coverage at the right price.
          </motion.p>
          <motion.div variants={fadeUp} custom={2}>
            <Button asChild size="lg" className="bg-accent-gradient text-accent-foreground hover:opacity-90 shadow-hero font-sans font-semibold">
              <Link to="/contact">Get Your Free Quote Today <ArrowRight className="ml-2" size={18} /></Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Index;
