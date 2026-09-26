from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.schemas.auth import (
    UserRegisterRequest,
    UserLoginRequest,
    AuthResponse,
    UserResponse,
)
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication & Users"])


@router.post(
    "/register",
    response_model=AuthResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Registrasi Akun Pengguna Baru",
    description="Mendaftarkan akun pengguna baru (siswa/mentor) ke platform GridSkill dan mengembalikan JWT access token.",
)
def register(
    req: UserRegisterRequest,
    db: Session = Depends(get_db),
):
    return AuthService.register_user(db, req)


@router.post(
    "/login",
    response_model=AuthResponse,
    status_code=status.HTTP_200_OK,
    summary="Login Pengguna & Mendapatkan JWT",
    description="Autentikasi kredensial pengguna (email & password) dan menerbitkan JWT access token.",
)
def login(
    req: UserLoginRequest,
    db: Session = Depends(get_db),
):
    return AuthService.authenticate_user(db, req)


@router.get(
    "/me",
    response_model=UserResponse,
    status_code=status.HTTP_200_OK,
    summary="Ambil Profil Pengguna yang Sedang Login",
    description="Mengambil detail data akun pengguna saat ini berdasarkan Bearer JWT token yang disertakan pada header Authorization.",
)
def get_me(
    current_user: User = Depends(get_current_user),
):
    return UserResponse.model_validate(current_user)
