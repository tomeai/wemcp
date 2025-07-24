#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from fastapi import APIRouter

from backend.app.admin.api.router import v1 as admin_v1
from backend.app.client.api.router import v1 as client_v1
from backend.app.task.api.router import v1 as task_v1
from backend.core.conf import settings

router = APIRouter(prefix=settings.FASTAPI_API_V1_PATH)

router.include_router(admin_v1)
router.include_router(task_v1)
router.include_router(client_v1)
