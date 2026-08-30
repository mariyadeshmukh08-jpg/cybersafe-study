# Safety improvement research

Official National Cyber Crime Reporting Portal FAQ: the portal supports reporting other cybercrimes including online financial fraud, ransomware, hacking, cryptocurrency crimes, mobile and social-media crimes. The portal identifies 1930 as the immediate financial-fraud reporting route and asks users to keep relevant evidence ready. Source: https://www.cybercrime.gov.in/webform/FAQ.aspx

Official National Cyber Crime Reporting Portal online safety tips: do not click suspicious links or attachments; keep software and operating systems updated; use an updated browser and safe browsing tools; disable location services when appropriate; limit personal information shared with unknown people; use trusted devices/networks for sensitive banking or shopping; protect devices with a password, PIN, pattern, or biometric; install apps only from trusted sources. Source: https://www.cybercrime.gov.in/webform/Crime_OnlineSafetyTips.aspx

Selected improvement decision: add a compact Safety Toolkit with three states—Before you pay, After you click, and Preserve & report—using only practical guidance supported by the official sources above. Refine the assistant with a quick prompt for “I think I’ve been scammed” and route users to 1930 and the official portal for active financial fraud. Avoid adding statistics, claims of government affiliation, or user-data collection.

## Deployment note

The current published domain `https://cybersafe-a8vxik4x.manus.space/` still reflects checkpoint `6e26c06c`, so the newly added Safety Toolkit has not been published yet. The editable preview includes the Toolkit and requires a new checkpoint to make it live.

## Preview validation

The editable preview renders the Safety Toolkit between the quiz promotion and practical-response sections. It exposes three actions: `Review scam signals`, `Test your reflex`, and `Start a report`, with guidance covering safe payment verification, post-click device isolation, evidence preservation, 1930, and the official portal. The title, Quiz link, and Need guidance trigger remain visible. The live preview is ready for the next checkpoint.
