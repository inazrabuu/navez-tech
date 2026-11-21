---
title: RAG (retrieval-augmented generation)
short_definition: Retrieval-augmented generation is a technique where an AI system first searches your own documents or data for relevant information, then uses it to write an answer, so responses are grounded in your sources rather than only the model's training.
related_service: agentic-ai
---

Large language models know a lot about the world but nothing about your price lists, policies or customer records. RAG closes that gap without retraining the model.

## How does RAG work?

1. **Index** your documents (manuals, policies, product data), usually by splitting them into passages and storing them in a searchable form.
2. **Retrieve** the passages most relevant to each question.
3. **Generate** an answer using those passages, ideally citing which sources were used.

## When is RAG useful?

- Internal help desks answering questions about HR or IT policies
- Customer service answering product and warranty questions
- Sales teams searching proposals and technical documents

## What should you watch out for?

- **Access control.** The system must only retrieve documents the user is allowed to see.
- **Stale content.** Answers are only as current as the indexed documents.
- **Evaluation.** Test with real questions and check the cited sources.

RAG is often one component of an [AI agent](/insights/glossary/agentic-ai/). See our [agentic AI service](/services/agentic-ai/).
