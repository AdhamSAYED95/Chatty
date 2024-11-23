# Chatty 🗨️

Chatty is a real-time chat application designed for seamless communication. It offers private messaging, dynamic chat rooms, and real-time updates, all built with a modern tech stack for optimal performance and security.

---

## 🌟 Features

- **Real-Time Communication**: Powered by **Socket.IO** for instantaneous messaging.
- **Secure Authentication**: Users are authenticated using **JWT** for a secure and smooth login experience.
- **Dynamic Chat Rooms**: Join or create chat rooms for group discussions.
- **User-Friendly Interface**: Built with **React** for a sleek and responsive design.
- **Type Safety**: Developed with **TypeScript** to ensure robust and maintainable code.
- **Scalable Backend**: A Node.js + Express backend supports real-time connections.

---

## 🛠️ Tech Stack

### **Frontend**
- **React** with **Vite**: Fast builds and optimized for modern web apps.
- **TypeScript**: Ensures a robust and error-free codebase.

### **Backend**
- **Node.js**: For scalable and efficient server-side logic.
- **Express**: Lightweight framework for API and middleware handling.

### **Database**
- **MongoDB**: NoSQL database for scalable and efficient data management.

### **Real-Time Communication**
- **Socket.IO**: Enables real-time bidirectional communication.

### **Authentication**
- **JWT**: Secure token-based authentication for user sessions.

---

## 🚀 Getting Started

### **Prerequisites**
- **Node.js** and **npm/yarn** installed.
- **MongoDB** running locally or on a remote server.

### **Installation**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/chatty.git
   cd chatty

2. **Install Dependencies: For both frontend and backend:**:
   ```bash
   npm install

3. **Set Up Environment Variables: Create a .env file in the backend directory with the following variables**:
   ```bash
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   PORT=2000

## Note: Configuring Proxy for Development
Before running the development server, ensure you have configured a proxy in the `vite.config.ts` file to redirect API and WebSocket requests to the backend server. This setup allows seamless communication between the frontend and backend during development.

In the `vite.config.ts` file, the proxy should be configured : 
```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/socket.io": {
        target: "http://localhost:2000", // Backend server address
        changeOrigin: true,
        ws: true, // Enable WebSocket proxying
      },
    },
  },
});


   
4. **Run the Backend**:
   ```bash
   npm run dev
5. **Run the Frontend: Navigate to the frontend directory and start the app**:
   ```bash
   npm run dev

   
