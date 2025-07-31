#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from anyio import sleep

from backend.app.task.celery import celery_app
from backend.app.task.service.serverless_service import serverless_service


@celery_app.task(name='task_demo_async')
async def task_demo_async() -> str:
    """异步示例任务，模拟耗时操作"""
    await sleep(20)
    return 'test async'


@celery_app.task(name='create_serverless')
async def create_serverless(mcp_server_id, function_name, image, envs, run_cmd):
    return await serverless_service.create_serverless(mcp_server_id, function_name, image, envs, run_cmd)
