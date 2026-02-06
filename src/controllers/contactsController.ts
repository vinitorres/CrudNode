import { prisma } from '../database/client'
import { Contact } from '../models/contact'

export const createContact = async (request: any, response: any) => {
    const { name, surname, phone } = request.body as Contact
    try {
        await prisma.contact.create({
            data: {
                name,
                surname,
                phone
            }
        })
        response.status(201).send()
    } catch (_error) {
        response.status(500).send({ error: "Error creating contact" })
    }
}

export const getAllContacts = async (request: any, response: any) => {
    try {
        const contacts = await prisma.contact.findMany()
        response.status(200).send(contacts)
    } catch (error) {
        console.error("Error fetching contacts:", error)
        response.status(500).send({ error: "Error fetching contacts" })
    }
}

export const getContactById = async (request: any, response: any) => {
    const { id } = request.params
    try {
        const contact = await prisma.contact.findUnique({
            where: { id: Number(id) }
        })
        if (!contact) {
            return response.status(404).send({ error: "Contact not found" })
        }
        response.status(200).send(contact)
    } catch (_error) {
        response.status(500).send({ error: "Error fetching contact" })
    }
}

export const updateContact = async (request: any, response: any) => {
    const { id } = request.params
    const { name, surname, phone } = request.body as Contact
    try {
        const contact = await prisma.contact.update({
            where: { id: Number(id) },
            data: {
                name,
                surname,
                phone
            }
        })
        response.status(200).send(contact)
    } catch (_error) {
        response.status(500).send({ error: "Error updating contact" })
    }
}

export const deleteContact = async (request: any, response: any) => {
    const { id } = request.params
    try {
        await prisma.contact.delete({
            where: { id: Number(id) }
        })
        response.status(204).send()
    } catch (_error) {
        response.status(500).send({ error: "Error deleting contact" })
    }
}