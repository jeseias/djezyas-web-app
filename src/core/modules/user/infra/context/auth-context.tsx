import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { toast } from 'sonner'
import { me } from '../api/me'
import { refreshToken } from '../api/refresh-token'
import { logout } from '../api/logout'

export interface User {
  id: string
  name: string
  email: string
  username: string
  phone: string
  bio?: string
  avatar?: string
  status: 'active' | 'inactive' | 'pending' | 'blocked'
  role: 'admin' | 'user'
  emailVerifiedAt?: string
  createdAt: string
  updatedAt: string
}

export interface Session {
  id: string
  userId: string
  accessTokenExpiresAt: string
  refreshTokenExpiresAt: string
  deviceInfo: {
    userAgent: string
    ipAddress: string
    deviceType?: 'mobile' | 'desktop' | 'tablet'
    browser?: string
    os?: string
  }
  isActive: boolean
  createdAt: string
  lastUsedAt: string
}

export interface Tokens {
  accessToken: string
  refreshToken: string
  accessTokenExpiresIn: string
  refreshTokenExpiresIn: string
}

export interface AuthState {
  user: User | null
  session: Session | null
  tokens: Tokens | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthContextType extends AuthState {
  signIn: (user: User, session: Session, tokens: Tokens) => void
  signOut: () => Promise<void>
  refreshTokens: () => Promise<boolean>
  checkAuth: () => Promise<boolean>
}

const COOKIE_OPTIONS = {
  path: '/',
  secure: true,
  sameSite: 'strict' as const,
  maxAge: 30 * 24 * 60 * 60, // 30 days
}

const setCookie = (name: string, value: string, options = {}) => {
  const opts = { ...COOKIE_OPTIONS, ...options }
  document.cookie = `${name}=${value}; path=${opts.path}; secure=${opts.secure}; samesite=${opts.sameSite}; max-age=${opts.maxAge}`
}

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

const getBrowserInfo = () => {
  const userAgent = navigator.userAgent
  if (userAgent.includes('Edg')) return 'Edge'
  if (userAgent.includes('Chrome')) return 'Chrome'
  if (userAgent.includes('Firefox')) return 'Firefox'
  if (userAgent.includes('Safari')) return 'Safari'
  return 'Unknown'
}

const getOSInfo = () => {
  const userAgent = navigator.userAgent
  if (userAgent.includes('Windows')) return 'Windows'
  if (userAgent.includes('Mac')) return 'macOS'
  if (userAgent.includes('Linux')) return 'Linux'
  if (userAgent.includes('Android')) return 'Android'
  if (userAgent.includes('iOS')) return 'iOS'
  return 'Unknown'
}

const getDeviceType = (): 'mobile' | 'desktop' | 'tablet' => {
  const userAgent = navigator.userAgent
  if (/Tablet|iPad/i.test(userAgent)) return 'tablet'
  if (/Mobi|Android/i.test(userAgent)) return 'mobile'
  return 'desktop'
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    tokens: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    const loadAuthFromCookies = () => {
      try {
        const userCookie = getCookie('user')
        const tokensCookie = getCookie('tokens')
        const sessionCookie = getCookie('session')

        if (userCookie && tokensCookie) {
          const user = JSON.parse(userCookie)
          const tokens = JSON.parse(tokensCookie)
          const session = sessionCookie ? JSON.parse(sessionCookie) : null
          
          setState({
            user,
            session,
            tokens,
            isAuthenticated: true,
            isLoading: false,
          })
        } else {
          setState(prev => ({ ...prev, isLoading: false }))
        }
      } catch (error) {
        console.error('Error loading auth from cookies:', error)
        signOut()
      }
    }

    loadAuthFromCookies()
  }, [])

  const isTokenExpired = (expiresIn: string): boolean => {
    const now = Math.floor(Date.now() / 1000)
    return now >= parseInt(expiresIn)
  }

  const isTokenExpiringSoon = (expiresIn: string): boolean => {
    const now = Math.floor(Date.now() / 1000)
    const fiveMinutes = 5 * 60
    return (parseInt(expiresIn) - now) <= fiveMinutes
  }

  const signIn = (user: User, session: Session, tokens: Tokens) => {
    setCookie('user', JSON.stringify(user))
    setCookie('session', JSON.stringify(session))
    setCookie('tokens', JSON.stringify(tokens))
    
    setState({
      user,
      session,
      tokens,
      isAuthenticated: true,
      isLoading: false,
    })
  }

  const signOut = async () => {
    try {
      if (state.tokens?.accessToken) {
        console.log('Calling logout API, tokens cookie:', getCookie('tokens'))
        await logout()
        console.log('Logout API call finished')
      }
    } catch (error) {
      console.error('Logout API error:', error)
    } finally {
      document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie = 'tokens=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      setState({
        user: null,
        session: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  }

  const refreshTokens = async (): Promise<boolean> => {
    if (!state.tokens?.refreshToken) {
      signOut()
      return false
    }

    try {
      const deviceInfo = {
        userAgent: navigator.userAgent,
        deviceType: getDeviceType(),
        browser: getBrowserInfo(),
        os: getOSInfo(),
      }

      const response = await refreshToken({
        refreshToken: state.tokens.refreshToken,
        deviceInfo,
      })

      const { user, tokens } = response.data.refreshToken
      
      const convertedTokens = {
        ...tokens,
        accessTokenExpiresIn: tokens.accessTokenExpiresIn.toString(),
        refreshTokenExpiresIn: tokens.refreshTokenExpiresIn.toString(),
      }
      
      signIn(user, state.session!, convertedTokens)
      return true
    } catch (error) {
      console.error('Failed to refresh tokens:', error)
      toast.error('Session expired', {
        description: 'Please log in again',
      })
      signOut()
      return false
    }
  }

  const checkAuth = async (): Promise<boolean> => {
    if (!state.tokens?.accessToken) {
      signOut()
      return false
    }

    if (isTokenExpired(state.tokens.accessTokenExpiresIn)) {
      return await refreshTokens()
    }

    if (isTokenExpiringSoon(state.tokens.accessTokenExpiresIn)) {
      const refreshed = await refreshTokens()
      if (!refreshed) return false
    }

    try {
      await me()
      return true
    } catch (error) {
      console.error('Token verification failed:', error)
      return await refreshTokens()
    }
  }

  const value: AuthContextType = {
    ...state,
    signIn,
    signOut,
    refreshTokens,
    checkAuth,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 