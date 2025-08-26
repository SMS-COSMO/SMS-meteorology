import jwt from 'jsonwebtoken';
import { users, refreshTokens } from '../../db/schema/user';
import { db } from '../../db/db';
import { eq, and } from 'drizzle-orm';
import { makeId } from './shared';

export class Auth {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
  private readonly REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret';

  async produceAccessToken(userId: string): Promise<string> {
    return jwt.sign({ userId }, this.JWT_SECRET, { expiresIn: '1h' });
  }

  async produceRefreshToken(userId: string): Promise<string> {
    const token = jwt.sign({ userId }, this.REFRESH_SECRET, { expiresIn: '7d' });
    await db.insert(refreshTokens).values({
      id: makeId(12),
      token,
      owner: userId
    });
    return token;
  }

  async getUserFromToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as { userId: string };
      return db.query.users.findFirst({ where: eq(users.id, decoded.userId) });
    } catch {
      return null;
    }
  }

  async refreshAccessToken(refreshToken: string, id: string) {
    const token = await db
      .delete(refreshTokens)
      .where(and(eq(refreshTokens.token, refreshToken), eq(refreshTokens.owner, id)))
      .returning();
    if (!token[0])
      return null;

    const newRefreshToken = await this.produceRefreshToken(id);
    const newAccessToken = await this.produceAccessToken(id);
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}