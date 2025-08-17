import { useState } from "react"
import { OrdersPageHeader } from "./components/orders-page-header"
import { OrdersTable } from "./components/orders-table"
import { OrdersFilters } from "./components/orders-filters"
import { OrderDetailDrawer } from "./components/order-detail-drawer"
import { useOrders } from "./hooks/use-orders"

export function OrdersPage() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  
  const { data, isLoading, error } = useOrders({
    page: 1,
    limit: 10,
  })
  
  const orders = data?.items || []
  const totalCount = data?.totalCount || 0

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-sm text-destructive">Failed to load orders. Please try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 px-6">
      <OrdersPageHeader 
        orderCount={totalCount}
        onToggleFilters={() => setShowFilters(!showFilters)}
        showFilters={showFilters}
      />
      
      {showFilters && (
        <OrdersFilters />
      )}
      
      <OrdersTable 
        orders={orders} 
        isLoading={isLoading}
        onOrderClick={(orderId) => setSelectedOrderId(orderId)}
      />
      
      <OrderDetailDrawer
        orderId={selectedOrderId}
        open={!!selectedOrderId}
        onOpenChange={(open) => !open && setSelectedOrderId(null)}
      />
    </div>
  )
}
