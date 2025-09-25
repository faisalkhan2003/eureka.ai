from datetime import datetime, timedelta, timezone
import jwt
from app.config.settings import settings




def create_access_token(subject: str) -> str:
    expire = datetime.now(tz=timezone.utc) + timedelta(minutes=settings.JWT_EXPIRE_MINUTES)
    payload = {
    "sub": subject,
    "exp": expire,
    "iat": datetime.now(tz=timezone.utc),
    "type": "access",
    }
    token = jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
    return token




def decode_token(token: str) -> dict:
    return jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])