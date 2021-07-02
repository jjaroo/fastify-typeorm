import { RouteShorthandOptions } from 'fastify'

export interface IBody {
  title?: string
  description?: string
}

export const photoOption: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
        },
      },
    },
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
    },
  },
}

export const photosOption: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
          },
        },
      },
    },
  },
}
