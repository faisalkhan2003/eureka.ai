from fastapi import Depends, HTTPException, status, Cookie
from app.utils.jwt_utils import decode_token
from app.repositories.user_repository import find_by_email


def get_current_user(access_token: str | None = Cookie(None)):
    if access_token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing credentials"
        )
    try:
        payload = decode_token(access_token)
        email = payload.get("sub")
        if not email:
            raise ValueError("Invalid token payload")

        user = find_by_email(email)
        if not user:
            raise ValueError("User not found")
        return {
            "id": str(user["_id"]),
            "email": user["email"],
            "name": user.get("name"),
        }

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
