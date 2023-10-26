import { TypeOf, object, string } from 'zod'

const resourcesSchema = {
  body: object({
    category: string({
      required_error: 'Resource Category required',
    }),
  }),
}

const params = {
  params: object({
    resourceId: string({
      required_error: 'Resource Id is required',
    }),
  }),
}

const getResourceSchema = object({
  ...params,
})

const createResourceSchema = object({
  ...resourcesSchema,
})

const deleteResourceSchema = getResourceSchema

type GetResourceInput = TypeOf<typeof getResourceSchema>
type CreateResourceInput = TypeOf<typeof createResourceSchema>
type DeleteResourceInput = TypeOf<typeof deleteResourceSchema>

export {
  getResourceSchema,
  createResourceSchema,
  deleteResourceSchema,
  GetResourceInput,
  CreateResourceInput,
  DeleteResourceInput,
}
