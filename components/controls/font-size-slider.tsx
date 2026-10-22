'use client'

import { useId } from 'react'
import { Slider as SliderPrimitive } from '@base-ui/react/slider'

interface FontSizeSliderProps {
  value: number
  min: number
  max: number
  onChange: (value: number) => void
}

export function FontSizeSlider({ value, min, max, onChange }: FontSizeSliderProps) {
  const labelId = useId()

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span id={labelId} className="text-[15px] text-muted-foreground">
          Base font size
        </span>
        <output
          aria-live="polite"
          className="rounded-md bg-subtle px-2 py-0.5 font-mono text-sm tabular-nums text-foreground"
        >
          {value}px
        </output>
      </div>
      <SliderPrimitive.Root
        value={value}
        min={min}
        max={max}
        step={1}
        onValueChange={(next) => onChange(Array.isArray(next) ? next[0] : next)}
        aria-labelledby={labelId}
        thumbAlignment="edge"
      >
        <SliderPrimitive.Control className="relative flex h-5 w-full touch-none items-center select-none">
          <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full bg-subtle">
            <SliderPrimitive.Indicator className="rounded-full bg-brand" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            aria-label="Base font size"
            getAriaValueText={(formatted) => `${formatted} pixels`}
            className="block size-[18px] rounded-full border-2 border-brand bg-surface shadow-sm transition-shadow outline-none has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand/30 hover:ring-4 hover:ring-brand/15"
          />
        </SliderPrimitive.Control>
      </SliderPrimitive.Root>
      <div className="flex justify-between text-xs text-muted-foreground" aria-hidden="true">
        <span>{min}px</span>
        <span>{max}px</span>
      </div>
    </div>
  )
}
