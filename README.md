# 📝 Blog Application (MERN Stack)

A **full-stack blog application** built with **Vite + React (frontend)** and **Express + Node.js (backend)**.  
It uses **MongoDB** for database, **JWT** for authentication, and **Quill Rich Text Editor** for creating blogs.

---

## 🚀 Features
- 🔐 **User Authentication** with JWT (Register / Login / Protected routes)
- ✍️ **Rich Text Editor (Quill)** for creating and editing blogs
- 📰 **CRUD operations** on blog posts
- 💬 **Comment System** (users can add comments under blogs)
- 👥 User-based blog management
- 🗄️ MongoDB Atlas / Local MongoDB integration
- ⚡ Fast frontend development with Vite
- 🌐 RESTful API backend with Express.js

---

## 🛠️ Tech Stack
**Frontend:**
- Vite + React  
- Tailwind CSS (for styling)  
- Axios (API calls)  
- **Quill Rich Text Editor**  

**Backend:**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT (JSON Web Tokens)  

---

## 📂 Project Structure
```
blog-app/
 ├── client/       # Frontend (Vite + React + Quill)
 ├── server/       # Backend (Node.js + Express + MongoDB + JWT)
 ├── README.md
 └── .gitignore
```

---

## ⚙️ Setup & Installation

### 1. Clone repository
```bash
git clone https://github.com/your-username/blog-app.git
cd blog-app
```

### 2. Backend setup
```bash
cd server
npm install
```

Create `.env` inside `server/`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd client
npm install
npm run dev
```

---

## 🌍 API Endpoints

### Auth
- `POST /api/auth/register` → Register new user  
- `POST /api/auth/login` → Login & receive JWT token  

### Blogs
- `GET /api/blogs` → Get all blogs  
- `GET /api/blogs/:id` → Get single blog  
- `POST /api/blogs` → Create new blog (JWT required)  
- `PUT /api/blogs/:id` → Update blog (JWT required)  
- `DELETE /api/blogs/:id` → Delete blog (JWT required)  

### Comments
- `GET /api/blogs/:id/comments` → Get all comments for a blog  
- `POST /api/blogs/:id/comments` → Add a comment (JWT required)  
- `DELETE /api/comments/:id` → Delete comment (JWT required / owner only)  

---

## 🔐 Authentication Flow
1. User registers or logs in.  
2. Backend generates a **JWT token**.  
3. Token is stored in frontend (localStorage / cookies).  
4. Protected API requests require `Authorization: Bearer <token>` header.  

---

## ✨ Rich Text Feature (Quill)
- Blogs can be written with **formatted text** (bold, italic, underline, headings, lists).  
- Supports adding **links, images, and code snippets**.  
- Powered by **[Quill.js](https://quilljs.com/)**.  

---

## 📌 Future Enhancements
- Add categories and tags  
- Blog search and filter  
- User profiles & avatars  
- Dark mode  

---

## 🤝 Contributing
Contributions are welcome! Fork this repo, make changes, and create a pull request.

---

## 📜 License
This project is licensed under the **MIT License**.
