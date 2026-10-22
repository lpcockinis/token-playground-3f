'use client'

import { useId } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Option<T extends string> {
  value: T
  label: string
  style?: React.CSSProperties
}

interface LabeledSelectProps<T extends string> {
  label: string
  value: T
  options: Option<T>[]
  onChange: (value: T) => void
}

export function LabeledSelect<T extends string>({ label, value, options, onChange }: LabeledSelectProps<T>) {
  const labelId = useId()

  return (
    <div className="flex flex-col gap-2.5">
      <span id={labelId} className="text-[15px] text-muted-foreground">
        {label}
      </span>
      <Select
        items={options}
        value={value}
        onValueChange={(next) => {
          if (next) onChange(next as T)
        }}
      >
        <SelectTrigger
          aria-labelledby={labelId}
          className="h-11 w-full rounded-lg border-input bg-surface px-4 text-[15px] font-medium text-foreground focus-visible:border-brand focus-visible:ring-brand/30 dark:bg-surface"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} style={option.style}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
