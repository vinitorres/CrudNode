import 'dotenv/config'
import routes from './routes'
import Fastify from 'fastify'
import cors from '@fastify/cors'

export const app = Fastify({
    logger: true
})

app.register(cors, {
    origin: true // Allows all origins
})

app.register(routes)
