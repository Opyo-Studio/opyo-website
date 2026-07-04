from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="OPYO Ecosystem API")
api_router = APIRouter(prefix="/api")


# ============ MODELS ============

class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    code: str  # e.g., "OPYO.NEXUS"
    name: str
    tagline: str
    description: str
    category: str  # "OS" | "STUDIO" | "PLATFORM" | "EXPERIMENT"
    status: str  # "LIVE" | "BETA" | "IN_DEV" | "CONCEPT"
    image_url: Optional[str] = None
    order: int = 0


class Person(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    bio: str
    avatar_url: Optional[str] = None
    order: int = 0


class CareerApplication(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    role: str
    portfolio_url: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class CareerApplicationCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    role: str = Field(min_length=2, max_length=120)
    portfolio_url: Optional[str] = Field(default=None, max_length=500)
    message: str = Field(min_length=10, max_length=3000)


# ============ SEED DATA ============

SEED_PROJECTS = [
    {
        "code": "OPYO.ENGINE",
        "name": "OPYO Engine",
        "tagline": "AI streaming infrastructure.",
        "description": "AI streaming infrastructure.",
        "category": "INFRASTRUCTURE",
        "status": "IN_DEV",
        "order": 1,
    },
    {
        "code": "OPYO.COMMUNITY",
        "name": "OPYO Community",
        "tagline": "Community platform for builders, creators, and gamers.",
        "description": "Community platform for builders, creators, and gamers.",
        "category": "PLATFORM",
        "status": "LIVE",
        "order": 2,
    },
    {
        "code": "OPYO.LABS",
        "name": "OPYO Labs",
        "tagline": "Coming soon.",
        "description": "Coming soon.",
        "category": "EXPERIMENT",
        "status": "COMING_SOON",
        "order": 3,
    },
]

SEED_PEOPLE = [
    {"name": "Operator 01", "role": "Co-Founder & CEO", "bio": "System architect. Builds ecosystems from first principles.", "avatar_url": "/operators/ceo.png", "order": 1},
    {"name": "Operator 02", "role": "Co-Founder & CTO", "bio": "Runtime & AI infrastructure. Ex-distributed systems.", "avatar_url": "/operators/cto.png", "order": 2},
    {"name": "Operator 03", "role": "Head of Studio", "bio": "Narrative design. Worlds-first mindset.", "avatar_url": "/operators/studio.png", "order": 3},
]


# ============ ROUTES ============

@api_router.get("/")
async def root():
    return {"service": "OPYO.API", "status": "online", "version": "0.1.0"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()}


@api_router.get("/projects", response_model=List[Project])
async def list_projects():
    docs = await db.projects.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return [Project(**d) for d in docs]


@api_router.get("/people", response_model=List[Person])
async def list_people():
    docs = await db.people.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return [Person(**d) for d in docs]


@api_router.post("/careers/apply", response_model=CareerApplication)
async def submit_application(payload: CareerApplicationCreate):
    app_obj = CareerApplication(**payload.model_dump())
    doc = app_obj.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.career_applications.insert_one(doc)
    return app_obj


@api_router.get("/careers/applications", response_model=List[CareerApplication])
async def list_applications():
    docs = await db.career_applications.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for doc in docs:
        if isinstance(doc.get("created_at"), str):
            doc["created_at"] = datetime.fromisoformat(doc["created_at"])
    return [CareerApplication(**doc) for doc in docs]


# Include the router in the main app
app.include_router(api_router)


app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ============ SEED ON STARTUP ============

@app.on_event("startup")
async def seed_collections():
    try:
        # Upsert projects by `code` so updated seed data is always applied on restart
        for p in SEED_PROJECTS:
            obj = Project(**p).model_dump()
            await db.projects.update_one(
                {"code": obj["code"]},
                {"$set": obj},
                upsert=True,
            )
        # Remove any stale projects whose code is no longer in the seed list
        active_codes = [p["code"] for p in SEED_PROJECTS]
        await db.projects.delete_many({"code": {"$nin": active_codes}})
        logger.info("Projects collection upserted from seed")

        # Upsert people by `name` so updated seed data is always applied on restart
        for p in SEED_PEOPLE:
            obj = Person(**p).model_dump()
            await db.people.update_one(
                {"name": obj["name"]},
                {"$set": obj},
                upsert=True,
            )
        # Remove any stale people whose name is no longer in the seed list
        active_names = [p["name"] for p in SEED_PEOPLE]
        await db.people.delete_many({"name": {"$nin": active_names}})
        logger.info("People collection upserted from seed")
    except Exception as e:
        logger.error(f"Seed error: {e}")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
