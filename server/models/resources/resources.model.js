const Resources = require('./resources.mongo')

async function getAllResources() {
    try {
        return await Resources.find({}, {
            '__v': 0
        })
    } catch (err) {
        console.log(err)
        const e = new Error(err)
        e.status = 500
        e.message = 'Error getting resources from the database'
        throw e
    }
}

async function getResource(resourceId) {
    try {
        return await Resources.findById(resourceId, {
            '__v': 0
        })
    } catch (err) {
        console.log(err)
        const e = new Error(err)
        e.status = 500
        e.message = 'Error getting resource from the database'
        throw e
    }
}

async function createResource(resource) {
    try {
        const newResource = new Resources(resource)
        return await newResource.save()
    } catch (err) {
        console.log(err)
        const e = new Error(err)
        e.status = 400
        e.message = 'Error saving resource'
        throw e
    }
}

async function deleteResource(resourceId) {
    try {
        return await Resources.findByIdAndDelete(resourceId)
    } catch (err) {
        console.log(err)
        const e = new Error(err)
        e.status = 500
        e.message = 'Error deleting resource from the database'
        throw e
    }
}

module.exports = {
    getAllResources,
    getResource,
    createResource,
    deleteResource
}