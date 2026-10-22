'use client'

import { useId, useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { isValidHex, normalizeHex } from '@/lib/tokens'
import { cn } from '@/lib/utils'

interface ColorFieldProps {
  label: string
  value: string
  onChange: (hex: string) => void
}

export function ColorField({ label, value, onChange }: ColorFieldProps) {
  const inputId = useId()
  const errorId = useId()
  const [draft, setDraft] = useState(value.replace('#', ''))
  const [lastValue, setLastValue] = useState(value)

  if (value !== lastValue) {
    setLastValue(value)
    setDraft(value.replace('#', ''))
  }

  const invalid = !isValidHex(draft)

  function handleText(next: string) {
    const cleaned = next.replace(/^#/, '').slice(0, 6)
    setDraft(cleaned)
    if (isValidHex(cleaned)) {
      const hex = normalizeHex(cleaned)
      setLastValue(hex)
      onChange(hex)
    }
  }

  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={inputId} className="text-[15px] text-muted-foreground">
        {label}
      </label>
      <div
        className={cn(
          'flex h-11 items-center gap-3 rounded-lg border bg-surface pr-3 pl-1.5 transition-colors focus-within:ring-2',
          invalid
            ? 'border-destructive focus-within:ring-destructive/25'
            : 'border-input focus-within:border-brand focus-within:ring-brand/30',
        )}
      >
        <span className="relative size-8 shrink-0 overflow-hidden rounded-md border border-border has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-1">
          <input
            type="color"
            aria-label={`${label} color picker`}
            value={normalizeHex(value).toLowerCase()}
            onChange={(e) => handleText(e.target.value)}
            className="absolute inset-0 size-full cursor-pointer opacity-0"
          />
          <span aria-hidden="true" className="block size-full" style={{ backgroundColor: value }} />
        </span>
        <span aria-hidden="true" className="font-mono text-sm text-muted-foreground">
          #
        </span>
        <input
          id={inputId}
          type="text"
          inputMode="text"
          autoComplete="off"
          spellCheck={false}
          maxLength={7}
          value={draft.toUpperCase()}
          onChange={(e) => handleText(e.target.value)}
          onBlur={() => {
            if (!invalid) setDraft(normalizeHex(draft).slice(1))
          }}
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : undefined}
          className="-ml-2 min-w-0 flex-1 bg-transparent font-mono text-sm tracking-wide text-foreground uppercase outline-none"
        />
      </div>
      {invalid && (
        <p id={errorId} role="alert" className="flex items-center gap-1.5 text-[13px] text-destructive">
          <AlertCircle className="size-3.5" aria-hidden="true" />
          Enter a 3 or 6 digit hex value, like 5B5BD6.
        </p>
      )}
    </div>
  )
}
