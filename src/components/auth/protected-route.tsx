import { useEffect, useRef } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/core/modules/user/infra/context/auth-context'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, checkAuth } = useAuth()
  const navigate = useNavigate()
  const checkedRef = useRef(false)

  useEffect(() => {
    if (!isLoading && !checkedRef.current) {
      checkedRef.current = true
      const verifyAuth = async () => {
        const isValid = await checkAuth()
        if (!isValid) {
          navigate({ to: '/login', search: { message: '' } })
        }
      }
      verifyAuth()
    }
  }, [isLoading, checkAuth, navigate])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
} 