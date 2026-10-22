import { InviteCard, ProjectCard, SampleNav, StatCard } from './sample-parts'

const STATS = [
  { label: 'Active projects', value: '12', delta: '+8%' },
  { label: 'Tasks completed', value: '84', delta: '+12%' },
  { label: 'Team members', value: '24', delta: '+2' },
]

export function SampleUiPreview() {
  return (
    <div className="bg-dots rounded-2xl border border-border bg-subtle/60 p-3 sm:p-6 lg:px-20 lg:py-6">
      <div
        className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
        style={{ fontFamily: 'var(--tp-font-body)', fontSize: 'var(--tp-base)' }}
      >
        <SampleNav />
        <div className="flex flex-col bg-canvas/40" style={{ padding: 'var(--tp-space-6) var(--tp-space-5)', gap: 'var(--tp-space-5)' }}>
          <div className="flex flex-col justify-between sm:flex-row sm:items-end" style={{ gap: 'var(--tp-space-4)' }}>
            <div>
              <p
                className="text-[0.8em] font-semibold tracking-[0.14em] uppercase"
                style={{ color: 'var(--tp-primary-600)' }}
              >
                Workspace
              </p>
              <h3
                className="tracking-tight"
                style={{ fontFamily: 'var(--tp-font-heading)', fontSize: 'var(--tp-type-4)', marginTop: 'var(--tp-space-2)' }}
              >
                Good morning, Alex.
              </h3>
              <p className="text-muted-foreground" style={{ marginTop: 'var(--tp-space-1)' }}>
                {"Here's what's happening with your projects today."}
              </p>
            </div>
            <button
              type="button"
              className="focus-ring self-start rounded-lg font-semibold text-white sm:self-auto"
              style={{ padding: 'var(--tp-space-3) var(--tp-space-4)', backgroundColor: 'var(--tp-primary-500)' }}
            >
              + New project
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 'var(--tp-space-4)' }}>
            {STATS.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_1fr]" style={{ gap: 'var(--tp-space-4)' }}>
            <ProjectCard />
            <InviteCard />
          </div>
        </div>
      </div>
    </div>
  )
}
