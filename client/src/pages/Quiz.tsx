// Design ground truth: the quiz is a native extension of the provided dark navy/cyan reporting desk, using the same compact labels, glass cards, signal progress, and action-first language.
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, CircleAlert, RotateCcw, ShieldCheck, X } from "lucide-react";
import { Link } from "wouter";

type QuizQuestion = {
  topic: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

const questions: QuizQuestion[] = [
  {
    topic: "Phishing",
    question: "You receive an urgent message saying your bank account will be closed unless you click a link. What is the safest first step?",
    options: ["Click the link and sign in quickly", "Reply to ask whether the message is real", "Open your bank app or type the official website yourself", "Forward the message to friends for advice"],
    answer: 2,
    explanation: "Avoid links in unexpected messages. Use a trusted app or type the official address yourself, then contact the organisation through a verified channel.",
  },
  {
    topic: "OTP scams",
    question: "A caller claiming to be from customer support asks for the OTP that just arrived on your phone. What should you do?",
    options: ["Share it if the caller knows your name", "Share only the last two digits", "Read it back after checking the caller ID", "Do not share it; end the call and contact the organisation directly"],
    answer: 3,
    explanation: "An OTP is a one-time authentication secret. Legitimate support teams should not ask you to disclose it over a call or message.",
  },
  {
    topic: "UPI / payment fraud",
    question: "Someone says they are sending you a refund and asks you to enter your UPI PIN to receive it. What is true?",
    options: ["A UPI PIN is used to receive money", "A UPI PIN authorises a payment from your account", "A UPI PIN is safe to share with verified merchants", "Entering it twice makes the refund faster"],
    answer: 1,
    explanation: "Your UPI PIN authorises money leaving your account. You never need to enter it to receive a payment or refund.",
  },
  {
    topic: "Password security",
    question: "Which password habit gives your important accounts the strongest protection?",
    options: ["Use one memorable password everywhere", "Use a unique long passphrase and enable multi-factor authentication", "Change only the final number each month", "Store passwords in a public notes app"],
    answer: 1,
    explanation: "Unique passwords limit damage from a breach elsewhere. A password manager and multi-factor authentication add another strong layer.",
  },
  {
    topic: "Fake links / websites",
    question: "Before entering payment details on a website, which check is most useful?",
    options: ["The page has a padlock, so it must be genuine", "The site has a colourful logo", "The domain is the exact official address and you reached it through a trusted path", "The offer expires in five minutes"],
    answer: 2,
    explanation: "A padlock only indicates an encrypted connection; it does not prove the site is legitimate. Check the exact domain and avoid pressure-based offers.",
  },
  {
    topic: "Social engineering",
    question: "A person uses urgency, authority, and a personal detail to pressure you into an action. What tactic may be at work?",
    options: ["Social engineering", "A routine software update", "A secure password reset", "A privacy setting"],
    answer: 0,
    explanation: "Social engineering manipulates trust and emotion rather than breaking a system directly. Pause and verify through an independent channel.",
  },
  {
    topic: "Online privacy",
    question: "Which privacy practice reduces the amount of personal information exposed online?",
    options: ["Make every profile public for convenience", "Share live location with unknown contacts", "Review app permissions and limit public personal details", "Use your date of birth as a username"],
    answer: 2,
    explanation: "Regular permission and privacy reviews reduce unnecessary exposure. Share only what a service genuinely needs.",
  },
  {
    topic: "Safe browsing",
    question: "A browser warns that a download may be unsafe. What is the safest response?",
    options: ["Disable the warning for this one download", "Continue only if the file name looks familiar", "Stop, leave the page, and obtain the software from its official source", "Ask the sender to send the file again"],
    answer: 2,
    explanation: "Browser warnings are useful signals. Do not bypass them; use the publisher’s verified website or an official app store instead.",
  },
  {
    topic: "Malware",
    question: "You suspect malware on your device. Which response is safest?",
    options: ["Keep using the device so the malware can be observed", "Disconnect it from the network, preserve evidence, and seek trusted technical help", "Disable all security warnings", "Install several unknown cleanup tools from pop-up ads"],
    answer: 1,
    explanation: "Disconnecting limits further access. Preserve relevant evidence and use a trusted technician or security provider rather than downloading unknown tools.",
  },
  {
    topic: "Cybercrime reporting",
    question: "You notice an unauthorised financial transaction. What should you do first?",
    options: ["Wait a week to see if it reverses", "Delete the messages to protect your privacy", "Call 1930 immediately, alert your bank, preserve the trail, and use the official portal", "Post the transaction details publicly for advice"],
    answer: 2,
    explanation: "Speed matters for suspected financial fraud. Call 1930 immediately, alert your bank, preserve transaction evidence, and complete the official report.",
  },
];

const scoreBand = (percentage: number) => {
  if (percentage >= 90) return { title: "Excellent Cyber Safety Awareness", body: "You have a strong safety reflex. Keep verifying unexpected requests and share these habits with the people around you.", tone: "excellent" };
  if (percentage >= 70) return { title: "Good Awareness", body: "Your foundations are solid. Revisit the questions you missed so a high-pressure moment does not rush your next step.", tone: "good" };
  if (percentage >= 50) return { title: "Needs Improvement", body: "You have useful instincts to build on. Focus on payment safety, verification, and preserving evidence before acting.", tone: "improve" };
  return { title: "Learn More About Cyber Safety", body: "Take another pass through the awareness topics and practice stopping before you click, share, or pay.", tone: "learn" };
};

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(questions.length).fill(null));
  const [complete, setComplete] = useState(false);
  const [review, setReview] = useState(false);

  const correctCount = useMemo(() => answers.reduce<number>((total, answer, index) => total + (answer !== null && answer === questions[index].answer ? 1 : 0), 0), [answers]);
  const incorrectCount = questions.length - correctCount;
  const percentage = Math.round((correctCount / questions.length) * 100);
  const result = scoreBand(percentage);
  const question = questions[current];
  const answered = selected !== null;

  const chooseAnswer = (index: number) => {
    if (answered || complete) return;
    setSelected(index);
    setAnswers((previous) => previous.map((answer, answerIndex) => answerIndex === current ? index : answer));
  };

  const nextQuestion = () => {
    if (!answered) return;
    if (current === questions.length - 1) {
      setComplete(true);
      setReview(false);
      return;
    }
    setCurrent((value) => value + 1);
    setSelected(null);
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers(Array(questions.length).fill(null));
    setComplete(false);
    setReview(false);
  };

  const goToQuestion = (index: number) => {
    setCurrent(index);
    setSelected(answers[index]);
    setComplete(false);
    setReview(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="quiz-page">
      <section className="quiz-hero">
        <div className="quiz-hero-glow" aria-hidden="true" />
        <div className="container quiz-hero-inner">
          <div className="quiz-hero-copy">
            <Link className="back-link" href="/"><ArrowLeft size={15} /> Back to the study desk</Link>
            <span className="eyebrow eyebrow-pill"><span className="status-dot" /> Cyber safety knowledge check</span>
            <h1>Build a safer<br /><span>digital reflex.</span></h1>
            <p>Ten practical questions. Four choices each. Learn what to notice before pressure turns into a costly click, share, or payment.</p>
          </div>
          <div className="quiz-hero-aside"><span className="aside-index">10</span><span className="eyebrow">Short study / practical signal</span><strong>One question at a time.</strong><small>Immediate explanations keep the learning close to the decision.</small></div>
        </div>
      </section>

      <section className="quiz-workspace section">
        <div className="container">
          {!complete ? (
            <div className="quiz-layout">
              <aside className="quiz-sidebar">
                <div className="quiz-progress-card">
                  <div className="progress-top"><span className="eyebrow">Your progress</span><strong>{current + 1} / {questions.length}</strong></div>
                  <div className="progress-track"><span style={{ width: `${((current + (answered ? 1 : 0)) / questions.length) * 100}%` }} /></div>
                  <p>{answered ? "Answer checked. Read the explanation, then continue." : "Choose the safest response for this situation."}</p>
                </div>
                <div className="topic-index">
                  <span className="eyebrow">Study map</span>
                  {questions.map((item, index) => <button className={index === current ? "topic-index-item active" : answers[index] !== null ? "topic-index-item answered" : "topic-index-item"} key={item.topic} type="button" onClick={() => answers[index] !== null && goToQuestion(index)} disabled={answers[index] === null && index !== current}><span>{String(index + 1).padStart(2, "0")}</span>{item.topic}<i aria-hidden="true">{answers[index] !== null ? <Check size={12} /> : index === current ? <span className="index-dot" /> : null}</i></button>)}
                </div>
                <div className="quiz-sidebar-tip"><ShieldCheck size={16} /><span>Remember: urgency is a signal to pause, not a reason to hurry.</span></div>
              </aside>

              <div className="quiz-card" key={current}>
                <div className="quiz-card-head"><div><span className="eyebrow">Question {String(current + 1).padStart(2, "0")} / {questions.length}</span><span className="topic-tag">{question.topic}</span></div><span className="quiz-card-mark">Q{String(current + 1).padStart(2, "0")}</span></div>
                <div className="quiz-question-block"><h2>{question.question}</h2><p className="question-note">Select one answer to reveal the safety note.</p></div>
                <div className="answer-list" role="radiogroup" aria-label={`Answers for question ${current + 1}`}>
                  {question.options.map((option, index) => {
                    const isSelected = selected === index;
                    const isCorrect = index === question.answer;
                    const stateClass = !answered ? "" : isCorrect ? "is-correct" : isSelected ? "is-incorrect" : "is-muted";
                    return <button key={option} type="button" className={`answer-option ${isSelected ? "is-selected" : ""} ${stateClass}`} onClick={() => chooseAnswer(index)} role="radio" aria-checked={isSelected} disabled={answered}><span className="answer-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span><span className="answer-state" aria-hidden="true">{answered && isCorrect ? <CheckCircle2 size={18} /> : answered && isSelected ? <X size={18} /> : null}</span></button>;
                  })}
                </div>
                {answered && <div className={`answer-feedback ${selected === question.answer ? "feedback-correct" : "feedback-incorrect"}`}><div className="feedback-icon">{selected === question.answer ? <CheckCircle2 size={18} /> : <CircleAlert size={18} />}</div><div><strong>{selected === question.answer ? "Correct — good instinct." : "Not quite — here is the safer move."}</strong><p>{question.explanation}</p></div></div>}
                <div className="quiz-card-foot"><span className="keyboard-note">{answered ? "Your answer is saved for review." : "Choose an option to continue."}</span><button className="button button-primary" type="button" onClick={nextQuestion} disabled={!answered}>{current === questions.length - 1 ? "See my results" : "Next question"} <ArrowRight size={16} /></button></div>
              </div>
            </div>
          ) : (
            <div className="results-shell">
              <div className="results-header"><div><span className="eyebrow">Study complete / 10 questions</span><h2>Your safety signal is <span>{percentage}%.</span></h2><p>{result.body}</p></div><div className={`result-badge ${result.tone}`}><ShieldCheck size={22} /><strong>{result.title}</strong></div></div>
              <div className="results-grid">
                <div className="result-score-card"><span className="eyebrow">Final score</span><strong>{percentage}<small>%</small></strong><div className="result-meter"><span style={{ width: `${percentage}%` }} /></div><p>{percentage === 100 ? "Every answer matched the safest response." : "Your score is based on the safest answer selected for each scenario."}</p></div>
                <div className="result-stat-card"><span className="eyebrow">Correct answers</span><strong>{correctCount}<small> / {questions.length}</small></strong><CheckCircle2 size={18} /></div>
                <div className="result-stat-card result-stat-warn"><span className="eyebrow">Incorrect answers</span><strong>{incorrectCount}<small> / {questions.length}</small></strong><CircleAlert size={18} /></div>
              </div>
              <div className="results-actions"><button className="button button-primary" type="button" onClick={restart}><RotateCcw size={16} /> Restart Quiz</button><button className="button button-outline" type="button" onClick={() => setReview((value) => !value)}>{review ? "Hide Review" : "Review Answers"} <ArrowRight size={16} /></button></div>
              {review && <div className="review-panel"><div className="review-head"><span className="eyebrow">Answer review</span><p>Revisit each decision and keep the safer response close at hand.</p></div>{questions.map((item, index) => { const answer = answers[index]; const isCorrect = answer === item.answer; return <button className="review-row" type="button" key={item.topic} onClick={() => goToQuestion(index)}><span className={`review-status ${isCorrect ? "correct" : "incorrect"}`}>{isCorrect ? <Check size={14} /> : <X size={14} />}</span><span className="review-question"><small>{String(index + 1).padStart(2, "0")} / {item.topic}</small><strong>{item.question}</strong><em>Your answer: {answer === null ? "Not answered" : item.options[answer]}</em></span><ArrowRight size={16} /></button>; })}</div>}
              <div className="report-reminder"><ShieldCheck size={17} /><p>If a real transaction has moved, do not wait for a quiz result: call <a href="tel:1930">1930</a> immediately and use the <a href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer">official cybercrime portal</a>.</p></div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
