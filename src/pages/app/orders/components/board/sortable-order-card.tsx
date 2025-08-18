import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IOrder } from "@/core/modules/types";
import { OrderCard } from "./order-card";

interface SortableOrderCardProps {
  order: IOrder.Model;
  isSelected: boolean;
  onSelect: (orderId: string, checked: boolean) => void;
  onClick: (order: IOrder.Model) => void;
}

export function SortableOrderCard({
  order,
  isSelected,
  onSelect,
  onClick,
}: SortableOrderCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: order.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <OrderCard
        order={order}
        isSelected={isSelected}
        isDragging={isDragging}
        onSelect={onSelect}
        onClick={onClick}
      />
    </div>
  );
}
