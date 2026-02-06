import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

// Use POSTGRES_URL (Vercel Integration) or DATABASE_URL
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL

if (!connectionString) {
    console.error('Database connection string not found (DATABASE_URL or POSTGRES_URL)')
    throw new Error('Database connection string is not defined')
}


const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
export const prisma = new PrismaClient({ adapter })
