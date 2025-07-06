import { SignupPage } from '@/pages/signup/signup-page'
import { createFileRoute } from '@tanstack/react-router'
import { PublicRoute } from '@/components/auth/public-route'

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
