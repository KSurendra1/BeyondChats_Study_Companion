# BeyondChats Study Companion

A modern web application designed to help students revise their coursebooks and educational materials using AI-powered tools. This project transforms passive reading into an interactive and engaging learning experience.

Live link : https://beyond-chats-study-companion.vercel.app/

## ✨ Core Features

*   **📚 PDF-Based Learning**: Upload your course materials in PDF format and use them as the foundation for your study sessions.
*   **🤖 AI Quiz Generation**: Instantly generate quizzes from your PDF content. Supports multiple question formats to cater to different learning needs:
    *   Multiple Choice Questions (MCQ)
    *   Short Answer Questions (SAQ)
    *   Long Answer Questions (LAQ)
*   **📊 Interactive Dashboard**: Visualize your learning journey. Track your quiz scores over time, identify strengths and weaknesses, and monitor your average performance.
*   **💬 AI Chatbot with Citations**: Ask questions about your study material and get intelligent answers from an AI-powered chatbot. To ensure accuracy and trust, the chatbot cites the specific page number and quotes the relevant text from the source PDF.
*   **🎬 YouTube Video Recommender**: Supplement your reading with visual aids. Get a curated list of educational YouTube videos relevant to the content of your selected PDF.
*   **🔔 Notifications Hub**: Stay updated on your progress with a dedicated notifications center that alerts you about completed quizzes, new activities, and study reminders.
*   **👤 User Profile Section**: A clean, modern sidebar includes a user profile section with options for logging out, creating a personalized experience.

## 🚀 Tech Stack

*   **Frontend**: React, TypeScript, Tailwind CSS
*   **AI Integration**: Designed for Google Gemini API (currently using a mock service for demonstration)
*   **Charting Library**: Recharts for data visualization on the dashboard.

## 📂 Project Structure

The codebase is organized into a clean and maintainable structure:

```
/
├── src/
│   ├── components/      # Reusable React components
│   │   ├── icons/       # SVG icon components
│   │   ├── Chatbot.tsx
│   │   ├── Dashboard.tsx
│   │   ├── NotificationsView.tsx
│   │   ├── PdfViewer.tsx
│   │   ├── QuizEngine.tsx
│   │   ├── Sidebar.tsx
│   │   ├── StudyView.tsx
│   │   └── VideoRecommender.tsx
│   ├── services/
│   │   └── geminiService.ts # Mock API calls to simulate Gemini
│   ├── App.tsx            # Main application component and state management
│   ├── constants.ts       # Initial data and constants
│   ├── index.tsx          # React application entry point
│   └── types.ts           # TypeScript type definitions
├── index.html           # Main HTML file
└── metadata.json        # Application metadata
```

## 🛠️ How It Works

This application is built as a static single-page application (SPA).

1.  **`index.html`**: The main entry point that loads Tailwind CSS and sets up an `importmap` for React and other dependencies from a CDN.
2.  **`index.tsx`**: Mounts the main `App` component to the DOM.
3.  **`App.tsx`**: Manages the application's global state, including the current view (Dashboard, Study, etc.), uploaded PDFs, and quiz history. It acts as the central hub for rendering different views.
4.  **`components/`**: Each feature is encapsulated within its own component, promoting modularity and reusability.
5.  **`services/geminiService.ts`**: This file simulates the backend and AI logic. In a production environment, the functions within this file would make actual API calls to the Google Gemini API to generate quizzes, chatbot responses, and video recommendations based on the PDF content.

## 🔮 Future Enhancements

*   **Full Gemini API Integration**: Replace the mock service with real API calls to Google Gemini for dynamic and context-aware content generation.
*   **User Authentication**: Implement a full login/logout system to allow users to save their progress and materials across devices.
*   **Persistent Storage**: Integrate a database (e.g., Firebase, Supabase) to store user data, uploaded PDFs, and quiz attempt history.
*   **Advanced PDF Interaction**: Add features like highlighting text, adding notes, and searching within the PDF viewer.
*   **Gamification**: Introduce points, badges, and leaderboards to make learning more fun and competitive.
