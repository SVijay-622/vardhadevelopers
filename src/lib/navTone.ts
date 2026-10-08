import { createContext, useContext, useEffect } from 'react'

type NavTone = { lightPages: number; register: () => () => void }

export const NavToneContext = createContext<NavTone>({ lightPages: 0, register: () => () => {} })

/** Call from any page or header component that renders on a light background at the top. */
export function useLightNav() {
  const { register } = useContext(NavToneContext)
  useEffect(() => register(), [register])
}

export const useIsLightPage = () => useContext(NavToneContext).lightPages > 0
