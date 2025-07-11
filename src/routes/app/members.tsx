import { ProtectedRoute } from '@/components/auth/protected-route'
import { AppWrapperLayout } from '@/components/layouts/app-wrapper/app-wrapper-layout'
import { OrganizationProvider } from '@/core/modules/organization/context/organization-context'
import { MembersPage } from '@/pages/organizations/members/members-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/members')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ProtectedRoute>
      <OrganizationProvider>
          <AppWrapperLayout>
            <MembersPage />
          </AppWrapperLayout>
      </OrganizationProvider>
    </ProtectedRoute>
  )
}
