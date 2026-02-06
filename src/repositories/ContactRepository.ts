import { Contact } from '../models/contact'

export interface ContactRepository {
    create(data: Contact): Promise<void>
    findAll(): Promise<Contact[]>
    findById(id: number): Promise<Contact | null>
    update(id: number, data: Contact): Promise<Contact>
    delete(id: number): Promise<void>
}
