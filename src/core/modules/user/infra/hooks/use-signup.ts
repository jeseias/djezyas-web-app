import { useMutation } from '@tanstack/react-query'
import { signup, type Signup } from '@/core/modules/user/infra/api'

export const useSignup = () => {
  return useMutation({
    mutationFn: (params: Signup.Params) => signup(params),
    onSuccess: (data) => {
      console.log('Signup successful:', data.data.registerUser)
    },
    onError: (error) => {
      console.error('Signup failed:', error)
    }
  })
} 