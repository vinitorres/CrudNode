import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

console.log('[Database] Initializing Prisma Client with Driver Adapter...')

// Use POSTGRES_URL (Vercel Integration) or DATABASE_URL
let connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL

if (!connectionString) {
    console.error('Database connection string not found (DATABASE_URL or POSTGRES_URL)')
    throw new Error('Database connection string is not defined')
}

// Append sslmode=no-verify if not present to fix TLS issues on Vercel
if (!connectionString.includes('sslmode=')) {
    connectionString += connectionString.includes('?') ? '&sslmode=no-verify' : '?sslmode=no-verify'
}


const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
export const prisma = new PrismaClient({ adapter })
