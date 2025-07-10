import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react"
import type { User } from "../../domain/entities"
import type { Login } from "../api"
import Cookies from "js-cookie";
import { Constants } from "@/core/config/constants";

type SignInProps = Login.Response['data']['login']

type AuthContextType = {
  user: User.Model | null
  isAuthenticated: boolean
  isLoading: boolean
  signIn: (params: SignInProps) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User.Model | null>(() => {
    const userData = Cookies.get(Constants.USER_DATA_KEY)
    if (!userData) {
      return null
    }

    return JSON.parse(userData) as User.Model
  })
  
  const [tokens, setTokens] = useState<Login.Tokens | null>(() => {
    const accessToken = Cookies.get(Constants.ACCESS_TOKEN_KEY)
    const refreshToken = Cookies.get(Constants.REFRESH_TOKEN_KEY)
    const accessTokenExpiresIn = Cookies.get(Constants.ACCESS_TOKEN_EXPIRES_IN_KEY)
    const refreshTokenExpiresIn = Cookies.get(Constants.REFRESH_TOKEN_EXPIRES_IN_KEY)

    if (!accessToken || !refreshToken || !accessTokenExpiresIn || !refreshTokenExpiresIn) {
      return null
    }

    return {
      accessToken,
      refreshToken,
      accessTokenExpiresIn,
      refreshTokenExpiresIn,
    }
  })
  
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user && tokens) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [user, tokens])

  useEffect(() => {
    const handleForceLogout = () => {
      console.log('Force logout event received, signing out user')
      // Clear cookies and state directly to avoid dependency issues
      Cookies.remove(Constants.USER_DATA_KEY)
      Cookies.remove(Constants.ACCESS_TOKEN_KEY)
      Cookies.remove(Constants.REFRESH_TOKEN_KEY)
      Cookies.remove(Constants.ACCESS_TOKEN_EXPIRES_IN_KEY)
      Cookies.remove(Constants.REFRESH_TOKEN_EXPIRES_IN_KEY)

      setUser(null)
      setTokens(null)
      setIsAuthenticated(false)
    }

    console.log('Setting up force-logout event listener')
    window.addEventListener('force-logout', handleForceLogout)

    return () => {
      console.log('Cleaning up force-logout event listener')
      window.removeEventListener('force-logout', handleForceLogout)
    }
  }, [])

  const signIn = async (params: SignInProps) => {
    setIsLoading(true)

    try {
      Cookies.set(Constants.USER_DATA_KEY, JSON.stringify(params.user))
      Cookies.set(Constants.ACCESS_TOKEN_KEY, params.tokens.accessToken)
      Cookies.set(Constants.REFRESH_TOKEN_KEY, params.tokens.refreshToken)
      Cookies.set(Constants.ACCESS_TOKEN_EXPIRES_IN_KEY, params.tokens.accessTokenExpiresIn)
      Cookies.set(Constants.REFRESH_TOKEN_EXPIRES_IN_KEY, params.tokens.refreshTokenExpiresIn)

      setUser(params.user)
      setTokens(params.tokens)
      setIsAuthenticated(true)
    } catch (error) {
      setIsAuthenticated(false)
      setUser(null)
      setTokens(null)
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    Cookies.remove(Constants.USER_DATA_KEY)
    Cookies.remove(Constants.ACCESS_TOKEN_KEY)
    Cookies.remove(Constants.REFRESH_TOKEN_KEY)
    Cookies.remove(Constants.ACCESS_TOKEN_EXPIRES_IN_KEY)
    Cookies.remove(Constants.REFRESH_TOKEN_EXPIRES_IN_KEY)

    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}