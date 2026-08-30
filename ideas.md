# Cybercrime Awareness and Reporting System Study — Design Ground Truth

The provided CyberSafe India website is the ground-truth reference. This is an in-place extension, not a visual redesign. Existing page structure, content hierarchy, dark premium cybersecurity styling, navigation behavior, links, cards, statistics, reporting guidance, resources, updates, footer, and theme behavior must remain intact unless a change is explicitly required for the title update or quiz integration.

## Design Movement
Contemporary civic-tech editorial interface with a security operations desk sensibility: deep navy surfaces, cyan signal accents, restrained glass panels, precise data labels, and asymmetric content composition.

## Core Principles
1. Preserve the established visual system and user journeys; additions should feel native to the existing site.
2. Use clarity under pressure: short labels, strong hierarchy, explicit states, and action-oriented copy.
3. Treat cyan as a signal color for action and trust, supported by quiet navy surfaces and cool neutral text.
4. Keep motion purposeful and compact, giving feedback without distracting from safety guidance.

## Color Philosophy
The palette communicates calm control rather than alarm. Deep navy creates a stable operational field; cyan marks safe action, progress, and system feedback; muted slate text keeps dense educational content readable; success and error colors are reserved for quiz feedback and never used as decorative noise.

## Layout Paradigm
Retain the reference's asymmetric editorial layout: compact global header, split hero with reporting signal panel, horizontal stat rail, staggered content sections, and card groupings that alternate text and practical guidance. The new quiz uses the same wide container and signal-card language, with a focused question workspace and an adjacent progress/score rail on desktop that stacks naturally on mobile.

## Signature Elements
The existing cyan signal line and small uppercase data labels remain the visual anchors. Glassy navy cards with fine borders, subtle inner highlights, and controlled cyan glows continue across the quiz. Numbered steps, compact badges, and directional arrow affordances reinforce the reporting-desk metaphor.

## Interaction Philosophy
Interactions should make the user's next safe action obvious. Buttons respond quickly with restrained scale and color transitions. Quiz answers show a clear selected state, then a decisive correct/incorrect explanation before moving forward. Progress is always visible, and the end state supports both reflection (Review Answers) and repetition (Restart Quiz).

## Animation
Use short opacity/transform transitions under 300ms with a custom ease-out. Question changes should crossfade and translate slightly rather than jump. Answer feedback should reveal in place, preserving layout stability. Progress fill transitions smoothly. Respect prefers-reduced-motion by removing nonessential movement while retaining state and focus changes.

## Typography System
Use the existing site's compact uppercase metadata style for eyebrow labels and a strong geometric display face for headings, paired with a clean, readable sans-serif for supporting copy. Maintain the reference's high-contrast white headings, cyan emphasis, small tracked labels, and comfortable paragraph measure. Do not introduce a generic default font or a separate type treatment for the quiz.

## Brand Essence
A calm, citizen-first cyber safety desk for people who need to recognize risk, preserve evidence, and report confidently; practical, trustworthy, alert.

## Brand Voice
Headlines are direct and memorable; CTAs are specific and action-oriented; microcopy reassures without minimizing risk. Avoid generic filler.

Example lines:
- "Test the pause that protects you."
- "One question at a time. Build a safer reflex."

## Wordmark & Logo
Keep the existing compact CYBERSAFE INDIA wordmark and shield/signal mark exactly as the visual reference. Do not replace it with a new wordmark. The new product title is a page/product title update, not a request to redraw the brand mark.

## Signature Brand Color
Signal cyan, used in the existing interface for emphasis and primary actions: #22D3EE with a brighter active highlight around #67E8F9.

## Title Update Scope
Update the browser title, visible hero heading, navbar/logo text where the old product title appears, footer heading/copy, accessible labels, and any other visible title references to: "Cybercrime Awareness and Reporting System Study". Keep the short brand mark "CYBERSAFE INDIA" when it functions as a logo, but remove the old long title wording everywhere it is used as the site's product title.

## Quiz Scope
Add a main-navigation item labeled "Quiz", a homepage "Take the Quiz" CTA, and a dedicated quiz route. The quiz must contain exactly 10 multiple-choice questions with four options each across phishing, OTP scams, UPI/payment fraud, password security, fake links/websites, social engineering, online privacy, safe browsing, malware, and cybercrime reporting. Answers must provide immediate correctness and a short explanation, with a progress indicator, score calculation, smooth transitions, responsive mobile layout, personalized score bands, Restart Quiz, and Review Answers.
