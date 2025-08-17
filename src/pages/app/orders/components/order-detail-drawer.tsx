import { useQuery } from "@tanstack/react-query"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  PackageIcon, 
  UserIcon,
  CalendarIcon,
  CreditCardIcon,
} from "lucide-react"
import { format } from "date-fns"
import { OrderStatusBadge } from "./order-status-badge"
import { OrderFulfillmentStepper } from "./order-fulfillment-stepper"
import { api } from "@/core/config/api"
import { OrderStatus } from "../types/order.types"
import type { Order } from "../types/order.types"

interface OrderDetailDrawerProps {
  orderId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const fetchOrder = async (orderId: string): Promise<Order> => {
  const response = await api.get(`/orders/${orderId}`)
  return response.data
}

export function OrderDetailDrawer({ orderId, open, onOpenChange }: OrderDetailDrawerProps) {
  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => fetchOrder(orderId!),
    enabled: !!orderId && open,
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100)
  }

  const formatDate = (date: Date) => {
    return format(new Date(date), 'MMM dd, yyyy HH:mm')
  }

  const getActionsForStatus = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return [
          { label: "Start Picking", variant: "default" as const, action: "start-picking" },
          { label: "Cancel", variant: "destructive" as const, action: "cancel" },
        ]
      
      case OrderStatus.PAID:
        return [
          { label: "Start Picking", variant: "default" as const, action: "start-picking" },
          { label: "Mark Packed", variant: "default" as const, action: "mark-packed" },
          { label: "Cancel", variant: "destructive" as const, action: "cancel" },
        ]
      
      case OrderStatus.IN_DELIVERY:
        return [
          { label: "Mark Delivered", variant: "default" as const, action: "mark-delivered" },
          { label: "Failed Delivery", variant: "destructive" as const, action: "failed-delivery" },
        ]
      
      case OrderStatus.CLIENT_CONFIRMED_DELIVERY:
        return [
          { label: "View Receipt", variant: "outline" as const, action: "view-receipt" },
        ]
      
      default:
        return []
    }
  }

  const handleAction = (action: string) => {
    if (!order) return
    
    switch (action) {
      case "start-picking":
        console.log("Start picking order:", order.id)
        break
      case "mark-packed":
        console.log("Mark packed order:", order.id)
        break
      case "mark-delivered":
        console.log("Mark delivered order:", order.id)
        break
      case "cancel":
        console.log("Cancel order:", order.id)
        break
      case "failed-delivery":
        console.log("Failed delivery order:", order.id)
        break
      case "view-receipt":
        console.log("View receipt order:", order.id)
        break
    }
  }

  if (!orderId) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] sm:w-[700px] overflow-y-auto">
        <SheetHeader className="space-y-4">
          <SheetTitle className="flex items-center gap-3">
            <span>Order Details</span>
            {order && (
              <span className="font-mono text-sm text-muted-foreground">
                {order.code}
              </span>
            )}
          </SheetTitle>
          
          {order && (
            <div className="flex items-center gap-4">
              <OrderStatusBadge status={order.status} variant="payment" />
              <OrderStatusBadge status={order.status} variant="fulfillment" />
              <Badge variant="outline" className="ml-auto">
                {formatCurrency(order.totalAmount)}
              </Badge>
            </div>
          )}
        </SheetHeader>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-destructive">Failed to load order details.</p>
          </div>
        )}

        {order && (
          <div className="space-y-6 mt-6">
            {/* Fulfillment Stepper */}
            <OrderFulfillmentStepper status={order.status} />
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {getActionsForStatus(order.status).map((action) => (
                <Button
                  key={action.action}
                  variant={action.variant}
                  size="sm"
                  onClick={() => handleAction(action.action)}
                >
                  {action.label}
                </Button>
              ))}
            </div>

            <Separator />

            {/* Tabs */}
            <Tabs defaultValue="items" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="items">Items</TabsTrigger>
                <TabsTrigger value="customer">Customer</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>

              <TabsContent value="items" className="space-y-4">
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                              <PackageIcon className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} × {formatCurrency(item.unitAmount)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(item.subtotal)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="customer" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserIcon className="h-5 w-5" />
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Customer ID</p>
                      <p className="text-sm text-muted-foreground">{order.userId}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Organization</p>
                      <p className="text-sm text-muted-foreground">{order.organization.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Assigned To</p>
                      <p className="text-sm text-muted-foreground">
                        {order.assignedTo || "Unassigned"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCardIcon className="h-5 w-5" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Payment Intent ID</p>
                        <p className="text-sm text-muted-foreground font-mono">
                          {order.paymentIntentId || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Transaction ID</p>
                        <p className="text-sm text-muted-foreground font-mono">
                          {order.transactionId || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Paid At</p>
                      <p className="text-sm text-muted-foreground">
                        {order.paidAt ? formatDate(order.paidAt) : "Not paid yet"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Order Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Order Created</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>
                      
                      {order.paidAt && (
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Payment Received</p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(order.paidAt)}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {order.inDeliveryAt && (
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">In Delivery</p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(order.inDeliveryAt)}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {order.clientConfirmedDeliveryAt && (
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Delivered</p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(order.clientConfirmedDeliveryAt)}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {order.cancelledAt && (
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Cancelled</p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(order.cancelledAt)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
