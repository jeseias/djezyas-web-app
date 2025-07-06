import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { verifyEmail, type VerifyEmail } from '@/core/modules/user/infra/api'
import { toast } from 'sonner'

export const useVerifyEmail = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (params: VerifyEmail.Params) => verifyEmail(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
      
      navigate({ 
        to: '/login',
        search: { message: 'Email verified successfully! Please login.' }
      })
    },
    onError: (error) => {
      console.log('they was an error', error)
      console.error('Email verification failed:', error)
      toast.error('Email verification failed', {
        description: error?.message || 'Please try again later',
      })
    }
  })
} 