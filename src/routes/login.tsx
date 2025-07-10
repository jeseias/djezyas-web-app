import { createFileRoute } from '@tanstack/react-router'
import { PublicRoute } from '@/components/auth/public-route'
import { LoginPage } from '@/pages/auth'

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      message: search.message as string,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PublicRoute>
      <LoginPage />
    </PublicRoute>
  )
}
