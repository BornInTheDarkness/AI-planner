from functools import lru_cache

from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_env: str = "local"
    app_version: str = "0.1.0"
    log_level: str = "INFO"
    web_origin: AnyHttpUrl = "http://localhost:3000"


@lru_cache
def get_settings() -> Settings:
    return Settings()
