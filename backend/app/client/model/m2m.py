#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from sqlalchemy import INT, Column, ForeignKey, Integer, Table

from backend.common.model import MappedBase

mcp_server_tag = Table(
    'mcp_server_tag',
    MappedBase.metadata,
    Column('id', INT, primary_key=True, unique=True, index=True, autoincrement=True, comment='主键ID'),
    Column(
        'server_id', Integer, ForeignKey('mcp_server.id', ondelete='CASCADE'), primary_key=True, comment='MCP Server ID'
    ),
    Column('tag_id', Integer, ForeignKey('mcp_tag.id', ondelete='CASCADE'), primary_key=True, comment='标签ID'),
)
