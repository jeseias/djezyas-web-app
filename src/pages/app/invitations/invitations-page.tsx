import { useApiLoadMyInvitations, useApiAcceptInvitation } from "@/core/modules/organization/infra/hooks"
import { InvitationsTable } from "./components/invitations-table"
import { InvitationsPageHeader } from "./components"

export const InvitationsPage = () => {
  const { data, isLoading } = useApiLoadMyInvitations()
  const acceptInvitationMutation = useApiAcceptInvitation()

  const invitations = data?.loadMyInvitations.invitations || []

  const handleAcceptInvitation = async (token: string) => {
    try {
      await acceptInvitationMutation.mutateAsync({ token })
    } catch (error) {
      console.error('Failed to accept invitation:', error)
    }
  }

  return (
    <div className="space-y-6 px-6">
      <InvitationsPageHeader />
      <InvitationsTable 
        invitations={invitations} 
        isLoading={isLoading}
        onAcceptInvitation={handleAcceptInvitation}
        isAccepting={acceptInvitationMutation.isPending}
      />
    </div>
  )
} 