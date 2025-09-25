from fastapi import HTTPException, status
from app.repositories.user_repository import find_by_email, create_user
from app.utils.security import hash_password, verify_password
from app.utils.jwt_utils import create_access_token




def register_user(name:str, email: str, password: str) -> dict:
    existing = find_by_email(email)
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    ph = hash_password(password)
    user = create_user(name, email, ph)
    return {"email": user["email"]}




def login_user(email: str, password: str) -> str:
    user = find_by_email(email)
    if not user or not verify_password(password, user.get("password_hash", "")):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token(subject=user["email"]) # using email as subject
    return token