#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from fastapi import APIRouter

from backend.app.client.api.v1.oauth2.gitee import router as gitee_router
from backend.app.client.api.v1.oauth2.github import router as github_router
from backend.app.client.api.v1.oauth2.user import router as user_router

router = APIRouter(prefix='/oauth2')

router.include_router(user_router, prefix='/user', tags=['user'])
router.include_router(github_router, prefix='/github', tags=['GitHub OAuth2'])
router.include_router(gitee_router, prefix='/gitee', tags=['Gitee OAuth2'])
