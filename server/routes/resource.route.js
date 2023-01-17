const fs = require('fs-extra')
const multer = require('multer')
const express = require('express')

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        const path = 'uploads/resources'
        fs.mkdirsSync(path)
        cb(null, path)
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

const { resourceExists } = require('../middlewares/exists')
const isAuthenticated = require('../middlewares/isAuthenticated')
const { deleteResource } = require('../middlewares/isAuthorised')
const resourceController = require('../controllers/resource.controller')

const resourceRoute = express.Router()

resourceRoute.get('/resources/', isAuthenticated, resourceController.httpGetAllResources)
resourceRoute.get('/resource/:resourceId', isAuthenticated, resourceExists, resourceController.httpGetResource)

resourceRoute.post('/resource/', isAuthenticated, multer({ storage }).single('file'), resourceController.httpCreateResource)
resourceRoute.delete('/resource/:resourceId', isAuthenticated, resourceExists, deleteResource, resourceController.httpDeleteResource)

module.exports = resourceRoute