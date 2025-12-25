# Guardia Case Intelligence 🛡️

**Guardia** is an AI-powered enterprise case management platform designed to protect human judgment. It integrates **Google Gemini** directly into the compliance workflow to provide proactive policy retrieval and real-time "mistake stopping" guardrails.

> 🏆 **Hackathon MVP Goal:** Demonstrate how GenAI can move beyond "chatbots" to become an active, enforcement layer in high-stakes enterprise software (similar to Appian or Pega).

---

## 🚀 Key Features

### 1. 🧙‍♂️ The Magic Rule Book (Proactive RAG)
Instead of forcing agents to search through thousands of PDF pages, Guardia scans the current case context (Location, Amount, Risk Score) and proactively retrieves **only the specific policy paragraphs** that apply to the current situation.
*   **Tech:** Uses Gemini 1.5 Flash to analyze case JSON against a vector-simulated Knowledge Base.
*   **UI:** Citations are deep-linked to a simulated PDF viewer.

### 2. 🛑 The Mistake Stopper (Active Compliance)
Guardia doesn't just suggest; it enforces. If an agent tries to **"Approve"** a case that violates a specific company policy (e.g., "Risk Score > 10 cannot be auto-approved"), the AI intercepts the action.
*   **Tech:** Captures the user intent (`Approve`, `Escalate`), sends it to Gemini for validation against active rules, and returns a strict `allowed: boolean` decision.
*   **UX:** A modal blocks the action, explains the violation in natural language, and cites the specific rule ID.

### 3. 🌍 Multi-Jurisdiction Command Center
Simulates a global insurance firm with distinct case queues for:
*   **North America:** High-volume property & auto claims.
*   **EMEA:** Travel & liability regulations (EU 261/2004).
*   **Asia Pacific:** Marine cargo & medical adjudication.

---

## 🛠️ Tech Stack

*   **Frontend:** React 18, TypeScript, Vite
*   **Styling:** Tailwind CSS, Lucide React (Icons)
*   **AI Model:** Google Gemini (`gemini-3-flash-preview`) via `@google/genai` SDK
*   **Fonts:** Inter (Google Fonts)

---

## ⚡ Getting Started

### Prerequisites
*   Node.js (v18+)
*   A Google Cloud Project with the **Gemini API** enabled.
*   An API Key from [Google AI Studio](https://aistudio.google.com/).

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/guardia.git
    cd guardia
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure API Key**
    *   Create a `.env` file in the root directory.
    *   Add your Gemini API Key:
        ```env
        API_KEY=your_google_ai_studio_key_here
        ```

4.  **Run the App**
    ```bash
    npm start
    ```

---

## 🧪 How to Test (Demo Script)

To see the AI features in action, follow this script:

1.  **Login:** Click "Access Workspace" (Any email works).
2.  **Select Region:** Choose **North America**.
3.  **Scenario A: The "Safe" Case**
    *   Select Case **NA-AUTO-101** (Windshield Replacement).
    *   Notice the **Magic Rule Book** shows only "Gadget/Consumer" rules.
    *   Click **Approve**.
    *   *Result:* ✅ Action Allowed.

4.  **Scenario B: The "Violation" Case**
    *   Select Case **NA-COMM-999** (Commercial Fire).
    *   Notice the Risk Score is **92/100** (Critical).
    *   Notice the **Magic Rule Book** surfaces "Global Risk Rule" and "Fire Protocols".
    *   Try to click **Approve**.
    *   *Result:* 🛑 **Mistake Stopper** blocks you. It cites "Risk Score > 10" policy.
    *   Click **Escalate** instead.
    *   *Result:* ✅ Action Allowed.

---

## 📂 Project Structure

```
/src
  ├── components/      # UI Components (MagicRuleBook, MistakeStopper, etc.)
  ├── services/        # Gemini AI integration (geminiService.ts)
  ├── constants.ts     # Mock Data (Cases, Policies, Audit Logs)
  ├── types.ts         # TypeScript Interfaces
  └── App.tsx          # Main Logic & Routing
```

---

## 🔮 Future Roadmap

*   **Real PDF Ingestion:** Replace mock strings with actual RAG implementation using a Vector Database.
*   **Agent Assist Chat:** A sidebar to ask "Why was this claim flagged?"
*   **Live Updates:** Use WebSockets for real-time risk score adjustments.

---
