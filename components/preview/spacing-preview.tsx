'use client'

import { useTokens } from '@/components/tokens-provider'
import { formatNumber, getSpacingScale } from '@/lib/tokens'

export function SpacingPreview() {
  const { tokens } = useTokens()
  const steps = getSpacingScale(tokens.spacingBase)

  return (
    <div className="flex flex-col gap-5">
      <p className="text-[15px] text-muted-foreground">
        <span className="mr-2 text-lg font-semibold text-foreground">A rhythm you can see.</span>
        Built on a {tokens.spacingBase}px base unit. Each token is shown at its actual size.
      </p>
      <ul className="flex flex-col gap-4" aria-label="Spacing scale">
        {steps.map((step) => (
          <li
            key={step.token}
            className="flex items-center gap-4 rounded-2xl border border-border bg-surface px-4 py-4 md:gap-8 md:px-4"
          >
            <div className="w-20 shrink-0">
              <p className="text-[15px] font-semibold text-muted-foreground">{step.token}</p>
              <p className="mt-0.5 text-sm text-muted-foreground/80">{step.px}px</p>
            </div>
            <div className="min-w-0 flex-1">
              <div
                aria-hidden="true"
                className="bg-stripes h-6 max-w-full rounded-md bg-[var(--tp-primary-500)] transition-[width] duration-300"
                style={{ width: step.px * 3.5 }}
              />
            </div>
            <p className="shrink-0 font-mono text-sm text-muted-foreground">{formatNumber(step.rem)}rem</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
