export function CodePanel({ filename, code }: { filename: string; code: string }) {
  const lineCount = code.split('\n').length

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-canvas/60">
      <div className="flex items-center justify-between border-b border-border px-3.5 py-2.5 font-mono text-xs text-muted-foreground">
        <span>{filename}</span>
        <span>{lineCount} lines</span>
      </div>
      <pre
        tabIndex={0}
        aria-label={`${filename} contents`}
        className="focus-ring max-h-[42vh] overflow-auto px-4 py-4 font-mono text-[13px] leading-relaxed text-foreground"
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}
