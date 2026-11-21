---
title: Security and responsible disclosure
description: "How to report a security vulnerability in navez.tech systems, what we commit to in return, and our safe-harbour terms."
show_updated: true
hide_cta: true
---

We sell cybersecurity, so we hold ourselves to the standard we recommend to clients. If you believe you've found a security vulnerability in a navez.tech website or system, please tell us.

## How to report

Email **security@navez.tech** <!-- TODO(content): confirm mailbox exists and is monitored --> with:

- a description of the issue and where you found it (URL, component)
- steps to reproduce, and proof-of-concept code if you have it
- the impact you believe it has
- how you'd like to be credited, if at all

Our machine-readable contact details are published at [/.well-known/security.txt](/.well-known/security.txt). You can write in English or Bahasa Indonesia.

## What we commit to

- Acknowledge your report within **3 business days**.
- Give you an initial assessment within **10 business days**.
- Keep you updated until the issue is fixed, and tell you when it is.
- Credit you publicly once fixed, if you want us to.

## Safe harbour

If you act in good faith and follow this policy, we will not pursue legal action against you for your research. Good faith means you:

- only test systems owned by navez.tech (this site and services on `navez.tech` subdomains)
- avoid privacy violations, data destruction and service disruption
- access only the minimum data needed to show the issue, and do not keep it
- give us reasonable time to fix the issue before disclosing it publicly

## Out of scope

- Client systems we build or manage: report those to the client directly, or to us and we'll pass it on
- Denial-of-service, spam or social-engineering attacks on our staff
- Findings from automated scanners without a demonstrated impact
- Missing best-practice headers or settings without a demonstrated exploit

We don't currently run a paid bug bounty.
