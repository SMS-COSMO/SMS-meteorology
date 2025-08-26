import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { makeId } from '../../trpc/utils/shared';

export const users = pgTable('users', {
  id: text('id').$defaultFn(() => makeId(12)).primaryKey(),
  schoolId: text('school_id').notNull().unique(),
  username: text('username').notNull(),
  password: text('password').notNull(),
  initialPassword: boolean('initial_password').notNull().default(true),
  role: text('role', { enum: ['admin', 'student', 'teacher'] }).notNull().default('student'), // 用户角色
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ one }) => ({
  refreshToken: one(refreshTokens, {
    fields: [users.id],
    references: [refreshTokens.owner],
  }),
}));

export const refreshTokens = pgTable('refresh_tokens', {
  id: text('id').primaryKey().$defaultFn(() => makeId(12)),
  token: text('token').notNull(),
  owner: text('owner').references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }).notNull(),
});