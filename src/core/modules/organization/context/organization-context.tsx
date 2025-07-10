import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react"
import type { Organization } from "../domain/entities/organization"
import { useApiLoadMyOrganization } from "../infra/hooks"
import { useAuth } from "@/core/modules/user/infra/context/auth-context"

type OrganizationContextType = {
  organization: Organization.Summary | null
  isLoading: boolean
  allMyOrganizations: Organization.Summary[]
  setOrganization: (organization: Organization.Summary) => void
  hasOrganizations: boolean
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined)

export const OrganizationProvider = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const { data, isLoading: orgLoading } = useApiLoadMyOrganization()

  const [selectedOrganization, setSelectedOrganization] = useState<Organization.Summary | null>(null)

  const allMyOrganizations = data?.loadMyOrganizations.organizations || []
  const hasOrganizations = allMyOrganizations.length > 0

  const isLoading = authLoading || (isAuthenticated && orgLoading)

  useEffect(() => {
    if (hasOrganizations && !selectedOrganization) {
      setSelectedOrganization(allMyOrganizations[0])
    }
  }, [hasOrganizations, selectedOrganization, allMyOrganizations])

  const value = useMemo(() => ({
    organization: selectedOrganization,
    setOrganization: setSelectedOrganization,
    allMyOrganizations,
    hasOrganizations,
    isLoading,
  }), [selectedOrganization, allMyOrganizations, hasOrganizations, isLoading])

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