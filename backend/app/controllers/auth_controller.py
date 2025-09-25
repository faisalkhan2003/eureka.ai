from fastapi import APIRouter, Response, status, Depends
from fastapi.responses import JSONResponse
from app.schemas.auth_schemas import RegisterRequest, LoginRequest, TokenResponse, UserPublic
from app.services.auth_service import register_user, login_user
from app.middlewares.auth_dependency import get_current_user


router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
def register(body: RegisterRequest):
    user = register_user(body.name, body.email, body.password)
    return user


@router.post("/login", response_model=TokenResponse)
def login(body: LoginRequest, response: Response):
    token = login_user(body.email, body.password)
    # Optionally set HTTP-only cookie for convenience (works if you use credentials and proper CORS)
    response.set_cookie(
    key="access_token",
    value=token,
    httponly=True,
    samesite="lax",
    secure=False, # set True in production over HTTPS
    max_age=60 * 60,
    path="/",
)
    return TokenResponse(access_token=token)


@router.get("/me", response_model=UserPublic)
def me(current_user: dict = Depends(get_current_user)):
    return current_user

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(
        key="access_token",
        path="/",
    )
    return {"message": "Logged out successfully"}