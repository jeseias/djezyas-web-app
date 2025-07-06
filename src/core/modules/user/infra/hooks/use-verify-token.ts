import { useMutation } from '@tanstack/react-query'
import { verifyToken, type VerifyToken } from '@/core/modules/user/infra/api'

export const useVerifyToken = () => {
  return useMutation({
    mutationFn: (params: VerifyToken.Params) => verifyToken(params),
    onSuccess: (data) => {
      // Handle successful token verification
      console.log('Token verification successful:', data.data.verifyToken)
    },
    onError: (error) => {
      // Handle token verification error
      console.error('Token verification failed:', error)
    }
  })
} 