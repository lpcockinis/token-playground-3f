'use client'

import { RotateCcw, Upload } from 'lucide-react'
import { useTokens } from '@/components/tokens-provider'
import { LogoMark } from './logo-mark'
import { ThemeToggle } from './theme-toggle'

export function AppHeader({ onExport }: { onExport: () => void }) {
  const { reset } = useTokens()

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-border bg-surface/95 px-4 backdrop-blur md:px-5">
      <div className="flex min-w-0 items-center gap-2.5">
        <LogoMark />
        <span className="truncate text-base font-semibold tracking-tight">Token Playground</span>
        <span className="hidden rounded-md border border-border px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-muted-foreground sm:inline">
          BETA
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-2 md:gap-3">
        <button
          type="button"
          onClick={reset}
          className="focus-ring hidden h-9 items-center gap-2 rounded-lg px-3 text-[15px] font-medium text-muted-foreground transition-colors hover:bg-subtle hover:text-foreground sm:flex"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Reset
        </button>
        <ThemeToggle />
        <button
          type="button"
          onClick={onExport}
          className="focus-ring flex h-9 items-center gap-2 rounded-lg bg-brand px-3.5 text-[15px] font-semibold text-brand-foreground shadow-sm transition-opacity hover:opacity-90 md:h-10 md:px-4"
        >
          <Upload className="size-4" aria-hidden="true" />
          Export
        </button>
      </div>
    </header>
  )
}
