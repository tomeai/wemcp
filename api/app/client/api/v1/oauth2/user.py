from fastapi import APIRouter
from starlette.requests import Request

from backend.app.client.schema.user import GetUserInfoDetail
from backend.common.response.response_schema import ResponseSchemaModel, response_base
from backend.common.security.jwt import DependsJwtAuth

router = APIRouter()


@router.get('/me', summary='获取当前用户信息', dependencies=[DependsJwtAuth])
async def get_oauth2_user(request: Request) -> ResponseSchemaModel[GetUserInfoDetail]:
    data = request.user
    return response_base.success(data=data)
