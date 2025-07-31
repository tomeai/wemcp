from datetime import datetime, timedelta

from sqlalchemy import Select, desc, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import noload, selectinload
from sqlalchemy_crud_plus import CRUDPlus

from backend.app.client.model import McpServer, McpTag, McpUser
from backend.app.client.schema.mcp import UpdateMcpServerParam


class CRUDMcpServer(CRUDPlus[McpServer]):
    """
    https://www.cnblogs.com/zhuoss/p/17272732.html
    https://stackoverflow.com/questions/68195361/how-to-properly-handle-many-to-many-in-async-sqlalchemy
    """

    async def update_mcp_server(self, session: AsyncSession, pk: int, obj: UpdateMcpServerParam) -> int:
        return await self.update_model(session, pk, obj)

    async def add_mcp(self, db: AsyncSession, obj: McpServer) -> int:
        db.add(obj)
        await db.flush()
        return obj.id

    async def get_mcp(self, db: AsyncSession, pk: int) -> McpServer:
        return await self.select_model(db, pk)

    async def get_mcp_by_title(self, db: AsyncSession, mcp_user: McpUser, title: str) -> McpServer:
        return await self.select_model_by_column(db, user=mcp_user, title=title)

    async def get_mcp_last_7_day(self) -> Select:
        now = datetime.utcnow()
        seven_days_ago = now - timedelta(days=7)

        stmt = select(self.model).options(
            selectinload(self.model.user),
            noload(self.model.category),
            selectinload(self.model.tags).options(noload(McpTag.servers)),
        )

        stmt = stmt.filter(self.model.is_public is True)
        stmt = stmt.filter(self.model.created_time >= seven_days_ago)
        stmt = stmt.order_by(desc(self.model.updated_time))
        return stmt

    async def get_list(self, keyword: str | None = None) -> Select:
        stmt = select(self.model).options(
            noload(self.model.category),
            noload(self.model.user),
            selectinload(self.model.tags).options(noload(McpTag.servers)),
        )

        if keyword:
            stmt = stmt.filter(self.model.title.ilike(f'%{keyword}%'))

        stmt = stmt.where(self.model.is_public is True).order_by(desc(self.model.updated_time))
        return stmt


mcp_server_dao: CRUDMcpServer = CRUDMcpServer(McpServer)
