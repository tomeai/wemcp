import asyncio
import json
import time

from mcp import ClientSession
from mcp.client.sse import sse_client


async def main() -> None:
    async with sse_client('https://postgres-criqrkaijh.cn-beijing.fcapp.run/sse') as streams:
        async with ClientSession(streams[0], streams[1]) as session:
            capabilities = await session.initialize()
            print(capabilities)
            if not capabilities:
                return {}

            result = {
                'capabilities': capabilities.model_dump(),
            }
            capabilities = capabilities.capabilities
            if capabilities.tools:
                tools = await session.list_tools()
                result.update({'tools': tools.model_dump()})

            if capabilities.prompts:
                prompts = await session.list_prompts()
                result.update({'prompts': prompts.model_dump()})

            if capabilities.resources:
                resources = await session.list_resources()
                print(resources)
                # result.update({'resources': resources.model_dump()})
            print(json.dumps(result))


async def call_tool():
    async with sse_client('https://mcp-server-cjj-qlzniewoce.cn-hangzhou.fcapp.run/sse') as streams:
        async with ClientSession(streams[0], streams[1]) as session:
            await session.initialize()
            # maps_geo {'address': '大望路', 'city': '北京'}
            result = await session.call_tool('maps_geo', {'address': '大望路', 'city': '北京'})
            print(result)


if __name__ == '__main__':
    s = time.time()
    asyncio.run(call_tool())
    e = time.time()
    print(e - s)
