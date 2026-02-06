import { PrismaClient } from '@prisma/client'
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL

if (!connectionString) {
    throw new Error('Database connection string is not defined')
}

export const prisma = new PrismaClient()
