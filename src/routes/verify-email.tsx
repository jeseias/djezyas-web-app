import { createFileRoute } from '@tanstack/react-router'
import { PublicRoute } from '@/components/auth/public-route'
import { VerifyEmailPage } from '@/pages/auth'

export const Route = createFileRoute('/verify-email')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      email: search.email as string,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PublicRoute>
      <VerifyEmailPage />
    </PublicRoute>
  )
} 