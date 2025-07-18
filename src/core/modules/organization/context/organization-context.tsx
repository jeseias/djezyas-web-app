import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react"
import { useNavigate } from '@tanstack/react-router'
import type { Organization } from "../domain/entities/organization"
import { useApiLoadMyOrganizations } from "../infra/hooks"
import { useAuth } from "@/core/modules/user/infra/context/auth-context"
import { cookies } from "@/lib/cookies"

type OrganizationContextType = {
  organization: Organization.Summary | null
  isLoading: boolean
  allMyOrganizations: Organization.Summary[]
  setOrganization: (organization: Organization.Summary) => void
  clearOrganization: () => void
  hasOrganizations: boolean
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined)

interface OrganizationProviderProps extends PropsWithChildren {
  requireOrganization?: boolean
}

export const OrganizationProvider = ({ children }: OrganizationProviderProps) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const { data, isLoading: orgLoading } = useApiLoadMyOrganizations()
  const navigate = useNavigate()

  const [selectedOrganization, setSelectedOrganization] = useState<Organization.Summary | null>(null)

  const allMyOrganizations = data?.loadMyOrganizations.organizations || []
  const hasOrganizations = allMyOrganizations.length > 0

  const isLoading = authLoading || (isAuthenticated && orgLoading)

  // Load organization from cookies on initial load
  useEffect(() => {
    if (hasOrganizations && !selectedOrganization) {
      const savedOrganizationId = cookies.getSelectedOrganization()
      
      if (savedOrganizationId) {
        // Try to find the saved organization in the user's organizations
        const savedOrg = allMyOrganizations.find(org => org.id === savedOrganizationId)
        if (savedOrg) {
          setSelectedOrganization(savedOrg)
          return
        }
      }
      
      // Fallback to first organization if saved org not found or no saved org
      setSelectedOrganization(allMyOrganizations[0])
    }
  }, [hasOrganizations, selectedOrganization, allMyOrganizations])

  useEffect(() => {
    if (!isLoading && !hasOrganizations) {
      navigate({ to: '/create-organization' })
    }
  }, [ isLoading, hasOrganizations, navigate])

  // Custom setOrganization function that also saves to cookies
  const setOrganizationWithPersistence = (organization: Organization.Summary) => {
    setSelectedOrganization(organization)
    cookies.setSelectedOrganization(organization.id)
  }

  // Function to clear organization from state and cookies
  const clearOrganization = () => {
    setSelectedOrganization(null)
    cookies.removeSelectedOrganization()
  }

  const value = useMemo(() => ({
    organization: selectedOrganization,
    setOrganization: setOrganizationWithPersistence,
    clearOrganization,
    allMyOrganizations,
    hasOrganizations,
    isLoading,
  }), [selectedOrganization, allMyOrganizations, hasOrganizations, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!hasOrganizations) {
    return null
  }

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  )
}

export const useOrganization = (): OrganizationContextType => {
  const context = useContext(OrganizationContext)
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider')
  }
  return context
}