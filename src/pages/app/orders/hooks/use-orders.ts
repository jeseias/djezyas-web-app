import { useQuery } from '@tanstack/react-query'
import { api } from '@/core/config/api'
import type { OrdersResponse, OrdersFilters } from '../types/order.types'

const fetchOrders = async (filters: OrdersFilters): Promise<OrdersResponse> => {
  const params = new URLSearchParams()
  
  if (filters.page) params.append('page', filters.page.toString())
  if (filters.limit) params.append('limit', filters.limit.toString())
  if (filters.paymentStatus?.length) {
    filters.paymentStatus.forEach(status => params.append('paymentStatus', status))
  }
  if (filters.fulfillmentStatus?.length) {
    filters.fulfillmentStatus.forEach(status => params.append('fulfillmentStatus', status))
  }
  if (filters.dateFrom) params.append('dateFrom', filters.dateFrom)
  if (filters.dateTo) params.append('dateTo', filters.dateTo)
  if (filters.code) params.append('code', filters.code)
  if (filters.assignedTo) params.append('assignedTo', filters.assignedTo)

  const response = await api.get(`/orders?${params.toString()}`)
  return response.data
}

export const useOrders = (filters: OrdersFilters) => {
  return useQuery({
    queryKey: ['orders', filters],
    queryFn: () => fetchOrders(filters),
    staleTime: 30000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
  })
}
