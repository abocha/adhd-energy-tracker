# ADHD Energy Tracker

A full-stack self-tracking prototype for logging daily energy, focus, task initiation, restlessness, time perception, and related patterns, then reviewing them over time in a simple dashboard.

The project pairs a Django REST API with a React client. It was built as an experiment in turning subjective daily check-ins into structured data that can be reviewed instead of disappearing into notes.

## What it does

- stores one structured daily energy/focus log per user;
- tracks additional signals such as mental clarity, task initiation/completion, procrastination, sensory state, emotional regulation, and sudden energy shifts;
- supports free-form notes alongside categorical check-ins;
- shows recent logs and energy/focus trends with Chart.js;
- exposes authenticated REST endpoints for logs, focus sessions, breaks, and summary statistics;
- uses JWT authentication between the React frontend and Django API.

## Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, Vite, Tailwind CSS, React Router |
| Charts | Chart.js + react-chartjs-2 |
| Backend | Django, Django REST Framework |
| Auth | djangorestframework-simplejwt |
| Storage | SQLite for local development |
| Packaging | Dockerfiles + Docker Compose configuration |

## Architecture

```text
React / Vite frontend
        |
        | JWT-authenticated HTTP
        v
Django REST Framework
        |
        +--> daily energy logs
        +--> focus sessions
        +--> break logs
        +--> aggregate stats
        |
        v
      SQLite
```

The API owns persistence and per-user data isolation. The frontend is a separate client that authenticates with JWT access/refresh tokens and renders logging and dashboard views.

## Local development

### 1. Backend

Requirements: Python 3.11+.

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment, then:

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

For local frontend development, run Django with `DEBUG=True` in the environment so the development CORS policy accepts the Vite origin.

The API is served at `http://localhost:8000`.

### 2. Frontend

Requirements: Node.js 18+.

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

On PowerShell, use `Copy-Item .env.example .env` instead of `cp`.

The default environment points the client at `http://localhost:8000`.

## API outline

The backend exposes:

- `POST /api/token/` and `POST /api/token/refresh/` for JWT auth;
- `/api/logs/` for daily energy logs;
- `/api/focus-sessions/` for focus sessions;
- `/api/break-logs/` for session breaks;
- `GET /api/stats/` for dashboard statistics.

## Project status

This is a prototype rather than a production health product. The repository is useful as a compact example of a separated React/Django application, JWT-protected REST APIs, structured domain modelling, and basic longitudinal visualization.

It is not intended to provide diagnosis or medical advice.
