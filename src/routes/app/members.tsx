import { MembersPage } from '@/pages/organizations/members/members-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/members')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <MembersPage />
  )
}
