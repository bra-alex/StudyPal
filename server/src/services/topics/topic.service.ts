import { Topics } from '../../models/dto/dto'
import topicsModel from '../../models/topics/topics.mongo'

async function fetchAllTopics() {
  return await topicsModel.find(
    {},
    {
      __v: 0,
    },
  )
}

async function findTopicById(id: String) {
  return await topicsModel
    .findById(id, {
      __v: 0,
    })
    .populate({
      path: 'posts',
    })
}

async function createTopic(topicDetails: Topics) {
  const topic = new topicsModel(topicDetails)

  return await topic.save()
}

async function deleteTopic(topicId: String) {
  return await topicsModel.deleteOne({ _id: topicId })
}

export { fetchAllTopics, findTopicById, createTopic, deleteTopic }
