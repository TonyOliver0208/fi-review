# 🎬 Fi-Review — MERN Stack Movie Review Platform

**Fi-Review** is a full-stack movie application where users can browse trending films, post reviews, and manage their personal watchlists. Built with the MERN stack (MongoDB, Express, React, Node.js), this project delivers a seamless user experience, modern UI, and secure backend APIs.

---

## 🚀 Tech Stack

### Frontend:

- ⚛️ React 18 + React Router DOM
- 🎨 MUI (Material UI v5) for UI components
- 📦 Redux Toolkit for state management
- 🌐 Axios for API requests
- 🧾 Formik & Yup for form handling & validation
- 📅 Day.js for date formatting
- 🔁 Swiper for interactive carousels
- 🔔 React Toastify for toast notifications

### Backend:

- 🧠 Node.js + Express.js
- 🗃️ MongoDB + Mongoose for data modeling
- 🔐 JWT Authentication (JSON Web Token)
- ✅ Express Validator for input validation
- 🌍 CORS and Cookie-Parser support
- 🔧 dotenv for environment variables
- ♻️ Nodemon for hot-reload during development

---

## 🔐 Features

- 🔑 User Authentication (Register, Login, JWT-protected routes)
- 🎞️ Movie Listings & Detailed Info Pages
- 📝 Review System (Create, Edit, Delete)
- 📱 Fully Responsive Design with MUI
- 🧠 Global State Management via Redux
- 🔔 Real-time Toast Notifications
- 🧼 Clean Codebase with Frontend/Backend Separation

---

## 🛠️ Getting Started

### 📦 Backend Setup

```bash
cd server
npm install
npm start
```

## Create a .env file in /server with:

```bash
TMDB_BASE_URL=your_tmdb_base_url
TMDB_KEY=your_tmdb_api_key
TOKEN_SECRET_KEY=your_jwt_secret_key
MONGODB_URL=your_mongodb_connection_uri
PORT=5050
```

### 💻 Frontend Setup

```
cd client
npm install
npm start
```

## 📂 Project Structure

```bash
fi-review/
├── client/            # React frontend
│   └── src/
├── server/            # Node.js backend
│   └── index.js
├── .env               # Environment config
└── README.md

```
