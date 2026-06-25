from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # LLM
    model_path: str
    tokenizer_path: str
    model_max_context: int = 8192
    chat_history_token_budget: int = 6144

    # Database
    db_url: str

    # App
    debug: bool = False

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
