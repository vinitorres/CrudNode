import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ContactsController } from '../../src/controllers/ContactsController'
import { ContactService } from '../../src/services/ContactService'
import { mockDeep, MockProxy } from 'vitest-mock-extended'

describe('Contacts Controller', () => {
    let contactService: MockProxy<ContactService>
    let contactsController: ContactsController

    beforeEach(() => {
        contactService = mockDeep<ContactService>()
        contactsController = new ContactsController(contactService)
    })

    describe('create', () => {
        it('should create a contact and return 201', async () => {
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

            // Mock service success
            contactService.createContact.mockResolvedValue(undefined)

            await contactsController.create(request, response)

            expect(contactService.createContact).toHaveBeenCalledWith(request.body)
            expect(response.status).toHaveBeenCalledWith(201)
            expect(response.send).toHaveBeenCalled()
        })

        it('should handle errors', async () => {
            const request = { body: {} }
            const response = {
                status: vi.fn().mockReturnThis(),
                send: vi.fn()
            }

            contactService.createContact.mockRejectedValue(new Error('Service Error'))

            await contactsController.create(request, response)

            expect(response.status).toHaveBeenCalledWith(500)
            expect(response.send).toHaveBeenCalledWith({ error: "Error creating contact" })
        })
    })

    describe('getAll', () => {
        it('should return all contacts with 200', async () => {
            const mockContacts = [
                { id: 1, name: 'John', surname: 'Doe', phone: '123' }
            ]

            contactService.getAllContacts.mockResolvedValue(mockContacts)

            const request = {}
            const response = {
                status: vi.fn().mockReturnThis(),
                send: vi.fn()
            }

            await contactsController.getAll(request, response)

            expect(response.status).toHaveBeenCalledWith(200)
            expect(response.send).toHaveBeenCalledWith(mockContacts)
        })
    })

    describe('getById', () => {
        it('should return contact with 200', async () => {
            const mockContact = { id: 1, name: 'John', surname: 'Doe', phone: '123' }

            contactService.getContactById.mockResolvedValue(mockContact)

            const request = { params: { id: '1' } }
            const response = {
                status: vi.fn().mockReturnThis(),
                send: vi.fn()
            }

            await contactsController.getById(request, response)

            expect(contactService.getContactById).toHaveBeenCalledWith(1)
            expect(response.status).toHaveBeenCalledWith(200)
            expect(response.send).toHaveBeenCalledWith(mockContact)
        })

        it('should return 500 on service error', async () => {
            // In real world, 404 should be handled if service throws Not Found
            contactService.getContactById.mockRejectedValue(new Error('Not found'))

            const request = { params: { id: '1' } }
            const response = {
                status: vi.fn().mockReturnThis(),
                send: vi.fn()
            }

            await contactsController.getById(request, response)

            expect(response.status).toHaveBeenCalledWith(500)
        })
    })
})
