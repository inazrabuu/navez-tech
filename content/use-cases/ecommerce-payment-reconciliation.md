---
title: Close the books on marketplace sales in days, not weeks
description: An AI agent that matches marketplace, payment gateway and bank payouts to orders, explains every fee and flags missing money for finance to review.
service: agentic-ai
industry: ecommerce
weight: 1
featured: true
problem: |
  An e-commerce brand sells on Shopee, Tokopedia, TikTok Shop, Lazada and its own website. Every channel pays out on its own schedule, net of commissions, shipping subsidies, vouchers and refunds, and reports it in its own format. Payment gateway settlements (virtual accounts, e-wallets, cards) and bank statements add more files.

  The finance team spends the first weeks of every month downloading reports and matching payouts to orders in spreadsheets. Overcharged fees, refunds deducted twice and payouts that never arrive slip through, because nobody has time to check every line.
approach: |
  - Connect an AI agent to each channel's settlement data (marketplace seller centres, payment gateway dashboards and bank statements) through APIs where available and scheduled exports where not.
  - Match every payout line to the order, refund or adjustment it belongs to, and break each payout down into gross sales, commission, payment fees, shipping, vouchers and tax.
  - Check fees against the agreed rates and flag exceptions for a person: missing or partial payouts, unexpected deductions, duplicate refunds and returns that were never credited.
  - Prepare draft journal entries in your accounting system or ERP. A finance staff member reviews and approves them before anything is posted.
  - Log what the agent matched and why, so the finance lead and auditors can trace every number back to its source.
outcome: |
  Reconciliation runs daily instead of as a month-end scramble. Finance reviews exceptions rather than thousands of rows, money owed by marketplaces and gateways gets caught and claimed, and month-end closes faster with an audit trail behind every entry.
faq:
  - q: Does the agent post entries to our books on its own?
    a: No. It prepares and explains each entry, and a person approves it. Later, you can choose to allow automatic posting for low-risk items that match exactly.
  - q: Which marketplaces, gateways and accounting systems can it work with?
    a: The main marketplaces, payment gateways and banks in Indonesia provide settlement reports by API or export, and most accounting systems and ERPs can receive draft entries through an API. We confirm exactly what is possible for your setup in the first phase.
  - q: What access does the agent need to our financial data?
    a: Read-only access to settlement reports and bank statements, and permission to create drafts in the accounting system. Data stays in accounts you control, and every action is logged.
---
