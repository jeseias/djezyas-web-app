import { ProtectedRoute } from '@/components/auth/protected-route'
import { OfficeWrapperLayout } from '@/components/layouts/office-wrapper/office-wrapper-layout'
import { AdminProvider } from '@/core/modules/user/infra/context'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/office')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ProtectedRoute>
      <AdminProvider>
        <OfficeWrapperLayout>
          <Outlet />
        </OfficeWrapperLayout>
      </AdminProvider>
    </ProtectedRoute>
  )
}
