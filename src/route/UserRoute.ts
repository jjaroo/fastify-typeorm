import { FastifyInstance, FastifyPluginOptions, FastifyPluginAsync, RouteShorthandOptions } from 'fastify'
import fp from 'fastify-plugin'
import { User } from '../entity/User'

interface IBody {
  name?: string
  email?: string
}

const UserRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
  server.get('/users', async (req, reply) => {
    const users = await User.find()

    reply.send(users)
  })

  server.get<{ Params: { id: string } }>('/users/:id', async (req, reply) => {
    const user = await User.findOne(req.params.id)

    reply.send(user)
  })

  server.put<{ Body: IBody; Params: { id: string } }>('/users/:id', async (req, reply) => {
    const id = req.params.id
    const user = await User.findOne(id)
    if (user) {
      user.email = req.body.email!
      user.save()
    }

    reply.send(user)
  })

  server.post<{ Body: IBody }>('/users', async (req, reply) => {
    const user = new User()
    user.name = req.body.name!
    user.email = req.body.email!
    await user.save()

    reply.send(user)
  })

  server.delete<{ Params: { id: string } }>('/users/:id', async (req, reply) => {
    const user = await User.findOne(req.params.id)
    if (user) {
      await user.remove()
      reply.send('deleted')
    } else {
      reply.code(404).send('empty')
    }
  })
}

export default fp(UserRoute)
