# 📚 AI Note Maker & Quiz Generator

An intelligent full-stack application that transforms your study materials into comprehensive summaries, key points, and interactive quizzes using Google's Gemini AI. Upload PDFs or paste text content to generate AI-powered study aids instantly.

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node](https://img.shields.io/badge/node-v24.10.0-green.svg)
![React](https://img.shields.io/badge/react-19.0.0-61dafb.svg)

## 🌟 Features

- **🤖 AI-Powered Summarization**: Automatically generate concise summaries using Google Gemini AI
- **📝 Key Points Extraction**: Extract the most important points from your study materials
- **❓ Interactive Quiz Generation**: Auto-generate multiple-choice questions with answers
- **📄 PDF Support**: Upload PDF documents and extract text for processing
- **✍️ Text Input**: Paste text content directly for instant analysis
- **🔐 User Authentication**: Secure JWT-based authentication system
- **💾 Note Management**: Save, view, and manage all your processed notes
- **📱 Responsive Design**: Beautiful UI built with React and Tailwind CSS
- **📥 PDF Export**: Download your notes and quizzes as PDF

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite 6** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router v7** - Client-side routing
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **React Icons** - Icon library
- **html2pdf.js** - PDF generation
- **jwt-decode** - JWT token decoder

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **LangChain** - AI/LLM framework
- **Google Generative AI (Gemini)** - AI model for text processing
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **pdf-parse** - PDF text extraction
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Google AI Studio API Key** (for Gemini AI)
- **npm** or **yarn** package manager

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/vanditabyaa09/ai-quiz-generator.git
cd ai-note-maker
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

Add the following environment variables to `backend/.env`:

```env
GEMINI_API_KEY=your_google_gemini_api_key
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
NODE_ENV=development
PORT=5001
JWT_SECRET=your_jwt_secret_key_here
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env file
touch .env
```

Add the following environment variables to `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5001/api
VITE_GOOGLE_API_KEY=your_google_api_key
```

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run start
```

## 📁 Project Structure

```
ai-note-maker/
├── backend/
│   ├── src/
│   │   ├── config.js              # Database configuration
│   │   ├── server.js              # Express app entry point
│   │   ├── controllers/           # Request handlers
│   │   │   ├── authController.js
│   │   │   └── notesController.js
│   │   ├── models/                # MongoDB schemas
│   │   │   ├── User.js
│   │   │   └── Note.js
│   │   ├── routes/                # API routes
│   │   │   ├── authRoutes.js
│   │   │   └── notesRoutes.js
│   │   ├── middleware/            # Custom middleware
│   │   │   └── auth.js
│   │   ├── services/              # Business logic
│   │   │   └── geminiService.js
│   │   └── utils/                 # Utility functions
│   │       └── pdfParser.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx               # App entry point
│   │   ├── App.jsx                # Root component
│   │   ├── components/            # React components
│   │   │   ├── Common/
│   │   │   ├── Layout/
│   │   │   ├── Notes/
│   │   │   └── Routes/
│   │   ├── pages/                 # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── context/               # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── services/              # API services
│   │   │   ├── api.js
│   │   │   └── noteService.js
│   │   └── index.css              # Global styles
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Notes
- `POST /api/notes/upload` - Upload and process document (text or PDF)
- `GET /api/notes` - Get all user notes
- `GET /api/notes/:id` - Get specific note
- `DELETE /api/notes/:id` - Delete note

## 🌐 Deployment

### Deploy Backend on Render

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set the following:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables:
   - `GEMINI_API_KEY`
   - `MONGO_URI`
   - `NODE_ENV=production`
   - `JWT_SECRET`
   - `PORT=5001`

### Deploy Frontend on Vercel

1. Create a new project on [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Set the following:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variables:
   - `VITE_API_BASE_URL=https://your-backend-url.onrender.com/api`
   - `VITE_GOOGLE_API_KEY`

## 🐛 Troubleshooting

### Backend Issues

**ERESOLVE dependency conflict:**
```bash
# The package.json includes overrides for @langchain/core
# If still facing issues, use:
npm install --legacy-peer-deps
```

**MongoDB connection error:**
- Ensure MongoDB is running locally or Atlas URI is correct
- Check if IP is whitelisted in MongoDB Atlas

**Gemini API errors:**
- Verify API key is valid
- Check API quotas and limits

### Frontend Issues

**Port 5173 already in use:**
```bash
# Kill the process using the port
lsof -ti:5173 | xargs kill -9
```

**Environment variables not working:**
- Ensure variables start with `VITE_`
- Restart dev server after adding env vars

## 📄 License

ISC License

## 👤 Author

**Vandita Byadwivedi**
- GitHub: [@vanditabyaa09](https://github.com/vanditabyaa09)

## 🙏 Acknowledgments

- Google Gemini AI for text processing capabilities
- LangChain for LLM framework
- MongoDB for database support
- Vercel & Render for hosting

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.

---

Made by Vanditabyaa Dwivedi
