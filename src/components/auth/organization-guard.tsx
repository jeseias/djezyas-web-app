import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useOrganization } from '../../core/modules/organization/context/organization-context'

interface OrganizationGuardProps {
  children: React.ReactNode
}

export function OrganizationGuard({ children }: OrganizationGuardProps) {
  const { hasOrganizations, isLoading } = useOrganization()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !hasOrganizations) {
      navigate({ to: '/create-organization' })
    }
  }, [isLoading, hasOrganizations, navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Don't render children if no organizations exist (will redirect)
  if (!hasOrganizations) {
    return null
  }

  return <>{children}</>
} 