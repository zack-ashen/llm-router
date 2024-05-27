import os
import time

from db import database
from dotenv import load_dotenv
from fastapi import Depends, FastAPI
from fastapi.security import HTTPBearer
from routes import routers
from sqlalchemy import text
from sqlalchemy.orm import Session

load_dotenv()


app = FastAPI()
security = HTTPBearer()


@app.get("/")
async def root(db: Session = Depends(database.get_db)):
    a = db.execute(text("SELECT * FROM users")).fetchone()
    print(a)
    return {"healthcheck": "alive"}

app.include_router(
    routers.router,
    prefix="/api/v1/routers",
)
