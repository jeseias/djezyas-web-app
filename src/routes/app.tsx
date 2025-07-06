import { createFileRoute } from '@tanstack/react-router'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { useAuth } from '@/core/modules/user/infra/context/auth-context'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/app')({
  component: AppPage,
})

function AppPage() {
  const { user, signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <ProtectedRoute>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Welcome to the App!</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            You have successfully logged in and are now in the main application.
          </p>
          
          {user && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">User Information</h2>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Status:</strong> {user.status}</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
} 