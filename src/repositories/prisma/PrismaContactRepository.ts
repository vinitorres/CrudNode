import { prisma } from '../../database/client.js'
import { Contact } from '../../models/contact.js'
import { ContactRepository } from '../ContactRepository.js'

export class PrismaContactRepository implements ContactRepository {
    async create(data: Contact): Promise<void> {
        await prisma.contact.create({
            data: {
                name: data.name,
                surname: data.surname,
                phone: data.phone
            }
        })
    }

    async findAll(): Promise<Contact[]> {
        return await prisma.contact.findMany()
    }

    async findById(id: number): Promise<Contact | null> {
        return await prisma.contact.findUnique({
            where: { id }
        })
    }

    async update(id: number, data: Contact): Promise<Contact> {
        return await prisma.contact.update({
            where: { id },
            data: {
                name: data.name,
                surname: data.surname,
                phone: data.phone
            }
        })
    }

    async delete(id: number): Promise<void> {
        await prisma.contact.delete({
            where: { id }
        })
    }
}
