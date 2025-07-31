from typing import Annotated, List

from fastapi import APIRouter, Path
from mcp import ClientSession
from mcp.client.sse import sse_client

from backend.app.client.schema.mcp import CallToolParam, GetMcpDetail, GetMcpFeedDetail, SearchMcpParam
from backend.app.client.service.mcp_server_service import mcp_server_service
from backend.common.pagination import DependsPagination, PageData, paging_data
from backend.common.response.response_schema import ResponseSchemaModel, response_base
from backend.database.db import CurrentSession

router = APIRouter()


@router.post(
    '/search',
    summary='搜索mcp',
    dependencies=[
        DependsPagination,
    ],
)
async def search_mcp(
    db: CurrentSession,
    obj: SearchMcpParam,
) -> ResponseSchemaModel[PageData[GetMcpDetail]]:
    """
    后台基础搜索：关键字搜索，支持排序、分类过滤、分页
    1. 一期支持分类过滤、搜索、分页
    2. 二期支持排序
    :param obj: 搜索参数
    :param db:
    :return:
    """
    keyword = obj.keyword
    mcp_select = await mcp_server_service.get_select(keyword=keyword)
    page_data = await paging_data(db, mcp_select)
    return response_base.success(data=page_data)


@router.get(
    '/detail/{mcp_id}',
    summary='mcp detail',
)
async def get_mcp(mcp_id: Annotated[int, Path(description='mcp_id')]) -> ResponseSchemaModel[GetMcpDetail | None]:
    """
    todo: 异步唤醒云函数
    """
    result = await mcp_server_service.get_mcp(mcp_id)
    return response_base.success(data=result)


@router.get('/feed')
async def get_feed() -> ResponseSchemaModel[List[GetMcpFeedDetail] | None]:
    """
    仅显示最近一周的
    """
    result = await mcp_server_service.get_mcp_last_7_day()
    return response_base.success(data=result)


@router.post('/call/{mcp_id}')
async def call_tool(mcp_id: Annotated[int, Path(description='mcp_id')], call_param: CallToolParam):
    """
    根据mcp_id查询 sse_url
    """
    mcp_server = await mcp_server_service.get_mcp(mcp_id)
    async with sse_client(f'{mcp_server.mcp_endpoint}/sse') as streams:
        async with ClientSession(streams[0], streams[1]) as session:
            await session.initialize()
            # maps_geo {'address': '大望路', 'city': '北京'}
            result = await session.call_tool(call_param.tool_name, call_param.arguments)
            return response_base.success(data=result)
