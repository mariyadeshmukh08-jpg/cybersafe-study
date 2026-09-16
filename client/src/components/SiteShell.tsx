// Design ground truth: preserve the provided CyberSafe dark civic-tech shell with compact labels, signal-cyan actions, glass cards, and asymmetric editorial spacing.
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Bot, LoaderCircle, Menu, Moon, Search, Send, Sparkles, Sun, X } from "lucide-react";
import { Streamdown } from "streamdown";

const PRODUCT_TITLE = "Cyber Crime Awareness and Reporting System";

const navItems = [
  { label: "Awareness", href: "/#awareness" },
  { label: "Resources", href: "/#resources" },
  { label: "Analytics", href: "/dashboard" },
  { label: "Emergency", href: "/#emergency" },
  { label: "Contact", href: "/contact" },
  { label: "Quiz", href: "/quiz" },
];

const assistantPrompts = ["I think I’ve been scammed", "Is this payment request safe?", "What types of hacking should I know about?", "My device may have malware"];

type AssistantMessage = { role: "assistant" | "user"; text: string };

const initialAssistantMessage: AssistantMessage = { role: "assistant", text: "Hi — I’m CyberBuddy. Ask me about a suspicious link, payment request, account takeover, malware, common hacking methods, or how to report an incident. I’ll respond to the details you share and help you choose a safe next step." };

function BrandLockup() {
  return (
    <Link href="/" className="brand-lockup" aria-label={PRODUCT_TITLE} title={PRODUCT_TITLE}>
      <span className="brand-mark" aria-hidden="true">
        <img src="/manus-storage/cybersafe-shield-mark_9a1b6ca2.png" alt="" />
      </span>
      <span className="brand-copy">
        <span>CYBER CRIME AWARENESS</span>
        <span>AND REPORTING SYSTEM</span>
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
          <p>A citizen-first safety desk for recognizing scams, preserving evidence, and taking the next reporting step with confidence.</p>
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
        <span>© 2026 Cyber Crime Awareness and Reporting System. Educational civic interface.</span>
        <span>Not a substitute for emergency services or official law-enforcement intake.</span>
      </div>
    </footer>
  );
}

function detectPhoneLayout() {
  if (typeof window === "undefined") return false;
  const mobileAgent = /Android|iPhone|iPad|iPod|Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return mobileAgent || window.matchMedia("(max-width: 700px)").matches;
}

export default function SiteShell({ children }: { children: ReactNode }) {
  const [phoneLayout, setPhoneLayout] = useState(detectPhoneLayout);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantInput, setAssistantInput] = useState("");
  const [assistantMessages, setAssistantMessages] = useState<AssistantMessage[]>([initialAssistantMessage]);
  const [assistantPending, setAssistantPending] = useState(false);

  useEffect(() => {
    const syncPhoneLayout = () => setPhoneLayout(detectPhoneLayout());
    window.addEventListener("resize", syncPhoneLayout);
    window.visualViewport?.addEventListener("resize", syncPhoneLayout);
    return () => {
      window.removeEventListener("resize", syncPhoneLayout);
      window.visualViewport?.removeEventListener("resize", syncPhoneLayout);
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (assistantOpen) {
      document.body.style.overflow = "hidden";
      const closeOnEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") setAssistantOpen(false);
      };
      window.addEventListener("keydown", closeOnEscape);
      return () => {
        document.body.style.overflow = previousOverflow;
        window.removeEventListener("keydown", closeOnEscape);
      };
    }
    return undefined;
  }, [assistantOpen]);

  const sendAssistantMessage = async (value: string) => {
    const cleanValue = value.trim();
    if (!cleanValue || assistantPending) return;
    const userMessage: AssistantMessage = { role: "user", text: cleanValue };
    const history = [...assistantMessages, userMessage];
    setAssistantMessages(history);
    setAssistantInput("");
    setAssistantPending(true);

    try {
      const response = await fetch("/api/cyberbuddy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.map(({ role, text }) => ({ role, text })) }),
      });
      const payload = (await response.json()) as { reply?: unknown };
      if (!response.ok || typeof payload.reply !== "string" || !payload.reply.trim()) throw new Error("CyberBuddy response unavailable");
      setAssistantMessages((messages) => [...messages, { role: "assistant", text: payload.reply as string }]);
    } catch {
      setAssistantMessages((messages) => [...messages, { role: "assistant", text: "I’m having trouble reaching the conversational model right now. Start with the safe pause: do not click, pay, reply, or share a code. If money has moved, contact your bank and call 1930 promptly." }]);
    } finally {
      setAssistantPending(false);
    }
  };

  return (
    <div className={`site-frame ${phoneLayout ? "phone-layout" : ""}`}>
      <Header />
      <main>{children}</main>
      {assistantOpen && <button className="assistant-backdrop" type="button" aria-label="Close CyberBuddy assistant" onClick={() => setAssistantOpen(false)} />}
      {assistantOpen && (
        <aside id="cybersafe-assistant" className="assistant-panel" role="dialog" aria-modal="true" aria-label="CyberSafe guidance assistant">
          <div className="assistant-panel-head">
            <div><span className="eyebrow"><span className="status-dot" /> AI safety assistant</span><strong>Ask before you act.</strong><small>Conversational guidance for the specific situation you describe.</small></div>
            <button className="assistant-close" type="button" aria-label="Close AI assistant" onClick={() => setAssistantOpen(false)}><X size={17} /></button>
          </div>
          <div className="assistant-messages" aria-live="polite" aria-busy={assistantPending}>
            {assistantMessages.map((message, index) => <div className={`assistant-message ${message.role}`} key={`${message.role}-${index}`}><span>{message.role === "assistant" ? "AI" : "You"}</span>{message.role === "assistant" ? <div className="assistant-markdown"><Streamdown>{message.text}</Streamdown></div> : <p>{message.text}</p>}</div>)}
            {assistantPending && <div className="assistant-message assistant"><span>AI</span><p className="assistant-thinking"><LoaderCircle size={14} /> Thinking through that…</p></div>}
          </div>
          <div className="assistant-compose">
            <div className="assistant-prompts">{assistantPrompts.map((prompt) => <button key={prompt} type="button" disabled={assistantPending} onClick={() => void sendAssistantMessage(prompt)}>{prompt}</button>)}</div>
            <form onSubmit={(event) => { event.preventDefault(); void sendAssistantMessage(assistantInput); }}><textarea aria-label="Ask the CyberSafe assistant" placeholder="Ask a specific safety question…" value={assistantInput} rows={2} disabled={assistantPending} onChange={(event) => setAssistantInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void sendAssistantMessage(assistantInput); } }} /><button type="submit" aria-label="Send question" disabled={assistantPending || !assistantInput.trim()}><Send size={15} /></button></form>
            <small className="assistant-disclaimer">Educational guidance only. For active financial fraud, call <a href="tel:1930">1930</a>.</small>
          </div>
        </aside>
      )}
      <button
        className={`guide-fab ${assistantOpen ? "is-open" : ""}`}
        type="button"
        aria-label={assistantOpen ? "Close CyberBuddy assistant" : "Open CyberBuddy assistant"}
        aria-expanded={assistantOpen}
        aria-controls="cybersafe-assistant"
        onClick={() => setAssistantOpen((value) => !value)}
      >
        <span className="guide-fab-avatar" aria-hidden="true">
          {assistantOpen ? <X size={16} /> : <Bot size={17} />}
          {!assistantOpen && <Sparkles className="guide-fab-spark" size={10} />}
        </span>
        <span className="guide-fab-copy">
          <strong>{assistantOpen ? "Close CyberBuddy" : "CyberBuddy"}</strong>
          {!assistantOpen && <small>AI safety buddy</small>}
        </span>
        <span className="guide-fab-status" aria-hidden="true" />
      </button>
      <Footer />
    </div>
  );
}

export { PRODUCT_TITLE };
