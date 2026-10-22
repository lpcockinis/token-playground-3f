'use client'

import { useTokens } from '@/components/tokens-provider'
import {
  COLOR_ROLES,
  FONTS,
  MAX_FONT_SIZE,
  MIN_FONT_SIZE,
  TYPE_SCALES,
  fontStack,
  getSpacingScale,
  type FontKey,
  type SpacingBase,
  type TypeScaleKey,
} from '@/lib/tokens'
import { ColorField } from './color-field'
import { ControlSection } from './control-section'
import { FontSizeSlider } from './font-size-slider'
import { LabeledSelect } from './labeled-select'
import { SegmentedControl } from './segmented-control'
import { SpacingMiniChart } from './spacing-mini-chart'

const scaleOptions = (Object.keys(TYPE_SCALES) as TypeScaleKey[]).map((key) => ({
  value: key,
  label: TYPE_SCALES[key].label,
}))

const fontOptions = (Object.keys(FONTS) as FontKey[]).map((key) => ({
  value: key,
  label: FONTS[key].label,
  style: { fontFamily: fontStack(key) },
}))

const spacingOptions: { value: SpacingBase; label: string }[] = [
  { value: 4, label: '4px' },
  { value: 8, label: '8px' },
]

export function ControlsPanel() {
  const { tokens, update, setColor, resetKey } = useTokens()

  return (
    <div key={resetKey}>
      <ControlSection title="Typography">
        <FontSizeSlider
          value={tokens.baseFontSize}
          min={MIN_FONT_SIZE}
          max={MAX_FONT_SIZE}
          onChange={(v) => update('baseFontSize', v)}
        />
        <LabeledSelect
          label="Type scale"
          value={tokens.scale}
          options={scaleOptions}
          onChange={(v) => update('scale', v)}
        />
        <LabeledSelect
          label="Heading font"
          value={tokens.headingFont}
          options={fontOptions}
          onChange={(v) => update('headingFont', v)}
        />
        <LabeledSelect
          label="Body font"
          value={tokens.bodyFont}
          options={fontOptions}
          onChange={(v) => update('bodyFont', v)}
        />
      </ControlSection>

      <ControlSection title="Spacing">
        <div className="flex flex-col gap-2.5">
          <span className="text-[15px] text-muted-foreground" aria-hidden="true">
            Base unit
          </span>
          <SegmentedControl
            label="Spacing base unit"
            value={tokens.spacingBase}
            options={spacingOptions}
            onChange={(v) => update('spacingBase', v)}
          />
        </div>
        <SpacingMiniChart steps={getSpacingScale(tokens.spacingBase)} />
      </ControlSection>

      <ControlSection title="Color">
        {COLOR_ROLES.map(({ role, label }) => (
          <ColorField key={role} label={label} value={tokens.colors[role]} onChange={(hex) => setColor(role, hex)} />
        ))}
      </ControlSection>
    </div>
  )
}
