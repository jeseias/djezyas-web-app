import { useApiGetOrganizationMembers } from "@/core/modules/organization/infra/hooks"
import { MembersTable, MembersPageHeader, PendingInvitations } from "./components"

export function MembersPage() {
  const { data, isLoading, error } = useApiGetOrganizationMembers()
  
  const members = data?.getOrganizationMembers.members || []
  const invitations = data?.getOrganizationMembers.pendingInvitations || []

  const handleInviteMember = () => {
    // TODO: Implement invite member functionality
    console.log("Invite member clicked")
  }

  const handleResendInvitation = (invitationId: string) => {
    // TODO: Implement resend invitation functionality
    console.log("Resend invitation:", invitationId)
  }

  const handleCancelInvitation = (invitationId: string) => {
    // TODO: Implement cancel invitation functionality
    console.log("Cancel invitation:", invitationId)
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <div className="rounded-md border border-red-200 bg-red-50 p-4">
          <h3 className="text-sm font-medium text-red-800">Error loading members</h3>
          <p className="mt-2 text-sm text-red-700">
            {error instanceof Error ? error.message : "An unexpected error occurred"}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6 px-6">
      <MembersPageHeader 
        memberCount={members.length}
        onInviteMember={handleInviteMember}
      />
      
      <PendingInvitations
        invitations={invitations}
        onResendInvitation={handleResendInvitation}
        onCancelInvitation={handleCancelInvitation}
      />
      
      <MembersTable 
        members={members}
        isLoading={isLoading}
      />
    </div>
  )
}