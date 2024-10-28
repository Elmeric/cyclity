from datetime import datetime, timedelta, timezone
from typing import Any

import jwt
from argon2 import PasswordHasher

from config import settings

pwd_hasher = PasswordHasher(
    time_cost=1,
    memory_cost=47104,
    parallelism=1
)

ALGORITHM = "HS256"


def create_access_token(
    subject: str | Any, expires_delta: timedelta = None
) -> str:
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_hasher.verify(hashed_password, plain_password)


def get_password_hash(password: str) -> str:
    return pwd_hasher.hash(password)
