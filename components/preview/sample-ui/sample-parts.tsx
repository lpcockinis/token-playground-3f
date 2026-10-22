import { MoreHorizontal } from 'lucide-react'
import { LogoMark } from '@/components/layout/logo-mark'

const heading = { fontFamily: 'var(--tp-font-heading)' } as const

export function SampleNav() {
  return (
    <header
      className="flex items-center justify-between border-b border-border"
      style={{ padding: 'var(--tp-space-4) var(--tp-space-5)' }}
    >
      <div className="flex items-center" style={{ gap: 'var(--tp-space-3)' }}>
        <LogoMark className="size-[1.6em] rounded-[0.4em]" style={{ backgroundColor: 'var(--tp-primary-500)' }} />
        <span className="font-semibold" style={{ ...heading, fontSize: '1.15em' }}>
          Northstar
        </span>
      </div>
      <nav aria-label="Sample navigation" className="hidden items-center sm:flex" style={{ gap: 'var(--tp-space-6)' }}>
        <span className="font-semibold">Overview</span>
        <span className="text-muted-foreground">Projects</span>
        <span className="text-muted-foreground">Team</span>
      </nav>
      <span
        className="flex size-[2.1em] items-center justify-center rounded-full text-[0.8em] font-semibold"
        style={{ backgroundColor: 'var(--tp-primary-100)', color: 'var(--tp-primary-700)' }}
      >
        AM
      </span>
    </header>
  )
}

export function StatCard({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface" style={{ padding: 'var(--tp-space-5)' }}>
      <p className="text-[0.875em] text-muted-foreground">{label}</p>
      <p className="flex items-center" style={{ gap: 'var(--tp-space-3)', marginTop: 'var(--tp-space-3)' }}>
        <span className="font-bold tracking-tight" style={{ ...heading, fontSize: 'var(--tp-type-5)' }}>
          {value}
        </span>
        <span
          className="rounded-full px-[0.6em] py-[0.2em] text-[0.7em] font-semibold"
          style={{ backgroundColor: 'var(--tp-secondary-50)', color: 'var(--tp-secondary-700)' }}
        >
          {delta}
        </span>
      </p>
    </div>
  )
}

export function ProjectCard() {
  return (
    <article className="flex flex-col rounded-xl border border-border bg-surface" style={{ padding: 'var(--tp-space-5)', gap: 'var(--tp-space-5)' }}>
      <div className="flex items-start justify-between">
        <div className="flex items-center" style={{ gap: 'var(--tp-space-3)' }}>
          <span
            aria-hidden="true"
            className="flex size-[2.4em] items-center justify-center rounded-lg font-bold"
            style={{ backgroundColor: 'var(--tp-primary-100)', color: 'var(--tp-primary-600)' }}
          >
            N
          </span>
          <div>
            <h4 className="font-semibold" style={{ ...heading, fontSize: '1.1em' }}>
              New mobile experience
            </h4>
            <p className="text-[0.85em] text-muted-foreground">Product design</p>
          </div>
        </div>
        <MoreHorizontal className="size-[1.2em] text-muted-foreground" aria-hidden="true" />
      </div>
      <p className="text-[0.875em] text-muted-foreground">
        Design and prototype the next generation mobile app experience.
      </p>
      <div>
        <div className="flex justify-between text-[0.85em]" style={{ marginBottom: 'var(--tp-space-2)' }}>
          <span className="text-muted-foreground">Progress</span>
          <span className="font-semibold">68%</span>
        </div>
        <div className="h-[0.4em] overflow-hidden rounded-full bg-subtle">
          <div className="h-full w-[68%] rounded-full" style={{ backgroundColor: 'var(--tp-primary-500)' }} />
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <div className="flex -space-x-1">
          {['AM', 'JL', '+3'].map((initials) => (
            <span
              key={initials}
              className="flex size-[1.9em] items-center justify-center rounded-full border-2 border-surface bg-subtle text-[0.65em] font-semibold text-muted-foreground"
            >
              {initials}
            </span>
          ))}
        </div>
        <span className="text-[0.85em] text-muted-foreground">Due May 24</span>
      </div>
    </article>
  )
}

export function InviteCard() {
  const field = 'w-full rounded-lg border border-input bg-surface text-[0.875em] text-foreground'
  return (
    <form
      className="flex flex-col rounded-xl border border-border bg-surface"
      style={{ padding: 'var(--tp-space-5)', gap: 'var(--tp-space-4)' }}
      onSubmit={(e) => e.preventDefault()}
      aria-label="Invite a teammate (sample)"
    >
      <div>
        <h4 style={{ ...heading, fontSize: '1.1em' }}>Invite a teammate</h4>
        <p className="text-[0.85em] text-muted-foreground">Collaborate with someone new.</p>
      </div>
      <label className="flex flex-col text-[0.85em] font-semibold" style={{ gap: 'var(--tp-space-2)' }}>
        Email address
        <input
          type="email"
          placeholder="name@company.com"
          className={`${field} font-normal focus-ring`}
          style={{ padding: 'var(--tp-space-3)' }}
        />
      </label>
      <label className="flex flex-col text-[0.85em] font-semibold" style={{ gap: 'var(--tp-space-2)' }}>
        Role
        <select className={`${field} font-medium focus-ring`} style={{ padding: 'var(--tp-space-3)' }} defaultValue="editor">
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      <div className="flex justify-end" style={{ gap: 'var(--tp-space-3)' }}>
        <button
          type="button"
          className="focus-ring rounded-lg border border-input font-semibold"
          style={{ padding: 'var(--tp-space-2) var(--tp-space-4)' }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="focus-ring rounded-lg font-semibold text-white"
          style={{ padding: 'var(--tp-space-2) var(--tp-space-4)', backgroundColor: 'var(--tp-primary-500)' }}
        >
          Send invite
        </button>
      </div>
    </form>
  )
}
