import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { db } from '../../db/db';
import { users } from '../../db/schema/user';
import { Auth } from '../utils/auth';

export class UserController {
  private auth: Auth;
  constructor() {
    this.auth = new Auth();
  }

  async login(schoolId: string, password: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.schoolId, schoolId),
    });
    if (!user)
      throw new TRPCError({ code: 'UNAUTHORIZED', message: '学工号或密码错误' });

    if (!await bcrypt.compare(password, user.password))
      throw new TRPCError({ code: 'UNAUTHORIZED', message: '学工号或密码错误' });

    const accessToken = await this.auth.produceAccessToken(user.id);
    const refreshToken = await this.auth.produceRefreshToken(user.id);

    const { password: _password, ...info } = user;

    return {
      ...info,
      accessToken,
      refreshToken,
    };
  }

  async register(newUser: { schoolId: string; username: string; password: string; role?: 'admin' | 'student' | 'teacher' }) {
    const hash = await bcrypt.hash(newUser.password, 8);
    const user = {
      schoolId: newUser.schoolId,
      username: newUser.username,
      password: hash,
      role: newUser.role || 'student',
      initialPassword: true
    };
    try {
      await db.insert(users).values(user);
      return '注册成功';
    } catch (err) {
      if ((err as Error)?.message?.includes('duplicate key'))
        throw new TRPCError({ code: 'BAD_REQUEST', message: '学工号已存在' });
      else
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: '注册失败' });
    }
  }

  async modifyPassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
    if (!user)
      throw new TRPCError({ code: 'NOT_FOUND', message: '用户不存在' });

    if (newPassword === oldPassword)
      throw new TRPCError({ code: 'BAD_REQUEST', message: '新密码不能与旧密码相同' });

    if (!await bcrypt.compare(oldPassword, user.password))
      throw new TRPCError({ code: 'BAD_REQUEST', message: '旧密码不正确' });

    await db.update(users)
      .set({ password: await bcrypt.hash(newPassword, 8), initialPassword: false })
      .where(eq(users.id, userId));

    return '修改成功';
  }
}