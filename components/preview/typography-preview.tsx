'use client'

import { useTokens } from '@/components/tokens-provider'
import { getTypeSteps } from '@/lib/tokens'

export function TypographyPreview() {
  const { tokens } = useTokens()
  const steps = getTypeSteps(tokens.baseFontSize, tokens.scale)

  return (
    <ul className="overflow-hidden rounded-2xl border border-border bg-surface" aria-label="Type scale">
      {steps.map((step, i) => (
        <li
          key={step.token}
          className={`flex items-center gap-4 border-b border-border px-5 py-6 last:border-b-0 md:gap-8 md:px-5 ${
            i === 0 ? 'bg-subtle/60 md:bg-transparent' : ''
          }`}
        >
          <div className="w-20 shrink-0 md:w-24">
            <p className="text-[13px] font-semibold text-muted-foreground md:text-sm">{step.name}</p>
            <p className="mt-1 font-mono text-[13px] text-muted-foreground/80">{step.token}</p>
          </div>
          <p
            className="min-w-0 flex-1 truncate leading-tight"
            style={{
              fontFamily: step.isHeading ? 'var(--tp-font-heading)' : 'var(--tp-font-body)',
              fontWeight: step.isHeading ? 700 : 400,
              letterSpacing: step.isHeading ? '-0.025em' : undefined,
              fontSize: `clamp(${Math.min(step.px, 20)}px, ${(step.px / 16) * 0.9}vw + 8px, ${step.px}px)`,
            }}
          >
            The quick brown fox
          </p>
          <div className="hidden shrink-0 text-right font-mono sm:block">
            <p className="text-sm text-foreground">{step.px.toFixed(1)}px</p>
            <p className="mt-1 text-[13px] text-muted-foreground">{step.rem.toFixed(3)}rem</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
