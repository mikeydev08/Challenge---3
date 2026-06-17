# CarbonWise AI Security & Threat Model

## Threat Model

| Threat | Mitigation Strategy | Implementation |
|---|---|---|
| **API Key Exposure** | Keys stored in environment variables, never committed to source | `.env.local` + `.gitignore` |
| **Cross-Site Scripting (XSS)** | React's built-in DOM escaping, strict Content Security Policy (CSP) | `next.config.mjs` security headers |
| **Clickjacking** | `X-Frame-Options: SAMEORIGIN` header on all routes | `next.config.mjs` |
| **MIME Sniffing** | `X-Content-Type-Options: nosniff` header on all routes | `next.config.mjs` |
| **Prompt Injection** | Strict system prompts with enforced JSON schema, `responseMimeType` locking | `gemini.ts` |
| **Payload Abuse / DoS** | Server-side input length limits (2 000 chars audit, 500 chars chat) | API route handlers |
| **Client-Side Abuse** | Client-side validation mirrors server limits for immediate feedback | `apiClient.ts` |

## Security Best Practices Implemented
1. **OWASP Top 10 Mitigation:** Input validation and context-aware output encoding.
2. **No Hardcoded Secrets:** All API keys injected at runtime via `.env.local` or Vercel Environment Variables.
3. **Strict Typing:** TypeScript with `strict: true` enforces data models, reducing runtime errors.
4. **Sanitised Error Messages:** Server errors are caught and sanitised before being sent to the client.
5. **Security Headers:** CSP, X-XSS-Protection, X-Frame-Options, and X-Content-Type-Options applied globally.
