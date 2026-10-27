// Portfolio AI Chatbot Configuration
// NOTE: To protect credentials and comply with GitHub secret scanning, do not commit secret API keys.
// 1. For local testing: Use the "⚙️ Set API Key" button in the chatbot UI (stored only in browser localStorage).
// 2. For Vercel production: Set GROQ_API_KEY in Vercel Project Settings -> Environment Variables.

const CONFIG = {
  apiKey: "",
  baseUrl: "https://api.groq.com/openai/v1",
  model: "openai/gpt-oss-20b"
};