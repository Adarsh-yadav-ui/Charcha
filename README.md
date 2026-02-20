# 🟠 Charcha

> A modern real-time social platform inspired by meaningful conversations.

Charcha is a full-stack social media application inspired by community-driven discussions.  
Built with scalability, real-time updates, and clean architecture in mind.

---

## 🌟 Vision

Charcha aims to create a minimal, fast, and modern platform for sharing thoughts, building discussions, and connecting people — with a subtle Indian identity and clean design philosophy.

---

## ✨ Features

### 📝 Posts

- Create and share posts
- Threaded replies
- Like system
- Real-time feed updates

### 👤 Profiles

- User profiles
- Profile image
- User activity tracking

### 🖼 Media

- Image uploads
- Optimized delivery
- Secure storage handling

### 💬 Direct Messages

- Real-time messaging
- Typing indicators
- Private conversations
- Auto reconnect

### 🔔 Notifications (Planned)

- Like notifications
- Reply notifications
- Mention alerts

---

## 🏗 Architecture Overview

```
Next.js (Frontend)
│
├── Convex → Database + Real-time backend
├── EdgeStore → Media storage
└── Socket.IO → Direct messaging system
```

This architecture ensures:

- Clean separation of concerns
- Real-time responsiveness
- Scalable backend logic
- Modern development workflow

---

## 🛠 Tech Stack

| Layer               | Technology           |
| ------------------- | -------------------- |
| Frontend            | Next.js (App Router) |
| Styling             | Tailwind CSS         |
| Backend             | Convex               |
| Storage             | EdgeStore            |
| Real-time Messaging | Socket.IO            |

---

## 📂 Project Structure

```
charcha/
├── app/                # Routes and pages
├── components/         # Reusable UI components
├── convex/             # Backend functions & schema
├── lib/                # Utilities and helpers
├── public/             # Static assets
├── styles/             # Global styles
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/charcha.git
cd charcha
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env.local` file:

```
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

EDGE_STORE_ACCESS_KEY=

SOCKET_SERVER_URL=
```

### 4️⃣ Run Development Server

```bash
npm run dev
```

Open:  
http://localhost:3000

---

## 🚀 Development Phases

### Phase 1

- Authentication
- Post creation
- Feed system
- Profile pages

### Phase 2

- Image upload integration
- UI refinements
- Performance improvements

### Phase 3

- Real-time Direct Messages
- Notifications
- Production deployment

---

## 🎯 Learning Goals

This project focuses on:

- Real-time system design
- Clean full-stack architecture
- Scalable database modeling
- File upload pipelines
- Production-ready frontend structure

---

## 🔮 Future Improvements

- Post editing
- Hashtag system
- Advanced search
- Mobile optimization
- Progressive Web App (PWA)
- Content moderation tools

---

## 📜 License

MIT License

---

## 👨‍💻 Author

Built with passion and curiosity by a young developer exploring modern full-stack engineering.
