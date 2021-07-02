import { RouteShorthandOptions } from 'fastify'

export interface IBody {
  name?: string
  email?: string
}

export const userOption: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
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

export const usersOption: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            email: { type: 'string' },
          },
        },
      },
    },
  },
}
