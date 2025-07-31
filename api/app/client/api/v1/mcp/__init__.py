from fastapi import APIRouter

from backend.app.client.api.v1.mcp.deploy import router as deploy_router
from backend.app.client.api.v1.mcp.server import router as server_router

router = APIRouter(prefix='/mcp')

router.include_router(server_router, prefix='/server', tags=['mcp search'])
router.include_router(deploy_router, prefix='/deploy', tags=['mcp deploy'])
