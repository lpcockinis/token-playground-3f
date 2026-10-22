'use client'

import { SlidersHorizontal, X } from 'lucide-react'
import { ControlsPanel } from '@/components/controls/controls-panel'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export function MobileControlsSheet() {
  return (
    <Sheet>
      <SheetTrigger className="focus-ring fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex h-12 items-center gap-2.5 rounded-xl bg-foreground px-4 text-base font-semibold text-background shadow-lg md:hidden">
        <SlidersHorizontal className="size-4" aria-hidden="true" />
        Customize
      </SheetTrigger>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="max-h-[88dvh] gap-0 rounded-t-3xl border-0 bg-surface p-0 md:hidden"
      >
        <div className="flex justify-center pt-2.5" aria-hidden="true">
          <span className="h-1 w-10 rounded-full bg-border" />
        </div>
        <div className="flex items-start justify-between border-b border-border px-5 pt-5 pb-5">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Customize</p>
            <SheetTitle className="mt-1.5 text-xl font-medium text-foreground">Foundation tokens</SheetTitle>
          </div>
          <SheetClose
            aria-label="Close controls"
            className="focus-ring -mr-1.5 flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-subtle hover:text-foreground"
          >
            <X className="size-5" aria-hidden="true" />
          </SheetClose>
        </div>
        <div className="overflow-y-auto pb-[env(safe-area-inset-bottom)]">
          <ControlsPanel />
        </div>
      </SheetContent>
    </Sheet>
  )
}
