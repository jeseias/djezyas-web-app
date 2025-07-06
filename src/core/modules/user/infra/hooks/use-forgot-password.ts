import { useMutation } from '@tanstack/react-query'
import { forgotPassword, type ForgotPassword } from '@/core/modules/user/infra/api'

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (params: ForgotPassword.Params) => forgotPassword(params),
    onSuccess: (data) => {
      console.log('Forgot password request successful:', data.data.forgotPassword)
    },
    onError: (error) => {
      console.error('Forgot password request failed:', error)
    }
  })
} 