import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Heart, Users, Star, ExternalLink, Car, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import aliPortrait from "@/assets/agent-headshot.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const values = [
  { icon: Shield, title: "Integrity First", desc: "Honest advice and transparent pricing — always." },
  { icon: Heart, title: "Client-Centered", desc: "Your needs drive every recommendation I make." },
  { icon: Users, title: "Community Rooted", desc: "Proud to serve families right here in Metro Detroit." },
];

const About = () => (
  <Layout>
    {/* Hero */}
    <section className="py-20 lg:py-28 bg-subtle-gradient">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial="hidden" animate="visible" className="order-last lg:order-first">
            <motion.p variants={fadeUp} custom={0} className="text-sm font-sans font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              About Ali Alawlaqi
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="font-serif text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              Your Trusted Insurance Partner in Michigan
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground font-sans leading-relaxed mb-4">
              I'm Ali Alawlaqi, a licensed insurance agent based in Farmington Hills, Michigan. I've helped hundreds of families and individuals find the right coverage for their auto, home, and life insurance needs — and I'm committed to doing the same for you.
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="text-muted-foreground font-sans leading-relaxed">
              My mission is simple: provide personalized, honest insurance guidance that puts your family's well-being first. I believe everyone deserves an agent who listens, educates, and advocates for them.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center order-first lg:order-last"
          >
            <img src={aliPortrait} alt="Ali Alawlaqi" className="rounded-2xl shadow-hero w-full max-w-[360px] object-cover" />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="font-serif text-3xl font-bold text-foreground text-center mb-12">
          My Values
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <v.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground font-sans">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Coverage */}
    <section className="py-20 bg-subtle-gradient">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-3">Coverage I Offer</h2>
          <p className="text-muted-foreground font-sans max-w-xl mx-auto">Personalized options for the protection your family needs — with clear guidance every step of the way.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="bg-card rounded-xl p-8 shadow-card">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
              <Car size={20} className="text-primary" />
            </div>
            <h3 className="font-serif text-xl font-bold text-foreground mb-3">Auto Insurance</h3>
            <p className="text-sm text-muted-foreground font-sans leading-relaxed">
              Liability, collision, and comprehensive options to keep you protected on Michigan roads.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="bg-card rounded-xl p-8 shadow-card">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
              <Home size={20} className="text-primary" />
            </div>
            <h3 className="font-serif text-xl font-bold text-foreground mb-3">Home Insurance</h3>
            <p className="text-sm text-muted-foreground font-sans leading-relaxed">
              Policies tailored to Michigan homeowners — protecting your biggest investment.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="bg-card rounded-xl p-8 shadow-card">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
              <Heart size={20} className="text-primary" />
            </div>
            <h3 className="font-serif text-xl font-bold text-foreground mb-3">Life Insurance</h3>
            <p className="text-sm text-muted-foreground font-sans leading-relaxed">
              Flexible term and whole life options to help secure your family&apos;s future.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Working with Ali - image section */}
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src={aliPortrait} alt="Ali working with clients" className="rounded-2xl shadow-card w-full object-cover" />
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} custom={0} className="font-serif text-3xl font-bold text-foreground mb-4">
              What It's Like Working With Me
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground font-sans leading-relaxed mb-4">
              When you work with me, you're not just getting a policy — you're getting a partner. I take the time to understand your situation, walk you through every option, and make sure you feel confident in your coverage.
            </motion.p>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground font-sans leading-relaxed mb-6">
              Whether it's a quick question about your deductible or a major life change that requires updating your policy, I'm just a phone call away.
            </motion.p>
            <motion.div variants={fadeUp} custom={3}>
              <Button asChild className="bg-accent-gradient text-accent-foreground hover:opacity-90 font-sans font-semibold">
                <Link to="/contact">Schedule a Consultation <ArrowRight className="ml-2" size={18} /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Quick Links */}
    <section className="py-20 bg-subtle-gradient">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="font-serif text-3xl font-bold text-foreground text-center mb-12">
          Quick Links
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <motion.a
            href="https://maps.google.com/?q=29525+W+Nine+Mile+Rd+Farmington+Hills+MI+48336"
            target="_blank"
            rel="noopener noreferrer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="bg-card rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300 cursor-pointer group block"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Star size={20} />
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground">Leave a Google Review</h3>
            </div>
            <p className="text-sm text-muted-foreground font-sans mb-3">Had a great experience? Your review helps other families find trusted insurance guidance.</p>
            <span className="text-sm text-primary font-sans font-semibold flex items-center gap-1">
              Write a Review <ExternalLink size={14} />
            </span>
          </motion.a>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="bg-card rounded-xl p-8 shadow-card"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Shield size={20} className="text-primary" />
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground">Get a Free Quote</h3>
            </div>
            <p className="text-sm text-muted-foreground font-sans mb-6">Tell me about your coverage needs and I&apos;ll follow up with a personalized quote — no obligation.</p>
            <Button asChild className="bg-accent-gradient text-accent-foreground hover:opacity-90 font-sans font-semibold">
              <Link to="/contact">Request a Quote <ArrowRight className="ml-2" size={18} /></Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
