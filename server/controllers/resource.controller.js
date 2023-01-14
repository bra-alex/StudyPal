const { deleteFile } = require('../util/deleteFromStorage')
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
        res.download(res.resource.resourceUrl, (err) => {
            if (err) {
                err.status = 500
                err.message = "Could not download resource" + err
                throw err
            }
        })
    } catch (e) {
        next(e)
    }
}

async function httpCreateResource(req, res, next) {
    try {
        console.log(req.file);
        const resource = {
            name: req.body.name,
            fileName: req.file.filename,
            author: req.body.author,
            resourceUrl: req.file.path,
        }

        const createdResource = await resourceModel.createResource(resource)

        res.status(201).json(createdResource)
    } catch (e) {
        if (!e.status) {
            e.status = 400
        }
        next(e)
    }
}

async function httpDeleteResource(req, res, next) {
    try {
        deleteFile(res.resource.resourceUrl)
        await resourceModel.deleteResource(res.resource._id)

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