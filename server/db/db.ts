import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema'; // 导入所有模式定义

const connectionString = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/db';
const client = postgres(connectionString);

export const db = drizzle(client, { schema });