import os
import time

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()  # Load environment variables from .env file
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL,
                       pool_size=10,
                       max_overflow=20,
                       pool_timeout=30,
                       pool_recycle=1800,  # Recycle connections after 30 minutes
                       pool_pre_ping=True)  # Pre-ping connections to check if they are alive)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
