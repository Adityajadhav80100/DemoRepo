# AI-Powered Smart Student Management & Performance Intelligence System

A production-style MERN + AI mini-project that upgrades a traditional Student Management System into an intelligence platform. It provides role-based operations (Admin/Teacher/Student), academic data management, and AI-backed predictions for performance and dropout risk.

## Project Overview
This solution is designed for 3rd-year Computer Engineering mini-project presentations with industry-style structure and modular architecture.

### Key Highlights
- JWT authentication with role-based access control.
- Student CRUD + attendance + marks workflows.
- AI engine with prediction, risk detection, attendance trend analysis, and intervention recommendations.
- Analytics dashboards with Recharts visualizations.
- Seed script for quick demo setup.

## Tech Stack
### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router
- Axios
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Auth

### AI Layer
- Rule-based modular AI engine
- Weighted scoring and decision rules

## Folder Structure
```bash
.
├── backend/
│   ├── ai-engine/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   └── pages/
│   └── vite.config.js
└── .env.example
```

## Features
- **Auth module:** Register/Login for Admin, Teacher, Student roles.
- **Student management:** Complete CRUD for student profiles and metrics.
- **Attendance module:** Daily attendance storage and auto attendance percentage update.
- **Marks module:** Internal marks and assignment tracking with computed aggregates.
- **AI analytics:**
  - Predicted grade and pass probability.
  - Dropout risk level and reason.
  - Attendance trend insights.
  - Personalized recommendations.

## Setup Instructions
### 1) Clone and configure env
```bash
git clone <repo_url>
cd DemoRepo
cp .env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 2) Install dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3) Start backend
```bash
cd backend
npm run dev
```

### 4) Seed demo data
```bash
cd backend
npm run seed
```

### 5) Start frontend
```bash
cd frontend
npm run dev
```

## Demo Accounts (from seed)
- Admin: `admin@college.edu` / `admin123`
- Teacher: `teacher@college.edu` / `teacher123`
- Student: `student@college.edu` / `student123`

## API Endpoints
- `/api/auth`
- `/api/students`
- `/api/attendance`
- `/api/marks`
- `/api/analytics`

## Screenshots
> Add screenshots here after running frontend.

- `![Login](docs/screenshots/login.png)`
- `![Admin Analytics](docs/screenshots/admin-analytics.png)`
- `![Student Analytics](docs/screenshots/student-analytics.png)`

## Notes
- AI logic is intentionally rule-based to keep implementation transparent and demo-friendly.
- Architecture is modular and ready for extension with real ML models in future iterations.
