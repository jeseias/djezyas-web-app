import { createFileRoute } from '@tanstack/react-router'
import { VerifyEmailPage } from '@/pages/verify-email/verify-email-page'

export const Route = createFileRoute('/verify-email')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      email: search.email as string,
    }
  },
  component: VerifyEmailPage,
}) 