import { createFileRoute } from '@tanstack/react-router'
import { VerifyEmailPage } from '@/pages/verify-email/verify-email-page'
import { PublicRoute } from '@/components/auth/public-route'

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