import 'reflect-metadata'
import Fastify, { FastifyInstance } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import database from './decorators/database'
import PhotoRoute from './route/PhotoRoute'
import UserRoute from './route/UserRoute'

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = Fastify({ ignoreTrailingSlash: true })

server.register(database)
server.register(PhotoRoute)
server.register(UserRoute)

server.listen(3000, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
