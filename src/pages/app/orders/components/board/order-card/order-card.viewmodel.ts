import { formatDistanceToNow } from "date-fns";
import { IOrder, getMacroStatus, getExceptionFlags } from "@/core/modules/types";

export interface OrderCardViewModel {
  // Computed values
  shortId: string;
  itemsCount: number;
  topItem: string;
  totalFormatted: string;
  relativeTime: string;
  exactTime: string;
  
  // Status and badges
  paymentBadge: {
    label: string;
    color: string;
  };
  stageColor: string;
  attention: {
    show: boolean;
    color: string;
    reason: string;
  };
  
  // Exception flags
  exceptionFlags: ReturnType<typeof getExceptionFlags>;
  
  // Actions
  canMoveNext: boolean;
  canCancel: boolean;
  
  // Methods
  handleCopyCode: (e: React.MouseEvent) => void;
  handleViewClick: (e: React.MouseEvent, onClick?: (order: IOrder.Model) => void) => void;
  handleMoveNext: (e: React.MouseEvent) => void;
  handleCancel: (e: React.MouseEvent) => void;
}

export class OrderCardViewModelImpl implements OrderCardViewModel {
  constructor(
    private order: IOrder.Model,
    private onCopySuccess: (message: string) => void,
    private onMoveNext: () => void,
    private onCancel: () => void
  ) {}

  get shortId(): string {
    return this.order.code.split('-')[0];
  }

  get itemsCount(): number {
    return this.order.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get topItem(): string {
    return this.order.items[0]?.product.name || 'No items';
  }

  get totalFormatted(): string {
    return this.order.totalAmount 
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(this.order.totalAmount / 100) 
      : 'N/A';
  }

  get relativeTime(): string {
    return formatDistanceToNow(new Date(this.order.createdAt), { addSuffix: true });
  }

  get exactTime(): string {
    return new Date(this.order.createdAt).toLocaleString();
  }

  get paymentBadge() {
    switch (this.order.paymentStatus) {
      case IOrder.OrderPaymentStatus.PENDING:
        return { label: "Pending", color: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30" };
      case IOrder.OrderPaymentStatus.PAID:
        return { label: "Paid", color: "bg-green-500/20 text-green-700 border-green-500/30" };
      case IOrder.OrderPaymentStatus.REFUNDED:
        return { label: "Refunded", color: "bg-red-500/20 text-red-700 border-red-500/30" };
      case IOrder.OrderPaymentStatus.FAILED:
        return { label: "Failed", color: "bg-red-500/20 text-red-700 border-red-500/30" };
      default:
        return { label: this.order.paymentStatus, color: "bg-gray-500/20 text-gray-700 border-gray-500/30" };
    }
  }

  get stageColor(): string {
    const macroStatus = getMacroStatus(this.order);
    
    switch (macroStatus) {
      case IOrder.MacroStatus.NEW:
      case IOrder.MacroStatus.AWAITING_PAYMENT:
        return "bg-muted";
      case IOrder.MacroStatus.PAID:
      case IOrder.MacroStatus.PREPARING:
      case IOrder.MacroStatus.PICKING:
      case IOrder.MacroStatus.PACKED:
      case IOrder.MacroStatus.READY_FOR_DISPATCH:
        return "bg-blue-500";
      case IOrder.MacroStatus.IN_DELIVERY:
        return "bg-primary";
      case IOrder.MacroStatus.DELIVERED:
        return "bg-green-500";
      case IOrder.MacroStatus.CANCELLED:
      case IOrder.MacroStatus.EXPIRED:
      case IOrder.MacroStatus.RETURNED:
      case IOrder.MacroStatus.FAILED_DELIVERY:
      case IOrder.MacroStatus.ISSUES:
        return "bg-red-500";
      default:
        return "bg-muted";
    }
  }

  get attention() {
    const now = new Date();
    const orderTime = new Date(this.order.createdAt);
    const timeDiff = now.getTime() - orderTime.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    if (this.order.paymentStatus === IOrder.OrderPaymentStatus.PENDING && hoursDiff > 1) {
      return { 
        show: true, 
        color: "bg-amber-500", 
        reason: `Waiting for payment for ${Math.floor(hoursDiff)}h ${Math.floor((hoursDiff % 1) * 60)}m` 
      };
    }
    
    if (hoursDiff > 24) {
      return { 
        show: true, 
        color: "bg-red-500", 
        reason: `In this stage for ${Math.floor(hoursDiff)}h` 
      };
    }

    if (this.order.paymentStatus === IOrder.OrderPaymentStatus.FAILED) {
      return { 
        show: true, 
        color: "bg-red-500", 
        reason: "Payment failed" 
      };
    }

    return { show: false, color: "", reason: "" };
  }

  get exceptionFlags() {
    return getExceptionFlags(this.order);
  }

  get canMoveNext(): boolean {
    const macroStatus = getMacroStatus(this.order);
    return this.order.paymentStatus === IOrder.OrderPaymentStatus.PAID && 
           (macroStatus === IOrder.MacroStatus.NEW || macroStatus === IOrder.MacroStatus.PREPARING);
  }

  get canCancel(): boolean {
    const macroStatus = getMacroStatus(this.order);
    return this.order.paymentStatus === IOrder.OrderPaymentStatus.PENDING && 
           macroStatus === IOrder.MacroStatus.AWAITING_PAYMENT;
  }

  handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(this.order.code);
    this.onCopySuccess("Order code copied");
  };

  handleViewClick = (e: React.MouseEvent, onClick?: (order: IOrder.Model) => void) => {
    e.stopPropagation();
    onClick?.(this.order);
  };

  handleMoveNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    this.onMoveNext();
  };

  handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    this.onCancel();
  };
}
