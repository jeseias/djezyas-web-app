import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Clock, UserPlus } from "lucide-react"
import { Organization } from "@/core/modules/organization/domain/entities/organization"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Invitation = Organization.Invitation

interface PendingInvitationsProps {
  invitations: Invitation[]
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
      case Organization.InvitationStatus.PENDING:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case Organization.InvitationStatus.ACCEPTED:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case Organization.InvitationStatus.EXPIRED:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getRoleColor = (role: Organization.InvitationRole) => {
    switch (role) {
      case Organization.InvitationRole.ADMIN:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case Organization.InvitationRole.MEMBER:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Pending Invitations
        </CardTitle>
        <CardDescription>
          {invitations.length} invitation{invitations.length === 1 ? '' : 's'} waiting for response
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {invitations.map((invitation) => (
            <div
              key={invitation.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{invitation.email}</span>
                </div>
                <Badge 
                  variant="secondary" 
                  className={getRoleColor(invitation.role)}
                >
                  {invitation.role.charAt(0).toUpperCase() + invitation.role.slice(1)}
                </Badge>
                <Badge 
                  variant="secondary" 
                  className={getStatusColor(invitation.status)}
                >
                  {invitation.status.charAt(0).toUpperCase() + invitation.status.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {new Date(invitation.invitedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onResendInvitation?.(invitation.id)}
                    disabled={invitation.status !== Organization.InvitationStatus.PENDING}
                  >
                    Resend
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onCancelInvitation?.(invitation.id)}
                    disabled={invitation.status !== Organization.InvitationStatus.PENDING}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 