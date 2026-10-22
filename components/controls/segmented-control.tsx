'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface SegmentedControlProps<T extends string | number> {
  label: string
  value: T
  options: { value: T; label: React.ReactNode; ariaLabel?: string }[]
  onChange: (value: T) => void
  className?: string
  size?: 'default' | 'sm'
}

/** Accessible radio group with roving tabindex and arrow-key navigation. */
export function SegmentedControl<T extends string | number>({
  label,
  value,
  options,
  onChange,
  className,
  size = 'default',
}: SegmentedControlProps<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  function handleKeyDown(event: React.KeyboardEvent, index: number) {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End']
    if (!keys.includes(event.key)) return
    event.preventDefault()
    let next = index
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % options.length
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + options.length) % options.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = options.length - 1
    onChange(options[next].value)
    refs.current[next]?.focus()
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn('flex rounded-xl bg-subtle p-1', size === 'sm' && 'rounded-lg p-0.5', className)}
    >
      {options.map((option, index) => {
        const selected = option.value === value
        return (
          <button
            key={String(option.value)}
            ref={(el) => {
              refs.current[index] = el
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={option.ariaLabel}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              'focus-ring flex flex-1 items-center justify-center rounded-lg text-[15px] transition-colors',
              size === 'default' ? 'h-10' : 'h-8 px-2.5 rounded-md',
              selected
                ? 'bg-surface font-semibold text-foreground shadow-sm dark:bg-canvas'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
