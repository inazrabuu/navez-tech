---
title: RAG (retrieval-augmented generation)
slug: rag
short_definition: Retrieval-augmented generation adalah teknik di mana sistem AI lebih dulu mencari informasi yang relevan di dokumen atau data milik Anda, lalu memakainya untuk menyusun jawaban, sehingga jawaban bersumber dari data Anda, bukan hanya dari hasil pelatihan model.
related_service: agentic-ai
---

Large language model (LLM) tahu banyak hal tentang dunia, tetapi tidak tahu apa-apa tentang daftar harga, kebijakan atau data pelanggan Anda. RAG menutup celah itu tanpa perlu melatih ulang model.

## Bagaimana cara kerja RAG?

1. **Indeks** dokumen Anda (manual, kebijakan, data produk), biasanya dengan memecahnya menjadi potongan teks dan menyimpannya dalam bentuk yang bisa dicari.
2. **Ambil** potongan yang paling relevan untuk setiap pertanyaan.
3. **Susun** jawaban dari potongan tersebut, idealnya dengan menyebutkan sumber yang dipakai.

## Kapan RAG berguna?

- Help desk internal yang menjawab pertanyaan tentang kebijakan HR atau IT
- Layanan pelanggan yang menjawab pertanyaan produk dan garansi
- Tim sales yang mencari proposal dan dokumen teknis

## Apa yang perlu diwaspadai?

- **Kontrol akses.** Sistem hanya boleh mengambil dokumen yang boleh dilihat oleh pengguna.
- **Konten usang.** Jawaban hanya semutakhir dokumen yang diindeks.
- **Evaluasi.** Uji dengan pertanyaan nyata dan periksa sumber yang dikutip.

RAG sering menjadi salah satu komponen [AI agent](/id/artikel/glosarium/agentic-ai/). Lihat [layanan pengembangan AI agent](/id/layanan/pengembangan-ai-agent/) kami.
