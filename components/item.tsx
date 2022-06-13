import { Item } from 'services/ItemService'

type Props = {
  item: Item
}

export function Item({ item }: Props) {
  return (     
    <div className="bg-slate-200 rounded-lg w-full h-24 flex items-center justify-center mb-4">
      <span className="text-4xl uppercase text-slate-500 tracking-widest">
        {item.name}
      </span>
    </div>
  )
}