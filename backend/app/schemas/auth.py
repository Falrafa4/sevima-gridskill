import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from app.models.enums import UserRole


class UserRegisterRequest(BaseModel):
    email: EmailStr = Field(..., example="siswa@gridskill.id")
    password: str = Field(..., min_length=6, max_length=100, example="siswapassword123")
    full_name: str = Field(..., min_length=2, max_length=100, example="Rizky Ramadhan")
    role: Optional[UserRole] = Field(default=UserRole.USER, example=UserRole.USER)


class UserLoginRequest(BaseModel):
    email: EmailStr = Field(..., example="siswa@gridskill.id")
    password: str = Field(..., example="siswapassword123")


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int  # in seconds


class UserResponse(BaseModel):
    id: uuid.UUID
    email: EmailStr
    full_name: str
    avatar_url: Optional[str] = None
    role: UserRole
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AuthResponse(BaseModel):
    user: UserResponse
    token: TokenResponse
