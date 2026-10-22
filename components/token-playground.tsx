'use client'

import { useState } from 'react'
import { ExportDialog } from '@/components/export/export-dialog'
import { AppHeader } from '@/components/layout/app-header'
import { ControlsSidebar } from '@/components/layout/controls-sidebar'
import { MobileControlsSheet } from '@/components/layout/mobile-controls-sheet'
import { PreviewArea } from '@/components/preview/preview-area'
import { TokensProvider } from '@/components/tokens-provider'

export function TokenPlayground() {
  const [exportOpen, setExportOpen] = useState(false)

  return (
    <TokensProvider>
      <div className="min-h-dvh bg-canvas">
        <AppHeader onExport={() => setExportOpen(true)} />
        <div className="flex">
          <ControlsSidebar />
          <main className="min-w-0 flex-1">
            <PreviewArea />
          </main>
        </div>
        <MobileControlsSheet />
        <ExportDialog open={exportOpen} onOpenChange={setExportOpen} />
      </div>
    </TokensProvider>
  )
}
