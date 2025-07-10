import { createFileRoute } from '@tanstack/react-router'
import { PublicRoute } from '@/components/auth/public-route'
import { SignupPage } from '@/pages/auth'

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PublicRoute>
      <SignupPage />
    </PublicRoute>
  )
}
