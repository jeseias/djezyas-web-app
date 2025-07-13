import { ProtectedRoute } from '@/components/auth/protected-route'
import { OfficeWrapperLayout } from '@/components/layouts/office-wrapper/office-wrapper-layout'
import { OfficeDashboard } from '@/pages/office/office-dashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/office/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ProtectedRoute>
      <OfficeWrapperLayout>
        <OfficeDashboard />
      </OfficeWrapperLayout>
    </ProtectedRoute>
  )
}
