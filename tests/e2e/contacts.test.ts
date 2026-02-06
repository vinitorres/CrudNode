
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { app } from '../../src/app'
import { prisma } from '../../src/database/client'

// Mock the prisma client for E2E too, to avoid hitting real DB
vi.mock('../../src/database/client', async () => {
    const { mockDeep } = await import('vitest-mock-extended')
    return {
        prisma: mockDeep()
    }
})

describe('Contacts E2E', () => {
    beforeAll(async () => {
        await app.ready()
    })

    it('GET /contacts/list should return list of contacts', async () => {
        const mockContacts = [
            { id: 1, name: 'Alice', surname: 'Smith', phone: '9876543210', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
        ]

        vi.mocked(prisma.contact.findMany).mockResolvedValue(mockContacts as any)

        const response = await app.inject({
            method: 'GET',
            url: '/contacts/list'
        })

        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.payload)).toEqual(JSON.parse(JSON.stringify(mockContacts)))
    })

    it('POST /contacts/create should create a contact', async () => {
        const newContact = {
            name: 'Bob',
            surname: 'Builder',
            phone: '1122334455'
        }

        const createdContact = {
            id: 2,
            ...newContact,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        vi.mocked(prisma.contact.create).mockResolvedValue(createdContact as any)

        const response = await app.inject({
            method: 'POST',
            url: '/contacts/create',
            payload: newContact
        })

        expect(response.statusCode).toBe(201)
        expect(response.payload).toBe("")
    })
})
