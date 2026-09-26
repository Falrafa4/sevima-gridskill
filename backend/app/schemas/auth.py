import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict
from app.models.enums import UserRole


class UserRegisterRequest(BaseModel):
    email: str = Field(..., min_length=5, max_length=255, pattern=r"^[\w\.-]+@[\w\.-]+\.\w+$", json_schema_extra={"example": "siswa@gridskill.id"})
    password: str = Field(..., min_length=6, max_length=100, json_schema_extra={"example": "siswapassword123"})
    full_name: str = Field(..., min_length=2, max_length=100, json_schema_extra={"example": "Rizky Ramadhan"})
    role: Optional[UserRole] = Field(default=UserRole.USER, json_schema_extra={"example": UserRole.USER})


class UserLoginRequest(BaseModel):
    email: str = Field(..., min_length=5, max_length=255, json_schema_extra={"example": "siswa@gridskill.id"})
    password: str = Field(..., json_schema_extra={"example": "siswapassword123"})


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int  # in seconds


class UserResponse(BaseModel):
    id: uuid.UUID
    email: str
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
