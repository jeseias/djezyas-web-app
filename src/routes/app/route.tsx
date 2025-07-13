import { ProtectedRoute } from '@/components/auth/protected-route'
import { AppWrapperLayout } from '@/components/layouts/app-wrapper/app-wrapper-layout'
import { OrganizationProvider } from '@/core/modules/organization/context/organization-context'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <OrganizationProvider>
      <ProtectedRoute>
        <AppWrapperLayout>
          <Outlet />
        </AppWrapperLayout>
      </ProtectedRoute>
    </OrganizationProvider>
  )
}
