# Light-mode contrast audit

The provided mobile reference showed three recurring issues: cyan hero emphasis on a pale background, light text on pale controls, and dark text on dark navy surfaces. The first light-mode patch confirmed the hero accent now uses `#07809d` with a `0.8px #061321` keyline; the outline CTA uses dark text on a pale surface; and topic cards use dark text on white-to-blue surfaces. The remaining issue found by computed-style inspection was cyan labels inside dark signal cards inheriting the pale-theme cyan token, so dark signal cards now restore `#22d3ee` / `#67e8f9` signal tokens locally.

## Live theme checks

In the live preview, light mode now shows the hero accent text in a darker cyan with a visible near-black keyline, dark body copy on pale controls, and high-contrast dark text on white-to-blue cards. The chart remains a dark surface with its cyan signal accents restored to bright cyan. Switching back to dark mode restores the original navy background, white headline, bright cyan emphasis, and dark glass cards without the light keyline leaking into the dark theme.

## Quiz contrast check

The quiz remained readable in dark mode and light mode. In light mode, the large blue `digital reflex` emphasis is darker and outlined, the quiz hero aside uses dark text on a pale card, the question card uses dark text on a bright surface, the answer choices remain bordered and legible, and the progress map plus navigation are still visible. The Quiz route remains functional with four answer choices and the same progress structure.

## Assistant contrast check

On the light-mode quiz, the assistant opens as a dark navy panel with light text, bright cyan prompts, readable input text, and a defined cyan border. Computed styles confirmed the assistant panel and message/input surfaces use intentional dark-surface tokens rather than inheriting pale-theme text colors. The assistant remains usable while the quiz stays visible behind it.
