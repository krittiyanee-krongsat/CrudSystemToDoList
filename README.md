# 📝 MERN Stack To-Do List (CRUD System)

A full-stack To Do List application built with the **MERN Stack** (MongoDB, Express, React, Node.js) featuring full **CRUD** operations and a clean UI powered by **Tailwind CSS**.

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | React (Vite) + Tailwind CSS          |
| Backend    | Node.js + Express.js                 |
| Database   | MongoDB Atlas (via Mongoose)         |
| Others     | CORS, dotenv                         |

---

## 📁 Project Structure

```
CRUDSYSTEM/
├── client/                   # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Create.jsx
│   │   │   └── Task.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── server/                   # Backend (Node.js + Express)
    ├── controllers/
    │   └── posts.js
    ├── models/
    │   └── Post.js
    ├── routes/
    │   └── posts.js
    ├── .gitignore
    └── index.js
```

---

## ✅ Prerequisites

Make sure you have **Node.js** installed on your machine.

```bash
node -v
```

> If Node.js is not installed, download it at: [https://nodejs.org](https://nodejs.org)

---

## 🚀 Getting Started

### 1. Setup Backend (Server)

```bash
# Navigate to the server folder
cd server

# Initialize package.json
npm init -y

# Install dependencies
npm install express mongoose cors dotenv

# Install nodemon for auto-restart
npm install nodemon
```

Edit `package.json` in the `scripts` section:

```json
"scripts": {
  "dev": "nodemon index.js"
}
```

#### 📄 Create `.env` file

```env
MONGO_URI=your_mongodb_connection_string
```

#### 📄 Example `index.js`

```js
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());

mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Connecting to database successfully...'))
    .catch(error => console.log(error.message))

app.listen(PORT, () => {
    console.log('Server is running...')
})
```

#### ▶️ Run the server

```bash
npm run dev
```

---

### 2. Setup MongoDB Atlas

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create an account
2. Create a new **Cluster**
3. Go to **Database Access** → Create a Username and Password
4. Go to **Network Access** → Add IP `0.0.0.0/0` (allow all)
5. Go to **Connect** → Select **Compass** and copy the Connection String
6. Paste the Connection String in `.env` at `MONGO_URI`

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
```

---

### 3. Setup Frontend (Client)

```bash
# Go back to root and create the client folder
cd ..
mkdir client
cd client

# Create React project with Vite
npm create vite@latest . -- --template react

# Install dependencies
npm install

# Install axios for API calls
npm install axios
```

#### 🎨 Install Tailwind CSS

```bash
npm install tailwindcss @tailwindcss/vite
```

Edit `tailwind.config.js`:

```js
import tailwindcss from '@tailwindcss/vite'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add to `src/index.css`:

```css
@import "tailwindcss";
```

#### ▶️ Run the frontend

```bash
npm run dev
```

---

## 🔄 CRUD Operations

| Operation | Method   | Endpoint      | Description              |
|-----------|----------|---------------|--------------------------|
| Read      | GET      | `/posts`      | Get all posts            |
| Create    | POST     | `/posts`      | Create a new post        |
| Update    | PATCH    | `/posts/:id`  | Update a post by ID      |
| Delete    | DELETE   | `/posts/:id`  | Delete a post by ID      |

---

---

## 🌐 Running Both Servers

Open 2 terminal windows:

```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

---

## 📸 Screenshots
<img width="300" height="300" alt="Menu" src="https://github.com/user-attachments/assets/49c19a3d-c480-45fb-882d-fb9edec8a5b7" />
