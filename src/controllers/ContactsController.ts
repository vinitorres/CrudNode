import { Contact } from '../models/contact.js'
import { ContactService } from '../services/ContactService.js'

export class ContactsController {
    constructor(private contactService: ContactService) { }

    create = async (request: any, response: any) => {
        const { name, surname, phone } = request.body as Contact
        try {
            await this.contactService.createContact({ name, surname, phone })
            response.status(201).send()
        } catch (_error) {
            response.status(500).send({ error: "Error creating contact" })
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const contacts = await this.contactService.getAllContacts()
            response.status(200).send(contacts)
        } catch (error: any) {
            console.error("Error fetching contacts:", error)
            response.status(500).send({ error: "Error fetching contacts", details: error.message })
        }
    }

    getById = async (request: any, response: any) => {
        const { id } = request.params
        try {
            const contact = await this.contactService.getContactById(Number(id))
            response.status(200).send(contact)
        } catch (error: any) {
            if (error.message === 'Contact not found') {
                return response.status(404).send({ error: 'Contact not found' })
            }
            response.status(500).send({ error: "Error fetching contact" })
        }
    }

    update = async (request: any, response: any) => {
        const { id } = request.params
        const { name, surname, phone } = request.body as Contact
        try {
            const contact = await this.contactService.updateContact(Number(id), { name, surname, phone })
            response.status(200).send(contact)
        } catch (error: any) {
            if (error.message === 'Contact not found') {
                return response.status(404).send({ error: 'Contact not found' })
            }
            response.status(500).send({ error: "Error updating contact" })
        }
    }

    delete = async (request: any, response: any) => {
        const { id } = request.params
        try {
            await this.contactService.deleteContact(Number(id))
            response.status(204).send()
        } catch (error: any) {
            if (error.message === 'Contact not found') {
                return response.status(404).send({ error: 'Contact not found' })
            }
            response.status(500).send({ error: "Error deleting contact" })
        }
    }
}