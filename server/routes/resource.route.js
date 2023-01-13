const multer = require('multer')
const express = require('express')

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/resources')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

const { resourceExists } = require('../middlewares/exists')
const resourceController = require('../controllers/resource.controller')

const resourceRoute = express.Router()

resourceRoute.get('/resources/', resourceController.httpGetAllResources)
resourceRoute.get('/resource/:resourceId', resourceExists, resourceController.httpGetResource)

resourceRoute.post('/resource/', multer({ storage: storage }).single('file'), resourceController.httpCreateResource)
resourceRoute.delete('/resource/:resourceId', resourceExists, resourceController.httpDeleteResource)

module.exports = resourceRoute