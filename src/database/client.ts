import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

let connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL

if (!connectionString) {
    throw new Error('Database connection string not found (DATABASE_URL or POSTGRES_URL)')
}

// Ensure sslmode=no-verify for cloud connections
if (!connectionString.includes('sslmode=')) {
    connectionString += connectionString.includes('?') ? '&sslmode=no-verify' : '?sslmode=no-verify'
}

console.log('[Database] Creating Pool...')
const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
})

console.log('[Database] Creating Adapter...')
const adapter = new PrismaPg(pool)

console.log('[Database] Creating Prisma Client...')
export const prisma = new PrismaClient({ adapter })
