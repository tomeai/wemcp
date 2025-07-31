#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict

from backend.core.path_conf import BASE_PATH


class ClientSettings(BaseSettings):
    """Client 配置"""

    model_config = SettingsConfigDict(env_file=f'{BASE_PATH}/.env', env_file_encoding='utf-8', extra='ignore')

    # .env OAuth2
    OAUTH2_GITHUB_CLIENT_ID: str
    OAUTH2_GITHUB_CLIENT_SECRET: str
    OAUTH2_LINUX_DO_CLIENT_ID: str
    OAUTH2_LINUX_DO_CLIENT_SECRET: str

    # OAuth2
    OAUTH2_GITHUB_REDIRECT_URI: str = 'http://127.0.0.1:8000/api/v1/oauth2/github/callback'
    OAUTH2_LINUX_DO_REDIRECT_URI: str = 'http://127.0.0.1:8000/api/v1/oauth2/linux-do/callback'

    # redirect fronted
    OAUTH2_FRONTEND_REDIRECT_URI: str = 'http://localhost:3000/auth/callback'


@lru_cache
def get_client_settings() -> ClientSettings:
    """获取 client 配置"""
    return ClientSettings()


client_settings = get_client_settings()
