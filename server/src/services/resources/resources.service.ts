import { Resources } from '../../models/dto/dto'
import resourceModel from '../../models/resources/resources.mongo'

async function getAllResources() {
  return await resourceModel.find(
    {},
    {
      __v: 0,
    },
  )
}

async function getResource(resourceId: string) {
  return await resourceModel.findById(resourceId, {
    __v: 0,
  })
}

async function createResource(resource: Resources) {
  const newResource = new resourceModel(resource)
  return await newResource.save()
}

async function deleteResource(resourceId: string) {
  return await resourceModel.findByIdAndDelete(resourceId)
}

export { getAllResources, getResource, createResource, deleteResource }
