import { useState } from "react"
import { OrdersKanbanBoard } from "./components/board"
import { useApiLoadOrdersByOrganization } from "@/core/modules/api"

export function OrdersPage() {
  const [filters, setFilters] = useState({
    search: "",
    fulfillmentStatus: [],
    sortBy: "createdAt",
  })

  const { data, isLoading, error } = useApiLoadOrdersByOrganization({})

  const orders = data?.orders || []

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
    <div className="h-screen flex flex-col">
      <OrdersKanbanBoard
        orders={orders}
        isLoading={isLoading}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </div>
  )
}
