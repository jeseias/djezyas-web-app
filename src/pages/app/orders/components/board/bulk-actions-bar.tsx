import { useState } from "react";
import { Printer, Truck, Move, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IOrder, STATUS_META } from "@/core/modules/types";

interface BulkActionsBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkMove: (toStatus: IOrder.OrderFulfillmentStatus) => void;
  columns: IOrder.KanbanColumn[];
}

export function BulkActionsBar({
  selectedCount,
  onClearSelection,
  onBulkMove,
  columns,
}: BulkActionsBarProps) {
  const [isMoving, setIsMoving] = useState(false);

  const handleBulkMove = async (toStatus: IOrder.OrderFulfillmentStatus) => {
    setIsMoving(true);
    try {
      await onBulkMove(toStatus);
    } finally {
      setIsMoving(false);
    }
  };

  // Get available move targets (only columns that can receive drops)
  const availableTargets = columns.filter(column => column.canDrop);

  return (
    <div className="sticky top-16 z-15 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
      <div className="flex items-center justify-between p-3 gap-4">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-sm">
            {selectedCount} selected
          </Badge>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {/* Move to... */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                disabled={isMoving || availableTargets.length === 0}
                className="flex items-center gap-2"
              >
                <Move className="h-4 w-4" />
                Move to...
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {availableTargets.map((column) => (
                <DropdownMenuItem
                  key={column.id}
                  onClick={() => {
                    // Map macro status back to fulfillment status
                    const targetStatus = getTargetFulfillmentStatus(column.macroStatus);
                    handleBulkMove(targetStatus);
                  }}
                  disabled={isMoving}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${column.bgColor.replace('bg-', 'bg-').replace('/50', '')}`} />
                    {column.title}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Print Slips */}
          <Button
            variant="outline"
            size="sm"
            disabled={isMoving}
            className="flex items-center gap-2"
          >
            <Printer className="h-4 w-4" />
            Print Slips
          </Button>

          {/* Dispatch */}
          <Button
            variant="outline"
            size="sm"
            disabled={isMoving}
            className="flex items-center gap-2"
          >
            <Truck className="h-4 w-4" />
            Dispatch
          </Button>
        </div>
      </div>
    </div>
  );
}

// Helper function to map macro status to fulfillment status
function getTargetFulfillmentStatus(macroStatus: IOrder.MacroStatus): IOrder.OrderFulfillmentStatus {
  switch (macroStatus) {
    case IOrder.MacroStatus.NEW:
      return IOrder.OrderFulfillmentStatus.NEW;
    case IOrder.MacroStatus.PICKING:
      return IOrder.OrderFulfillmentStatus.PICKING;
    case IOrder.MacroStatus.PACKED:
      return IOrder.OrderFulfillmentStatus.PACKED;
    case IOrder.MacroStatus.IN_DELIVERY:
      return IOrder.OrderFulfillmentStatus.IN_DELIVERY;
    case IOrder.MacroStatus.DELIVERED:
      return IOrder.OrderFulfillmentStatus.DELIVERED;
    case IOrder.MacroStatus.CANCELLED:
      return IOrder.OrderFulfillmentStatus.CANCELLED;
    case IOrder.MacroStatus.RETURNED:
      return IOrder.OrderFulfillmentStatus.RETURNED;
    case IOrder.MacroStatus.FAILED_DELIVERY:
      return IOrder.OrderFulfillmentStatus.FAILED_DELIVERY;
    case IOrder.MacroStatus.ISSUES:
      return IOrder.OrderFulfillmentStatus.ISSUES;
    case IOrder.MacroStatus.EXPIRED:
      return IOrder.OrderFulfillmentStatus.EXPIRED;
    default:
      return IOrder.OrderFulfillmentStatus.NEW;
  }
}
