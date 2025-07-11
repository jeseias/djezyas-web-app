import { useState } from "react"
import { useApiGetOrganizationMembers } from "@/core/modules/organization/infra/hooks"
import { MembersTable, MembersPageHeader, PendingInvitations, InviteMemberDialog } from "./components"

export function MembersPage() {
  const [showInvitations, setShowInvitations] = useState(false)
  const { data, isLoading, error } = useApiGetOrganizationMembers()
  
  const members = data?.getOrganizationMembers.members || []
  const invitations = data?.getOrganizationMembers.pendingInvitations || []

  const handleToggleInvitations = () => {
    setShowInvitations(!showInvitations)
  }

  const handleResendInvitation = (invitationId: string) => {
    // TODO: Implement resend invitation functionality
    console.log("Resend invitation:", invitationId)
  }

  const handleCancelInvitation = (invitationId: string) => {
    // TODO: Implement cancel invitation functionality
    console.log("Cancel invitation:", invitationId)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading members...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-sm text-destructive">Failed to load members. Please try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 px-6">
      <MembersPageHeader 
        memberCount={members.length}
        onToggleInvitations={handleToggleInvitations}
        showInvitations={showInvitations}
      />
      
      <InviteMemberDialog />
      
      {showInvitations && invitations.length > 0 && (
        <PendingInvitations 
          invitations={invitations}
          onResendInvitation={handleResendInvitation}
          onCancelInvitation={handleCancelInvitation}
        />
      )}
      
      <MembersTable members={members} />
    </div>
  )
}