FROM python:3.10-slim

RUN pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/

RUN pip install uv

RUN pip install mcp-proxy

ENV UV_DEFAULT_INDEX=https://mirrors.aliyun.com/pypi/simple/

RUN uv venv
