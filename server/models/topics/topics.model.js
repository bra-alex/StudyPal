const Topic = require('./topics.mongo')

async function fetchAllTopics() {
    try {
        return await Topic.find({},
            {
                '__v': 0
            }
        )
    } catch (e) {
        console.log(e)
        e.status = 500
        e.message = 'Error fetching topics from database'
        throw e
    }
}

async function findTopicById(id) {
    try {
        return await Topic.findById(id, {
            '__v': 0
        })
        .populate({
            path: 'posts'
        })
    } catch (e) {
        console.log(e)
        e.status = 500
        e.message = 'Error fetching topic from database'
        throw e
    }
}

async function createTopic(topicDetails){
    try {
        const topic = new Topic(topicDetails)

        return await topic.save()
    } catch (e) {
        console.log(e)
        e.status = 500
        e.message = 'Error creating topic'
        throw e
    }
}

async function deleteTopic(topicId){
    try {
        return await Topic.deleteOne({_id: topicId})
    } catch (e) {
        console.log(e)
        e.status = 500
        e.message = 'Error deleting topic'
        throw e
    }
}

module.exports = {
    fetchAllTopics,
    findTopicById,
    createTopic,
    deleteTopic
}