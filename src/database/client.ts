import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const url = process.env.POSTGRES_URL || process.env.DATABASE_URL

if (!url) {
    throw new Error('Database connection string not found (DATABASE_URL or POSTGRES_URL)')
}

const connectionUrl = new URL(url)
// Force remove sslmode from URL parameters to avoid conflicts with manual ssl config
connectionUrl.searchParams.delete('sslmode')

const connectionString = connectionUrl.toString()

console.log('[Database] NODE_ENV:', process.env.NODE_ENV)
console.log('[Database] Creating Pool...')

// Always use rejectUnauthorized: false for Supabase/Vercel to handle self-signed certs in the pooler
const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
})

console.log('[Database] Creating Adapter...')
const adapter = new PrismaPg(pool)

console.log('[Database] Creating Prisma Client...')
export const prisma = new PrismaClient({ adapter })
