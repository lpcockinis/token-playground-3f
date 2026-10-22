export type ColorRole = 'primary' | 'secondary' | 'neutral'
export type SpacingBase = 4 | 8

export interface TokenState {
  baseFontSize: number
  scale: TypeScaleKey
  headingFont: FontKey
  bodyFont: FontKey
  spacingBase: SpacingBase
  colors: Record<ColorRole, string>
}

export const TYPE_SCALES = {
  'minor-second': { label: 'Minor Second', ratio: 1.067 },
  'major-second': { label: 'Major Second', ratio: 1.125 },
  'minor-third': { label: 'Minor Third', ratio: 1.2 },
  'major-third': { label: 'Major Third', ratio: 1.25 },
  'perfect-fourth': { label: 'Perfect Fourth', ratio: 1.333 },
  'augmented-fourth': { label: 'Augmented Fourth', ratio: 1.414 },
  'perfect-fifth': { label: 'Perfect Fifth', ratio: 1.5 },
  'golden-ratio': { label: 'Golden Ratio', ratio: 1.618 },
} as const
export type TypeScaleKey = keyof typeof TYPE_SCALES

export const FONTS = {
  inter: { label: 'Inter', cssVar: '--font-inter', fallback: 'sans-serif' },
  geist: { label: 'Geist', cssVar: '--font-geist', fallback: 'sans-serif' },
  'dm-sans': { label: 'DM Sans', cssVar: '--font-dm-sans', fallback: 'sans-serif' },
  'space-grotesk': { label: 'Space Grotesk', cssVar: '--font-space-grotesk', fallback: 'sans-serif' },
  'plex-sans': { label: 'IBM Plex Sans', cssVar: '--font-plex-sans', fallback: 'sans-serif' },
  lora: { label: 'Lora', cssVar: '--font-lora', fallback: 'serif' },
  fraunces: { label: 'Fraunces', cssVar: '--font-fraunces', fallback: 'serif' },
} as const
export type FontKey = keyof typeof FONTS

export const COLOR_ROLES: { role: ColorRole; label: string }[] = [
  { role: 'primary', label: 'Primary' },
  { role: 'secondary', label: 'Secondary' },
  { role: 'neutral', label: 'Neutral' },
]

export const DEFAULT_TOKENS: TokenState = {
  baseFontSize: 16,
  scale: 'major-third',
  headingFont: 'inter',
  bodyFont: 'inter',
  spacingBase: 8,
  colors: { primary: '#5B5BD6', secondary: '#14B8A6', neutral: '#64748B' },
}

export const MIN_FONT_SIZE = 12
export const MAX_FONT_SIZE = 24

/* Typography */

export interface TypeStep {
  name: string
  token: string
  px: number
  rem: number
  isHeading: boolean
}

const TYPE_STEPS = [
  { name: 'Display', exp: 6, isHeading: true },
  { name: 'Heading 1', exp: 5, isHeading: true },
  { name: 'Heading 2', exp: 4, isHeading: true },
  { name: 'Heading 3', exp: 3, isHeading: true },
  { name: 'Heading 4', exp: 2, isHeading: true },
  { name: 'Heading 5', exp: 1, isHeading: true },
  { name: 'Body', exp: 0, isHeading: false },
  { name: 'Caption', exp: -1, isHeading: false },
]

export function getTypeSteps(base: number, scale: TypeScaleKey): TypeStep[] {
  const ratio = TYPE_SCALES[scale].ratio
  return TYPE_STEPS.map((step, i) => {
    const px = base * Math.pow(ratio, step.exp)
    return {
      name: step.name,
      token: `type-${i + 1}`,
      px,
      rem: px / 16,
      isHeading: step.isHeading,
    }
  })
}

export function fontStack(key: FontKey) {
  const font = FONTS[key]
  return `var(${font.cssVar}), ${font.fallback}`
}

/* Spacing */

const SPACING_MULTIPLIERS: Record<SpacingBase, number[]> = {
  4: [1, 2, 3, 4, 5, 6, 8, 10],
  8: [0.5, 1, 1.5, 2, 3, 4, 6, 8],
}

export interface SpaceStep {
  token: string
  px: number
  rem: number
}

export function getSpacingScale(base: SpacingBase): SpaceStep[] {
  return SPACING_MULTIPLIERS[base].map((m, i) => {
    const px = base * m
    return { token: `space-${i + 1}`, px, rem: px / 16 }
  })
}

/* Color */

export const SHADE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const
export type ShadeStep = (typeof SHADE_STEPS)[number]

const TINT_AMOUNT: Partial<Record<ShadeStep, number>> = {
  50: 0.92,
  100: 0.82,
  200: 0.65,
  300: 0.45,
  400: 0.22,
}
const SHADE_AMOUNT: Partial<Record<ShadeStep, number>> = {
  600: 0.84,
  700: 0.7,
  800: 0.55,
  900: 0.4,
}

const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i

export function isValidHex(value: string) {
  return HEX_PATTERN.test(value.trim())
}

export function normalizeHex(value: string) {
  let hex = value.trim().replace('#', '')
  if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('')
  return `#${hex.toUpperCase()}`
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(normalizeHex(hex).slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function rgbToHex(rgb: number[]) {
  return `#${rgb
    .map((c) => Math.round(Math.min(255, Math.max(0, c))).toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()}`
}

export interface Shade {
  step: ShadeStep
  hex: string
}

export function generateShades(baseHex: string): Shade[] {
  const rgb = hexToRgb(baseHex)
  return SHADE_STEPS.map((step) => {
    const tint = TINT_AMOUNT[step]
    const shade = SHADE_AMOUNT[step]
    if (tint !== undefined) return { step, hex: rgbToHex(rgb.map((c) => c + (255 - c) * tint)) }
    if (shade !== undefined) return { step, hex: rgbToHex(rgb.map((c) => c * shade)) }
    return { step, hex: normalizeHex(baseHex) }
  })
}

export function relativeLuminance(hex: string) {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function readableTextOn(hex: string) {
  return relativeLuminance(hex) > 0.36 ? '#18181B' : '#FFFFFF'
}

export function getPalette(colors: TokenState['colors']) {
  return COLOR_ROLES.map(({ role, label }) => ({
    role,
    label,
    base: normalizeHex(colors[role]),
    shades: generateShades(colors[role]),
  }))
}

/** CSS custom properties used to drive the live preview. */
export function getPreviewVars(state: TokenState): Record<string, string> {
  const vars: Record<string, string> = {
    '--tp-font-heading': fontStack(state.headingFont),
    '--tp-font-body': fontStack(state.bodyFont),
    '--tp-base': `${state.baseFontSize}px`,
  }
  getTypeSteps(state.baseFontSize, state.scale).forEach((s) => {
    vars[`--tp-${s.token}`] = `${s.px}px`
  })
  getSpacingScale(state.spacingBase).forEach((s) => {
    vars[`--tp-${s.token}`] = `${s.px}px`
  })
  getPalette(state.colors).forEach(({ role, shades }) => {
    shades.forEach(({ step, hex }) => {
      vars[`--tp-${role}-${step}`] = hex
    })
  })
  return vars
}

export function formatNumber(n: number, digits = 3) {
  return Number(n.toFixed(digits)).toString()
}
