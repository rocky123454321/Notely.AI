
# Notely.AI
>>>>>>> e93fadbd90b5cadc64733ad76b3959e78aabdfea

A full-stack note-taking application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring AI-powered chat integration, user authentication, and a responsive UI.

## 🚀 Features

- **User Authentication**: Secure login and signup with JWT tokens
- **Note Management**: Create, read, update, and delete notes
- **AI Chat Integration**: Powered by OpenRouter SDK for intelligent conversations
- **Responsive Design**: Built with Tailwind CSS and DaisyUI for a modern, mobile-friendly interface
- **Rate Limiting**: Implemented with Upstash Redis to prevent abuse
- **Real-time Updates**: Seamless user experience with React Router
- **Secure API**: Protected routes with authentication middleware

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind CSS
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Upstash Redis** - Rate limiting
- **OpenRouter SDK** - AI chat integration

### DevOps
- **Render** - Cloud hosting platform
- **Nodemon** - Development auto-restart
- **ESLint** - Code linting

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance like MongoDB Atlas)
- Git

## 🔧 Installation

1. **Clone the repository**
 ```bash
   git clone https://github.com/rocky123454321/Notely.AI.git
   cd Notely.AI
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install
   cd ..

   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Environment Setup**
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
   OPENROUTER_API_KEY=your_openrouter_api_key
   ```

4. **Build the application**
   ```bash
   npm run build
   ```

## 🚀 Usage

### Development
```bash
# Start backend server
cd backend
npm run dev

# Start frontend (in a new terminal)
cd frontend
npm run dev
```

### Production
```bash
# Start the application
npm start
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Notes
- `GET /api/notes` - Get all user notes
- `POST /api/notes` - Create a new note
- `GET /api/notes/:id` - Get a specific note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

### Chat
- `POST /api/chat` - Send a message to AI chat

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment mode (development/production) | Yes |
| `PORT` | Server port | No (defaults to 3000) |
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL | Yes |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token | Yes |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI chat | Yes |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenRouter](https://openrouter.ai/) for AI chat integration
- [Upstash](https://upstash.com/) for Redis services
- [Render](https://render.com/) for hosting
- [Tailwind CSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/) for styling

---

**Live Demo**: [https://notely-ai.onrender.com](https://notely-ai.onrender.com)
