import { Database } from 'sqlite3'

export class ItemService {

  private db: Database

  constructor() {
    this.db = new Database('curator.db')
  }


  //
  // public methods
  // ==============


  public async next(): Promise<NextItem> {
    const total = this.totalItems()
    const finished = this.finishedItems()
    const item = this.randomItem()

    return {
      item: await item,
      total: await total,
      finished: await finished
    }
  }

  public async saveResult(id: number, result: boolean): Promise<NextItem> {
    this.saveItemResult(id, result)
    return this.next()
  }


  //
  // private methods
  // ===============


  private async totalItems(): Promise<number> {
    const query = `
      SELECT count(*) "total"
      FROM items
    `

    const { total } = await get(this.db, query)
    return total
  }

  private async finishedItems(): Promise<number> {
    const query = `
      SELECT count(*) "total"
      FROM items
      WHERE result IS NOT NULL
    `

    const { total } = await get(this.db, query)
    return total
  }

  private async randomItem(): Promise<Item> {
    const query = `
      SELECT id, name
      FROM items
      WHERE result IS NULL
      ORDER BY RANDOM() LIMIT 1
    `

    const { id, name } = await get(this.db, query)
    return { id, name }
  }

  private async saveItemResult(id: number, result: boolean): Promise<void> {
    const query = `
      UPDATE items SET result=? WHERE id=?
    `

    return new Promise((resolve) => {
      this.db.run(query, [result ? 1 : 0, id], (e) => {
        resolve(undefined)
        
        if (e) {
          console.error(e)
        }
      })
    })
  }
}


//
// types
// =====


export interface Item {
  id: number
  name: string
}

export interface NextItem {
  item: Item
  total: number
  finished: number
}


//
// helpers
// =======


async function get<T>(db: Database, query: string): Promise<T> {
  return new Promise((resolve) => {
    db.get(query, (error, row) => {
      resolve(row as T)
    })
  })
}