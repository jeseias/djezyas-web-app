import { useState, useMemo, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import type {
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import {  useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { IOrder, STATUS_META, getMacroStatus, isOrgAllowedTransition } from "@/core/modules/types";
import { OrdersToolbar } from "./orders-toolbar";
import { KanbanColumn } from "./kanban-column";
import { OrderCard } from "./order-card/order-card";
import { OrderDetailsDrawer } from "./order-details-drawer";
import { BulkActionsBar } from "./bulk-actions-bar";
import { OrdersScrollContainer } from "./orders-scroll-container";

interface OrdersKanbanBoardProps {
  orders: IOrder.Model[];
  isLoading: boolean;
  filters: any;
  onFiltersChange: (filters: any) => void;
}

export function OrdersKanbanBoard({
  orders,
  isLoading,
  filters,
  onFiltersChange,
}: OrdersKanbanBoardProps) {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IOrder.Model | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [boardMode, setBoardMode] = useState<IOrder.BoardMode>(IOrder.BoardMode.IMPORTANT);
  const [draggedOrder, setDraggedOrder] = useState<IOrder.Model | null>(null);
  const [showAllStages, setShowAllStages] = useState(false);

  const queryClient = useQueryClient();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  // Define columns based on board mode
  const getColumns = useCallback((mode: IOrder.BoardMode, showAll: boolean) => {
    if (mode === IOrder.BoardMode.IMPORTANT) {
      const baseColumns = [
        IOrder.MacroStatus.NEW,
        IOrder.MacroStatus.AWAITING_PAYMENT,
        IOrder.MacroStatus.PAID,
        IOrder.MacroStatus.PREPARING,
        IOrder.MacroStatus.READY_FOR_DISPATCH,
        IOrder.MacroStatus.IN_DELIVERY,
        IOrder.MacroStatus.DELIVERED,
        IOrder.MacroStatus.CANCELLED,
      ];

      if (showAll) {
        return [
          ...baseColumns,
          IOrder.MacroStatus.RETURNED,
          IOrder.MacroStatus.FAILED_DELIVERY,
          IOrder.MacroStatus.ISSUES,
          IOrder.MacroStatus.EXPIRED,
        ];
      }

      return baseColumns;
    } else {
      // ALL_STAGES mode
      const baseColumns = [
        IOrder.MacroStatus.NEW,
        IOrder.MacroStatus.AWAITING_PAYMENT,
        IOrder.MacroStatus.PAID,
        IOrder.MacroStatus.PICKING,
        IOrder.MacroStatus.PACKED,
        IOrder.MacroStatus.IN_DELIVERY,
        IOrder.MacroStatus.DELIVERED,
        IOrder.MacroStatus.CANCELLED,
      ];

      if (showAll) {
        return [
          ...baseColumns,
          IOrder.MacroStatus.RETURNED,
          IOrder.MacroStatus.FAILED_DELIVERY,
          IOrder.MacroStatus.ISSUES,
          IOrder.MacroStatus.EXPIRED,
        ];
      }

      return baseColumns;
    }
  }, []);

  // Group orders by macro status
  const columns = useMemo(() => {
    const columnStatuses = getColumns(boardMode, showAllStages);
    
    return columnStatuses.map((macroStatus) => {
      const statusOrders = orders.filter((order) => {
        const orderMacroStatus = getMacroStatus(order);
        
        // Handle special cases for board modes
        if (boardMode === IOrder.BoardMode.IMPORTANT) {
          // In Important mode, group picking/packed into Preparing
          if (macroStatus === IOrder.MacroStatus.PREPARING) {
            return orderMacroStatus === IOrder.MacroStatus.PREPARING;
          }
          if (macroStatus === IOrder.MacroStatus.READY_FOR_DISPATCH) {
            return orderMacroStatus === IOrder.MacroStatus.READY_FOR_DISPATCH;
          }
        } else {
          // In All Stages mode, show separate Picking and Packed columns
          if (macroStatus === IOrder.MacroStatus.PICKING) {
            return order.fulfillmentStatus === IOrder.OrderFulfillmentStatus.PICKING;
          }
          if (macroStatus === IOrder.MacroStatus.PACKED) {
            return order.fulfillmentStatus === IOrder.OrderFulfillmentStatus.PACKED;
          }
        }
        
        return orderMacroStatus === macroStatus;
      });

      const meta = STATUS_META[macroStatus];
      return {
        id: macroStatus,
        title: meta.label,
        macroStatus,
        orders: statusOrders,
        count: statusOrders.length,
        color: meta.color,
        bgColor: meta.bgColor,
        canDrop: meta.canOrgSet,
        isCollapsed: false,
        wipLimit: undefined,
      };
    });
  }, [orders, boardMode, showAllStages, getColumns]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const order = orders.find((o) => o.id === active.id);
    if (order) {
      setDraggedOrder(order);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const order = orders.find((o) => o.id === active.id);
    const targetColumn = columns.find((c) => c.id === over.id);
    
    if (!order || !targetColumn) return;

    // Visual feedback could be added here
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setDraggedOrder(null);

    if (!over) return;

    const order = orders.find((o) => o.id === active.id);
    const targetColumn = columns.find((c) => c.id === over.id);
    
    if (!order || !targetColumn) return;

    const targetFulfillmentStatus = getTargetFulfillmentStatus(targetColumn.macroStatus);
    
    // Check if transition is allowed
    const isAllowed = isOrgAllowedTransition(
      order.fulfillmentStatus,
      targetFulfillmentStatus,
    );

    if (!isAllowed) {
      toast.error("Invalid status transition");
      return;
    }

    // Optimistic update
    const optimisticOrder = {
      ...order,
      fulfillmentStatus: targetFulfillmentStatus,
    };

    // Update cache optimistically
    queryClient.setQueryData(['orders'], (old: any) => {
      if (!old?.data?.getOrdersByOrganization) return old;
      
      return {
        ...old,
        data: {
          ...old.data,
          getOrdersByOrganization: old.data.getOrdersByOrganization.map((o: IOrder.Model) =>
            o.id === order.id ? optimisticOrder : o
          ),
        },
      };
    });

    try {
      
      
      toast.success(`Order moved to ${STATUS_META[targetColumn.macroStatus].label}`);
    } catch (error) {
      // Revert optimistic update
      queryClient.setQueryData(['orders'], (old: any) => {
        if (!old?.data?.getOrdersByOrganization) return old;
        
        return {
          ...old,
          data: {
            ...old.data,
            getOrdersByOrganization: old.data.getOrdersByOrganization.map((o: IOrder.Model) =>
              o.id === order.id ? order : o
            ),
          },
        };
      });
      
      toast.error("Failed to move order");
    }
  };

  const getTargetFulfillmentStatus = (macroStatus: IOrder.MacroStatus): IOrder.OrderFulfillmentStatus => {
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
  };

  const handleOrderClick = (order: IOrder.Model) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders(prev => [...prev, orderId]);
    } else {
      setSelectedOrders(prev => prev.filter(id => id !== orderId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(orders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex flex-col">
        <div className="sticky top-0 z-10 bg-background border-b p-4">
          <div className="h-8 bg-muted rounded animate-pulse mb-4" />
          <div className="h-6 bg-muted rounded animate-pulse" />
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="flex gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="shrink-0 w-[360px] bg-muted rounded-2xl p-4 animate-pulse">
                <div className="h-6 bg-muted-foreground/20 rounded mb-4" />
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="h-20 bg-muted-foreground/20 rounded-xl" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <OrdersToolbar
        filters={filters}
        onFiltersChange={onFiltersChange}
        boardMode={boardMode}
        onBoardModeChange={setBoardMode}
        showAllStages={showAllStages}
        onShowAllStagesChange={setShowAllStages}
        selectedCount={selectedOrders.length}
        totalCount={orders.length}
        onSelectAll={handleSelectAll}
      />
      
      {selectedOrders.length > 0 && (
        <BulkActionsBar
          selectedCount={selectedOrders.length}
          onClearSelection={() => setSelectedOrders([])}
          onBulkMove={() => {}}
          columns={columns}
        />
      )}

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <OrdersScrollContainer className="flex-1">
          <div className="flex flex-nowrap gap-1 sm:gap-2 md:gap-4 px-1 sm:px-2 md:px-4 py-3 h-full">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                selectedOrders={selectedOrders}
                onOrderClick={handleOrderClick}
                onOrderSelect={handleSelectOrder}
              />
            ))}
          </div>
        </OrdersScrollContainer>

        <DragOverlay>
          {draggedOrder ? (
            <OrderCard
              order={draggedOrder}
              isSelected={selectedOrders.includes(draggedOrder.id)}
              isDragging={true}
              onSelect={handleSelectOrder}
              onClick={handleOrderClick}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Order Details Drawer */}
      {selectedOrder && (
        <OrderDetailsDrawer
          order={selectedOrder}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          onMoveOrder={async () => {}}
        />
      )}
    </div>
  );
}
