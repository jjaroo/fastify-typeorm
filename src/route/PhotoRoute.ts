import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyPluginAsync,
} from 'fastify'
import fp from 'fastify-plugin'
import { IBody, photoOption, photosOption } from './PhotoOptionType'

const PhotoRoute: FastifyPluginAsync = async (
  server: FastifyInstance,
  options: FastifyPluginOptions
) => {
  server.get('/photos', photosOption, async (req, reply) => {
    const photos = await server.db.photoRepository.find()

    reply.send(photos)
  })

  server.get<{ Params: { id: string } }>(
    '/photos/:id',
    photoOption,
    async (req, reply) => {
      const photo = await server.db.photoRepository.findOne(req.params.id)

      reply.send(photo)
    }
  )

  server.put<{ Body: IBody }>('/photos/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const { title, description } = req.body

    await server.db.photoRepository.update(id, req.body)

    const photo = await server.db.photoRepository.findOne(id)

    reply.send(photo)
  })

  server.post('/photos', async (req, reply) => {
    const { title, description } = req.body as {
      title: string
      description: string
    }

    const photo = server.db.photoRepository.create({
      title,
      description,
    })

    const newPhoto = await server.db.photoRepository.save(photo)

    reply.send(newPhoto)
  })

  server.delete('/photos/:id', async (req, reply) => {
    const { id } = req.params as { id: string }

    const deletedResult = await server.db.photoRepository.delete(id)

    reply.send(deletedResult.affected)
  })
}

export default fp(PhotoRoute)
