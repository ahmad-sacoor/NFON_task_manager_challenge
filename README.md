# Task Manager - Coding Challenge

## Overview

This is a simple Task Manager application with a **Go backend** and a **React/TypeScript frontend**. The app allows users to view, add, complete, and delete tasks.

## Your Mission

The backend is fully working and bug-free. The frontend, however, contains **bugs** and some **features** for you to build.

We expect you to use AI tools (ChatGPT, Copilot, Claude, etc.) — that is part of how we work. What we care about is *how* you use them: whether you understand, verify, and take ownership of the code you ship. See the "AI Usage Log" section below.

### Part 1 — Fix the bugs

Find and fix all the bugs in the frontend code. They range from "the app won't even start" to subtle issues you'll only notice by using the app carefully.

### Part 2 — Implement the features

1. **Delete a task.** Wire up the "Delete" button so it actually deletes the task and the list updates.

2. **Edit a task's title.** Add the ability for users to edit the title of an existing task inline.

### Expected behavior when everything works:
- The app loads and displays existing tasks
- Users can add new tasks with a title and optional description
- Users can mark tasks as complete (they appear greyed out with strikethrough)
- Users can delete tasks
- The task list updates immediately after any action

## Getting Started

### Prerequisites
- Go 1.21+ installed
- Node.js 18+ and npm installed

### Running Everything

From the `frontend` directory:

```bash
npm install
npm run dev
```

This starts both the Go backend (port 8080) and the React dev server (port 3000) simultaneously.

### Running Separately

**Backend:**
```bash
cd backend
go run main.go
```

**Frontend:**
```bash
cd frontend
npm start
```

### API Endpoints (for reference)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create a new task |
| PUT | /api/tasks/{id}/complete | Mark a task as complete |
| DELETE | /api/tasks/{id} | Delete a task |

**POST /api/tasks** expects a JSON body:
```json
{
  "title": "Task title",
  "description": "Optional description"
}
```

## AI Usage Log

Create a file named `AI_USAGE.md` in this folder and keep a short running log of how you used AI during the challenge. There are no wrong answers here — we use this to understand how you work, not to penalize AI use. For each notable interaction, jot down:

- **What you asked** (a short summary, not the full transcript)
- **What you did with the answer** — used as-is, adapted it, or rejected it
- **Why** — especially any time you caught the AI being wrong, incomplete, or suggesting something you decided not to trust

A few honest lines per entry is plenty. We're looking for evidence that you understand and own the code you submit, rather than pasting answers you can't explain.

## Time Expectation

This challenge is designed to take approximately **90 minutes**. You're encouraged to use AI tools. Focus on understanding the code, identifying the issues, and implementing clean, well-reasoned solutions. Quality and clear thinking matter more than rushing.

## Tips

- Start by getting the app to compile and run
- Use browser developer tools (Network tab, Console) to debug
- Read error messages carefully
- Compare what the frontend expects vs. what the backend actually returns
- Before implementing a feature, verify that the backend API actually supports it. If it doesn't, document what you found and how you'd proceed — that reasoning is more valuable than forcing a workaround
- You are free to use any tools or resources you normally would during development

## Submission

When you're done:
1. Make sure both backend and frontend run without errors
2. Verify all features work as expected
3. Include your `AI_USAGE.md` log
4. Commit your changes with clear commit messages explaining each fix and feature

Good luck!
