# Dikshant Khanna — Personal Portfolio Website with API-Based Chatbot Integration

[![GitHub](https://img.shields.io/badge/GitHub-DevDKhanna-10b981?style=flat&logo=github)](https://github.com/DevDKhanna)
[![Live Quiz App](https://img.shields.io/badge/Live%20App-Quiz--PE-06b6d4?style=flat&logo=vercel)](https://quiz-pe-main.vercel.app/)
[![Live Reading List](https://img.shields.io/badge/Live%20App-Reading%20List-3b82f6?style=flat&logo=vercel)](https://reading-list-main.vercel.app/)

A personalized, fully responsive portfolio website developed by **Dikshant Khanna** (Roll No: `25BCON0968`) for the **Internal Assessment Project**. The website showcases past GitHub projects, implements interactive real-time search & filter functionality, light/dark mode toggling, a live weather widget, and an AI-powered chatbot grounded in the student's portfolio information.

---

## 👨‍💻 Student Information

- **Full Name:** Dikshant Khanna
- **University Roll Number:** `25BCON0968`
- **Program:** B.Tech in Computer Science & Engineering (Artificial Intelligence & Machine Learning)
- **Primary Email:** [dkshntk@gmail.com](mailto:dkshntk@gmail.com)
- **GitHub Profile:** [https://github.com/DevDKhanna](https://github.com/DevDKhanna)
- **Portfolio Repository:** [https://github.com/DevDKhanna/portfolio-main](https://github.com/DevDKhanna/portfolio-main)

---

## 🛠️ Technologies Used

- **Frontend:** HTML5 (Semantic Structure), Vanilla CSS3 (Custom Cyber Emerald & Cyan Design System, Flexbox, CSS Grid), JavaScript (ES6+)
- **AI & Chatbot:** Groq API (`openai/gpt-oss-20b`), Vercel Serverless Functions (`/api/chat`), Grounded Local Knowledge Engine
- **APIs:** OpenWeatherMap API (Weather Integration)
- **Version Control & Hosting:** Git, GitHub, Vercel

---

## ✨ Implemented Project Tasks

### 1. Personalized Portfolio (Task 1)
- Full name, personal introduction, educational background (B.Tech CSE in AI & ML, Roll No: `25BCON0968`).
- Custom profile photograph ([profile.jpg](./profile.jpg)) and verified contact links (GitHub, Email, Location).
- Modernized Cyber Emerald & Cyan color palette and redesigned component layouts to guarantee non-duplicate presentation.
- Elimination of all placeholders and dummy information.

### 2. Showcase of 5 Required Projects (Task 2)
Displayed as structured, responsive project cards with descriptions, technology badges, working GitHub links, and live application links:

1. **Python Programs Collection (Algorithms & Core Python):**
   - High-performance algorithmic collection comparing recursive paradigms, Memoization (Top-Down DP), Tabulation (Bottom-Up) for O(n) runtime, and custom array multiplication for large factorials.
   - [Fibonacci Repository](https://github.com/DevDKhanna/python-basics-25BCON0968-fibonacci-main)
   - [Factorial Repository](https://github.com/DevDKhanna/pyhton-basics-25BCON0968-factorial-main)
2. **Python Code Quality & Audit System:**
   - Automated code-quality verification and documentation audit evaluating Python codebases against factual implementation claims, eliminating redundant dependencies, and enforcing strict PEP 8 standards.
   - [Python Code Audit & Improvement Repository](https://github.com/DevDKhanna/python-basics-25BCON0968-fibonacci-main)
3. **Bug Fixing Using Cursor AI:**
   - Diagnostic and debugging project correcting an erroneous student grading program. Analyzed multi-layer tracebacks, diagnosed root causes of runtime exceptions and boundary logic errors, and applied verified fixes using Cursor AI.
   - [Bug Fixing Repository](https://github.com/DevDKhanna/correcting-grade-25BCON0968-main)
4. **Interactive Quiz Application (Lecture 10):**
   - Web-based quiz platform with interactive multiple-choice questions, real-time score tracking, timers, and responsive DOM manipulation.
   - [Quiz GitHub Repository](https://github.com/DevDKhanna/QUIZ-PE-main)
   - [Live Quiz Application](https://quiz-pe-main.vercel.app/)
5. **Book Reading List Application (Lecture 11):**
   - Digital bookshelf with status tracking ('Want to Read', 'Currently Reading', 'Completed'), genre filtering, and browser LocalStorage state persistence.
   - [Reading List GitHub Repository](https://github.com/DevDKhanna/reading_list-main)
   - [Live Reading List Application](https://reading-list-main.vercel.app/)

### 3. Interactive Project Search & Category Filter (Task 3 - Mandatory)
- **Real-Time Search:** Visitors can search projects by title, description, or technology (e.g., `"Python"`, `"Quiz"`, `"Book"`, `"Fibonacci"`, `"Algorithms"`).
- **Category Filter Pills:** Quick filters for `All Projects`, `Python`, `Web Apps`, and `AI & Debugging`.
- **Dynamic Count:** Shows exact number of matching projects with clear empty-state feedback.
- **Theme Toggle:** Opens in Dark Mode first by default with seamless switching between Dark Mode and Light Mode, persisted via browser localStorage.

### 4. API-Based Grounded Portfolio Chatbot (Task 6)
- **Grounded Responses:** Answers questions grounded in Dikshant's background, skills, and the 5 completed projects.
- **Example Prompts Supported (Evaluation Rubric Questions):**
  1. *Who are you?*
  2. *What are your skills?*
  3. *What projects have you completed?*
  4. *Explain your Python programs.*
  5. *What was corrected in the buggy code project?*
  6. *How does the reading list work?*
  7. *Where is your GitHub?*
- **Quick-Prompt Chips:** Clickable question chips for instant testing.
- **Dual Connection Architecture:**
  - **Live Groq API (`openai/gpt-oss-20b`):** Configured via `/api/chat` Vercel Serverless Function and client fallback.
  - **In-App Key Configuration:** An optional **"⚙️ Set API Key"** button lets users or examiners enter an API key stored safely in browser `localStorage`.
  - **Grounded Offline Knowledge Engine:** If offline, without an API key, or upon rate-limiting, the chatbot gracefully answers all portfolio questions accurately without failing.

### 5. Atmospheric Weather Widget (Lecture 9 Integration)
- Live city weather lookup using OpenWeatherMap API, displaying temperature, condition, humidity, and wind speed.

---

## 💻 Setup and Local Running Instructions

1. **Clone or Open the repository:**
   ```bash
   git clone https://github.com/DevDKhanna/portfolio-main.git
   cd portfolio-main
   ```

2. **Run locally:**
   - Open `index.html` directly in any web browser, or launch using Python's built-in HTTP server:
     ```bash
     python -m http.server 3000
     ```
   - Visit `http://localhost:3000` in your browser.

3. **Deploy to Vercel (Task 5):**
   ```bash
   vercel
   ```
   Or connect your GitHub repository directly to Vercel for continuous deployment.
