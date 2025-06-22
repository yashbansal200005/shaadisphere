# 💍 Matrimonial Profile Search App (shaadisphere)

A full-stack web application for browsing, bookmarking, and filtering matrimonial profiles. Built with **React**, **Node.js**, **Express**, and **MongoDB**.

---

## 📁 Project Structure

```
/client         👉 Frontend - React + TailwindCSS
/server         👉 Backend - Node.js + Express + MongoDB
```

---

## 🚀 Features

- ✅ User registration and login with JWT authentication
- ✅ Profile creation, update & photo upload
- ✅ Bookmark profiles
- ✅ Send interest to users
- ✅ Filter profiles (age, gender, location, religion, etc.)
- ✅ View detailed public profiles
- ✅ Responsive UI with TailwindCSS

---

## 🛠 Tech Stack

### Frontend
- React
- React Router DOM
- TailwindCSS
- Axios
- Lucide-react icons

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (for image uploads)
- Dotenv

---

## ⚙️ Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/matrimonial-app.git
cd matrimonial-app
```

---

### 2. Backend Setup (`/server`)

```bash
cd server
npm install
```

🔑 Create `.env` file in `/server`:

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/matrimonial
JWT_SECRET=your_jwt_secret
```

▶️ Start Backend Server:

```bash
npm run dev
```

---

### 3. Frontend Setup (`/client`)

```bash
cd ../client
npm install
```

🔑 Create `.env` file in `/client`:

```
VITE_BACKEND_URL=http://localhost:5000
```

▶️ Start Frontend Development Server:

```bash
npm run dev
```

---



## 🧾 API Endpoints

### Authentication

```
POST   /api/auth/register       ➜ Register user
POST   /api/auth/login          ➜ Login and get JWT
```

### Profile

```
POST   /api/profile/save        ➜ Create/Update profile
GET    /api/profile/me          ➜ Get logged-in user's profile
GET    /api/profile/:id         ➜ View public profile
GET    /api/profile/all         ➜ Fetch all profiles
```

### Search & Bookmark

```
GET    /api/search              ➜ Search with filters
POST   /api/bookmark/add/:id    ➜ Bookmark a profile
DELETE /api/bookmark/remove/:id ➜ Remove bookmark
GET    /api/bookmark/my         ➜ View user's bookmarked profiles
```

---



---

## 🔐 Auth Flow

- JWT token is saved in localStorage after login.
- All protected API requests include the token in `Authorization` header.
- Server validates token and provides secure access.

---



---

## 🚀 Deployment link
- https://shaadisphere-pb3d.vercel.app/


