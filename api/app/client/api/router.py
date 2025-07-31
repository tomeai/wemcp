from fastapi import APIRouter

from backend.app.client.api.v1.mcp import router as mcp_router
from backend.app.client.api.v1.oauth2 import router as oauth2_router

v1 = APIRouter()
v1.include_router(oauth2_router)
v1.include_router(mcp_router)
