# OPYO Ecosystem

## Prerequisites
- Node.js + Yarn
- Python 3.13+
- MongoDB running locally on port 27017

## Setup

### Backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn server:app --reload

### Frontend
cd frontend
yarn install
cp .env.example .env
yarn start

Frontend runs on http://localhost:3000
Backend runs on http://localhost:8000
