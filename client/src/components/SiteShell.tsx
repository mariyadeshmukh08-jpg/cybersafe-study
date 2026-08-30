// Design ground truth: preserve the provided CyberSafe dark civic-tech shell with compact labels, signal-cyan actions, glass cards, and asymmetric editorial spacing.
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, Moon, Search, ShieldCheck, Sun, X } from "lucide-react";

const PRODUCT_TITLE = "Cybercrime Awareness and Reporting System Study";

const navItems = [
  { label: "Awareness", href: "/#awareness" },
  { label: "Resources", href: "/#resources" },
  { label: "Analytics", href: "/dashboard" },
  { label: "Emergency", href: "/#emergency" },
  { label: "Contact", href: "/contact" },
  { label: "Quiz", href: "/quiz" },
];

function BrandLockup() {
  return (
    <Link href="/" className="brand-lockup" aria-label={PRODUCT_TITLE} title={PRODUCT_TITLE}>
      <span className="brand-mark" aria-hidden="true">
        <img src="/manus-storage/cybersafe-shield-mark_9a1b6ca2.png" alt="" />
      </span>
      <span className="brand-copy">
        <span>CYBERCRIME AWARENESS</span>
        <span>AND REPORTING SYSTEM STUDY</span>
      </span>
    </Link>
  );
}

function Header() {
  const [location, setLocation] = useLocation();
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(() => document.documentElement.classList.contains("light"));
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = query.trim().toLowerCase();
    if (normalized.includes("quiz") || normalized.includes("question")) {
      setLocation("/quiz");
    } else {
      setLocation("/#awareness");
    }
    setOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <BrandLockup />
        <nav className={`desktop-nav ${open ? "is-open" : ""}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={location === item.href || (item.label === "Quiz" && location === "/quiz") ? "nav-link active" : "nav-link"}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <form className="search-control" onSubmit={handleSearch} role="search">
            <Search size={14} aria-hidden="true" />
            <input
              aria-label={`Search ${PRODUCT_TITLE}`}
              placeholder="Search safety topics"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </form>
          <button
            className="icon-button"
            type="button"
            aria-label={light ? "Use dark mode" : "Use light mode"}
            title={light ? "Use dark mode" : "Use light mode"}
            onClick={() => setLight((value) => !value)}
          >
            {light ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <Link className="button button-primary button-small" href="/report">
            Report now <ArrowUpRight size={15} />
          </Link>
          <button
            className="menu-button"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="mobile-nav-panel">
          <div className="container mobile-nav-list">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
                <span>{item.label}</span>
                <ArrowUpRight size={16} />
              </a>
            ))}
            <Link className="button button-primary" href="/report" onClick={() => setOpen(false)}>
              Report now <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand-block">
          <BrandLockup />
          <p>A citizen-first study desk for recognizing scams, preserving evidence, and taking the next reporting step with confidence.</p>
        </div>
        <div className="footer-column">
          <span className="eyebrow">Report &amp; respond</span>
          <a href="/report">Report a cybercrime</a>
          <a href="/#emergency">Emergency help</a>
          <a href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer">National portal</a>
        </div>
        <div className="footer-column">
          <span className="eyebrow">Learn</span>
          <a href="/#awareness">Scam awareness</a>
          <a href="/guide">Safety guide</a>
          <a href="/dashboard">Analytics overview</a>
        </div>
        <div className="footer-notice">
          <span className="eyebrow">Important notice</span>
          <p>For active financial fraud, call <a href="tel:1930">1930</a> immediately and file a report through the official national portal.</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Cybercrime Awareness and Reporting System Study. Educational civic interface.</span>
        <span>Not a substitute for emergency services or official law-enforcement intake.</span>
      </div>
    </footer>
  );
}

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-frame">
      <Header />
      <main>{children}</main>
      <button className="guide-fab" type="button" onClick={() => window.alert("Start with the pause: stop the transfer, preserve the trail, and call 1930 for suspected financial fraud.")}>
        <ShieldCheck size={16} /> Need guidance?
      </button>
      <Footer />
    </div>
  );
}

export { PRODUCT_TITLE };
