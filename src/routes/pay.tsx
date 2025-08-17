import { PayPage } from '@/pages/pay'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pay')({
  component: PayPage,
})
