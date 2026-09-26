import os
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
        """Returns valid database connection string, fallback to local sqlite if not set."""
        if self.DATABASE_URL:
            # Fix postgres:// -> postgresql:// for SQLAlchemy if provided by cloud host
            url = self.DATABASE_URL
            if url.startswith("postgres://"):
                url = url.replace("postgres://", "postgresql+psycopg2://", 1)
            elif url.startswith("postgresql://") and "+psycopg2" not in url:
                url = url.replace("postgresql://", "postgresql+psycopg2://", 1)
            return url
        if self.DB_HOST and self.DB_USER:
            encoded_password = urllib.parse.quote_plus(self.DB_PASSWORD)
            return f"postgresql+psycopg2://{self.DB_USER}:{encoded_password}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}?sslmode=require"
        # ponytail: sqlite fallback for offline local hackathon dev
        return "sqlite:///./gridskill_dev.db"


settings = Settings()
