type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

type CompletionPayload = {
  choices?: Array<{
    message?: {
      content?: unknown;
    };
  }>;
};

const SYSTEM_PROMPT = `You are CyberBuddy, the friendly cyber-safety assistant inside the Cyber Crime Awareness and Reporting System.

Respond like a thoughtful, capable chat assistant: understand the user's actual question, use the conversation context, and avoid repeating a fixed script. Answer directly in clear, plain English with a warm but professional tone. Prefer 2-5 short paragraphs or a short heading plus bullets when that improves clarity.

Your scope is cyber-safety education and incident response. You can explain types of cybercrime such as online financial fraud, phishing, identity theft, cyberbullying, online scams, malware, ransomware, account takeover, data theft, and privacy abuse at a high level. You may explain how to prevent, detect, contain, and report incidents, but never provide instructions for breaking into accounts, stealing data, evading detection, deploying malware, or harming systems. If a user asks for offensive steps, briefly refuse and redirect to defensive learning.

For suspected financial fraud, advise the user to stop interacting, contact their bank or payment provider through an official channel, preserve screenshots/messages/URLs/transaction IDs, and call India's cybercrime helpline 1930 promptly. Remind users that this educational assistant is not law enforcement and does not replace the official portal at cybercrime.gov.in. Do not ask users to share passwords, OTPs, PINs, full card numbers, or other secrets. When the question is unrelated, answer briefly and invite them back to cyber-safety topics.`;

const MAX_HISTORY = 12;
const MAX_MESSAGE_LENGTH = 1600;

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, MAX_MESSAGE_LENGTH) : "";
}

export function normalizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];

  return input
    .map((message) => {
      if (!message || typeof message !== "object") return null;
      const candidate = message as { role?: unknown; text?: unknown; content?: unknown };
      const role = candidate.role === "assistant" ? "assistant" : candidate.role === "user" ? "user" : null;
      const content = cleanText(candidate.text ?? candidate.content);
      return role && content ? { role, content } : null;
    })
    .filter((message): message is ChatMessage => Boolean(message))
    .slice(-MAX_HISTORY);
}

export function fallbackCyberBuddyReply(messages: ChatMessage[]) {
  const latest = messages.at(-1)?.content.toLowerCase() ?? "";

  if (/hello|hi|hey|who are you|what can you do/.test(latest)) {
    return "Hi — I’m CyberBuddy. I can help you understand suspicious links, payment fraud, identity theft, cyberbullying, online scams, malware, and the safest reporting steps.\n\nTell me what happened without sharing passwords, OTPs, PINs, or full card numbers, and I’ll help you work through the next step.";
  }

  if (/type(s)? of (cybercrime|cyber crime|online crime)|cybercrime|cyber crime|common online crimes/.test(latest)) {
    return "Common types of cybercrime include online financial fraud, phishing and social engineering, identity theft, cyberbullying, fake job or investment scams, online shopping fraud, account takeover, malware or ransomware, and data or privacy abuse. Each harms people in a different way, so the safest response depends on what happened.\n\nFor protection, verify requests independently, use unique passwords with MFA, keep software updated, preserve evidence, and report quickly through official channels. Tell me which type you want to understand and I’ll explain it defensively.";
  }

  if (/otp|one[- ]time|pin|password|login code/.test(latest)) {
    return "Treat an unexpected OTP or login-code request as a warning. Never read the code to a caller or enter it on a page opened from an unsolicited message. End the conversation and open the service’s official app or website yourself to check your account.\n\nIf you already shared a code, change the affected password from a clean device, review active sessions, contact the provider through its official channel, and report any financial loss immediately.";
  }

  if (/payment|upi|refund|money|bank|transfer|card/.test(latest)) {
    return "Pause before approving the request. A UPI PIN authorises money leaving your account; it is never needed to receive a refund. Do not use a caller’s link or number to verify the story—contact your bank or payment app through its official app or published website.\n\nIf money has moved without your authorisation, preserve the transaction ID and messages, contact the bank, and call 1930 promptly.";
  }

  if (/link|url|website|phish|email|message|sms/.test(latest)) {
    return "Do not click the link or reply with personal information. Check the sender and domain carefully, then reach the organisation by typing its known address or opening its official app yourself. Urgency, unexpected attachments, login requests, and small spelling changes are useful warning signs.\n\nIf you clicked it, close the page, avoid downloading anything, change any exposed password from a clean device, and monitor the account.";
  }

  if (/malware|virus|ransom|device|phone|laptop|computer/.test(latest)) {
    return "Disconnect a suspicious device from the internet if you can do so safely, stop opening unknown files, and do not install random ‘cleaner’ tools. From a clean device, change important passwords and enable MFA. Keep the suspicious messages, alerts, and file names as evidence.\n\nIf files are encrypted or money is at risk, contact a trusted professional and use the official reporting channels rather than negotiating with an unknown sender.";
  }

  if (/report|complaint|1930|police|evidence|proof/.test(latest)) {
    return "For a useful report, preserve screenshots, messages, phone numbers, URLs, dates and times, transaction IDs, account alerts, and any relevant files without editing the originals. For suspected financial fraud in India, call 1930 as soon as possible and use cybercrime.gov.in for the official report.\n\nYou can share the kind of incident here, but do not paste passwords, OTPs, PINs, or full financial numbers.";
  }

  return "I understand you’re asking about a cyber-safety situation. The safest first move is to pause: do not click, pay, reply, or share a code while the request feels urgent.\n\nTell me what you saw and what you have already done—such as whether it involved a link, payment, account login, device warning, or social-media message—and I’ll help you choose a specific next step.";
}

export async function askCyberBuddy(messages: ChatMessage[]) {
  const fallback = fallbackCyberBuddyReply(messages);
  const forgeBaseUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
  const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;

  if (!forgeBaseUrl || !forgeKey || messages.length === 0) {
    return { reply: fallback, fallback: true };
  }

  try {
    const response = await fetch(`${forgeBaseUrl}/v1/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${forgeKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.35,
        max_tokens: 650,
      }),
    });

    if (!response.ok) throw new Error(`LLM request failed with ${response.status}`);
    const payload = (await response.json()) as CompletionPayload;
    const reply = cleanText(payload.choices?.[0]?.message?.content);
    if (!reply) throw new Error("LLM response did not contain text");

    return { reply, fallback: false };
  } catch (error) {
    console.warn("[CyberBuddy] Falling back to local safety guidance:", error);
    return { reply: fallback, fallback: true };
  }
}
