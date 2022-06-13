import type { NextApiRequest, NextApiResponse } from 'next'
import { ItemService, NextItem } from 'services/ItemService'

const itemService = new ItemService()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  let next: NextItem
  switch (req.method) {
    case 'GET':
      next = await itemService.next()
      break

    case 'PUT':
      const { id, result } = JSON.parse(req.body)
      next = await itemService.saveResult(id, result)
      break
    
    default:
      throw new Error('invalid request')
  }

  res.status(200).json(next)
}