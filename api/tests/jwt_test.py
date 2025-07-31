from datetime import UTC, datetime, timedelta
from typing import Optional

import jwt

SECRET_KEY = 'your-secret-key'
ALGORITHM = 'HS256'  # 或者选择其他加密算法
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # 设置 JWT 过期时间


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(UTC) + expires_delta
    else:
        expire = datetime.now(UTC) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({'exp': expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.PyJWTError:
        return None


if __name__ == '__main__':
    print(create_access_token({'name': 'test'}))
    print(
        verify_token(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsImV4cCI6MTc0NDk2ODc3M30.Q4iaPqnEJRhtoBTg5jFG240bQuhnrxAgScP6UdFbXX0'
        )
    )
