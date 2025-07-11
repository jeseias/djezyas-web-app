import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Clock, UserPlus, User } from "lucide-react"
import type { Organization } from "@/core/modules/organization/domain/entities/organization"
import { Organization as OrganizationEnums } from "@/core/modules/organization/domain/entities/organization"

type PendingInvitationWithUser = Organization.PendingInvitationWithUser

interface PendingInvitationsProps {
  invitations: PendingInvitationWithUser[]
  onResendInvitation?: (invitationId: string) => void
  onCancelInvitation?: (invitationId: string) => void
}

export function PendingInvitations({ 
  invitations, 
  onResendInvitation, 
  onCancelInvitation 
}: PendingInvitationsProps) {
  if (invitations.length === 0) {
    return null
  }

  const getStatusColor = (status: Organization.InvitationStatus) => {
    switch (status) {
      case OrganizationEnums.InvitationStatus.PENDING:
        return "bg-yellow-100 text-yellow-800"
      case OrganizationEnums.InvitationStatus.ACCEPTED:
        return "bg-green-100 text-green-800"
      case OrganizationEnums.InvitationStatus.EXPIRED:
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (role: Organization.InvitationRole) => {
    switch (role) {
      case OrganizationEnums.InvitationRole.ADMIN:
        return "bg-purple-100 text-purple-800"
      case OrganizationEnums.InvitationRole.MEMBER:
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Pending Invitations ({invitations.length})
        </CardTitle>
        <CardDescription>
          Users who have been invited but haven't joined yet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {invitations.map((invitation) => (
            <div
              key={invitation.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {invitation.user.avatar ? (
                    <img
                      src={invitation.user.avatar}
                      alt={invitation.user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{invitation.user.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {invitation.email}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge className={getRoleColor(invitation.role)}>
                  {invitation.role}
                </Badge>
                <Badge className={getStatusColor(invitation.status)}>
                  {invitation.status}
                </Badge>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(invitation.invitedAt).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  {onResendInvitation && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onResendInvitation(invitation.id)}
                    >
                      Resend
                    </Button>
                  )}
                  {onCancelInvitation && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onCancelInvitation(invitation.id)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 