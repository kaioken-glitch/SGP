# 💰 Smart Goal Planner

A modern React web application for managing and tracking personal savings goals. This project demonstrates core React concepts, persistent CRUD operations, and a clean, responsive UI for a school assignment.

## Preview

![Smart Goal Planner Preview](./Frontend/src/assets/previewimage.png)
- <small>This is a preview of the Smart Goal Planner application Dashboard, showcasing its clean and modern UI.</small>

## Project Description

Smart Goal Planner allows users to:
- Create, edit, and delete multiple savings goals
- Track progress visually for each goal
- Categorize goals (e.g., Travel, Emergency, Electronics, etc.)
- Set deadlines and receive visual warnings for approaching or overdue goals
- View analytics and summary statistics for all goals
- Persist all data using a REST API powered by JSON Server and a `db.json` file

The app is designed to showcase React fundamentals (state, props, effects, forms, API calls) and practical UI/UX for personal finance management.

## Features Implemented

- **Goal Management:** Full CRUD (Create, Read, Update, Delete) for savings goals
- **Progress Tracking:** Visual progress bars and completion status for each goal
- **Category & Deadline:** Assign categories and deadlines, with warnings for deadlines within 30 days or overdue
- **Analytics Dashboard:** Summary of total saved, completed goals, and category breakdown
- **Persistent Storage:** All data is stored in `db.json` and accessed via REST API endpoints
- **Responsive Design:** Mobile-friendly layouts using Tailwind CSS
- **Modern UI:** Clean, neumorphic-inspired components and interactive modals

## Technology Stack

- React 19 (with hooks)
- Vite (build tool)
- Tailwind CSS (styling)
- JSON Server (mock REST API)
- Chart.js (analytics visualization)
- JavaScript (ES6+)

## File Structure

```
Frontend/
├── src/
│   ├── components/
│   │   ├── App.jsx           # Main app logic and state
│   │   ├── Dashboard.jsx     # Overview and statistics
│   │   ├── GoalForm.jsx      # Create/edit goals
│   │   ├── GoalCard.jsx      # Display individual goal
│   │   ├── Analytics.jsx     # Analytics and charts
│   │   └── ProgressBar.jsx   # Visual progress bar
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── db.json                   # Persistent data storage (JSON Server)
├── package.json
├── vite.config.js            # Vite configuration
README.md
```

## Implementation Summary

- **State Management:** Uses `useState` and `useEffect` for managing and fetching goal data.
- **API Integration:** All CRUD operations are performed via fetch requests to `/goals` endpoints provided by JSON Server.
- **Component Design:** UI is broken into reusable components for clarity and maintainability.
- **Data Persistence:** All changes are reflected in `db.json`, ensuring data is not lost on refresh.
- **Analytics:** Real-time calculations and visualizations for user savings progress.
- **Styling:** Tailwind CSS for rapid, responsive, and modern design.

## What Was Built

- A fully functional savings goal planner with persistent backend
- Clean, simple, and responsive UI suitable for a school project
- Demonstration of React best practices and integration with a REST API
- All code and data structures are organized for clarity and easy grading

---

*Built as a demonstration of React fundamentals, CRUD operations, and practical UI/UX for personal finance.*
