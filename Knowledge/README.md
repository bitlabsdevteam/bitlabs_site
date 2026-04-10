# Knowledge Pack

This folder contains RAG-ready knowledge assets for BitLabs.

## Files

- `bitlabs-rag-knowledge.md`: primary English canonical knowledge file
- `bitlabs-rag-knowledge-ja.md`: Japanese canonical knowledge file
- `faq.md`: short Q&A-oriented retrieval file

## Chunked Pack

The `chunked/` directory splits the same knowledge into smaller topical files for better retrieval precision in systems that perform better with shorter documents.

Suggested use:

- Use the full canonical files when your RAG supports large-context retrieval or document-level grounding.
- Use the `chunked/` files when your RAG works best with short semantic units and fine-grained chunk ranking.

## Safety

These files are written to avoid unsupported claims, confidential disclosures, or fabricated client information.
