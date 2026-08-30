// Design ground truth: use the same dark signal-desk hierarchy and action cards for preserved utility routes, keeping them visually continuous with the homepage and quiz.
import { ArrowLeft, ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

type InfoPageProps = {
  eyebrow: string;
  title: string;
  body: string;
  actionLabel: string;
  actionHref: string;
};

export default function InfoPage({ eyebrow, title, body, actionLabel, actionHref }: InfoPageProps) {
  const external = actionHref.startsWith("http");
  return (
    <section className="utility-page section">
      <div className="utility-grid container">
        <div className="utility-copy">
          <Link className="back-link" href="/"><ArrowLeft size={15} /> Back to the study desk</Link>
          <span className="eyebrow eyebrow-pill"><span className="status-dot" /> {eyebrow}</span>
          <h1>{title}</h1>
          <p>{body}</p>
          {external ? <a className="button button-primary" href={actionHref} target="_blank" rel="noreferrer">{actionLabel} <ExternalLink size={15} /></a> : actionHref === "tel:1930" ? <a className="button button-primary" href={actionHref}>{actionLabel} <ArrowRight size={15} /></a> : <Link className="button button-primary" href={actionHref}>{actionLabel} <ArrowRight size={15} /></Link>}
        </div>
        <div className="utility-card"><div className="utility-card-top"><span className="eyebrow">Signal note</span><ShieldCheck size={20} /></div><strong>Pause. Verify. Preserve.</strong><p>Clear, deliberate steps are safer than fast reactions when a digital request feels urgent.</p><div className="utility-lines"><span /><span /><span /></div></div>
      </div>
    </section>
  );
}
