import { createFileRoute } from '@tanstack/react-router'
import { InvitationsPage } from '@/pages/app/invitations/invitations-page'

export const Route = createFileRoute('/app/invitations')({
  component: RouteComponent,
})

function RouteComponent() {
  return <InvitationsPage />
}
