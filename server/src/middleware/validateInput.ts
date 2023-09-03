import { AnyZodObject } from 'zod'
import { NextFunction, Request, Response } from 'express'

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
      return res.status(400).json(e)
    }
  }
export default validateInput
