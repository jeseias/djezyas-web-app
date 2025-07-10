import { createFileRoute, Outlet } from '@tanstack/react-router'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { OrganizationGuard } from '@/components/auth/organization-guard'
import { OrganizationProvider } from '@/core/modules/organization/context/organization-context'
import { DebugAuthState } from '@/components/debug-auth-state'

export const Route = createFileRoute('/app/')({
  component: AppLayout,
})

function AppLayout() {
  return (
    <OrganizationProvider>
      <ProtectedRoute>
        <OrganizationGuard>
          <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center">
                    <h1 className="text-xl font-semibold text-gray-900">
                      Djezyas
                    </h1>
                  </div>
                  <div className="flex items-center space-x-4">
                    {/* Add navigation items here */}
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <Outlet />
            </main>
            
            {/* Debug Component */}
            <DebugAuthState />
          </div>
        </OrganizationGuard>
      </ProtectedRoute>
    </OrganizationProvider>
  )
}
