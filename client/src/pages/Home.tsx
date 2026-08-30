// Design ground truth: preserve the reference homepage's dark navy civic-tech editorial layout, cyan signal accents, data-card language, and action-first reporting guidance.
import { ArrowDownRight, ArrowRight, CheckCircle2, ExternalLink, FileCheck2, LockKeyhole, ShieldAlert, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Link } from "wouter";

const awarenessTopics = [
  { number: "01", title: "Phishing", body: "Deceptive messages designed to capture passwords, OTPs, or banking details.", watch: "Urgent links or sender-address mismatches", icon: ShieldAlert },
  { number: "02", title: "UPI Fraud", body: "Payment requests or collect links that trick you into authorising a transfer.", watch: "Requests to enter a UPI PIN to receive money", icon: Zap },
  { number: "03", title: "QR Code Scam", body: "A malicious QR code directs a user to a fraudulent payment or login page.", watch: "Unverified payment QR codes sent by strangers", icon: Sparkles },
  { number: "04", title: "Identity Theft", body: "Personal identifiers are used without consent to impersonate or access accounts.", watch: "Unexpected account notifications or KYC requests", icon: LockKeyhole },
  { number: "05", title: "Cyberbullying", body: "Repeated online harassment, threats, humiliation, or abusive content.", watch: "Persistent abusive messages or fake profiles", icon: ShieldAlert },
  { number: "06", title: "Fake Job Scam", body: "Fraudsters use fake recruitment offers to request money or sensitive information.", watch: "Fees for interviews, training, or job confirmation", icon: Zap },
  { number: "07", title: "Online Shopping Fraud", body: "Fake stores, missing deliveries, or sellers using payment outside trusted platforms.", watch: "Unrealistic discounts or pressure to prepay", icon: Sparkles },
  { number: "08", title: "Social Media Hacking", body: "Unauthorised access to a social account, often followed by impersonation scams.", watch: "Login alerts you did not initiate", icon: LockKeyhole },
  { number: "09", title: "Investment Scam", body: "False investment schemes promise high or guaranteed returns and then disappear.", watch: "Guaranteed returns and unregistered advisers", icon: ShieldAlert },
  { number: "10", title: "Malware and Ransomware", body: "Malicious software steals data, disrupts devices, or demands payment to restore access.", watch: "Unexpected encryption, pop-ups, or software installs", icon: LockKeyhole },
];

function SignalChart() {
  return (
    <div className="signal-chart" aria-label="Illustrative cyber safety signal monitor">
      <div className="chart-toolbar">
        <div>
          <span className="eyebrow">National reporting signal</span>
          <strong>Pause before the transfer</strong>
        </div>
        <span className="chart-pulse"><Zap size={15} /></span>
      </div>
      <svg viewBox="0 0 600 230" role="img" aria-label="Cyan signal line rising across a dark grid">
        <defs>
          <linearGradient id="signalFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[34, 82, 130, 178].map((y) => <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="rgba(148,163,184,0.12)" strokeWidth="1" />)}
        {[80, 200, 320, 440, 560].map((x) => <line key={x} x1={x} x2={x} y1="0" y2="190" stroke="rgba(148,163,184,0.08)" strokeWidth="1" />)}
        <path d="M0 154 C70 152, 108 158, 168 143 S270 121, 332 128 S438 92, 600 64 L600 190 L0 190 Z" fill="url(#signalFill)" />
        <path d="M0 154 C70 152, 108 158, 168 143 S270 121, 332 128 S438 92, 600 64" fill="none" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" />
        <circle cx="600" cy="64" r="5" fill="#67e8f9" />
      </svg>
      <div className="chart-foot"><span>Signal clarity</span><span>Act while the trail is fresh</span></div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-signal-bg" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy reveal-up">
            <span className="eyebrow eyebrow-pill"><span className="status-dot" /> India’s cyber safety desk</span>
            <h1>Cybercrime Awareness <span>and</span><br /> Reporting System <em>Study</em></h1>
            <p className="hero-lede">Learn. Stay safe. Report cybercrime quickly. Clear guidance for everyday citizens, from recognising a scam to preparing a report.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#awareness">Learn about cybercrime <ArrowRight size={16} /></a>
              <Link className="button button-outline" href="/report">Report a cybercrime <ArrowUpRightIcon /></Link>
            </div>
            <div className="hero-note"><span className="note-marker">↗</span> If money has moved, call <a href="tel:1930">1930</a> immediately.</div>
          </div>
          <div className="hero-visual reveal-up delay-1">
            <SignalChart />
            <div className="floating-callout"><span className="eyebrow">Action window</span><strong>Fast reporting matters</strong></div>
          </div>
        </div>
        <div className="container signal-rail">
          <div className="signal-stat"><span className="eyebrow">01 / Detect</span><strong>Spot the pressure</strong><small>Urgency is a signal, not an instruction.</small></div>
          <div className="signal-stat"><span className="eyebrow">02 / Protect</span><strong>Stop the transfer</strong><small>Never share OTPs, PINs, or access.</small></div>
          <div className="signal-stat"><span className="eyebrow">03 / Preserve</span><strong>Keep the trail</strong><small>Save messages, links, and transaction IDs.</small></div>
          <div className="signal-stat signal-stat-accent"><span className="eyebrow">04 / Report</span><strong>Call 1930</strong><small>Use the official portal for the next step.</small></div>
        </div>
      </section>

      <section className="awareness-section section" id="awareness">
        <div className="container">
          <div className="section-intro split-intro">
            <div>
              <span className="eyebrow">Cyber awareness</span>
              <h2>Know the signal.<br /><span>Break the scam.</span></h2>
            </div>
            <div className="intro-copy">
              <p>Cybercrime uses ordinary digital moments—an unexpected payment request, an urgent job offer, a convincing link—to pressure people into acting. Awareness turns that pressure into a pause.</p>
              <a className="text-link" href="#safety-steps">See the three-step safety response <ArrowRight size={15} /></a>
            </div>
          </div>
          <div className="topic-grid">
            {awarenessTopics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <article className={`topic-card reveal-up delay-${Math.min(index % 4, 3)}`} key={topic.title}>
                  <div className="topic-card-top"><span className="topic-number">{topic.number}</span><Icon size={18} /></div>
                  <h3>{topic.title}</h3>
                  <p>{topic.body}</p>
                  <div className="watch-row"><span>Watch for:</span> {topic.watch}</div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="quiz-promo-section section" id="quiz-preview">
        <div className="container">
          <div className="quiz-promo-card">
            <div className="quiz-promo-art" aria-hidden="true" />
            <div className="quiz-promo-copy">
              <span className="eyebrow">Knowledge check / 10 questions</span>
              <h2>Test the pause<br /><span>that protects you.</span></h2>
              <p>Build a safer reflex across phishing, payment fraud, privacy, malware, and reporting. See your result, then review every answer.</p>
              <Link className="button button-primary" href="/quiz">Take the Quiz <ArrowRight size={16} /></Link>
            </div>
            <div className="quiz-promo-meta">
              <div><span className="eyebrow">Format</span><strong>10 × 4</strong><small>questions and choices</small></div>
              <div><span className="eyebrow">Time</span><strong>~ 4 min</strong><small>at your own pace</small></div>
              <div><span className="eyebrow">Outcome</span><strong>Personalised</strong><small>safety recommendation</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className="toolkit-section section" id="safety-toolkit">
        <div className="container">
          <div className="section-intro toolkit-heading"><div><span className="eyebrow">Safety toolkit</span><h2>When the signal<br /><span>turns urgent.</span></h2></div><p>Keep these three moves close. They are designed for the minutes when a message, payment request, or device warning creates pressure.</p></div>
          <div className="toolkit-grid">
            <article className="toolkit-card"><span className="toolkit-card-number">01</span><LockKeyhole size={19} /><h3>Before you pay</h3><p>Stop and verify the request through a trusted app or known contact. Never disclose an OTP or enter a UPI PIN to receive money.</p><a className="text-link" href="#awareness">Review scam signals <ArrowRight size={15} /></a></article>
            <article className="toolkit-card"><span className="toolkit-card-number">02</span><ShieldAlert size={19} /><h3>After you click</h3><p>Disconnect a suspicious device from the network, close the page, avoid unknown cleanup tools, and change important passwords from a clean device.</p><Link className="text-link" href="/quiz">Test your reflex <ArrowRight size={15} /></Link></article>
            <article className="toolkit-card toolkit-card-accent"><span className="toolkit-card-number">03</span><FileCheck2 size={19} /><h3>Preserve &amp; report</h3><p>Keep screenshots, messages, URLs, dates, transaction IDs, and alerts. For suspected financial fraud, call 1930 and use the official portal.</p><Link className="text-link" href="/report">Start a report <ArrowRight size={15} /></Link></article>
          </div>
        </div>
      </section>

      <section className="response-section section" id="safety-steps">
        <div className="container response-grid">
          <div className="response-heading"><span className="eyebrow">A practical response</span><h2>Move deliberately when something feels wrong.</h2><p>A real-life scam can feel urgent. These steps help you protect your funds and preserve details that may help an official investigation.</p><Link className="button button-outline" href="/report">Start a guided report <ArrowRight size={16} /></Link></div>
          <div className="steps-list">
            <div className="step-row"><span>01</span><div><h3>Pause before you pay</h3><p>Treat urgency as a warning. Never share OTPs, UPI PINs, or remote-access permissions.</p></div><CheckCircle2 size={18} /></div>
            <div className="step-row"><span>02</span><div><h3>Preserve the trail</h3><p>Save transaction IDs, conversations, screenshots, links, and account details before they disappear.</p></div><CheckCircle2 size={18} /></div>
            <div className="step-row"><span>03</span><div><h3>Report without delay</h3><p>For suspected financial fraud, call 1930 immediately and use the official reporting channel.</p></div><CheckCircle2 size={18} /></div>
          </div>
        </div>
      </section>

      <section className="emergency-section section" id="emergency">
        <div className="container emergency-card">
          <div><span className="eyebrow">Emergency financial fraud support</span><h2>Act quickly.<br /><span>Keep the evidence.</span></h2></div>
          <div className="emergency-copy"><p>If you believe a financial transfer was fraudulent, call the national cybercrime helpline right away. You can then complete an official report with preserved transaction details.</p><div className="emergency-actions"><a href="tel:1930" className="emergency-call"><span className="eyebrow">National cyber helpline</span><strong>1930</strong></a><a href="https://cybercrime.gov.in/" className="emergency-portal" target="_blank" rel="noreferrer"><span className="eyebrow">Official portal</span><strong>Open portal <ExternalLink size={14} /></strong></a></div></div>
        </div>
      </section>

      <section className="resources-section section" id="resources">
        <div className="container">
          <div className="section-intro resources-heading"><div><span className="eyebrow">Keep learning</span><h2>Resources for a<br /><span>safer digital life.</span></h2></div><a className="button button-outline" href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer">View official learning corner <ExternalLink size={15} /></a></div>
          <div className="resources-grid">
            <article className="resource-card resource-card-large"><span className="resource-icon"><ShieldCheck size={20} /></span><h3>Frequently asked questions</h3><p>Quick answers on what to do after an incident, which details to save, and how official reporting works.</p><a className="text-link" href="#faq">Explore FAQs <ArrowRight size={15} /></a></article>
            <article className="resource-card"><span className="resource-icon"><LockKeyhole size={20} /></span><h3>Cyber Safety Guide</h3><p>A practical checklist covering verification, password hygiene, payment safety, and evidence preservation.</p><Link className="text-link" href="/guide">Open guide <ArrowRight size={15} /></Link></article>
            <article className="resource-card"><span className="resource-icon"><Sparkles size={20} /></span><h3>Awareness videos</h3><p>Watch public cyber-awareness videos published by the Indian Cybercrime Coordination Centre.</p><a className="text-link" href="https://i4c.mha.gov.in/cyber-awareness-videos.aspx" target="_blank" rel="noreferrer">Watch videos <ExternalLink size={15} /></a></article>
          </div>
          <div className="faq-list" id="faq">
            <details><summary>What should I preserve after a suspected scam?</summary><p>Save screenshots, messages, transaction identifiers, contact details, URLs, dates, and account alerts. Do not alter the original messages or files.</p></details>
            <details><summary>When should I call 1930?</summary><p>Call 1930 immediately when you suspect a fraudulent financial transfer or an unauthorised transaction. Speed can matter when reporting financial fraud.</p></details>
            <details><summary>Can I report without evidence?</summary><p>Yes. Complete the information you have. If you later locate relevant evidence, preserve it and follow the guidance offered by the responsible authority.</p></details>
            <details><summary>Will this website replace the official portal?</summary><p>No. This is an educational interface. Use the official national portal and helpline for formal reporting.</p></details>
          </div>
        </div>
      </section>

      <section className="updates-section section" id="updates">
        <div className="container"><div className="section-intro updates-heading"><div><span className="eyebrow">Official updates</span><h2>Stay close to<br /><span>the signal.</span></h2></div><p>Use trusted sources for current advisories and official reporting guidance. This interface does not invent incident statistics or replace public authorities.</p></div><div className="updates-grid"><article><span className="update-date">READ / I4C</span><h3>Android accessibility abuse advisory</h3><p>Review official guidance when a device requests unusual accessibility permissions or control.</p><a href="https://i4c.mha.gov.in/" target="_blank" rel="noreferrer">Read advisory <ExternalLink size={14} /></a></article><article><span className="update-date">READ / MHA</span><h3>Cybercrime reporting basics</h3><p>Understand what to preserve, when to call 1930, and how the national portal fits into the response.</p><a href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer">Read update <ExternalLink size={14} /></a></article><article><span className="update-date">PRACTICE / STUDY</span><h3>Build a safer digital reflex</h3><p>Take the quiz to test the habits that reduce pressure, protect accounts, and support timely reporting.</p><Link href="/quiz">Take the Quiz <ArrowRight size={14} /></Link></article></div></div>
      </section>
    </>
  );
}

function ArrowUpRightIcon() {
  return <ArrowDownRight size={16} className="rotate-neg-45" />;
}
