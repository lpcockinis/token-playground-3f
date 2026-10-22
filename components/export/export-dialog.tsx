'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { UnderlineTabs, UnderlineTabsList, UnderlineTabsPanel } from '@/components/preview/underline-tabs'
import { useTokens } from '@/components/tokens-provider'
import { EXPORT_FORMATS, generateExport, type ExportFormat } from '@/lib/export-formats'
import { CodePanel } from './code-panel'
import { ExportActions } from './export-actions'

interface ExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExportDialog({ open, onOpenChange }: ExportDialogProps) {
  const { tokens } = useTokens()
  const [format, setFormat] = useState<ExportFormat>('css')
  const active = EXPORT_FORMATS.find((f) => f.id === format) ?? EXPORT_FORMATS[0]
  const code = generateExport(active.id, tokens)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 rounded-2xl border border-border bg-surface p-5 ring-0 sm:max-w-[min(92vw,680px)] sm:p-6">
        <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Ready to build</p>
        <DialogTitle className="mt-1.5 text-xl font-medium tracking-tight sm:text-[22px]">Export your tokens</DialogTitle>
        <DialogDescription className="mt-1.5 text-[15px]">Take your foundations wherever you work.</DialogDescription>

        <UnderlineTabs value={format} onValueChange={(v) => setFormat(v as ExportFormat)} className="mt-5">
          <UnderlineTabsList
            label="Export format"
            items={EXPORT_FORMATS.map((f) => ({ value: f.id, label: f.label }))}
          />
          {EXPORT_FORMATS.map((f) => (
            <UnderlineTabsPanel key={f.id} value={f.id} className="mt-4">
              <CodePanel filename={f.filename} code={f.id === active.id ? code : ''} />
            </UnderlineTabsPanel>
          ))}
        </UnderlineTabs>

        <div className="mt-5">
          <ExportActions code={code} filename={active.filename} mime={active.mime} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
