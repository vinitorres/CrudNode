import { Contact } from '../models/contact'
import { ContactRepository } from '../repositories/ContactRepository'

export class ContactService {
    constructor(private contactRepository: ContactRepository) { }

    async createContact(data: Contact): Promise<void> {
        await this.contactRepository.create(data)
    }

    async getAllContacts(): Promise<Contact[]> {
        return await this.contactRepository.findAll()
    }

    async getContactById(id: number): Promise<Contact> {
        const contact = await this.contactRepository.findById(id)
        if (!contact) {
            throw new Error('Contact not found')
        }
        return contact
    }

    async updateContact(id: number, data: Contact): Promise<Contact> {
        await this.getContactById(id)
        return await this.contactRepository.update(id, data)
    }

    async deleteContact(id: number): Promise<void> {
        await this.getContactById(id)
        await this.contactRepository.delete(id)
    }
}
