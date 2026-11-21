---
seo:
  title: "What UU PDP means for your company website"
title: What does Indonesia's PDP Law (UU PDP) mean for your company website?
slug: uu-pdp-company-website
description: "UU PDP applies to the personal data your website collects. What to check: forms, cookies, analytics, privacy notices, security and breach response."
date: 2026-10-28
author: navez-team
category: cybersecurity
service: cybersecurity
tags: [uu pdp, privacy, website, compliance]
answer_summary: |
  If your website collects names, emails, phone numbers or tracking data from people in Indonesia, Law No. 27 of 2022 (UU PDP) applies to it. In practice, that means a clear privacy notice, a lawful basis such as consent for what you collect, consent before non-essential tracking, proper security, and a plan for responding to data breaches.
faq:
  - q: Does UU PDP apply to a simple company website?
    a: If the site collects personal data (a contact form, a newsletter sign-up, analytics cookies tied to individuals), then yes, the processing of that data falls under the law.
  - q: Do we need a cookie banner?
    a: The law is built around a lawful basis for processing, and consent is the usual basis for non-essential tracking such as marketing analytics. A consent banner that blocks those tools until people opt in is the practical way to show this.
  - q: When did UU PDP take effect?
    a: The law was enacted in October 2022 with a two-year transition period, which ended in October 2024. Organisations are now expected to comply.
draft: false
---

*This article is a general, practical overview for business and IT teams. It is not legal advice; confirm your obligations with a qualified legal adviser.*

Indonesia's Personal Data Protection Law (**Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi**, usually shortened to **UU PDP**) is the country's first comprehensive data protection law. Its two-year transition period ended in October 2024, so organisations that process personal data of people in Indonesia are now expected to comply.

Your website is often the most visible place where you collect personal data, and the easiest place for customers, partners and regulators to check what you do. That makes it a good place to start.

## What personal data does a typical company website collect?

More than most teams realise. A quick inventory usually finds:

- **Contact and quote forms**: name, work email, phone or WhatsApp number, company, message.
- **Newsletter and download sign-ups**: email and sometimes job title.
- **Meeting booking tools**: name, email, calendar details.
- **Chat widgets and WhatsApp links**: phone numbers and conversation content.
- **Analytics and marketing tools**: cookies, device identifiers and IP addresses that can be linked to a person, especially once someone fills in a form.
- **Job applications**: CVs, which may include sensitive details.

Each of these is "processing" under the law, and each tool vendor that receives the data is part of your data flow.

## What does UU PDP expect from you?

Without going clause by clause, the obligations that matter most for a website are:

- **A lawful basis.** You need a valid reason to process each kind of data. For marketing and analytics tracking, that is usually consent.
- **Transparency.** People must be told what you collect, why, how long you keep it, who you share it with and how to exercise their rights.
- **Data subject rights.** People can ask to access, correct or delete their data, and withdraw consent. You need a way to receive and handle those requests.
- **Security.** You must protect personal data with appropriate technical and organisational measures.
- **Breach notification.** If personal data is compromised, the law requires prompt written notification to affected people and the authorities within a short, fixed deadline. Your legal adviser should confirm the exact requirements for your case.
- **Vendors and transfers.** When a processor (your CRM, hosting or analytics provider) handles data for you, or data leaves Indonesia, the law sets conditions you need to meet.

The law also provides for administrative sanctions, including fines, and criminal penalties for certain unlawful acts.

## How do you check your website against the law?

Here is the practical checklist we use when reviewing a company site:

| Area | What to check | Typical fix |
|---|---|---|
| Forms | Do you ask only for what you need? Is the purpose stated next to the form? | Remove unnecessary fields; add a short purpose line and a privacy link |
| Tracking | Do analytics and marketing scripts load before anyone agrees? | Add a consent manager that blocks non-essential scripts until opt-in |
| Privacy notice | Is it current, specific and easy to find? Does it list your tools and vendors? | Rewrite in plain language; link it from every form and the footer |
| Rights requests | Can someone easily ask to see or delete their data? | Publish a contact route and an internal procedure with owners |
| Security | HTTPS everywhere, security headers, patched CMS and plugins, strong admin access | Harden hosting, enable MFA, remove unused plugins and accounts |
| Vendors | Which tools receive form data, and where is it stored? | List processors, check their terms, document transfers |
| Breach response | Who decides, who notifies, and how fast? | Write and rehearse a short incident procedure |

{{< callout type="tip" title="Start with the consent banner and the forms" >}}
These two changes are visible to everyone, quick to implement and remove the most common gap we see: tracking scripts firing before a visitor has agreed to anything.
{{< /callout >}}

## What does good consent look like on a website?

A consent banner that respects the law in practice:

- **Blocks non-essential scripts by default.** Analytics and marketing tools load only after the visitor opts in.
- **Makes refusing as easy as accepting.** "Essential only" sits next to "Accept all", not behind a settings screen.
- **Explains each category** in plain language, with a link to the privacy notice.
- **Remembers the choice** and lets visitors change it later, for example through a "Cookie settings" link in the footer.

Essential cookies (the ones the site needs to work, such as remembering the consent choice itself) don't need opt-in, but they should still be described.

## Is the website enough?

No, but it's a sensible first step. The data your website collects flows into a CRM, email inboxes, spreadsheets and sometimes an ERP. A complete readiness programme maps personal data across all of those systems, reviews who can access it, and puts security controls and an incident plan in place. Those are the same foundations any good cybersecurity programme needs.

{{< cta title="Want a second pair of eyes on your website?" text="We'll review your forms, tracking and security headers and send a prioritised list of fixes." >}}

## What's the short version?

If your website collects personal data, UU PDP applies to it. Inventory what you collect, ask for consent before non-essential tracking, publish a clear privacy notice, secure the site, and be ready to respond to incidents. Then have a legal adviser confirm the details.

See how we help companies prepare on our [cybersecurity service](/services/cybersecurity/) page, or read the [UU PDP glossary entry](/insights/glossary/uu-pdp/).
