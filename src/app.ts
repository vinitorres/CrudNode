import 'dotenv/config'
import routes from './routes'
import Fastify from 'fastify'

export const app = Fastify({
    logger: true
})

app.register(routes)
