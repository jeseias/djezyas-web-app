import { useQuery } from "@tanstack/react-query"
import { getOrganizationMembers } from "../api/get-organization-members"
import { useAuth } from "@/core/modules/user/infra/context/auth-context"
import { useOrganization } from "../../context/organization-context"

export const useApiGetOrganizationMembers = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const { organization } = useOrganization()

  const organizationId = organization?.id!

  return useQuery({
    queryKey: ['getOrganizationMembers', organizationId],
    queryFn: async () => {
      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      
      return (await getOrganizationMembers({ organizationId })).data
    },
    enabled: isAuthenticated && !authLoading && !!organizationId,
    retry: (failureCount, error) => {
      if (failureCount >= 3) return false
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as any
        if (axiosError.response?.status === 401) return false
      }
      
      return true 
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), 
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, 
  })
} 