#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from datetime import datetime

from pydantic import Field

from backend.app.admin.schema.user import GetUserInfoDetail
from backend.common.schema import SchemaBase


class AccessTokenBase(SchemaBase):
    """访问令牌基础模型"""

    access_token: str = Field(description='访问令牌')
    access_token_expire_time: datetime = Field(description='令牌过期时间')
    session_uuid: str = Field(description='会话 UUID')


class GetLoginToken(AccessTokenBase):
    """获取登录令牌"""

    user: GetUserInfoDetail = Field(description='用户信息')
