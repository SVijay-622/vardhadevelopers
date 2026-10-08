import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { NavToneContext } from './navTone'

/**
 * Tracks whether the mounted page opens on a light background. Light pages register
 * while mounted, so the navbar starts solid instead of transparent over them.
 */
export function NavToneProvider({ children }: { children: ReactNode }) {
  const [lightPages, setLightPages] = useState(0)
  const register = useCallback(() => {
    setLightPages((n) => n + 1)
    return () => setLightPages((n) => n - 1)
  }, [])
  const value = useMemo(() => ({ lightPages, register }), [lightPages, register])
  return <NavToneContext.Provider value={value}>{children}</NavToneContext.Provider>
}
