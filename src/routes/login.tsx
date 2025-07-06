import { LoginPage } from '@/pages/login/login-page'
import { createFileRoute } from '@tanstack/react-router'
import { PublicRoute } from '@/components/auth/public-route'

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
