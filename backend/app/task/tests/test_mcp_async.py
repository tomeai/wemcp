import pytest

from loguru import logger

from backend.app.task.service.serverless_service import serverless_service


@pytest.mark.asyncio
async def test_fetch_data_mocked():
    function_name = 'mcp-test1'
    image = 'registry.cn-beijing.aliyuncs.com/biyao/public:python-mcp-server-sentry-2025.1.14-v7'
    envs = {'a': 'b'}
    run_cmd = [
        'mcp-proxy',
        '--sse-port',
        '8080',
        '--sse-host',
        '0.0.0.0',
        '--allow-origin',
        '*',
        '--pass-environment',
        '--',
        'mcp-server-sentry',
        '--auth-token',
        'adad',
    ]
    result = await serverless_service.create_serverless(function_name, image, envs, run_cmd)
    logger.info(result)
