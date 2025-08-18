import { formatDistanceToNow } from "date-fns";
import { Eye, Clock, User, Package, Truck, AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IOrder, getMacroStatus, getExceptionFlags, STATUS_META } from "@/core/modules/types";
import { cn } from "@/lib/utils";

interface OrderCardProps {
  order: IOrder.Model;
  isDragging?: boolean;
  isSelected?: boolean;
  onSelect?: (orderId: string, checked: boolean) => void;
  onClick?: (order: IOrder.Model) => void;
}

export function OrderCard({
  order,
  isDragging = false,
  isSelected = false,
  onClick,
}: OrderCardProps) {
  const macroStatus = getMacroStatus(order);
  const exceptionFlags = getExceptionFlags(order);
  const statusMeta = STATUS_META[macroStatus];
  
  const shortId = order.code.split('-')[0];
  const itemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const topItem = order.items[0]?.product.name || 'No items';
  const totalFormatted = order.totalAmount ? new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(order.totalAmount / 100) : 'N/A';

  const relativeTime = formatDistanceToNow(new Date(order.createdAt), { addSuffix: true });

  const getPaymentBadge = () => {
    switch (order.paymentStatus) {
      case IOrder.OrderPaymentStatus.PENDING:
        return { label: "Pending", color: "bg-yellow-500/20 text-yellow-700" };
      case IOrder.OrderPaymentStatus.PAID:
        return { label: "Paid", color: "bg-green-500/20 text-green-700" };
      case IOrder.OrderPaymentStatus.REFUNDED:
        return { label: "Refunded", color: "bg-red-500/20 text-red-700" };
      case IOrder.OrderPaymentStatus.FAILED:
        return { label: "Failed", color: "bg-red-500/20 text-red-700" };
      default:
        return { label: order.paymentStatus, color: "bg-gray-500/20 text-gray-700" };
    }
  };

  const paymentBadge = getPaymentBadge();

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md hover:ring-2 hover:ring-border",
        isSelected && "ring-2 ring-primary",
        isDragging && "opacity-75 rotate-2",
        "rounded-2xl border border-border/50 shadow-sm"
      )}
      onClick={() => onClick?.(order)}
    >
      <CardContent className="p-4">
        {/* Row 1: Order ID + Status Badge + Relative Time */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs font-mono bg-background">
              #{shortId}
            </Badge>
            <Badge 
              variant="outline"
              className={cn("text-xs capitalize", statusMeta.color, statusMeta.bgColor)}
            >
              {statusMeta.label}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {relativeTime}
          </div>
        </div>

        {/* Row 2: Customer + Items + Delivery Icon */}
        <div className="flex items-center gap-2 mb-3 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium truncate">Customer #{order.userId.slice(0, 8)}</span>
          {order.fulfillmentStatus === IOrder.OrderFulfillmentStatus.IN_DELIVERY && (
            <Truck className="h-4 w-4 text-blue-500" />
          )}
        </div>

        <div className="flex items-center gap-2 mb-3 text-sm">
          <Package className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            {itemsCount} items
          </span>
          <span className="text-muted-foreground truncate">
            • {topItem}
            {order.items.length > 1 && ` +${order.items.length - 1} more`}
          </span>
        </div>

        {/* Row 3: Total + Payment Badge + Quick Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">{totalFormatted}</span>
            <Badge 
              variant="outline" 
              className={cn("text-xs", paymentBadge.color)}
            >
              {paymentBadge.label}
            </Badge>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation();
                onClick?.(order);
              }}>
                <Eye className="h-4 w-4 mr-2" />
                View details
              </DropdownMenuItem>
              {exceptionFlags.failedDelivery && (
                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Mark Returned
                </DropdownMenuItem>
              )}
              {exceptionFlags.returned && (
                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Mark Failed Delivery
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <AlertCircle className="h-4 w-4 mr-2" />
                Add Issue Note
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Exception Flags */}
        {(exceptionFlags.paymentRefunded || exceptionFlags.paymentFailed || 
          exceptionFlags.returned || exceptionFlags.failedDelivery || 
          exceptionFlags.hasIssues || exceptionFlags.expired) && (
          <div className="flex flex-wrap gap-1 mt-3">
            {exceptionFlags.paymentRefunded && (
              <Badge variant="destructive" className="text-xs">Refunded</Badge>
            )}
            {exceptionFlags.paymentFailed && (
              <Badge variant="destructive" className="text-xs">Payment Failed</Badge>
            )}
            {exceptionFlags.returned && (
              <Badge variant="destructive" className="text-xs">Returned</Badge>
            )}
            {exceptionFlags.failedDelivery && (
              <Badge variant="destructive" className="text-xs">Failed Delivery</Badge>
            )}
            {exceptionFlags.hasIssues && (
              <Badge variant="destructive" className="text-xs">Issues</Badge>
            )}
            {exceptionFlags.expired && (
              <Badge variant="secondary" className="text-xs">Expired</Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
