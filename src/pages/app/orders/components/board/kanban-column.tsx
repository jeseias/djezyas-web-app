import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { MoreHorizontal, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IOrder } from "@/core/modules/types";
import { SortableOrderCard } from "./sortable-order-card";

interface KanbanColumnProps {
  column: IOrder.KanbanColumn;
  selectedOrders: string[];
  onOrderClick: (order: IOrder.Model) => void;
  onOrderSelect: (orderId: string, checked: boolean) => void;
}

export function KanbanColumn({
  column,
  selectedOrders,
  onOrderClick,
  onOrderSelect,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    disabled: !column.canDrop,
  });

  const droppableStyle = {
    opacity: isOver ? 0.8 : 1,
    borderColor: isOver ? "hsl(var(--primary))" : "transparent",
  };

  return (
    <div
      ref={setNodeRef}
      className="shrink-0 w-[360px] snap-start bg-background rounded-2xl border border-border/50 shadow-sm flex flex-col h-full"
      style={droppableStyle}
    >
      {/* Column Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-t-2xl border-b border-dotted border-border/50 p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm">{column.title}</h3>
            <Badge variant="secondary" className="text-xs">
              {column.count}
            </Badge>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                {column.isCollapsed ? <ChevronRight className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
                {column.isCollapsed ? "Expand" : "Collapse"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                Auto-refresh
              </DropdownMenuItem>
              {column.wipLimit && (
                <DropdownMenuItem>
                  WIP Limit: {column.wipLimit}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Column Content */}
      <div className="flex-1 flex flex-col p-2 min-h-0">
        <SortableContext items={column.orders.map(order => order.id)} strategy={verticalListSortingStrategy}>
          <div className="flex-1 space-y-2 overflow-y-auto">
            {column.orders.map((order) => (
              <SortableOrderCard
                key={order.id}
                order={order}
                isSelected={selectedOrders.includes(order.id)}
                onSelect={onOrderSelect}
                onClick={onOrderClick}
              />
            ))}
          </div>
        </SortableContext>
        
        {column.orders.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
            No orders
          </div>
        )}
      </div>
    </div>
  );
}
