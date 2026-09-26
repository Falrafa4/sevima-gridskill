import os
import socket
import urllib.parse
from typing import List, Union
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # Application
    APP_NAME: str = "GridSkill Backend API"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    APP_HOST: str = "0.0.0.0"
    APP_PORT: int = 8000
    CORS_ORIGINS: Union[str, List[str]] = ["*"]

    # Security & JWT
    JWT_SECRET: str = "gridskill_jwt_super_secret_key_semesta_sevima_2026"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours

    # Database (Supabase PostgreSQL / Direct PostgreSQL URI)
    DATABASE_URL: str = Field(
        default="",
        description="Direct PostgreSQL URI connection string (Supabase pooled or direct)",
    )
    # Supabase direct fallback env keys
    DB_USER: str = Field(default="", alias="user")
    DB_PASSWORD: str = Field(default="", alias="password")
    DB_HOST: str = Field(default="", alias="host")
    DB_PORT: str = Field(default="5432", alias="port")
    DB_NAME: str = Field(default="postgres", alias="dbname")

    # Supabase BaaS (optional REST client)
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""

    # Google Gemini AI
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-1.5-flash"

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            if v == "*":
                return ["*"]
            return [i.strip() for i in v.split(",") if i.strip()]
        return v

    def get_database_url(self) -> str:
        """Returns valid database connection string, resolving hostname when necessary."""
        raw_url = self.DATABASE_URL
        if not raw_url and self.DB_HOST and self.DB_USER:
            encoded_password = urllib.parse.quote_plus(self.DB_PASSWORD)
            raw_url = f"postgresql://{self.DB_USER}:{encoded_password}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}?sslmode=require"

        if raw_url:
            if raw_url.startswith("postgres://"):
                raw_url = raw_url.replace("postgres://", "postgresql+psycopg2://", 1)
            elif raw_url.startswith("postgresql://") and "+psycopg2" not in raw_url:
                raw_url = raw_url.replace("postgresql://", "postgresql+psycopg2://", 1)

            # Resolve domain to IP fallback if libpq resolver encounters glibc/systemd-resolved issues
            try:
                parsed = urllib.parse.urlparse(raw_url)
                if parsed.hostname and not parsed.hostname.replace(".", "").isdigit():
                    try:
                        resolved_ip = socket.gethostbyname(parsed.hostname)
                        netloc = parsed.netloc.replace(f"@{parsed.hostname}", f"@{resolved_ip}")
                        raw_url = urllib.parse.urlunparse(parsed._replace(netloc=netloc))
                    except Exception:
                        pass
            except Exception:
                pass

            return raw_url

        # ponytail: sqlite fallback for offline local hackathon dev
        return "sqlite:///./gridskill_dev.db"


settings = Settings()
