import bcrypt

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy_crud_plus import CRUDPlus

from backend.app.client.model import McpUser
from backend.app.client.schema.user import RegisterUserParam
from backend.common.security.jwt import get_hash_password
from backend.utils.timezone import timezone


class CRUDUser(CRUDPlus[McpUser]):
    async def get_by_username(self, db: AsyncSession, username: str) -> McpUser:
        return await self.select_model_by_column(db, username=username)

    async def create(self, db: AsyncSession, obj: RegisterUserParam, *, social: bool = False) -> None:
        """
        创建用户

        :param db: 数据库会话
        :param obj: 注册用户参数
        :param social: 是否社交用户
        :return:
        """
        if not social:
            salt = bcrypt.gensalt()
            obj.password = get_hash_password(obj.password, salt)
            dict_obj = obj.model_dump()
            dict_obj.update({'is_staff': True, 'salt': salt})
        else:
            dict_obj = obj.model_dump()
            dict_obj.update({'is_staff': True, 'salt': None})
        new_user = self.model(**dict_obj)
        db.add(new_user)

    async def get_by_nickname(self, db: AsyncSession, nickname: str) -> McpUser | None:
        """
        通过昵称获取用户

        :param db: 数据库会话
        :param nickname: 用户昵称
        :return:
        """
        return await self.select_model_by_column(db, nickname=nickname)

    async def check_email(self, db: AsyncSession, email: str) -> McpUser | None:
        """
        检查邮箱是否已被注册

        :param db: 数据库会话
        :param email: 电子邮箱
        :return:
        """
        return await self.select_model_by_column(db, email=email)

    async def update_login_time(self, db: AsyncSession, username: str) -> int:
        """
        更新用户最后登录时间

        :param db: 数据库会话
        :param username: 用户名
        :return:
        """
        return await self.update_model_by_column(db, {'last_login_time': timezone.now()}, username=username)


crud_user_dao: CRUDUser = CRUDUser(McpUser)
