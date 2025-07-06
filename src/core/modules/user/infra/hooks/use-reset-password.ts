import { useMutation } from '@tanstack/react-query'
import { resetPassword, type ResetPassword } from '@/core/modules/user/infra/api'

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (params: ResetPassword.Params) => resetPassword(params),
    onSuccess: (data) => {
      // Handle successful password reset
      console.log('Password reset successful:', data.data.resetPassword)
    },
    onError: (error) => {
      // Handle password reset error
      console.error('Password reset failed:', error)
    }
  })
} 