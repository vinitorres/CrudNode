
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createContact, getAllContacts } from '../../src/controllers/contactsController'
import { prisma } from '../../src/database/client'
import { mockReset } from 'vitest-mock-extended'

vi.mock('../../src/database/client', async () => {
    const { mockDeep } = await import('vitest-mock-extended')
    return {
        prisma: mockDeep()
    }
})

describe('Contacts Controller', () => {
    beforeEach(() => {
        mockReset(prisma)
    })

    describe('createContact', () => {
        it('should create a contact and return 201', async () => {
            const mockContact = {
                id: 1,
                name: 'John',
                surname: 'Doe',
                phone: '1234567890',
                createdAt: new Date(),
                updatedAt: new Date()
            }

            // Setup mock
            vi.mocked(prisma.contact.create).mockResolvedValue(mockContact)

            const request = {
                body: {
                    name: 'John',
                    surname: 'Doe',
                    phone: '1234567890'
                }
            }

            const response = {
                status: vi.fn().mockReturnThis(),
                send: vi.fn()
            }

            await createContact(request, response)

            expect(prisma.contact.create).toHaveBeenCalledWith({
                data: request.body
            })
            expect(response.status).toHaveBeenCalledWith(201)
            expect(response.send).toHaveBeenCalledWith()
        })

        it('should handle errors', async () => {
            const request = { body: {} }
            const response = {
                status: vi.fn().mockReturnThis(),
                send: vi.fn()
            }

            vi.mocked(prisma.contact.create).mockRejectedValue(new Error('DB Error'))

            await createContact(request, response)

            expect(response.status).toHaveBeenCalledWith(500)
            expect(response.send).toHaveBeenCalledWith({ error: "Error creating contact" })
        })
    })

    describe('getAllContacts', () => {
        it('should return all contacts with 200', async () => {
            const mockContacts = [
                { id: 1, name: 'John', surname: 'Doe', phone: '123', createdAt: new Date(), updatedAt: new Date() }
            ]

            vi.mocked(prisma.contact.findMany).mockResolvedValue(mockContacts)

            const request = {}
            const response = {
                status: vi.fn().mockReturnThis(),
                send: vi.fn()
            }

            await getAllContacts(request, response)

            expect(response.status).toHaveBeenCalledWith(200)
            expect(response.send).toHaveBeenCalledWith(mockContacts)
        })
    })
})
