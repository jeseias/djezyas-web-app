import { Eye, Clock, User, Package, Truck, Copy, ArrowRight, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IOrder } from "@/core/modules/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { OrderCardViewModelImpl } from "./order-card.viewmodel";

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
  // Create ViewModel instance
  const viewModel = new OrderCardViewModelImpl(
    order,
    (message) => toast.success(message),
    () => toast.success("Moved to next stage"),
    () => toast.error("Action not allowed")
  );

  return (
    <TooltipProvider>
      <Card
        className={cn(
          "cursor-pointer transition-all duration-200 border bg-card hover:bg-accent/50 rounded-none",
          isSelected && "ring-2 ring-ring ring-offset-2",
          isDragging && "opacity-75 rotate-1 scale-105",
          "group relative overflow-hidden"
        )}
        onClick={() => onClick?.(order)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.(order);
          }
        }}
      >
        {/* Top accent bar */}
        {/* <div className={cn("h-0.5 w-full", viewModel.stageColor)} /> */}
        
        <CardContent className="p-3 space-y-2">
          {/* Customer line with order code and time */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold text-sm">
                Customer #{order.userId.slice(0, 8)}
              </span>
            </div>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {viewModel.relativeTime}
                </div>
              </TooltipTrigger>
              <TooltipContent>{viewModel.exactTime}</TooltipContent>
            </Tooltip>
          </div>

          {/* Items line with order code */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>{viewModel.itemsCount} items</span>
            <span>•</span>
            <span className="truncate">
              {viewModel.topItem}
              {order.items.length > 1 && ` +${order.items.length - 1}`}
            </span>
            {order.fulfillmentStatus === IOrder.OrderFulfillmentStatus.IN_DELIVERY && (
              <div className="flex items-center gap-1 ml-auto">
                <Truck className="h-3 w-3 text-blue-500" />
                <span className="text-xs">Delivery</span>
              </div>
            )}
          </div>

          {/* Footer - Total, Payment, Actions, and Order Code */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">{viewModel.totalFormatted}</span>
              <Badge 
                variant="outline" 
                className={cn("text-xs border", viewModel.paymentBadge.color)}
              >
                {viewModel.paymentBadge.label}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs font-mono bg-muted/50 hover:bg-muted"
                    onClick={viewModel.handleCopyCode}
                  >
                    #{viewModel.shortId}
                    <Copy className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Click to copy order code</TooltipContent>
              </Tooltip>
              
              {viewModel.attention.show && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={cn("w-2 h-2 rounded-full", viewModel.attention.color)} />
                  </TooltipTrigger>
                  <TooltipContent>{viewModel.attention.reason}</TooltipContent>
                </Tooltip>
              )}
              
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={(e) => viewModel.handleViewClick(e, onClick)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>View details</TooltipContent>
                </Tooltip>
                
                {viewModel.canMoveNext && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={viewModel.handleMoveNext}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Move to next stage</TooltipContent>
                  </Tooltip>
                )}
                
                {viewModel.canCancel && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={viewModel.handleCancel}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Cancel order</TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>

          {/* Exception chips */}
          {(viewModel.exceptionFlags.paymentRefunded || viewModel.exceptionFlags.paymentFailed || 
            viewModel.exceptionFlags.returned || viewModel.exceptionFlags.failedDelivery || 
            viewModel.exceptionFlags.hasIssues || viewModel.exceptionFlags.expired) && (
            <div className="flex flex-wrap gap-1 pt-1">
              {viewModel.exceptionFlags.paymentRefunded && (
                <Badge variant="secondary" className="text-xs h-5 px-2">Refunded</Badge>
              )}
              {viewModel.exceptionFlags.paymentFailed && (
                <Badge variant="secondary" className="text-xs h-5 px-2">Payment Failed</Badge>
              )}
              {viewModel.exceptionFlags.returned && (
                <Badge variant="secondary" className="text-xs h-5 px-2">Returned</Badge>
              )}
              {viewModel.exceptionFlags.failedDelivery && (
                <Badge variant="secondary" className="text-xs h-5 px-2">Failed Delivery</Badge>
              )}
              {viewModel.exceptionFlags.hasIssues && (
                <Badge variant="secondary" className="text-xs h-5 px-2">Issues</Badge>
              )}
              {viewModel.exceptionFlags.expired && (
                <Badge variant="secondary" className="text-xs h-5 px-2">Expired</Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
