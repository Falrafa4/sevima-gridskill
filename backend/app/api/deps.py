import uuid
from typing import Any, Dict, Optional
from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.core.exceptions import ForbiddenException, UnauthorizedException
from app.core.security import decode_access_token
from app.database.database import get_db
from app.models.user import User
from app.models.enums import UserRole

# HTTP Bearer authentication scheme
security_scheme = HTTPBearer(auto_error=False)


def get_token_payload(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_scheme),
) -> Optional[Dict[str, Any]]:
    """Extracts and verifies JWT token from Authorization header if present."""
    if not credentials or not credentials.credentials:
        return None
    return decode_access_token(credentials.credentials)


def get_current_user_payload(
    payload: Optional[Dict[str, Any]] = Depends(get_token_payload),
) -> Dict[str, Any]:
    """Ensures that the request contains a valid authenticated JWT token."""
    if not payload:
        raise UnauthorizedException(message="Autentikasi diperlukan. Silakan sertakan Bearer token yang valid.")
    return payload


def get_current_user(
    db: Session = Depends(get_db),
    payload: Dict[str, Any] = Depends(get_current_user_payload),
) -> User:
    """Fetches User entity from database based on JWT sub claim."""
    user_id_str = payload.get("sub")
    if not user_id_str:
        raise UnauthorizedException(message="Token tidak valid: klaim sub tidak ditemukan.")
    try:
        user_uuid = uuid.UUID(user_id_str)
    except ValueError:
        raise UnauthorizedException(message="Format User ID pada token tidak valid.")

    stmt = select(User).where(User.id == user_uuid)
    user = db.execute(stmt).scalars().first()
    if not user:
        raise UnauthorizedException(message="Akun pengguna tidak ditemukan.")
    if not user.is_active:
        raise ForbiddenException(message="Akun pengguna dinonaktifkan.")
    return user


def get_optional_current_user(
    db: Session = Depends(get_db),
    payload: Optional[Dict[str, Any]] = Depends(get_token_payload),
) -> Optional[User]:
    """Fetches User if valid token is provided, returns None if guest."""
    if not payload or not payload.get("sub"):
        return None
    try:
        user_uuid = uuid.UUID(payload["sub"])
        stmt = select(User).where(User.id == user_uuid, User.is_active == True)
        return db.execute(stmt).scalars().first()
    except Exception:
        return None
