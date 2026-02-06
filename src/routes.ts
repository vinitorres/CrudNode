import { ContactsController } from './controllers/ContactsController.js'
import { PrismaContactRepository } from './repositories/prisma/PrismaContactRepository.js'
import { ContactService } from './services/ContactService.js'

const contactRepository = new PrismaContactRepository()
const contactService = new ContactService(contactRepository)
const contactsController = new ContactsController(contactService)

export default async function routes(app: any, _options: any) {
    app.post('/contacts', contactsController.create)
    app.get('/contacts', contactsController.getAll)
    app.get('/contacts/:id', contactsController.getById)
    app.put('/contacts/:id', contactsController.update)
    app.delete('/contacts/:id', contactsController.delete)
}