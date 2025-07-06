import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '@/core/modules/user/infra/api'

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Clear user-related queries from cache
      queryClient.removeQueries({ queryKey: ['user'] })
      queryClient.removeQueries({ queryKey: ['me'] })
      
      // Handle successful logout
      console.log('Logout successful')
    },
    onError: (error) => {
      // Handle logout error
      console.error('Logout failed:', error)
    }
  })
} 