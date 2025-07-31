## WeMcp后端API

```
#  mcp server 统一填写用户的key ？ 限制调用？
1. 无需用户填写key，不填写默人走系统内置的key
2. 用户可以填写自己的key，则免费调用  
3. 安装mcp server级别限流，每个mcp server每天可以访问1000次
4. agent调用，每个agent每天可以免费调用100次 agent里面调用mcp server不限制
5. 支持agent再次封装成 mcp server 非流失调用
6. mcp server托管  按照指定格式提交 自动部署到 阿里云或者腾讯云 serverless
7. 给用户一个管理系统  前台有简单的管理
    1. 可以邀请 仅账号可以配置 oauth2.0
    2. 一个总的管理系统
    3. 发布 编译应用 统一使用前端
    4. 使用同一套 model 状态区分
    5. 在微服务中 有专门的商品管理模块
      1. 内部查询
      2. 商户查询
    6. 编译公告 最大管理员编译  在前端
8. 使用pg数据库 pgvector集成向量搜索
    1. mcp为大宽表 部署完成 同步向量化
    2. 如何同步禁用 pg a表禁用  同步b表禁用
    3. 有一些是程序自动填充的
      1. tools prompts 等 
      2. 手动维护分类
9. 百度网盘 key 如何管理  oauth鉴权的
10. 主要服务 搜索 详情服务使用golang承接
11. router使用golang进行转发   支持转换 OpenAPI 和 MCP sse 进行管理
    1. https://github.com/automation-ai-labs/mcp-link/blob/main/utils/multiserver_sse.go
12. 像素头像：https://api.dicebear.com/7.x/bottts/svg?seed=2
13. 如何动态替换环境变量
14. 分页问题修改 放在body里面
15. 调研一下 dify sanbox 沙盒环境
16. local 方式的也支持查看 工具列表等
```

## 设计原则

```
1. 将前台和后台公用的model进行抽离
```

## 参考

```
https://github.com/fastapi-practices/fastapi_best_architecture
```

## jwt

```
https://learnku.com/articles/17883
```

## 开发

```
# utf8mb4 数据库

# 迁移数据库
alembic revision --autogenerate
alembic upgrade head

# 启动
fastapi dev main.py
uvicorn main:app --reload
```

## 网关

```
# 使用一个包进行转发
npx @michaellatman/mcp-get@latest install @modelcontextprotocol/server-puppeteer

https://gitmcp.io/
https://mcp-get.com/packages/%40modelcontextprotocol%2Fserver-puppeteer
https://github.com/supercorp-ai/supergateway
```

## github回调信息

```
{'login': 'fovegage', 'id': 22335404, 'node_id': 'MDQ6VXNlcjIyMzM1NDA0', 'avatar_url': 'https://avatars.githubusercontent.com/u/22335404?v=4', 'gravatar_id': '', 'url': 'https://api.github.com/users/fovegage', 'html_url': 'https://github.com/fovegage', 'followers_url': 'https://api.github.com/users/fovegage/followers', 'following_url': 'https://api.github.com/users/fovegage/following{/other_user}', 'gists_url': 'https://api.github.com/users/fovegage/gists{/gist_id}', 'starred_url': 'https://api.github.com/users/fovegage/starred{/owner}{/repo}', 'subscriptions_url': 'https://api.github.com/users/fovegage/subscriptions', 'organizations_url': 'https://api.github.com/users/fovegage/orgs', 'repos_url': 'https://api.github.com/users/fovegage/repos', 'events_url': 'https://api.github.com/users/fovegage/events{/privacy}', 'received_events_url': 'https://api.github.com/users/fovegage/received_events', 'type': 'User', 'user_view_type': 'private', 'site_admin': False, 'name': 'Gage', 'company': None, 'blog': 'https://www.gaozhe.net', 'location': 'BeiJing', 'email': 'fovegage@gmail.com', 'hireable': None, 'bio': 'Like author, like book.', 'twitter_username': None, 'notification_email': 'fovegage@gmail.com', 'public_repos': 18, 'public_gists': 0, 'followers': 15, 'following': 8, 'created_at': '2016-09-21T02:15:20Z', 'updated_at': '2025-04-10T06:10:36Z', 'private_gists': 0, 'total_private_repos': 1, 'owned_private_repos': 1, 'disk_usage': 76114, 'collaborators': 0, 'two_factor_authentication': True, 'plan': {'name': 'free', 'space': 976562499, 'collaborators': 0, 'private_repos': 10000}}
```

## api

```
# 可以转发 restfulapi
https://github.com/automation-ai-labs/mcp-link/tree/main  

# router
https://mcp-router.net/en
https://github.com/mcp-router/mcp-router
https://github.com/sparfenyuk/mcp-proxy/blob/main/src/mcp_proxy/proxy_server.py
https://github.com/chatmcp/mcprouter/tree/main
https://github.com/supercorp-ai/supergateway
https://github.com/chatmcp/mcp-server-router
https://github.com/wanaku-ai/wanaku

# client
https://github.com/mcp-use/mcp-use/tree/main
https://github.com/wong2/mcp-cli

# api
https://github.com/Tencent/APIJSON
https://github.com/public-apis/public-apis?tab=readme-ov-file#music
https://apifox.com/apihub/
https://github.com/fangzesheng/free-api?tab=readme-ov-file
https://pan.baidu.com/union/doc/mksg0s9l4

# 文档管理
https://github.com/shuding/nextra
https://contentlayer.dev/docs
https://www.nextracn.com/docs/docs-theme/start

# 市场
https://www.mcp.run/pricing
https://github.com/punkpeye/awesome-mcp-servers/blob/main/README-zh.md
https://mcp-get.com/packages/%40modelcontextprotocol%2Fserver-puppeteer
https://www.mcplink.ai/mcp/add

# mcp server
https://github.com/langchain-ai/mcpdoc/blob/main/README.md
https://github.com/SunnyCloudYang/hugo-mcp
```

## 函数化

```
https://github.com/search?q=org%3Aawesome-fc+requirements.txt&type=code
https://github.com/awesome-fc/code-example/blob/aad42e18310b993b081ca5bdd8d66bd443af04b7/quick-start-sample-codes/quick-start-sample-codes-python/rds-mysql-python/src/s.yaml
https://github.com/awesome-fc/simple-video-processing/blob/master/s.yaml
```

## sdk

```
# node && python sdk
# 开发 wemcp 继承openai 新增 { "type": "mcp", "name": "firecrawl" }

from openai import OpenAI

client = OpenAI(
    base_url="https://api.opentools.com",
    api_key="<OPENTOOLS_API_KEY>"
)

completion = client.chat.completions.create(
    model="anthropic/claude-3.7-sonnet",
    messages=[
        { "role": "user", "content": "Compare specs of top 5 EVs on caranddriver.com" }
    ],
    tools=[{ "type": "mcp", "ref": "firecrawl" }]
)
```

## 部署

```
{
    "mcpServers": {
        "baidu-map": {
            "command": "npx",
            "args": [
                "-y",
                "@baidumap/mcp-server-baidu-map"
            ],
            "env": {
                "BAIDU_MAP_API_KEY": "xxx"
            }
        }
    }
}
```

## MVP-1

```

```

### 登录

- [ ] 接入Github登录
- [ ] 接入Gitee登录
- [ ] 接入Google登录

### 主页

- [ ] 主页文案确定
- [ ] wemcp sdk开发

### 接口

- [ ] MCP搜索接口
- [ ] MCP提交接口
    - [ ] 解析
    - [ ] celery 异步部署
- [ ] MCP Server支持搜索、分页、类目筛选、排序
- [ ] 分类接口
- [ ] feed流信息 只显示当天的
- [ ] 新闻接口
- [ ] 文档页面
- [ ] 详情
- [ ] 限流
    - [ ] mcp server 每天免费使用1000次
    - [ ] agent 每天免费使用100次

## MVP-2

## 接口

- [ ] 爬虫监测
- [ ] mcp server请求日志
