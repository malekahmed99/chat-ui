<div align="center">

# Personalized Chatbot

**Your secure, reliable, and completely private local LLM assistant.**

[![FastAPI](https://img.shields.io/badge/FastAPI-0.111+-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=black)](https://reactjs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

</div>

---

## 🧭 Overview

**Personalized Chatbot** is a modern, privacy-first conversational AI platform. By leveraging powerful local large language models executed entirely on your own hardware, it guarantees that your chats, prompts, and sensitive data never leave your machine. 

It combines a high-performance **FastAPI** asynchronous backend with a sleek, responsive **React + Vite** frontend. The architecture supports full session management, real-time message streaming via Server-Sent Events (SSE), secure JWT authentication, and structured chat feedback mechanisms. It's built for those who want the power of advanced AI without compromising on speed, security, or data ownership.

---

## 📁 Project Structure

```text
Personalized Chatbot/
│
├── backend/                           # FastAPI application and Python backend
│   ├── alembic/                       # Database migration scripts directory
│   ├── core/                          # Application core layer
│   │   ├── __init__.py                
│   │   ├── config.py                  # Pydantic Settings — loads all .env variables
│   │   ├── database.py                # SQLAlchemy engine, session creation, and async config
│   │   ├── dependencies.py            # FastAPI Depends guards: get_current_user, get_db
│   │   ├── security.py                # bcrypt password hashing and JWT token creation/verification
│   │   └── utils.py                   # Shared utility functions and helpers
│   │
│   ├── llm/                           # Artificial Intelligence integration layer
│   │   ├── __init__.py
│   │   ├── client.py                  # Direct interface with the local GGUF model via llama-cpp
│   │   ├── context.py                 # Chat history context window management and truncation
│   │   └── prompt.py                  # Prompt engineering and ChatML template formatting
│   │
│   ├── models/                        # SQLAlchemy ORM — defines the actual database tables
│   │   ├── __init__.py
│   │   ├── feedback.py                # User feedback (thumbs up/down) for AI messages
│   │   ├── file.py                    # Metadata for uploaded files (if applicable)
│   │   ├── message.py                 # Individual chat messages (user and assistant roles)
│   │   ├── session.py                 # Chat sessions (groups messages together)
│   │   └── user.py                    # Registered users and authentication credentials
│   │
│   ├── routers/                       # FastAPI route handler files
│   │   ├── __init__.py
│   │   ├── auth.py                    # POST /auth/register, /auth/login
│   │   ├── internal.py                # Internal admin or health check routes
│   │   ├── messages.py                # POST /messages, handles streaming responses
│   │   └── sessions.py                # CRUD for chat sessions (create, list, delete)
│   │
│   ├── schemas/                       # Pydantic v2 — request/response validation shapes
│   │   ├── __init__.py
│   │   ├── auth.py                    # User validation and JWT token schemas
│   │   ├── enums.py                   # Shared enumerations (e.g., MessageRole)
│   │   ├── feedback.py                # Feedback submission validation
│   │   ├── message.py                 # Message creation and response formatting
│   │   └── session.py                 # Session metadata schemas
│   │
│   ├── alembic.ini                    # Alembic configuration for DB migrations
│   ├── main.py                        # FastAPI app entrypoint — registers routers, CORS, DB
│   └── requirements.txt               # Python dependency list
│
├── frontend/                          # React 18 + Vite web application
│   ├── src/
│   │   ├── components/                # Page-level and reusable React UI components
│   │   │   ├── ChatWindow.jsx         # Main chat interface, displays message history
│   │   │   ├── Login.jsx              # User login form with error handling
│   │   │   ├── MessageBubble.jsx      # Individual chat bubble UI
│   │   │   ├── MessageInput.jsx       # Textarea for typing messages with auto-resize
│   │   │   ├── Register.jsx           # New account registration form
│   │   │   ├── Sidebar.jsx            # Left navigation: past sessions, new chat button, logout
│   │   │   └── TypingIndicator.jsx    # Animated loading dots for AI response generation
│   │   │
│   │   ├── contexts/                  # Global React Context providers
│   │   │   └── AuthContext.jsx        # Manages global user authentication state and tokens
│   │   │
│   │   ├── hooks/                     # Custom React hooks
│   │   │   └── useAuth.js             # Exposes auth state and functions to components
│   │   │
│   │   ├── services/                  # Raw API call wrappers (fetch)
│   │   │   ├── api.js                 # Base API client with JWT interceptors
│   │   │   ├── authService.js         # login(), register(), refresh(), logout()
│   │   │   ├── messageService.js      # streamMessage() via SSE, submitFeedback()
│   │   │   └── sessionService.js      # createSession(), listSessions(), getSession()
│   │   │
│   │   ├── App.css                    # Main stylesheet for layout and UI components
│   │   ├── App.jsx                    # Top-level router — coordinates screens based on auth state
│   │   ├── index.css                  # Global CSS variables, resets, and typography
│   │   └── main.jsx                   # React DOM root mount
│   │
│   ├── index.html                     # Vite HTML entry point
│   ├── package.json                   # npm dependencies & scripts
│   └── vite.config.js                 # Vite config (proxy routing to backend)
│
├── .env.example                       # Template for environment variables
└── README.md                          # Project documentation
```

---

## ⚙️ Installation & Setup

Follow these steps to get the local LLM chatbot up and running on your machine.

### 1. Prerequisites
Ensure you have the following installed on your system before proceeding:
- **Python 3.13+**
- **Node.js 25.2.1+**
- **PostgreSQL** installed and running locally.

### 2. Database Setup
You need to create a dedicated user and database for the application. Open your PostgreSQL terminal (or a GUI tool like pgAdmin) and execute the following SQL commands:

```sql
CREATE USER [your name] WITH PASSWORD '[your password]';
CREATE DATABASE [your database name] OWNER [your name];
```

### 3. Clone the Repository
Clone the project repository to your local machine and navigate into it:

```bash
git clone https://github.com/malekahmed99/personalized-chatbot.git
cd <repository-directory>
```

### 4. Local Model Download
This application requires a local AI model to function.
1. Download the **Qwen `.gguf` model file** and its associated **JSON tokenizer files** from this [Hugging Face repository](https://github.com/Ali-Islam111).
2. You can save these files anywhere on your local machine. 
3. **Important:** Make note of the *absolute paths* to both the `.gguf` file and the folder containing the tokenizer files, as you will need them for the environment configuration.

### 5. Backend Setup
Navigate to the backend directory, set up a Python virtual environment, and install the required dependencies:

```bash
cd backend

# Create the virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 6. Environment Configuration (.env)
While inside the `backend` directory, create your environment variables file by copying the provided example:

```bash
cp .env.example .env
```

> [!CAUTION]
> You **must** open the new `.env` file and replace the placeholder values before running the application. The app will fail to start if these are missing or incorrect.

Specifically, ensure these four variables are updated:
- `DB_URL`: Must match the PostgreSQL credentials created in Step 2. 
  *(Example: `postgresql+asyncpg://[your name]:[your password]@[localhost]:5432/[your database name]`)*
- `MODEL_PATH`: The absolute file path to the `.gguf` model downloaded in Step 4.
- `TOKENIZER_PATH`: The absolute directory path to the folder containing the tokenizer JSON files from Step 4.
- `SECRET_KEY`: Replace the default string with a secure, random cryptographic string.

### 7. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and install the Node modules:

```bash
cd frontend
npm install
```

### 8. Running the Application
To run the application, you will need two separate terminal windows running simultaneously.

**Terminal 1 (Backend):**
Ensure your virtual environment is activated, then start the FastAPI server:
```bash
cd backend
python main.py
```

**Terminal 2 (Frontend):**
Start the Vite development server:
```bash
cd frontend
npm run dev
```
