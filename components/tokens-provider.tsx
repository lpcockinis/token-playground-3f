'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { DEFAULT_TOKENS, type ColorRole, type TokenState } from '@/lib/tokens'

interface TokensContextValue {
  tokens: TokenState
  update: <K extends keyof TokenState>(key: K, value: TokenState[K]) => void
  setColor: (role: ColorRole, hex: string) => void
  reset: () => void
  resetKey: number
}

const TokensContext = createContext<TokensContextValue | null>(null)

export function TokensProvider({ children }: { children: React.ReactNode }) {
  const [tokens, setTokens] = useState<TokenState>(DEFAULT_TOKENS)
  const [resetKey, setResetKey] = useState(0)

  const update = useCallback<TokensContextValue['update']>((key, value) => {
    setTokens((prev) => ({ ...prev, [key]: value }))
  }, [])

  const setColor = useCallback((role: ColorRole, hex: string) => {
    setTokens((prev) => ({ ...prev, colors: { ...prev.colors, [role]: hex } }))
  }, [])

  const reset = useCallback(() => {
    setTokens(DEFAULT_TOKENS)
    setResetKey((k) => k + 1)
  }, [])

  const value = useMemo(
    () => ({ tokens, update, setColor, reset, resetKey }),
    [tokens, update, setColor, reset, resetKey],
  )

  return <TokensContext.Provider value={value}>{children}</TokensContext.Provider>
}

export function useTokens() {
  const ctx = useContext(TokensContext)
  if (!ctx) throw new Error('useTokens must be used within TokensProvider')
  return ctx
}
