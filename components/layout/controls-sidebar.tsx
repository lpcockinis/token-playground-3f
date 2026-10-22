import { ControlsPanel } from '@/components/controls/controls-panel'

export function ControlsSidebar() {
  return (
    <aside
      aria-label="Token controls"
      className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-[280px] shrink-0 overflow-y-auto border-r border-border bg-surface md:block"
    >
      <div className="border-b border-border px-5 pt-6 pb-5">
        <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Foundation tokens</p>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
          Shape the basics. See everything update live.
        </p>
      </div>
      <ControlsPanel />
    </aside>
  )
}
