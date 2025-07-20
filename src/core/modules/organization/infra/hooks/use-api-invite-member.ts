import { useMutation, useQueryClient } from "@tanstack/react-query"
import { inviteMember } from "../api/invite-member"
import type { Organization } from "../../domain/entities/organization"

export const useApiInviteMember = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: {
      organizationId: string
      email: string
      role: Organization.InvitationRole
    }) => {
      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      return (await inviteMember(input)).data
    },
    onSuccess: (_, variables) => {
      // Invalidate and refetch organization members to show the new invitation
      queryClient.invalidateQueries({
        queryKey: ['getOrganizationMembers', variables.organizationId]
      })
    },
    onError: (error) => {
      console.error('Failed to invite member:', error)
    }
  })
} 