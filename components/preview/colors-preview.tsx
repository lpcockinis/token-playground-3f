'use client'

import { useTokens } from '@/components/tokens-provider'
import { getPalette, readableTextOn, type Shade } from '@/lib/tokens'

function Swatch({ role, shade }: { role: string; shade: Shade }) {
  const text = readableTextOn(shade.hex)
  return (
    <li
      className="flex min-h-24 flex-col justify-between p-3 sm:min-h-32 lg:min-h-[100px]"
      style={{ backgroundColor: shade.hex, color: text }}
    >
      <span className="truncate text-[11px] font-semibold 2xl:text-xs">
        {role}-{shade.step}
      </span>
      <span className="font-mono text-[11px] opacity-80">{shade.hex}</span>
    </li>
  )
}

export function ColorsPreview() {
  const { tokens } = useTokens()
  const palette = getPalette(tokens.colors)

  return (
    <div className="flex flex-col gap-4">
      {palette.map(({ role, label, base, shades }) => (
        <section
          key={role}
          aria-labelledby={`palette-${role}`}
          className="rounded-2xl border border-border bg-surface p-4 md:p-[18px]"
        >
          <header className="mb-4 flex items-center justify-between">
            <h3 id={`palette-${role}`} className="flex items-center gap-2.5 text-lg font-semibold">
              <span aria-hidden="true" className="size-2.5 rounded-full" style={{ backgroundColor: base }} />
              {label}
            </h3>
            <span className="font-mono text-sm text-muted-foreground">{base}</span>
          </header>
          <ul className="grid grid-cols-2 overflow-hidden rounded-xl sm:grid-cols-5 xl:grid-cols-10">
            {shades.map((shade) => (
              <Swatch key={shade.step} role={role} shade={shade} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
