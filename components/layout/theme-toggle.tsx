'use client'

import { useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { SegmentedControl } from '@/components/controls/segmented-control'

const subscribe = () => () => {}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
  const current = mounted && resolvedTheme === 'dark' ? 'dark' : 'light'

  return (
    <SegmentedControl
      label="Color mode"
      size="sm"
      value={current}
      onChange={(v) => setTheme(v)}
      className="border border-border bg-transparent"
      options={[
        { value: 'light', ariaLabel: 'Light mode', label: <Sun className="size-4" aria-hidden="true" /> },
        { value: 'dark', ariaLabel: 'Dark mode', label: <Moon className="size-4" aria-hidden="true" /> },
      ]}
    />
  )
}
