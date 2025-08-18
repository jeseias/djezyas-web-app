import { format } from "date-fns";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IOrder, getMacroStatus, getExceptionFlags, STATUS_META, getNextAllowedStatuses } from "@/core/modules/types";
import { cn } from "@/lib/utils";

interface OrderDetailsDrawerProps {
  order: IOrder.Model | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMoveOrder?: (orderId: string, toStatus: IOrder.OrderFulfillmentStatus) => Promise<void>;
}

export function OrderDetailsDrawer({
  order,
  open,
  onOpenChange,
  onMoveOrder,
}: OrderDetailsDrawerProps) {
  if (!order) return null;

  const macroStatus = getMacroStatus(order);
  const exceptionFlags = getExceptionFlags(order);
  const statusMeta = STATUS_META[macroStatus];
  const nextAllowedStatuses = getNextAllowedStatuses(order.fulfillmentStatus);

  const totalFormatted = order.totalAmount ? new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(order.totalAmount / 100) : 'N/A';

  const handleMoveOrder = async (toStatus: IOrder.OrderFulfillmentStatus) => {
    if (onMoveOrder) {
      await onMoveOrder(order.id, toStatus);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-3">
              <span>Order #{order.code}</span>
              <Badge 
                variant="outline"
                className={cn(statusMeta.color, statusMeta.bgColor)}
              >
                {statusMeta.label}
              </Badge>
            </DrawerTitle>
          </DrawerHeader>

          <div className="p-6 space-y-6">
            {/* Order Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Total Amount</h3>
                <p className="text-2xl font-bold">{totalFormatted}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Payment Status</h3>
                <Badge variant="outline" className="capitalize">
                  {order.paymentStatus}
                </Badge>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Created</h3>
                <p className="text-sm">{format(new Date(order.createdAt), 'PPP')}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Last Updated</h3>
                <p className="text-sm">{format(new Date(order.updatedAt), 'PPP')}</p>
              </div>
            </div>

            <Separator />

            {/* Items */}
            <div>
              <h3 className="font-semibold mb-3">Items ({order.items.length})</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={`${item.productId}-${index}`} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                        <span className="text-xs font-medium">{item.quantity}</span>
                      </div>
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          }).format(item.unitAmount / 100)} each
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(item.subtotal / 100)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Customer & Address */}
            <div>
              <h3 className="font-semibold mb-3">Customer & Address</h3>
              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="font-medium">Customer ID: {order.userId}</p>
                <p className="text-sm text-muted-foreground">Address information would be displayed here</p>
              </div>
            </div>

            <Separator />

            {/* Payment Info */}
            <div>
              <h3 className="font-semibold mb-3">Payment Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Payment Intent ID:</span>
                  <span className="text-sm font-mono">{order.paymentIntentId || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Transaction ID:</span>
                  <span className="text-sm font-mono">{order.transactionId || 'N/A'}</span>
                </div>
                {order.paidAt && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Paid At:</span>
                    <span className="text-sm">{format(new Date(order.paidAt), 'PPP')}</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Timeline */}
            <div>
              <h3 className="font-semibold mb-3">Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <div>
                    <p className="text-sm font-medium">Order Created</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(order.createdAt), 'PPP p')}
                    </p>
                  </div>
                </div>
                
                {order.paidAt && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <div>
                      <p className="text-sm font-medium">Payment Received</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(order.paidAt), 'PPP p')}
                      </p>
                    </div>
                  </div>
                )}

                {order.clientConfirmedIsDelivered && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <div>
                      <p className="text-sm font-medium">Delivered</p>
                      <p className="text-xs text-muted-foreground">
                        Confirmed by customer
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Exception Flags */}
            {(exceptionFlags.paymentRefunded || exceptionFlags.paymentFailed || 
              exceptionFlags.returned || exceptionFlags.failedDelivery || 
              exceptionFlags.hasIssues || exceptionFlags.expired) && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-3 text-destructive">Issues & Exceptions</h3>
                  <div className="flex flex-wrap gap-2">
                    {exceptionFlags.paymentRefunded && (
                      <Badge variant="destructive">Payment Refunded</Badge>
                    )}
                    {exceptionFlags.paymentFailed && (
                      <Badge variant="destructive">Payment Failed</Badge>
                    )}
                    {exceptionFlags.returned && (
                      <Badge variant="destructive">Returned</Badge>
                    )}
                    {exceptionFlags.failedDelivery && (
                      <Badge variant="destructive">Failed Delivery</Badge>
                    )}
                    {exceptionFlags.hasIssues && (
                      <Badge variant="destructive">Has Issues</Badge>
                    )}
                    {exceptionFlags.expired && (
                      <Badge variant="secondary">Expired</Badge>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Actions */}
            {onMoveOrder && nextAllowedStatuses.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-3">Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    {nextAllowedStatuses.map((status) => {
                      const targetMacroStatus = getMacroStatus({
                        ...order,
                        fulfillmentStatus: status,
                      });
                      const targetMeta = STATUS_META[targetMacroStatus];
                      
                      return (
                        <Button
                          key={status}
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoveOrder(status)}
                          className="flex items-center gap-2"
                        >
                          <div className={`w-2 h-2 rounded-full ${targetMeta.bgColor.replace('bg-', 'bg-').replace('/50', '')}`} />
                          Move to {targetMeta.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
