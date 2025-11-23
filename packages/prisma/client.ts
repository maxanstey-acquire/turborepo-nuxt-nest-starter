import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import dotenv from 'dotenv';
import { env } from 'prisma/config';
import { PrismaClient } from "./generated/client/client.js";

dotenv.config();

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? new PrismaClient({
    adapter: new PrismaBetterSqlite3({
        url: env('DATABASE_URL'),
    }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
