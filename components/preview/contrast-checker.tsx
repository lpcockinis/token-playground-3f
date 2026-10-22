'use client'

import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { contrastRatio, WCAG_THRESHOLDS, type ShadeStep } from '@/lib/tokens'

type PaletteEntry = { role: string; label: string; shades: { step: ShadeStep; hex: string }[] }

interface ColorRef {
  name: string
  hex: string
}

interface ContrastPair {
  text: ColorRef
  background: ColorRef
}

const WHITE: ColorRef = { name: 'white', hex: '#FFFFFF' }

function buildPairs(palette: PaletteEntry[]): ContrastPair[] {
  const shade = (role: string, step: ShadeStep): ColorRef => {
    const entry = palette.find((p) => p.role === role)
    const hex = entry?.shades.find((s) => s.step === step)?.hex ?? '#000000'
    return { name: `${role}-${step}`, hex }
  }

  return [
    { text: shade('neutral', 900), background: shade('neutral', 50) },
    { text: shade('neutral', 600), background: WHITE },
    { text: shade('neutral', 500), background: shade('neutral', 100) },
    { text: WHITE, background: shade('primary', 500) },
    { text: WHITE, background: shade('primary', 600) },
    { text: shade('primary', 700), background: shade('primary', 50) },
    { text: WHITE, background: shade('secondary', 500) },
    { text: shade('secondary', 800), background: shade('secondary', 100) },
    { text: shade('neutral', 50), background: shade('neutral', 900) },
  ]
}

function ResultBadge({ level, passes }: { level: string; passes: boolean }) {
  const Icon = passes ? Check : X
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
        passes
          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300'
          : 'bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300',
      )}
    >
      <Icon aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
      <span>
        <span className="sr-only">{level} </span>
        {passes ? 'Pass' : 'Fail'}
      </span>
    </span>
  )
}

function ContrastRow({ pair }: { pair: ContrastPair }) {
  const ratio = contrastRatio(pair.text.hex, pair.background.hex)
  return (
    <tr className="border-t border-border">
      <td className="py-3 pr-4 pl-4 md:pl-[18px]">
        <div
          aria-hidden="true"
          className="flex h-10 w-16 items-center justify-center rounded-lg border border-border text-base font-semibold"
          style={{ backgroundColor: pair.background.hex, color: pair.text.hex }}
        >
          Aa
        </div>
      </td>
      <td className="py-3 pr-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-foreground">
            {pair.text.name} <span className="text-muted-foreground">on</span> {pair.background.name}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {pair.text.hex} / {pair.background.hex}
          </span>
        </div>
      </td>
      <td className="py-3 pr-4 font-mono text-sm tabular-nums text-foreground">{ratio.toFixed(2)}:1</td>
      <td className="py-3 pr-4">
        <ResultBadge level="AA" passes={ratio >= WCAG_THRESHOLDS.AA} />
      </td>
      <td className="py-3 pr-4 md:pr-[18px]">
        <ResultBadge level="AAA" passes={ratio >= WCAG_THRESHOLDS.AAA} />
      </td>
    </tr>
  )
}

export function ContrastChecker({ palette }: { palette: PaletteEntry[] }) {
  const pairs = buildPairs(palette)

  return (
    <section
      aria-labelledby="contrast-checker"
      className="rounded-2xl border border-border bg-surface"
    >
      <header className="flex flex-col gap-1 p-4 md:p-[18px]">
        <h3 id="contrast-checker" className="text-lg font-semibold">
          Contrast checker
        </h3>
        <p className="text-sm text-muted-foreground">
          WCAG 2.1 for normal text: AA needs {WCAG_THRESHOLDS.AA}:1, AAA needs {WCAG_THRESHOLDS.AAA}:1.
        </p>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left">
          <caption className="sr-only">Contrast ratios for text and background pairs in the current palette</caption>
          <thead>
            <tr className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th scope="col" className="pb-2 pr-4 pl-4 font-medium md:pl-[18px]">
                Sample
              </th>
              <th scope="col" className="pb-2 pr-4 font-medium">
                Text / background
              </th>
              <th scope="col" className="pb-2 pr-4 font-medium">
                Ratio
              </th>
              <th scope="col" className="pb-2 pr-4 font-medium">
                AA
              </th>
              <th scope="col" className="pb-2 pr-4 font-medium md:pr-[18px]">
                AAA
              </th>
            </tr>
          </thead>
          <tbody>
            {pairs.map((pair) => (
              <ContrastRow key={`${pair.text.name}-${pair.background.name}`} pair={pair} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
