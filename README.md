# Kambaa-Mini-Hackathon

# AI Meeting Summarizer

## 📌 Project Overview

The **AI Meeting Summarizer** is a web-based application that allows users to input or upload meeting conversations and get an **AI-generated summary in real-time**. It is built with **Node.js, Express.js, Socket.IO, and AI-based text processing**, focusing on clarity, usability, and real-time collaboration.

---

## 🚀 Features

* Real-time meeting text input with live AI summarization.
* Socket.IO for **low-latency, real-time updates** instead of traditional HTTP requests.
* Clean and responsive UI for easy interaction.
* Summarized output in structured **JSON format** for flexible rendering.
* Sample credentials provided for demo/testing.

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript (Vanilla)
* **Backend:** Node.js, Express.js
* **Real-time Communication:** Socket.IO
* **AI Processing:** `aiProcessor.js` (handles summarization logic)

---

## 📂 Project Structure

```
AI-Meeting-Summarizer/
│
├── public/               # Frontend (HTML, CSS, client-side JS)
│   ├── index.html
│   ├── style.css
│   └── client.js
│
├── server.js             # Main server file (Express + Socket.IO setup)
├── aiProcessor.js        # Handles AI summarization logic
├── package.json          # Dependencies and scripts
└── README.md             # Documentation
```

---

## ⚙️ How It Works

1. **User inputs meeting notes** in the frontend.
2. The text is sent to the backend via **Socket.IO**.
3. `aiProcessor.js` processes the text and generates a **concise summary**.
4. The summary is sent back to the frontend in **real-time**.
5. User can view the summary in a structured, easy-to-read format.

---

## 📖 Installation & Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/ai-meeting-summarizer.git
   cd ai-meeting-summarizer
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Run the server:

   ```bash
   node server.js
   ```
4. Open in browser:

   ```
   http://localhost:3000
   ```

---

## 🔑 Demo Credentials

* **Username:** demo
* **Password:** demo123

---

## 🏗️ System Architecture

```text
 User (Browser) 
      │
      ▼
  Frontend (HTML, CSS, JS)
      │
      ▼
  Express.js + Socket.IO Server (server.js)
      │
      ▼
  AI Processor (aiProcessor.js)
      │
      ▼
  AI Summary Output (JSON → UI)
```

---

## 🛡️ Future Enhancements

* Add user authentication & role-based access.
* Support for voice-to-text transcription.
* Export summaries in PDF/Docx.
* Multi-language summarization support.




