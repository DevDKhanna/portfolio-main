// Portfolio AI Assistant - Grounded Chatbot with Groq API & Offline Fallback Engine
// Personalized for Dikshant Khanna (Roll No: 25BCON0968)

const chatInput = document.getElementById("userInput");
const chatButton = document.getElementById("sendButton");
const chatMessages = document.getElementById("chatMessages");
const chatStatus = document.getElementById("chatStatus");
const apiKeyBtn = document.getElementById("apiKeyModalBtn");

// Portfolio Grounding Knowledge Base
const PORTFOLIO_DATA = {
  name: "Dikshant Khanna",
  role: "AI & Machine Learning Undergraduate (Roll No: 25BCON0968)",
  about: "Undergraduate Computer Science and Engineering student at Jaipur, India, specializing in Artificial Intelligence and Machine Learning, with a strong focus on algorithmic efficiency, Python automation, and modern web applications.",
  email: "dkshntk@gmail.com",
  github: "https://github.com/DevDKhanna",
  livePortfolio: "https://portfolio-main-two.vercel.app/",
  skills: [
    "Python 3", "C++", "C", "JavaScript (ES6+)", "Machine Learning",
    "Data Structures & Algorithms (DSA)", "Dynamic Programming",
    "HTML5", "CSS3", "Git & GitHub", "Vercel Deployment", "RESTful APIs", "Cursor AI"
  ],
  projects: [
    {
      title: "Python Programs Collection",
      summary: "High-performance algorithmic collection comparing recursive paradigms, Memoization (Top-Down DP), Tabulation (Bottom-Up) for O(n) Fibonacci sequence calculation, and Factorial Large Number Analyzer handling extreme integer scaling without standard library overflow.",
      github: "https://github.com/DevDKhanna/python-basics-25BCON0968-fibonacci-main",
      links: [
        { name: "Fibonacci Repo", url: "https://github.com/DevDKhanna/python-basics-25BCON0968-fibonacci-main" },
        { name: "Factorial Repo", url: "https://github.com/DevDKhanna/pyhton-basics-25BCON0968-factorial-main" }
      ],
      tech: "Python 3, Dynamic Programming, Memoization, Tabulation, Algorithms"
    },
    {
      title: "Python Code Quality & Audit",
      summary: "Automated verification and documentation audit evaluating Python codebases against factual implementation claims, eliminating redundant dependencies, enforcing strict PEP 8 formatting, and ensuring clean logic.",
      github: "https://github.com/DevDKhanna/python-basics-25BCON0968-fibonacci-main",
      tech: "Python, Code Audit, PEP 8, Static Verification, Refactoring"
    },
    {
      title: "Bug Fixing Using Cursor AI",
      summary: "Diagnostic and debugging project correcting an erroneous student grading program. Analyzed multi-layer tracebacks, diagnosed root causes of runtime exceptions and boundary logic errors, and implemented verified fixes using Cursor AI.",
      github: "https://github.com/DevDKhanna/correcting-grade-25BCON0968-main",
      tech: "Python, Debugging, Cursor AI, Traceback Analysis, Unit Testing"
    },
    {
      title: "Interactive Quiz Application",
      summary: "Engaging web-based quiz platform constructed in Lecture 10. Delivers interactive multiple-choice question sessions, immediate scoring feedback, timer mechanics, and clean responsive layout.",
      github: "https://github.com/DevDKhanna/QUIZ-PE-main",
      live: "https://quiz-pe-main.vercel.app/",
      tech: "HTML5, CSS3, JavaScript (ES6), DOM Manipulation, Vercel"
    },
    {
      title: "Book Reading List Application",
      summary: "Digital bookshelf and personal reading tracker engineered in Lecture 11. Enables users to catalog books, track progression ('Want to Read', 'Currently Reading', 'Completed'), filter by genre, and persist entries in LocalStorage.",
      github: "https://github.com/DevDKhanna/reading_list-main",
      live: "https://reading-list-main.vercel.app/",
      tech: "HTML5, CSS3, JavaScript, LocalStorage, Vercel"
    }
  ]
};

// Grounded System Prompt for Groq API
const SYSTEM_PROMPT = `You are the AI Assistant for Dikshant Khanna's personal portfolio website.
Answer questions accurately, professionally, and concisely (under 75 words) grounded ONLY in the following student portfolio details:

- Student: ${PORTFOLIO_DATA.name} (${PORTFOLIO_DATA.role})
- Location: Jaipur, Rajasthan, India
- Email: ${PORTFOLIO_DATA.email}
- GitHub: ${PORTFOLIO_DATA.github}
- Skills: ${PORTFOLIO_DATA.skills.join(", ")}
- Projects Completed (Internal Assessment Showcase):
  1. Python Programs Collection (Fibonacci DP Optimizer & Factorial Large Number Analyzer).
  2. Python Code Quality & Audit (Code quality verification and PEP 8 standards).
  3. Bug Fixing Using Cursor AI (Diagnosing & resolving student grading script tracebacks).
  4. Interactive Quiz Application (Lecture 10 web quiz, live at https://quiz-pe-main.vercel.app/).
  5. Book Reading List Application (Lecture 11 digital library, live at https://reading-list-main.vercel.app/).
- Weather App: OpenWeatherMap integration from Lecture 9.

Always provide accurate, grounded answers for these core evaluation questions:
1. Who are you? -> Introduce Dikshant Khanna, AI/ML student at Jaipur (Roll No: 25BCON0968).
2. What are your skills? -> List Python, C++, C, JavaScript, Machine Learning, DSA, Web Dev, Git, Vercel, Cursor AI.
3. What projects have you completed? -> List the 5 completed coursework projects.
4. Explain your Python programs. -> Detail the Fibonacci DP memoization/tabulation and Factorial large integer calculations.
5. What was corrected in the buggy code project? -> Detail fixing syntax, index errors, and grading logic flaws using Cursor AI.
6. How does the reading list work? -> Explain cataloging books, tracking reading states, and LocalStorage persistence.
7. Where is your GitHub? -> Provide ${PORTFOLIO_DATA.github}.

If asked about unrelated topics, politely guide the user back to Dikshant's portfolio, skills, or projects.`;

// Retrieve active API Key from localStorage or config
function getActiveApiKey() {
  const localKey = localStorage.getItem("groq_api_key");
  if (localKey && localKey.trim()) return localKey.trim();
  if (typeof CONFIG !== "undefined" && CONFIG.apiKey && CONFIG.apiKey !== "YOUR_PRIVATE_GROQ_KEY") {
    return CONFIG.apiKey.trim();
  }
  return "";
}

// Display chat message in UI
function showChatMessage(role, text, tag = "") {
  const message = document.createElement("div");
  message.className = "chat-message " + (role === "user" ? "chat-user" : "chat-assistant");

  if (tag && role === "assistant") {
    const badge = document.createElement("span");
    badge.className = "chat-badge";
    badge.textContent = tag;
    message.appendChild(badge);
  }

  const content = document.createElement("div");
  content.className = "chat-text";
  content.innerHTML = text.replace(/\n/g, "<br>");
  message.appendChild(content);

  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Grounded Rule-Based Engine (Guarantees accurate answers even without API key or when offline)
function getGroundedFallbackResponse(query) {
  const q = query.toLowerCase();

  if (q.includes("who are you") || q.includes("who is dikshant") || q.includes("introduce") || q.includes("about you")) {
    return `Hello! I am the portfolio assistant for <strong>Dikshant Khanna</strong>, an undergraduate Computer Science student in Jaipur, India, specializing in AI & Machine Learning (Roll No: 25BCON0968). Dikshant focuses on building algorithmic Python systems, debugging complex tracebacks, and developing interactive web applications.`;
  }

  if (q.includes("skill") || q.includes("tech stack") || q.includes("technologies") || q.includes("languages")) {
    return `Dikshant's core competencies include:
    <br>• <strong>Languages:</strong> Python 3, C++, C, JavaScript (ES6+)
    <br>• <strong>AI & Algorithms:</strong> Machine Learning, Data Structures & Algorithms (DSA), Dynamic Programming
    <br>• <strong>Web & Tooling:</strong> HTML5, CSS3, Git & GitHub, Vercel Deployment, REST APIs, Cursor AI.`;
  }

  if (q.includes("what projects") || q.includes("projects have you completed") || q.includes("list projects") || q.includes("show projects")) {
    return `Dikshant has completed five core evaluated projects:
    <br>1. <strong>Python Programs Collection</strong> (Fibonacci & Factorial DP optimizers)
    <br>2. <strong>Python Code Quality & Audit</strong> (Code audit & PEP 8 refactoring)
    <br>3. <strong>Bug Fixing Using Cursor AI</strong> (Grading script diagnosis & resolution)
    <br>4. <strong>Interactive Quiz Application</strong> (Lecture 10 web app, live on Vercel)
    <br>5. <strong>Book Reading List Application</strong> (Lecture 11 library manager, live on Vercel).`;
  }

  if (q.includes("python program") || q.includes("fibonacci") || q.includes("factorial")) {
    return `Dikshant's <strong>Python Programs Collection</strong> includes:
    <br>• <strong>Fibonacci Optimizer:</strong> Compares Top-Down Memoization DP and Bottom-Up Tabulation to achieve O(n) runtime complexity.
    <br>• <strong>Factorial Analyzer:</strong> Calculates extreme factorials and integer scaling using iterative multiplication to avoid standard library overflow.`;
  }

  if (q.includes("bug") || q.includes("correcting") || q.includes("cursor") || q.includes("grade")) {
    return `In the <strong>Bug Fixing Using Cursor AI</strong> project, Dikshant diagnosed an erroneous student grading program suffering from runtime syntax errors and boundary logic issues. Using Cursor AI's traceback diagnostics, the root bugs were identified and fixed with unit test assertions.`;
  }

  if (q.includes("reading list") || q.includes("book") || q.includes("library")) {
    return `The <strong>Book Reading List Application</strong> (Lecture 11) is a digital bookshelf where users can catalog books, track status ('Want to Read', 'Currently Reading', 'Completed'), filter by genre, and persist entries in browser LocalStorage. Try it live at <a href="https://reading-list-main.vercel.app/" target="_blank">reading-list-main.vercel.app</a>.`;
  }

  if (q.includes("quiz")) {
    return `The <strong>Interactive Quiz Application</strong> (Lecture 10) is a web platform featuring timed multiple-choice questions, real-time score calculation, and dynamic DOM manipulation. You can test it live at <a href="https://quiz-pe-main.vercel.app/" target="_blank">quiz-pe-main.vercel.app</a>.`;
  }

  if (q.includes("audit") || q.includes("quality") || q.includes("pep8") || q.includes("refactor")) {
    return `The <strong>Python Code Quality & Audit</strong> project systematically verifies program implementations against factual README documentation, eliminates unused dependencies, and enforces strict PEP 8 formatting standards.`;
  }

  if (q.includes("github") || q.includes("repo") || q.includes("code")) {
    return `You can explore Dikshant's projects on GitHub at: <a href="https://github.com/DevDKhanna" target="_blank">github.com/DevDKhanna</a>.`;
  }

  if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("reach")) {
    return `You can contact Dikshant directly via email at <a href="mailto:dkshntk@gmail.com">dkshntk@gmail.com</a> or visit his profile on <a href="https://github.com/DevDKhanna" target="_blank">GitHub</a>.`;
  }

  if (q.includes("weather")) {
    return `The portfolio features a live <strong>Weather Widget</strong> (from Lecture 9) that fetches live worldwide city temperatures and atmospheric conditions using the OpenWeatherMap API.`;
  }

  // Default response
  return `I am Dikshant Khanna's AI portfolio assistant. I can answer questions about Dikshant's academic background, technical skills in Python, AI & Web development, his 5 coursework projects (Fibonacci, Factorial, Bug Fixing, Quiz App, Reading List), and his GitHub repositories.`;
}

// Send chat message
async function sendChatMessage(customText = null) {
  const question = typeof customText === "string" ? customText.trim() : chatInput.value.trim();
  if (!question) return;

  showChatMessage("user", question);
  chatInput.value = "";
  chatButton.disabled = true;
  chatStatus.textContent = "AI is thinking...";

  const apiKey = getActiveApiKey();
  let answered = false;

  // 1. Try Vercel Serverless Function first (if deployed on Vercel)
  if (window.location.protocol.startsWith("http")) {
    try {
      const vercelRes = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: question }
          ],
          apiKey: apiKey || undefined,
          model: (typeof CONFIG !== "undefined" && CONFIG.model) ? CONFIG.model : "openai/gpt-oss-20b"
        })
      });

      if (vercelRes.ok) {
        const data = await vercelRes.json();
        const reply = data.choices?.[0]?.message?.content;
        if (reply && reply.trim()) {
          showChatMessage("assistant", reply, "Live Groq AI");
          answered = true;
        }
      }
    } catch (e) {
      // Vercel serverless not reachable
    }
  }

  // 2. Try direct Groq API call if API key exists and not yet answered
  if (!answered && apiKey) {
    try {
      const model = (typeof CONFIG !== "undefined" && CONFIG.model) ? CONFIG.model : "openai/gpt-oss-20b";
      const baseUrl = (typeof CONFIG !== "undefined" && CONFIG.baseUrl) ? CONFIG.baseUrl : "https://api.groq.com/openai/v1";

      const response = await fetch(baseUrl.replace(/\/$/, "") + "/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey
        },
        body: JSON.stringify({
          model: model,
          temperature: 0.7,
          max_tokens: 250,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: question }
          ]
        })
      });

      if (response.status === 429) {
        throw new Error("RATE_LIMIT");
      }

      if (response.status === 401) {
        throw new Error("INVALID_KEY");
      }

      if (!response.ok) {
        throw new Error("API_ERROR_" + response.status);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content;

      if (reply && reply.trim()) {
        showChatMessage("assistant", reply, "Groq AI (" + model + ")");
        answered = true;
      }
    } catch (err) {
      console.warn("Direct Groq API notice:", err.message);
      if (err.message === "RATE_LIMIT") {
        chatStatus.textContent = "Rate limit reached. Answering from local portfolio knowledge base...";
      } else if (err.message === "INVALID_KEY") {
        chatStatus.textContent = "Provided API key is invalid/revoked. Answering from grounded portfolio knowledge base...";
      }
    }
  }

  // 3. Grounded Fallback Engine
  if (!answered) {
    const groundedAnswer = getGroundedFallbackResponse(question);
    const tag = apiKey ? "Grounded Knowledge" : "Portfolio Knowledge Engine";
    showChatMessage("assistant", groundedAnswer, tag);
  }

  chatButton.disabled = false;
  chatStatus.textContent = "";
}

// Handle question chips
document.querySelectorAll(".question-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const prompt = chip.getAttribute("data-prompt") || chip.textContent;
    sendChatMessage(prompt);
  });
});

// Configure API Key Modal / LocalStorage
if (apiKeyBtn) {
  apiKeyBtn.addEventListener("click", () => {
    const existingKey = localStorage.getItem("groq_api_key") || "";
    const newKey = prompt(
      "Enter your Groq API Key (gsk_...) for live AI responses.\n" +
      "This is stored ONLY in your browser localStorage and never pushed to GitHub.\n" +
      "Leave blank to use the offline Portfolio Knowledge Engine.",
      existingKey
    );

    if (newKey !== null) {
      if (newKey.trim()) {
        localStorage.setItem("groq_api_key", newKey.trim());
        alert("Groq API Key saved successfully in local storage! The chatbot will now use live Groq AI.");
      } else {
        localStorage.removeItem("groq_api_key");
        alert("API key removed. Chatbot will use the grounded Portfolio Knowledge Engine.");
      }
    }
  });
}

// Clear Chat functionality
const clearChatBtn = document.getElementById("clearChatBtn");
if (clearChatBtn) {
  clearChatBtn.addEventListener("click", () => {
    chatMessages.innerHTML = "";
    showChatMessage(
      "assistant",
      "Hello! I am Dikshant Khanna's AI assistant. Ask me anything about Dikshant's skills, his 5 projects, or his GitHub repositories!"
    );
  });
}

// Event Listeners
chatButton.addEventListener("click", () => sendChatMessage());
chatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    sendChatMessage();
  }
});

// Initialize greeting on load
window.addEventListener("DOMContentLoaded", () => {
  if (chatMessages && chatMessages.children.length === 0) {
    showChatMessage(
      "assistant",
      "Hello! I am <strong>Dikshant Khanna</strong>'s AI Portfolio Assistant. You can ask me questions such as: <em>'Who are you?'</em>, <em>'What are your skills?'</em>, <em>'What projects have you completed?'</em>, or <em>'Where is your GitHub?'</em>."
    );
  }
});