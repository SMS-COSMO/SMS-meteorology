import { TRPCError } from '@trpc/server';

export const TRPCForbidden = new TRPCError({ code: 'FORBIDDEN', message: 'Forbidden' });

export function makeId(length: number = 12): string {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjklmnpqrstuvwxyz23456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}