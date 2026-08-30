// Design ground truth: preserve the provided CyberSafe dark civic-tech shell with compact labels, signal-cyan actions, glass cards, and asymmetric editorial spacing.
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, Moon, Search, Send, ShieldCheck, Sun, X } from "lucide-react";

const PRODUCT_TITLE = "Cybercrime Awareness and Reporting System Study";

const navItems = [
  { label: "Awareness", href: "/#awareness" },
  { label: "Resources", href: "/#resources" },
  { label: "Analytics", href: "/dashboard" },
  { label: "Emergency", href: "/#emergency" },
  { label: "Contact", href: "/contact" },
  { label: "Quiz", href: "/quiz" },
];

const assistantPrompts = ["I think I’ve been scammed", "Is this payment request safe?", "I received an OTP call", "My device may have malware"];

type AssistantMessage = { role: "assistant" | "user"; text: string };

function assistantReply(input: string) {
  const prompt = input.toLowerCase();
  if (prompt.includes("otp") || prompt.includes("one-time") || prompt.includes("code")) {
    return "Never share an OTP with a caller or message sender. End the conversation and contact the organisation through its verified app or website. If money has moved, call 1930 immediately.";
  }
  if (prompt.includes("payment") || prompt.includes("upi") || prompt.includes("refund") || prompt.includes("money")) {
    return "Pause before you approve anything. A UPI PIN authorises money leaving your account; it is never needed to receive a refund. If a transfer was unauthorised, alert your bank and call 1930 immediately.";
  }
  if (prompt.includes("scam") || prompt.includes("hacked") || prompt.includes("lost money") || prompt.includes("been cheated")) {
    return "Pause and do not delete the trail. Contact your bank or payment service through its verified channel, preserve screenshots, messages, transaction IDs, URLs, dates, and alerts, then call 1930 immediately for suspected financial fraud and use the official cybercrime portal.";
  }
  if (prompt.includes("report") || prompt.includes("complaint") || prompt.includes("1930")) {
    return "Preserve screenshots, messages, transaction IDs, URLs, dates, and account alerts. For suspected financial fraud, call 1930 immediately and complete the report through the official cybercrime portal.";
  }
  if (prompt.includes("malware") || prompt.includes("virus") || prompt.includes("device")) {
    return "Disconnect the affected device from the network, avoid unknown cleanup tools, preserve relevant evidence, and seek trusted technical help. Change important passwords from a clean device if needed.";
  }
  if (prompt.includes("link") || prompt.includes("website") || prompt.includes("phish")) {
    return "Do not use the link in an unexpected message. Open the organisation's official app or type its known address yourself, then verify the request independently.";
  }
  if (prompt.includes("password") || prompt.includes("privacy") || prompt.includes("account")) {
    return "Use a unique long password for each important account, enable multi-factor authentication, and review app permissions and public profile details regularly.";
  }
  return "Start with the pause: do not click, share, or pay while a request feels urgent. Tell me whether this involves a link, OTP, payment, account, malware, or reporting and I’ll point you to the safest next step.";
}

const initialAssistantMessage: AssistantMessage = { role: "assistant", text: "I’m the CyberSafe guidance assistant. Ask about a suspicious link, OTP, payment request, account, malware, or reporting step." };

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
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantInput, setAssistantInput] = useState("");
  const [assistantMessages, setAssistantMessages] = useState<AssistantMessage[]>([initialAssistantMessage]);

  useEffect(() => {
    if (!assistantOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setAssistantOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [assistantOpen]);

  const sendAssistantMessage = (value: string) => {
    const cleanValue = value.trim();
    if (!cleanValue) return;
    setAssistantMessages((messages) => [...messages, { role: "user", text: cleanValue }, { role: "assistant", text: assistantReply(cleanValue) }]);
    setAssistantInput("");
  };

  return (
    <div className="site-frame">
      <Header />
      <main>{children}</main>
      {assistantOpen && (
        <aside id="cybersafe-assistant" className="assistant-panel" role="dialog" aria-modal="false" aria-label="CyberSafe guidance assistant">
          <div className="assistant-panel-head">
            <div><span className="eyebrow"><span className="status-dot" /> AI guidance desk</span><strong>Ask before you act.</strong><small>Practical cyber-safety guidance, one step at a time.</small></div>
            <button className="assistant-close" type="button" aria-label="Close AI assistant" onClick={() => setAssistantOpen(false)}><X size={17} /></button>
          </div>
          <div className="assistant-messages" aria-live="polite">
            {assistantMessages.map((message, index) => <div className={`assistant-message ${message.role}`} key={`${message.role}-${index}`}><span>{message.role === "assistant" ? "AI" : "You"}</span><p>{message.text}</p></div>)}
          </div>
          <div className="assistant-compose">
            <div className="assistant-prompts">{assistantPrompts.map((prompt) => <button key={prompt} type="button" onClick={() => sendAssistantMessage(prompt)}>{prompt}</button>)}</div>
            <form onSubmit={(event) => { event.preventDefault(); sendAssistantMessage(assistantInput); }}><input aria-label="Ask the CyberSafe assistant" placeholder="Ask about a cyber-safety concern" value={assistantInput} onChange={(event) => setAssistantInput(event.target.value)} /><button type="submit" aria-label="Send question"><Send size={15} /></button></form>
            <small className="assistant-disclaimer">Educational guidance only. For active financial fraud, call <a href="tel:1930">1930</a>.</small>
          </div>
        </aside>
      )}
      <button className={`guide-fab ${assistantOpen ? "is-open" : ""}`} type="button" aria-expanded={assistantOpen} aria-controls="cybersafe-assistant" onClick={() => setAssistantOpen((value) => !value)}>
        {assistantOpen ? <X size={16} /> : <ShieldCheck size={16} />} {assistantOpen ? "Close assistant" : "Need guidance?"}
      </button>
      <Footer />
    </div>
  );
}

export { PRODUCT_TITLE };
