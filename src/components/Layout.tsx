import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-bold text-primary tracking-tight">Ali Alawlaqi</span>
          <span className="hidden sm:inline text-xs text-muted-foreground font-sans border-l border-border pl-2 ml-1">Insurance Agent</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === l.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Button asChild className="bg-accent-gradient text-accent-foreground hover:opacity-90 shadow-sm">
            <Link to="/contact">Get a Quote</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-3">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block py-2 text-sm font-medium ${
                location.pathname === l.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Button asChild className="w-full bg-accent-gradient text-accent-foreground">
            <Link to="/contact" onClick={() => setOpen(false)}>Get a Quote</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-hero-gradient text-primary-foreground">
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-serif text-lg font-bold mb-3">Ali Alawlaqi</h3>
          <p className="text-sm opacity-80">Licensed insurance agent serving Michigan families with Auto, Home, and Life insurance solutions.</p>
        </div>
        <div>
          <h4 className="font-sans text-sm font-semibold mb-3 uppercase tracking-wider opacity-70">Contact</h4>
          <div className="space-y-2 text-sm opacity-80">
            <a href="tel:3139920006" className="flex items-center gap-2 hover:opacity-100"><Phone size={14} /> (313) 992-0006</a>
            <Link to="/contact" className="flex items-center gap-2 hover:opacity-100"><Mail size={14} /> Send a message</Link>
            <p className="flex items-center gap-2"><MapPin size={14} /> 29525 W Nine Mile Rd, Farmington Hills, MI 48336</p>
          </div>
        </div>
        <div>
          <h4 className="font-sans text-sm font-semibold mb-3 uppercase tracking-wider opacity-70">Hours</h4>
          <div className="space-y-1 text-sm opacity-80">
            <p>Mon – Fri: 9:00 AM – 6:00 PM</p>
            <p>Saturday: By Appointment</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-xs opacity-60">
        © {new Date().getFullYear()} Ali Alawlaqi — Insurance Agent. All rights reserved.
      </div>
    </div>
  </footer>
);

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <main className="pt-16 overflow-x-hidden">{children}</main>
    <Footer />
  </>
);

export default Layout;
