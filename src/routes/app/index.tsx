import { createFileRoute, Outlet } from '@tanstack/react-router'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { OrganizationProvider } from '@/core/modules/organization/context/organization-context'
import { AppWrapperLayout } from '@/components/layouts/app-wrapper/app-wrapper-layout'

export const Route = createFileRoute('/app/')({
  component: AppLayout,
})

function AppLayout() {
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
