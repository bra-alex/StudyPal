import { AnyZodObject } from 'zod'
import { NextFunction, Request, Response } from 'express'
import { deleteFolder } from '../util/deleteFromStorage'

const validateInput =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      })

      return next()
    } catch (e: any) {
      console.log(e)
      deleteFolder(`uploads/users/${req.body.uid}`)
      return res.status(400).json(e)
    }
  }
export default validateInput
