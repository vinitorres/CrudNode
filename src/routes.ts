import { createContact, deleteContact, getAllContacts, getContactById, updateContact } from './controllers/contactsController'

export default async function routes(app: any, _options: any) {
    app.post('/contacts/create', createContact)
    app.get('/contacts/list', getAllContacts)
    app.get('/contacts/:id', getContactById)
    app.put('/contacts/update/:id', updateContact)
    app.delete('/contacts/delete/:id', deleteContact)
}