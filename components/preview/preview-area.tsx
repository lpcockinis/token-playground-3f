'use client'

import { useTokens } from '@/components/tokens-provider'
import { getPreviewVars } from '@/lib/tokens'
import { ColorsPreview } from './colors-preview'
import { SampleUiPreview } from './sample-ui/sample-ui-preview'
import { SpacingPreview } from './spacing-preview'
import { TypographyPreview } from './typography-preview'
import { UnderlineTabs, UnderlineTabsList, UnderlineTabsPanel } from './underline-tabs'

const TABS = [
  { value: 'typography', label: 'Typography', Component: TypographyPreview },
  { value: 'spacing', label: 'Spacing', Component: SpacingPreview },
  { value: 'colors', label: 'Colors', Component: ColorsPreview },
  { value: 'sample', label: 'Sample UI', Component: SampleUiPreview },
]

export function PreviewArea() {
  const { tokens } = useTokens()

  return (
    <section
      aria-labelledby="preview-title"
      className="mx-auto w-full max-w-[1280px] px-4 pt-6 pb-28 sm:px-8 md:pb-16 lg:px-11 lg:pt-10"
      style={getPreviewVars(tokens) as React.CSSProperties}
    >
      <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Live preview</p>
      <h1 id="preview-title" className="mt-2 text-[28px] leading-tight font-bold tracking-tight text-balance md:text-4xl">
        Your foundations, in context.
      </h1>
      <UnderlineTabs defaultValue="typography" className="mt-6 md:mt-7">
        <UnderlineTabsList label="Preview sections" items={TABS} className="-mx-4 px-1.5 sm:mx-0 sm:px-0" />
        {TABS.map(({ value, Component }) => (
          <UnderlineTabsPanel key={value} value={value} className="focus-ring mt-6 rounded-2xl">
            <Component />
          </UnderlineTabsPanel>
        ))}
      </UnderlineTabs>
    </section>
  )
}
