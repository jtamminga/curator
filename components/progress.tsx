import { NextItem } from 'services/ItemService'

type Props = {
  data: NextItem
}

export function Progress({ data }: Props) {
  return (
    <div className="mb-2">
      <span className="text-slate-400">{data.finished}/{data.total}</span>
    </div>
  )
}