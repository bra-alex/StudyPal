import { NextFunction, Request, Response } from 'express'

import { Topics } from '../models/dto/dto'
import { CreateTopicInput } from '../schema/topics/topics.schema'

import { createTopic, deleteTopic, fetchAllTopics } from '../services/topics/topic.service'

async function httpFetchAllTopics(_req: Request, res: Response, next: NextFunction) {
  try {
    const topics = await fetchAllTopics()

    res.status(200).json(topics)
  } catch (e) {
    next(e)
  }
}

async function httpFetchTopic(_req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(res.locals.topic)
  } catch (e) {
    next(e)
  }
}

async function httpCreateTopic(
  req: Request<{}, {}, CreateTopicInput['body']>,
  res: Response,
  next: NextFunction,
) {
  try {
    const topicDetails: Topics = {
      ...req.body,
      creator: res.locals.user!._id,
    } as Topics

    const createdTopic = await createTopic(topicDetails)

    res.status(201).json(createdTopic)
  } catch (e) {
    console.log(e)

    next(e)
  }
}

async function httpDeleteTopic(_req: Request, res: Response, next: NextFunction) {
  try {
    await deleteTopic(res.locals.topic!._id)

    res.status(200).json({
      message: 'Topic Deleted',
    })
  } catch (e) {
    next(e)
  }
}
export { httpFetchAllTopics, httpFetchTopic, httpCreateTopic, httpDeleteTopic }
