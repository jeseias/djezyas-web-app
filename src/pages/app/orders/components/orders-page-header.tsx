import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FilterIcon, PlusIcon } from "lucide-react"

interface OrdersPageHeaderProps {
  orderCount: number
  onToggleFilters: () => void
  showFilters: boolean
}

export function OrdersPageHeader({ 
  orderCount, 
  onToggleFilters, 
  showFilters 
}: OrdersPageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track your organization's orders
          </p>
        </div>
        <Badge variant="secondary" className="ml-2">
          {orderCount} orders
        </Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleFilters}
          className={showFilters ? "bg-accent" : ""}
        >
          <FilterIcon className="h-4 w-4 mr-2" />
          Filters
        </Button>
        
        <Button size="sm">
          <PlusIcon className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>
    </div>
  )
}
