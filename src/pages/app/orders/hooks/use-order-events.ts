import { useState, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

interface OrderEvent {
  type: 'new_order' | 'status_change' | 'payment_received'
  orderId: string
  orderCode: string
  timestamp: Date
}

export function useOrderEvents() {
  const [newOrderCount, setNewOrderCount] = useState(0)
  const queryClient = useQueryClient()

  useEffect(() => {
    // Simulate SSE/WebSocket connection
    const interval = setInterval(() => {
      // Simulate random new paid orders (1% chance every 10 seconds)
      if (Math.random() < 0.01) {
        const event: OrderEvent = {
          type: 'new_order',
          orderId: `order_${Date.now()}`,
          orderCode: `ORD-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
          timestamp: new Date(),
        }

        // Increment new order count
        setNewOrderCount(prev => prev + 1)

        // Invalidate orders query to refetch
        queryClient.invalidateQueries({ queryKey: ['orders'] })

        // Show notification (you can integrate with your toast system)
        console.log('New order received:', event)
      }
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [queryClient])

  const clearNewOrderCount = () => {
    setNewOrderCount(0)
  }

  return {
    newOrderCount,
    clearNewOrderCount,
  }
}
