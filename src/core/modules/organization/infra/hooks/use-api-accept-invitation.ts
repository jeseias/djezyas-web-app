import { useMutation, useQueryClient } from "@tanstack/react-query"
import { acceptInvitation } from "../api/accept-invitation"

export const useApiAcceptInvitation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: { token: string }) => {
      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      return (await acceptInvitation(input)).data
    },
    onSuccess: () => {
      // Invalidate and refetch user's organizations and invitations
      queryClient.invalidateQueries({
        queryKey: ['loadMyOrganizations']
      })
      queryClient.invalidateQueries({
        queryKey: ['loadMyInvitations']
      })
    },
    onError: (error) => {
      console.error('Failed to accept invitation:', error)
    }
  })
} 