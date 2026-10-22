import type { SpaceStep } from '@/lib/tokens'

export function SpacingMiniChart({ steps }: { steps: SpaceStep[] }) {
  const max = Math.max(...steps.map((s) => s.px))
  const scale = 32 / max

  return (
    <figure className="flex flex-col gap-3" aria-label="Spacing scale overview">
      <div className="flex items-end gap-2 border-b border-border" aria-hidden="true">
        {steps.map((s, i) => (
          <div key={s.token} className="flex flex-col items-center">
            <div
              className="rounded-t-[2px] bg-brand/75 transition-all duration-300"
              style={{ width: Math.max(4, s.px * scale * 0.95), height: Math.max(3, s.px * scale * 0.85) }}
            />
            <span className="sr-only">{i + 1}</span>
          </div>
        ))}
      </div>
      <div className="-mt-2 flex gap-2 text-[11px] text-muted-foreground" aria-hidden="true">
        {steps.map((s, i) => (
          <span
            key={s.token}
            className="text-center"
            style={{ width: Math.max(4, s.px * scale * 0.95) }}
          >
            {i + 1}
          </span>
        ))}
      </div>
      <figcaption className="text-[13px] text-muted-foreground">
        {steps.map((s) => s.px).join(' · ')}
      </figcaption>
    </figure>
  )
}
