import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '@/core/modules/user/infra/api'

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['me'] })
    },
    onError: (error) => {
      console.error('Logout failed:', error)
    }
  })
} 