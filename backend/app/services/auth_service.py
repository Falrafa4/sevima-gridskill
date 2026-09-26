import uuid
from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.user import User
from app.models.enums import UserRole
from app.schemas.auth import (
    UserRegisterRequest,
    UserLoginRequest,
    TokenResponse,
    UserResponse,
    AuthResponse,
)
from app.core.security import (
    get_password_hash,
    verify_password,
    create_access_token,
)
from app.core.config import settings
from app.core.exceptions import (
    ConflictException,
    UnauthorizedException,
    NotFoundException,
    ForbiddenException,
)


class AuthService:
    """Service to handle user registration, authentication, and JWT lifecycle."""

    @classmethod
    def register_user(cls, db: Session, req: UserRegisterRequest) -> AuthResponse:
        """Register a new user with hashed password and return access token."""
        # 1. Check if email already registered
        stmt = select(User).where(User.email == req.email.lower().strip())
        existing_user = db.execute(stmt).scalars().first()
        if existing_user:
            raise ConflictException(f"Alamat email '{req.email}' sudah terdaftar.")

        # 2. Hash password & create user
        user = User(
            email=req.email.lower().strip(),
            hashed_password=get_password_hash(req.password),
            full_name=req.full_name.strip(),
            role=req.role or UserRole.USER,
            is_active=True,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        # 3. Generate JWT Token
        token = create_access_token(
            subject=user.id,
            role=user.role.value if hasattr(user.role, "value") else str(user.role),
            extra_claims={"email": user.email, "name": user.full_name},
        )

        return AuthResponse(
            user=UserResponse.model_validate(user),
            token=TokenResponse(
                access_token=token,
                token_type="bearer",
                expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            ),
        )

    @classmethod
    def authenticate_user(cls, db: Session, req: UserLoginRequest) -> AuthResponse:
        """Authenticate user credentials and issue a signed JWT access token."""
        stmt = select(User).where(User.email == req.email.lower().strip())
        user = db.execute(stmt).scalars().first()

        if not user or not verify_password(req.password, user.hashed_password):
            raise UnauthorizedException("Email atau kata sandi yang Anda masukkan salah.")

        if not user.is_active:
            raise ForbiddenException("Akun Anda telah dinonaktifkan. Silakan hubungi admin.")

        token = create_access_token(
            subject=user.id,
            role=user.role.value if hasattr(user.role, "value") else str(user.role),
            extra_claims={"email": user.email, "name": user.full_name},
        )

        return AuthResponse(
            user=UserResponse.model_validate(user),
            token=TokenResponse(
                access_token=token,
                token_type="bearer",
                expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            ),
        )

    @classmethod
    def get_user_by_id(cls, db: Session, user_id: uuid.UUID) -> UserResponse:
        """Fetch user data by UUID."""
        stmt = select(User).where(User.id == user_id)
        user = db.execute(stmt).scalars().first()
        if not user:
            raise NotFoundException("Pengguna tidak ditemukan.")
        return UserResponse.model_validate(user)
