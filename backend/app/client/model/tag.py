#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.app.client.model.m2m import mcp_server_tag
from backend.app.client.model.mcp import McpServer
from backend.common.model import Base, id_key


class McpTag(Base):
    """mcp tag"""

    __tablename__ = 'mcp_tag'
    id: Mapped[id_key] = mapped_column(init=False)
    name: Mapped[str] = mapped_column(String(20), unique=True, comment='mcp tag name')

    # 标签多对多
    servers: Mapped[list[McpServer] | None] = relationship(init=False, secondary=mcp_server_tag, back_populates='tags')
