import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { loadMyOrganizations } from "../api/load-my-organization"
import { useAuth } from "@/core/modules/user/infra/context/auth-context"

export const loadMyOrganization = async () => {
  const result = await loadMyOrganizations()
  return result.data
}

export const useApiLoadMyOrganizations = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth()

  return useQuery({
    queryKey: ['loadMyOrganizations'],
      queryFn: loadMyOrganization,
    enabled: isAuthenticated && !authLoading,
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


type UseApiLoadMyOrganizationMutationProps = {
  cb: () => void
}
export const useApiLoadMyOrganizationMutation = (params?: UseApiLoadMyOrganizationMutationProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: loadMyOrganization,
    onSuccess(data) {
      queryClient.setQueryData(['loadMyOrganizations'], data)
      if (params?.cb) {
        params.cb()
      }
    }
  })
}