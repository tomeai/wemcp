#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.app.client.model.mcp import McpServer
from backend.common.model import Base, id_key


class McpCategory(Base):
    """mcp category"""

    __tablename__ = 'mcp_category'
    id: Mapped[id_key] = mapped_column(init=False)
    name: Mapped[str] = mapped_column(String(20), unique=True, comment='mcp tag name')

    # mcp server一对多
    servers: Mapped[list[McpServer] | None] = relationship(back_populates='category', uselist=False)
