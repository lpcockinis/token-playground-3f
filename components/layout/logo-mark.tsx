import { LayoutGrid } from 'lucide-react'
import { cn } from '@/lib/utils'

export function LogoMark({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <span
      aria-hidden="true"
      style={style}
      className={cn('flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand text-white', className)}
    >
      <LayoutGrid className="size-[55%]" strokeWidth={2.25} />
    </span>
  )
}
