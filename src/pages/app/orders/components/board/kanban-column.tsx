import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { MoreHorizontal, ChevronDown, ChevronRight, Package } from "lucide-react";
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
      className="shrink-0 w-[360px] snap-start bg-card rounded-none border-2 border-border shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col h-full"
      style={droppableStyle}
    >
      {/* Column Header */}
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 rounded-none border-b-2 border-border/60 p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: column.color }}
            />
            <h3 className="font-semibold text-sm text-foreground">{column.title}</h3>
            <Badge 
              variant="secondary" 
              className="text-xs font-medium px-2 py-1"
              style={{ 
                backgroundColor: `${column.bgColor}20`,
                color: column.color,
                border: `1px solid ${column.color}40`
              }}
            >
              {column.count}
            </Badge>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-muted/50">
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
      <div className="flex-1 flex flex-col p-2 min-h-0 bg-gradient-to-b from-transparent to-muted/20">
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
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground/50 p-8">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center">
                <Package className="h-6 w-6 text-muted-foreground/60" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground/70">No orders</p>
                <p className="text-xs text-muted-foreground/50">
                  {column.title === "New" && "New orders will appear here"}
                  {column.title === "Awaiting Payment" && "Orders waiting for payment will appear here"}
                  {column.title === "Preparing" && "Orders being prepared will appear here"}
                  {column.title === "In Delivery" && "Orders in transit will appear here"}
                  {column.title === "Delivered" && "Completed orders will appear here"}
                  {column.title === "Cancelled" && "Cancelled orders will appear here"}
                  {!["New", "Awaiting Payment", "Preparing", "In Delivery", "Delivered", "Cancelled"].includes(column.title) && 
                    "Orders will appear here"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
