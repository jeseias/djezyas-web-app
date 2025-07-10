import { useQuery } from "@tanstack/react-query"
import { loadMyOrganizations } from "../api/load-my-organization"
import { useAuth } from "@/core/modules/user/infra/context/auth-context"

export const useApiLoadMyOrganization = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth()

  return useQuery({
    queryKey: ['loadMyOrganizations'],
    queryFn: async () => {
      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      return (await loadMyOrganizations()).data
    },
    enabled: isAuthenticated && !authLoading,
    retry: (failureCount, error) => {
      if (failureCount >= 3) return false
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as any
        if (axiosError.response?.status === 401) return false
      }
      
      return true 
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, 
    })
}