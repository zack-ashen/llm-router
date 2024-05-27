from db import database
from fastapi import HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import text
from sqlalchemy.orm import Session


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(
                    status_code=403, detail="Invalid authentication scheme.")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(
                    status_code=403, detail="Invalid token or expired token.")
            return credentials.credentials
        else:
            raise HTTPException(
                status_code=403, detail="Invalid authorization code.")

    def verify_jwt(self, jwtoken: str) -> bool:
        db_gen = database.get_db()  # Get the generator
        db = next(db_gen)  # Extract the session from the generator
        try:
            # a = db.execute(text("SELECT * FROM api_keys WHERE key = $1")).fetchone()
            result = db.execute(text(
                "SELECT * FROM api_keys WHERE key = :jwt_token"), {"jwt_token": jwtoken}).fetchone()
            if result is not None:
                db.execute(text(
                    "UPDATE api_keys SET last_used_at = NOW() WHERE key = :jwt_token"), {"jwt_token": jwtoken})
                db.commit()
                return True
        finally:
            db_gen.close()

        return False
