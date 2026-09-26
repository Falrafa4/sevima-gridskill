from typing import Any, Optional
from fastapi import HTTPException, status


class AppException(HTTPException):
    """Base application exception returning structured error payload."""
    def __init__(
        self,
        status_code: int,
        message: str,
        code: str = "ERROR",
        details: Optional[Any] = None,
    ):
        super().__init__(
            status_code=status_code,
            detail={
                "status": "error",
                "code": code,
                "message": message,
                "details": details,
            },
        )


class NotFoundException(AppException):
    def __init__(self, message: str = "Resource not found", details: Optional[Any] = None):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            message=message,
            code="NOT_FOUND",
            details=details,
        )


class BadRequestException(AppException):
    def __init__(self, message: str = "Bad request", details: Optional[Any] = None):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            message=message,
            code="BAD_REQUEST",
            details=details,
        )


class ConflictException(AppException):
    def __init__(self, message: str = "Resource conflict", details: Optional[Any] = None):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            message=message,
            code="CONFLICT",
            details=details,
        )
