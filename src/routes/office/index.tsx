import { ProtectedRoute } from '@/components/auth/protected-route'
import { OfficeWrapperLayout } from '@/components/layouts/office-wrapper/office-wrapper-layout'
import { AdminProvider } from '@/core/modules/user/infra/context'
import { OfficeDashboard } from '@/pages/office/office-dashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/office/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ProtectedRoute>
      <AdminProvider>
        <OfficeWrapperLayout>
          <OfficeDashboard />
        </OfficeWrapperLayout>
      </AdminProvider>
    </ProtectedRoute>
  )
}
