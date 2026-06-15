# CarbonWise AI 🌱

**CarbonWise AI** is an advanced, production-ready enterprise sustainability platform powered by Google Gemini. Designed with a sleek, human-centered "Bento Box" SaaS aesthetic, it helps individuals and organizations calculate, predict, and optimize their carbon footprint through multimodal AI and conversational intelligence.

## 🌟 Vertical: Environmental Sustainability & Tech
Empowering users with intelligent insights to demystify complex emission data and provide actionable, context-aware strategies for footprint reduction.

## 🚀 Live Demo
**URL:** [https://challenge-3-lime.vercel.app/](https://challenge-3-lime.vercel.app/)

---

## 🧠 Approach & Logic

### 1. Dual-Model AI Strategy (Precision vs. Speed)
The application leverages the `@google/genai` SDK using a dual-model approach optimized for distinct user flows:
- **Tier 1: Audit Engine (Precision):** Utilizes `gemini-2.5-pro` for deep, complex reasoning when processing the user's raw operational data (commute, diet, energy grid) into structured JSON containing exact CO2e estimates and optimization strategies.
- **Tier 2: Conversational Coach (Speed):** Utilizes `gemini-2.5-flash` for the Dashboard's chat widget, ensuring lightning-fast, highly responsive interactive guidance without latency.

### 2. Enterprise SaaS UI Architecture
The UI completely pivots away from generic "AI-generated" tropes (overused emojis, mesh gradients) in favor of a bespoke, developer-centric SaaS aesthetic.
- **Bento-Box Analytics:** The dashboard utilizes an asymmetrical CSS Grid to densely pack high-contrast data cards, mimicking professional tools like Linear or Stripe.
- **Persistent App Shell:** Features a unified global navigation state built within the Next.js `layout.tsx` for seamless routing.

### 3. Actionable Intelligence
CarbonWise doesn't just display numbers; it drives behavioral change. The AI explicitly generates highly tailored goals (e.g., "Use public transit today to save 12kg CO2e") and maps them to an interactive checklist on the user's dashboard.

---

## 🛠️ How the Solution Works

### Frontend Architecture
- **Next.js 14 (App Router):** Utilized for server-side rendering, robust API routes, and optimized client delivery.
- **CSS Modules:** Pure vanilla CSS ensuring maximum flexibility, utilizing CSS variables for a strict, high-contrast Dark SaaS theme.
- **Accessibility & UX:** Deep focus on semantic HTML and fluid micro-interactions (transforms, subtle glowing borders).

### Backend & AI Architecture
- **Serverless API Routes:** Located in `/app/api/audit` and `/app/api/coach` to securely broker requests between the client and Google's infrastructure.
- **Google GenAI Integration:** Handles multimodal prompt parsing and strictly enforces structured JSON outputs for the frontend to render dynamically.

### Deployment Infrastructure
- **Vercel Edge Network:** The entire application (both the React frontend and the Next.js Node serverless functions) is deployed to Vercel, ensuring zero-configuration global distribution.

---

## 💻 Local Setup Instructions

1. **Clone the repository.**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure the Environment:**
   Create a `.env.local` file in the root directory and add your Google Gemini API key:
   ```env
   GEMINI_API_KEY="your_api_key_here"
   ```
4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
5. **Open** [http://localhost:3000](http://localhost:3000) in your browser.
