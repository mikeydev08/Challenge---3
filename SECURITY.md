# CarbonWise AI Security & Threat Model

## Threat Model

| Threat | Mitigation Strategy | Technology |
|---|---|---|
| **Unauthorized Access** | Strict Authentication via Identity Platform | Firebase Auth |
| **Data Breach / Exposure** | Firestore Security Rules ensuring user data isolation (`isOwner(userId)`) | Firestore Rules |
| **Cross-Site Scripting (XSS)** | React's built-in DOM escaping, strict Content Security Policy (CSP) | Next.js / Headers |
| **Prompt Injection** | LLM input sanitization, strict system prompts, low temperature settings | Vertex AI / Gemini |
| **API Abuse / DoS** | Rate limiting at edge, Firebase App Check | Cloud Armor / App Check |

## Security Best Practices Implemented
1. **OWASP Top 10 Mitigation:** Input validation, context-aware output encoding.
2. **No Hardcoded Secrets:** All API keys and environment variables are injected at runtime via Secret Manager or `.env` files.
3. **Strict Typing:** TypeScript enforces data models, reducing runtime errors.
4. **Least Privilege:** Firestore rules strictly limit what each user can read and write.
