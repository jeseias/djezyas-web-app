import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { OrdersPage } from '@/pages/app/orders/orders-page'

const searchSchema = z.object({
  page: z.number().optional().default(1),
  limit: z.number().optional().default(20),
  paymentStatus: z.array(z.enum(['pending', 'paid', 'cancelled', 'expired', 'in_delivery', 'client_confirmed_delivery'])).optional(),
  fulfillmentStatus: z.array(z.enum(['new', 'picking', 'packed', 'in_delivery', 'delivered', 'issues'])).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  code: z.string().optional(),
  assignedTo: z.string().optional(),
})

export const Route = createFileRoute('/app/orders')({
  component: OrdersPage,
  validateSearch: searchSchema,
})
