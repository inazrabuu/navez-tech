---
# Real metrics only. `client` is internal and never shown on the site.
title: One secure ERP from registration to result for a health lab
description: An independent health lab replaced several disconnected tools with one secure ERP, cutting time to result from 2 days to under an hour.
date: 2026-11-19
client: "TODO(content): client legal name (internal only)"
client_display: Independent health laboratory
industry: healthcare
location: Indonesia
services:
  - erp-business-systems
  - cybersecurity
challenge: |
  The lab ran each step of its work in a different tool: one system for patient registration, another for billing and payments, the analysers' own software for test results, and spreadsheets and messaging apps to bridge the gaps. Every order was entered more than once. Staff re-typed patient details at each step, matched payments to tests by hand, and chased results between systems before they could be released.

  The path from registration to test, payment and result was slow and error-prone. Patients and referring doctors waited longer than they should, tests slipped through without being billed, and the lab could not take on more orders without adding more admin staff.

  Patient health data was also spread across systems and shared files with no consistent access control. That is a growing risk under Indonesia's Personal Data Protection Law (UU PDP), which treats health data as specific personal data that needs stronger protection.
solution: |
  **1. Map the real flow.** We followed orders from the front desk to the analysers, the cashier and result release, and documented every hand-off, duplicate entry and delay.

  **2. One system from registration to result.** We implemented an ERP configured around how the lab actually works:

  - Registration creates a single order that every team works from, so patient details are entered once.
  - Payments and billing are linked to each order, including corporate accounts, so no test is run without being billed.
  - Samples are tracked through each stage, and results from the analysers are attached to the order instead of being re-typed.
  - Authorised staff validate results and release them to patients and referring doctors from the same system.
  - Management sees daily volumes, turnaround times and revenue on one dashboard.

  **3. Secure it and prepare for UU PDP.** With all patient health data now in one place, security was part of the build, not an afterthought:

  - Role-based access, so each person sees only what their job needs, with multi-factor sign-in for administrators.
  - Encryption in transit and at rest, plus tested off-site backups.
  - Audit logs of who viewed or changed each patient record.
  - A penetration test before go-live, with every finding fixed and retested.
  - Data mapping, an updated privacy notice, consent records and a breach response plan, prepared with the lab's legal adviser.

  **4. Train and support.** We trained each role on the new workflow, ran the old and new processes side by side during cut-over, and stayed on for support and improvements.
results:
  - metric: "< 1 hr"
    label: To result, down from 2 days
  - metric: "+30%"
    label: More orders per day
  - metric: "< 1 hr"
    label: To accept payment
  - metric: "1"
    label: System, end to end
stack:
  - Odoo ERP
  - Proline
  - Role-based access and multi-factor sign-in
  - Encrypted, off-site backups
  - Penetration test before go-live
testimonial:
  quote: ""
  name: ""
  role: ""
cover: ""
cover_alt: ""
featured: true
weight: 1
---
