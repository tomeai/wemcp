FROM node:20-slim

RUN npm config set registry https://registry.npmmirror.com

RUN npm install -g pnpm

RUN pnpm config set registry https://registry.npmmirror.com

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/

RUN pip install mcp-proxy --break-system-packages
