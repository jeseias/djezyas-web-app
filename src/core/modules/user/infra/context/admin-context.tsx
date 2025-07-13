import { createContext, useContext, useEffect } from "react"
import { useAuth } from "./auth-context"
import { useNavigate } from "@tanstack/react-router"

export const AdminContext = createContext<AdminContextType | null>(null)

export type AdminContextType = {
  isAdmin: boolean
  setIsAdmin: (isAdmin: boolean) => void
}

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  if (!user) {
    navigate({ to: '/login', search: { message: 'Please login to continue' } })
    return null
  }
  
  const isAdmin = user.role === 'admin'

  useEffect(() => {
    if (!isAdmin) {
      navigate({ to: '/app' })
    }
  }, [isAdmin, navigate])
  
  
  return (
    <AdminContext.Provider value={{ isAdmin: false, setIsAdmin: () => {} }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => {
  return useContext(AdminContext)
}