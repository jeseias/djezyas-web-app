import { LoginPage } from '@/pages/login/login-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      message: search.message as string,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <LoginPage />
}
