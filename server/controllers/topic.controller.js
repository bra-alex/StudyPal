const topicModel = require('../models/topics/topics.model')

async function httpFetchAllTopics(req, res, next) {
    try {
        const topics = await topicModel.fetchAllTopics()

        if (topics.length === 0) {
            return res.status(404).json({
                message: 'No topics found'
            })
        }

        res.status(200).json(topics)

    } catch (e) {
        next(e)
    }
}

async function httpFetchTopic(req, res, next) {
    try {
        const topic = await topicModel.findTopicById(res.topicId)

        res.status(200).json(topic)

    } catch (e) {
        next(e)
    }
}

async function httpCreateTopic(req, res, next) {
    try {
        const topicDetails = req.body
        topicDetails.users = [topicDetails.user]
        topicDetails.posts = []

        const createdTopic = await topicModel.createTopic(topicDetails)

        res.status(200).json(createdTopic)
    } catch (e) {
        next(e)
    }
}

async function httpDeleteTopic(req, res, next) {
    try {
        await topicModel.deleteTopic(res.topicId)

        res.status(200)
    } catch (e) {
        next(e)
    }
}
module.exports = {
    httpFetchAllTopics,
    httpFetchTopic,
    httpCreateTopic,
    httpDeleteTopic
}