import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { resendVerification, type ResendVerification } from '@/core/modules/user/infra/api'

export const useResendVerification = () => {
  return useMutation({
    mutationFn: (params: ResendVerification.Params) => resendVerification(params),
    onSuccess: (data) => {
      console.log('Resend verification successful:', data.data.resendVerification)
      
      toast("Your request was completed!", {
        description: "It was a long journey, but we made it!",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
    },
    onError: (error) => {
      console.error('Resend verification failed:', error)
      
      toast.error("Failed to send verification code", {
        description: "Please try again later",
      })
    }
  })
} 