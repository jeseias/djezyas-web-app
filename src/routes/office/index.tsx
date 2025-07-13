import { OfficeDashboard } from '@/pages/office/office-dashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/office/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <OfficeDashboard />
  )
}
