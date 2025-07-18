import { Mail } from "lucide-react"

export const InvitationsPageHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Invitations</h1>
          <p className="text-muted-foreground">
            Manage your organization invitations
          </p>
        </div>
      </div>
    </div>
  )
} 