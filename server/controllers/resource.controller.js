const resourceModel = require('../models/resources/resources.model')

async function httpGetAllResources(req, res, next) {
    try {
        const resources = await resourceModel.getAllResources()

        res.status(200).json(resources)
    } catch (e) {
        next(e)
    }
}

async function httpGetResource(req, res, next) {
    try {
        const resource = await resourceModel.getResource(res.resourceId)

        res.status(200).json(resource)
    } catch (e) {
        next(e)
    }
}

async function httpCreateResource(req, res, next) {
    try {
        const resource = req.body

        const createdResource = await resourceModel.createResource(resource)

        res.status(201).json(createdResource)
    } catch (e) {
        next(e)
    }
}

async function httpDeleteResource(req, res, next) {
    try {
        await resourceModel.deleteResource(res.resourceId)

        res.status(200).json({
            message: 'Resource deleted'
        })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    httpGetAllResources,
    httpGetResource,
    httpCreateResource,
    httpDeleteResource
}