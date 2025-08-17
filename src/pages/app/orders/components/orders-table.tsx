import { useState } from "react"
import { useSearch, useNavigate } from "@tanstack/react-router"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  MoreHorizontalIcon, 
  EyeIcon, 
  PackageIcon, 
  TruckIcon, 
  CheckCircleIcon,
  XCircleIcon,
  PrinterIcon,
  UserIcon
} from "lucide-react"
import { format } from "date-fns"
import { OrderStatusBadge } from "./order-status-badge"
import { OrderActionsMenu } from "./order-actions-menu"
import type { Order } from "../types/order.types"

interface OrdersTableProps {
  orders: Order[]
  isLoading: boolean
  onOrderClick: (orderId: string) => void
}

export function OrdersTable({ orders, isLoading, onOrderClick }: OrdersTableProps) {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const search = useSearch({ from: '/app/orders' })
  const navigate = useNavigate()

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(orders.map(order => order.id))
    } else {
      setSelectedOrders([])
    }
  }

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders(prev => [...prev, orderId])
    } else {
      setSelectedOrders(prev => prev.filter(id => id !== orderId))
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100) // Assuming amount is in cents
  }

  const formatDate = (date: Date) => {
    return format(new Date(date), 'MMM dd, yyyy')
  }

  const getItemsSummary = (items: Order['items']) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const uniqueProducts = items.length
    return `${totalItems} items (${uniqueProducts} products)`
  }

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox disabled />
              </TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Fulfillment</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><div className="h-4 w-4 bg-muted rounded animate-pulse" /></TableCell>
                <TableCell><div className="h-4 w-20 bg-muted rounded animate-pulse" /></TableCell>
                <TableCell><div className="h-4 w-24 bg-muted rounded animate-pulse" /></TableCell>
                <TableCell><div className="h-4 w-32 bg-muted rounded animate-pulse" /></TableCell>
                <TableCell><div className="h-4 w-24 bg-muted rounded animate-pulse" /></TableCell>
                <TableCell><div className="h-4 w-20 bg-muted rounded animate-pulse" /></TableCell>
                <TableCell><div className="h-4 w-16 bg-muted rounded animate-pulse" /></TableCell>
                <TableCell><div className="h-4 w-16 bg-muted rounded animate-pulse" /></TableCell>
                <TableCell><div className="h-4 w-20 bg-muted rounded animate-pulse" /></TableCell>
                <TableCell><div className="h-4 w-8 bg-muted rounded animate-pulse" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
          <span className="text-sm text-muted-foreground">
            {selectedOrders.length} order(s) selected
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <UserIcon className="h-4 w-4 mr-2" />
              Assign
            </Button>
            <Button variant="outline" size="sm">
              <PrinterIcon className="h-4 w-4 mr-2" />
              Print Slips
            </Button>
            <Button variant="outline" size="sm">
              <TruckIcon className="h-4 w-4 mr-2" />
              Dispatch
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedOrders.length === orders.length && orders.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Fulfillment</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow 
                key={order.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onOrderClick(order.id)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox 
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={(checked) => handleSelectOrder(order.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm">{order.code}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Customer #{order.userId.slice(0, 8)}</span>
                    <span className="text-xs text-muted-foreground">
                      {order.items.length} items
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {getItemsSummary(order.items)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-medium">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} variant="payment" />
                </TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} variant="fulfillment" />
                </TableCell>
                <TableCell>
                  {order.assignedTo ? (
                    <Badge variant="outline" className="text-xs">
                      <UserIcon className="h-3 w-3 mr-1" />
                      {order.assignedTo.slice(0, 8)}
                    </Badge>
                  ) : (
                    <span className="text-sm text-muted-foreground">Unassigned</span>
                  )}
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <OrderActionsMenu order={order} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {orders.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <PackageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">No orders found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or create a new order.
          </p>
        </div>
      )}
    </div>
  )
}
