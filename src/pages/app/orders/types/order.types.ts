export enum OrderStatus {
  PENDING = "pending",
  PAID = "paid",
  CANCELLED = "cancelled",
  EXPIRED = "expired",
  IN_DELIVERY = "in_delivery",
  CLIENT_CONFIRMED_DELIVERY = "client_confirmed_delivery",
}

export enum FulfillmentStatus {
  NEW = "new",
  PICKING = "picking",
  PACKED = "packed",
  IN_DELIVERY = "in_delivery",
  DELIVERED = "delivered",
  ISSUES = "issues",
}

export interface OrderItem {
  priceId: string
  productId: string
  name: string
  quantity: number
  unitAmount: number
  subtotal: number
  product: {
    id: string
    name: string
    description?: string
    images?: string[]
  }
  price: {
    id: string
    amount: number
    currency: string
  }
}

export interface Order {
  id: string
  code: string
  userId: string
  organizationId: string
  organization: {
    id: string
    name: string
    slug: string
  }
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  fulfillmentStatus?: FulfillmentStatus
  paymentIntentId?: string
  transactionId?: string
  paidAt?: Date
  inDeliveryAt?: Date
  clientConfirmedDeliveryAt?: Date
  expiredAt?: Date
  cancelledAt?: Date
  assignedTo?: string
  meta?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

export interface OrdersResponse {
  items: Order[]
  totalCount: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface OrdersFilters {
  page?: number
  limit?: number
  paymentStatus?: OrderStatus[]
  fulfillmentStatus?: FulfillmentStatus[]
  dateFrom?: string
  dateTo?: string
  code?: string
  assignedTo?: string
}
