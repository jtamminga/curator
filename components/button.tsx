import classNames from 'classnames'
import { MouseEventHandler, ReactNode } from 'react'

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  className?: string
  style: 'success' | 'danger'
}

export function Button({ className, onClick, children, style }: Props) {

  const styles = classNames(
    'p-4 text-white w-full rounded-lg',
    className,
    {
      'bg-emerald-400': style === 'success',
      'bg-red-400': style === 'danger'
    }
  )

  return (
    <button
      className={styles}
      onClick={onClick}
    >
      {children}
    </button>
  )
}