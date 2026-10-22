import {
  FONTS,
  TYPE_SCALES,
  formatNumber,
  getPalette,
  getSpacingScale,
  getTypeSteps,
  type TokenState,
} from './tokens'

export type ExportFormat = 'css' | 'tailwind' | 'json'

export const EXPORT_FORMATS: {
  id: ExportFormat
  label: string
  filename: string
  mime: string
}[] = [
  { id: 'css', label: 'CSS Variables', filename: 'token-playground.css', mime: 'text/css' },
  { id: 'tailwind', label: 'Tailwind Config', filename: 'tailwind.config.js', mime: 'text/javascript' },
  { id: 'json', label: 'JSON', filename: 'tokens.json', mime: 'application/json' },
]

function fontFamily(key: TokenState['headingFont']) {
  const font = FONTS[key]
  return `"${font.label}", ${font.fallback}`
}

export function toCss(state: TokenState) {
  const lines = [':root {']
  lines.push(`  --font-heading: ${fontFamily(state.headingFont)};`)
  lines.push(`  --font-body: ${fontFamily(state.bodyFont)};`)
  lines.push(`  --type-base: ${state.baseFontSize}px;`)
  lines.push(`  --type-ratio: ${TYPE_SCALES[state.scale].ratio};`)
  lines.push('')
  getTypeSteps(state.baseFontSize, state.scale).forEach((s) => {
    lines.push(`  --${s.token}: ${formatNumber(s.rem)}rem;`)
  })
  lines.push('')
  getSpacingScale(state.spacingBase).forEach((s) => {
    lines.push(`  --${s.token}: ${s.px}px;`)
  })
  getPalette(state.colors).forEach(({ role, shades }) => {
    lines.push('')
    shades.forEach(({ step, hex }) => lines.push(`  --color-${role}-${step}: ${hex};`))
  })
  lines.push('}')
  return lines.join('\n')
}

export function toTailwind(state: TokenState) {
  const steps = getTypeSteps(state.baseFontSize, state.scale)
  const space = getSpacingScale(state.spacingBase)
  const palette = getPalette(state.colors)
  const indent = (n: number) => ' '.repeat(n)

  const lines = ['/** @type {import(\'tailwindcss\').Config} */', 'module.exports = {', '  theme: {', '    extend: {']
  lines.push(`${indent(6)}fontFamily: {`)
  lines.push(`${indent(8)}heading: ['${FONTS[state.headingFont].label}', '${FONTS[state.headingFont].fallback}'],`)
  lines.push(`${indent(8)}body: ['${FONTS[state.bodyFont].label}', '${FONTS[state.bodyFont].fallback}'],`)
  lines.push(`${indent(6)}},`)
  lines.push(`${indent(6)}fontSize: {`)
  steps.forEach((s) => lines.push(`${indent(8)}'${s.token}': '${formatNumber(s.rem)}rem',`))
  lines.push(`${indent(6)}},`)
  lines.push(`${indent(6)}spacing: {`)
  space.forEach((s) => lines.push(`${indent(8)}'${s.token}': '${formatNumber(s.rem)}rem',`))
  lines.push(`${indent(6)}},`)
  lines.push(`${indent(6)}colors: {`)
  palette.forEach(({ role, shades }) => {
    lines.push(`${indent(8)}${role}: {`)
    shades.forEach(({ step, hex }) => lines.push(`${indent(10)}${step}: '${hex}',`))
    lines.push(`${indent(8)}},`)
  })
  lines.push(`${indent(6)}},`)
  lines.push('    },', '  },', '}')
  return lines.join('\n')
}

export function toJson(state: TokenState) {
  const data = {
    typography: {
      fontFamily: {
        heading: fontFamily(state.headingFont),
        body: fontFamily(state.bodyFont),
      },
      base: `${state.baseFontSize}px`,
      ratio: TYPE_SCALES[state.scale].ratio,
      scale: Object.fromEntries(
        getTypeSteps(state.baseFontSize, state.scale).map((s) => [s.token, `${formatNumber(s.rem)}rem`]),
      ),
    },
    spacing: Object.fromEntries(getSpacingScale(state.spacingBase).map((s) => [s.token, `${s.px}px`])),
    color: Object.fromEntries(
      getPalette(state.colors).map(({ role, shades }) => [
        role,
        Object.fromEntries(shades.map(({ step, hex }) => [step, hex])),
      ]),
    ),
  }
  return JSON.stringify(data, null, 2)
}

export function generateExport(format: ExportFormat, state: TokenState) {
  if (format === 'tailwind') return toTailwind(state)
  if (format === 'json') return toJson(state)
  return toCss(state)
}
