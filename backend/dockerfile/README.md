## build

```
# v3
docker build --platform linux/amd64  . --file Dockerfile --tag registry.cn-beijing.aliyuncs.com/biyao/public:wemcp-python3.10-v1
docker push registry.cn-beijing.aliyuncs.com/biyao/public:wemcp-python3.10-v1

docker build --platform linux/amd64  . --file Dockerfile --tag registry.cn-beijing.aliyuncs.com/biyao/public:wemcp-node20-v1
docker push registry.cn-beijing.aliyuncs.com/biyao/public:wemcp-node20-v1
```

## test

```
# 如何及时知道 python pip包更新了
docker build --platform linux/amd64  . --file Dockerfile --tag registry.cn-beijing.aliyuncs.com/biyao/public:python-mcp-server-sentry-2025.1.14
docker push registry.cn-beijing.aliyuncs.com/biyao/public:python-mcp-server-sentry-2025.1.14

docker build -t mcp/test-v1 -fDockerfile .
docker run -i --rm  mcp/test-v4  mcp-proxy --sse-port 8080 --sse-host 0.0.0.0 --allow-origin *   --pass-environment  -- uvx mcp-server-sentry  --auth-token ada
```
