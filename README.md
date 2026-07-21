Johnny's Restaurant

A full-stack restaurant reservation and management system for Al Noor Restaurant, Dubai, UAE.

Tech Stack
Backend: Django, Django REST Framework, django-cors-headers
Frontend: React (Vite), Axios
Database: PostgreSQL (production) / SQLite (local dev)
Auth: Django session authentication with CSRF protection
Features
Customer reservation booking with real-time table availability
Automatic table status updates (available → reserved → available)
Admin dashboard: manage reservations, tables, and menu
Role-based access (customer / staff / admin)
Project Structure
backend/    # Django project (api app, settings, views, models)
frontend/   # React + Vite app
Getting Started
Backend Setup
Navigate to the backend folder and create a virtual environment:
bash
   cd backend
   python -m venv venv
   venv\Scripts\activate      # Windows
   source venv/bin/activate   # macOS/Linux
Install dependencies:
bash
   pip install -r requirements.txt
Create a .env file (or set these as environment variables):
   SECRET_KEY=your-secret-key-here
   DJANGO_ENV=development

Leave DATABASE_URL unset locally — the project falls back to SQLite automatically.

Run migrations:
bash
   python manage.py migrate
Start the backend server:
bash
   python manage.py runserver

Backend runs at http://localhost:8000.

Frontend Setup
Navigate to the frontend folder:
bash
   cd frontend
   npm install
Create a .env file:
   VITE_API_URL=http://localhost:8000/api
Start the dev server:
bash
   npm run dev

Frontend runs at http://localhost:5173.
