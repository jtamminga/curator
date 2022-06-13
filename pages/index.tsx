import { Button } from 'components/button'
import { Item } from 'components/item'
import { Progress } from 'components/progress'
import { useEffect, useState } from 'react'
import { NextItem } from 'services/ItemService'

export default function Home() {
  const [data, setData] = useState<NextItem>()

  useEffect(() => {
    async function fetchItem() {
      const response = await fetch('/api/items')
      setData(await response.json())
    }

    fetchItem()
  }, [])

  async function sendResult(result: boolean) {
    if (!data) {
      throw new Error('data not loaded yet')
    }

    const response = await fetch('/api/items', {
      method: 'PUT',
      body: JSON.stringify({ id: data.item.id, result })
    })

    setData(await response.json())
  }

  if (!data) {
    return null
  }

  return (
    <div className="container mx-auto px-4 h-screen flex flex-col justify-center">
      <div>

        <Progress data={data} />

        <Item item={data.item} />

        <div className="flex gap-4">
          <div className="grow">
            <Button
              style="success"
              onClick={() => sendResult(true)}
            >Yes</Button>
          </div>

          <div className="grow">
            <Button
              style="danger"
              onClick={() => sendResult(false)}
            >No</Button>
          </div>
        </div>

      </div>
    </div>
  )
}