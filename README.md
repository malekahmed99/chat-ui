# Phi-4 Chat - frontend (React + Vite)

UI for Project 2 (Personalized Chatbot with Dynamic Responses), AI & Data Science
Track. This is the **frontend only** - it talks to a separate FastAPI backend that
serves the phi-4 (8B) model.

## Running it locally

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

By default the app runs in **mock mode**: there is no backend yet, but the UI is
fully usable with fake data and a simulated reply, so you can build and demo the
interface independently while the backend is still being built.

## Project structure

```
src/
  main.jsx              entry point
  App.jsx               top-level state: sessions, messages, current chat
  App.css               all styling
  index.css             global reset + CSS variables (colors, fonts, radii)
  api.js                the ONLY file that talks to the backend (mock or real)
  components/
    Sidebar.jsx          chat history list + "New chat" button
    ChatWindow.jsx       header, message list, scroll handling
    MessageBubble.jsx    a single chat message
    MessageInput.jsx     the text box + send button
    TypingIndicator.jsx  animated "..." shown while waiting for a reply
```

`api.js` is the boundary between the UI and the backend. Every component calls
`getSessions()`, `getMessages()`, `createSession()`, and `sendMessage()` - none of
them know whether the data is fake or real.

## Switching from mock to the real FastAPI backend

1. In `src/api.js`, set `const USE_MOCK = false;`
2. Copy `.env.example` to `.env` and set `VITE_API_URL` to wherever FastAPI is
   running (e.g. `http://localhost:8000` locally, or the deployed URL later).
3. Nothing else needs to change in the UI code.

## The API contract to agree on with the backend teammate

This is the shape the React app already expects. Share this with whoever is
building the FastAPI side so the two halves plug together without surprises:

| Method | Path                      | Body                       | Returns                            |
|--------|---------------------------|------------------------------|--------------------------------------|
| GET    | `/sessions`                | -                            | `[{ id, title, updated_at }]`        |
| POST   | `/sessions`                | -                            | `{ id, title, updated_at }`          |
| GET    | `/sessions/{id}/messages`  | -                            | `[{ role: "user" or "bot", text }]`  |
| POST   | `/chat`                    | `{ session_id, message }`   | `{ session_id, response }`           |
| DELETE | `/sessions/{id}`           | -                            | `{ deleted: true }`                  |
| PATCH  | `/sessions/{id}`           | `{ title }`                  | `{ id, title }`                      |

`session_id` is what lets the backend keep multi-turn context per conversation
(Milestone 3 in the project booklet - the chatbot needs to remember earlier turns,
not just the last message).

### CORS reminder for the FastAPI side

The browser will block requests to a different port unless the backend explicitly
allows it. Your teammate will need something like this in the FastAPI app:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # add the deployed frontend URL later too
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Deploying (Milestone 4)

Any static host works since this is a Vite build:

```bash
npm run build
```

This produces a `dist/` folder you can deploy to Vercel or Netlify (drag-and-drop
or connect the repo). Set `VITE_API_URL` as an environment variable on the host to
point at the deployed FastAPI URL.
