import type { H3Event } from 'h3';
import type { inferAsyncReturnType } from '@trpc/server';
import { db } from '../db/db';
import { UserController } from './controllers/user';

export async function createContext(event: H3Event) {
  const header = getRequestHeader(event, 'Authorization');
  const userController = new UserController();
  const user = await userController.getUserFromHeader(header);

  return {
    db,
    user,
    userController,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;