import { ProtectedRoute } from '@/components/auth/protected-route'
import { CreateOrganizationPage } from '@/pages/organizations/create-organization/create-organization-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-organization')({
  component: Root,
})

function Root() {
  return (
    <ProtectedRoute>
      <CreateOrganizationPage />
    </ProtectedRoute>
  )
}
