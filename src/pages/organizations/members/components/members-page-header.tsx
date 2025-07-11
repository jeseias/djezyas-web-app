import { Button } from "@/components/ui/button"
import { Plus, Users } from "lucide-react"

interface MembersPageHeaderProps {
  memberCount?: number
  onInviteMember?: () => void
}

export function MembersPageHeader({ memberCount = 0, onInviteMember }: MembersPageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Organization Members</h1>
        <p className="text-sm text-muted-foreground">
          Manage your organization's members and their roles. {memberCount > 0 && `Currently ${memberCount} member${memberCount === 1 ? '' : 's'}.`}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Users className="mr-2 h-4 w-4" />
          View Invitations
        </Button>
        <Button onClick={onInviteMember}>
          <Plus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </div>
    </div>
  )
} 