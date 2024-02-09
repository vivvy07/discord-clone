import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

declare global {
    var prisma: PrismaClient | undefined;
};

// Pass the adapter option to the Prisma Client instance
// Pass the adapter option to the Prisma Client instance

export const db = globalThis.prisma || new PrismaClient({adapter});

if (process.env.NODE_ENV !== "production") globalThis.prisma = db