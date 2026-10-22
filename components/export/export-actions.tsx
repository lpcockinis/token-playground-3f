'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy, Download } from 'lucide-react'

interface ExportActionsProps {
  code: string
  filename: string
  mime: string
}

export function ExportActions({ code, filename, mime }: ExportActionsProps) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      const area = document.createElement('textarea')
      area.value = code
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      area.remove()
    }
    setCopied(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload() {
    const url = URL.createObjectURL(new Blob([code], { type: mime }))
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={handleDownload}
        className="focus-ring flex h-10 items-center justify-center gap-2 rounded-lg border border-input bg-surface px-4 text-[15px] font-semibold transition-colors hover:bg-subtle"
      >
        <Download className="size-4" aria-hidden="true" />
        Download file
      </button>
      <button
        type="button"
        onClick={handleCopy}
        className="focus-ring flex h-10 min-w-44 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-[15px] font-semibold text-brand-foreground transition-opacity hover:opacity-90"
      >
        {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        <span aria-live="polite">{copied ? 'Copied!' : 'Copy to clipboard'}</span>
      </button>
    </div>
  )
}
