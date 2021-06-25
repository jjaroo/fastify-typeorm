import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { createConnection, Repository } from 'typeorm'
import { Photo } from '../entity/Photo'
import { User } from '../entity/User'

declare module 'fastify' {
  interface FastifyInstance {
    db: {
      photoRepository: Repository<Photo>
      userRepository: Repository<User>
    }
  }
}

const database: FastifyPluginAsync = async (server: FastifyInstance) => {
  try {
    const connection = await createConnection()
    const photoRepository = connection.getRepository(Photo)
    const userRepository = connection.getRepository(User)

    server.decorate('db', {
      photoRepository,
      userRepository,
    })
  } catch (err) {
    console.error(err)
  }
}

export default fp(database)
