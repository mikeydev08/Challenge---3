# CarbonWise AI - Architecture

## System Architecture

CarbonWise AI utilizes a modern, serverless architecture centered around the Google Cloud ecosystem.

```mermaid
graph TD
    Client[Next.js Client-Side App] -->|HTTPS / API Routes| NextServer[Next.js Server / Vercel or Cloud Run]
    Client -->|Client SDK| FirebaseAuth[Firebase Authentication]
    Client -->|Client SDK| Firestore[Firestore Database]
    Client -->|Client SDK| CloudStorage[Cloud Storage]
    
    NextServer -->|Vertex AI SDK| GeminiPro[Gemini 2.5 Pro]
    NextServer -->|Vertex AI SDK| GeminiFlash[Gemini 2.5 Flash]
    NextServer -->|Vertex AI SDK| GeminiVision[Gemini Vision]
    
    NextServer -->|Server SDK| FirestoreDB[Firestore (Admin)]
    
    style GeminiPro fill:#4285f4,stroke:#fff,stroke-width:2px,color:#fff
    style GeminiFlash fill:#4285f4,stroke:#fff,stroke-width:2px,color:#fff
    style GeminiVision fill:#4285f4,stroke:#fff,stroke-width:2px,color:#fff
    style Firestore fill:#f4b400,stroke:#fff,stroke-width:2px,color:#fff
    style FirebaseAuth fill:#f4b400,stroke:#fff,stroke-width:2px,color:#fff
```

## Core Components
1. **Frontend:** Next.js (App Router), TypeScript, Material Design 3.
2. **Backend/Serverless:** Next.js API Routes / Firebase Cloud Functions.
3. **AI Layer:** Vertex AI orchestrating Gemini models (Pro for deep reasoning, Flash for chat, Vision for receipt parsing).
4. **Data Layer:** Firestore for real-time document storage, Cloud Storage for user uploads.

## Clean Architecture Flow
- `src/app`: Next.js page routing and layouts.
- `src/components`: Reusable UI components.
- `src/lib`: Services, utility functions, and Firebase/AI configurations.
- `src/hooks`: Custom React hooks for state management and data fetching.
