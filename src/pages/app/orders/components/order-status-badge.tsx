import { Badge } from "@/components/ui/badge"
import { OrderStatus, FulfillmentStatus } from "../types/order.types"

interface OrderStatusBadgeProps {
  status: OrderStatus
  variant?: "payment" | "fulfillment"
}

const paymentStatusConfig = {
  [OrderStatus.PENDING]: {
    label: "Pending",
    variant: "outline" as const,
    className: "border-yellow-500 text-yellow-600 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-400",
  },
  [OrderStatus.PAID]: {
    label: "Paid",
    variant: "default" as const,
    className: "bg-green-500 text-white border-green-500",
  },
  [OrderStatus.CANCELLED]: {
    label: "Cancelled",
    variant: "destructive" as const,
    className: "bg-red-500 text-white border-red-500",
  },
  [OrderStatus.EXPIRED]: {
    label: "Expired",
    variant: "outline" as const,
    className: "border-gray-500 text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-400",
  },
  [OrderStatus.IN_DELIVERY]: {
    label: "In Delivery",
    variant: "default" as const,
    className: "bg-blue-500 text-white border-blue-500",
  },
  [OrderStatus.CLIENT_CONFIRMED_DELIVERY]: {
    label: "Delivered",
    variant: "default" as const,
    className: "bg-green-500 text-white border-green-500",
  },
}

const fulfillmentStatusConfig = {
  [FulfillmentStatus.NEW]: {
    label: "New",
    variant: "outline" as const,
    className: "border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-400",
  },
  [FulfillmentStatus.PICKING]: {
    label: "Picking",
    variant: "outline" as const,
    className: "border-orange-500 text-orange-600 bg-orange-50 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-400",
  },
  [FulfillmentStatus.PACKED]: {
    label: "Packed",
    variant: "outline" as const,
    className: "border-purple-500 text-purple-600 bg-purple-50 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-400",
  },
  [FulfillmentStatus.IN_DELIVERY]: {
    label: "In Delivery",
    variant: "outline" as const,
    className: "border-indigo-500 text-indigo-600 bg-indigo-50 dark:bg-indigo-950 dark:text-indigo-400 dark:border-indigo-400",
  },
  [FulfillmentStatus.DELIVERED]: {
    label: "Delivered",
    variant: "default" as const,
    className: "bg-green-500 text-white border-green-500",
  },
  [FulfillmentStatus.ISSUES]: {
    label: "Issues",
    variant: "destructive" as const,
    className: "bg-red-500 text-white border-red-500",
  },
}

export function OrderStatusBadge({ status, variant = "payment" }: OrderStatusBadgeProps) {
  const config = variant === "payment" ? paymentStatusConfig : fulfillmentStatusConfig
  
  // For payment status, use the payment config
  // For fulfillment status, we need to map the order status to fulfillment status
  let displayStatus = status
  let displayConfig = config[status as keyof typeof config]
  
  if (variant === "fulfillment") {
    // Map order status to fulfillment status
    const statusMapping: Record<OrderStatus, FulfillmentStatus> = {
      [OrderStatus.PENDING]: FulfillmentStatus.NEW,
      [OrderStatus.PAID]: FulfillmentStatus.NEW,
      [OrderStatus.CANCELLED]: FulfillmentStatus.ISSUES,
      [OrderStatus.EXPIRED]: FulfillmentStatus.ISSUES,
      [OrderStatus.IN_DELIVERY]: FulfillmentStatus.IN_DELIVERY,
      [OrderStatus.CLIENT_CONFIRMED_DELIVERY]: FulfillmentStatus.DELIVERED,
    }
    displayStatus = statusMapping[status]
    displayConfig = fulfillmentStatusConfig[displayStatus]
  }

  if (!displayConfig) {
    return (
      <Badge variant="outline" className="border-gray-300 text-gray-600">
        {status}
      </Badge>
    )
  }

  return (
    <Badge 
      variant={displayConfig.variant} 
      className={displayConfig.className}
    >
      {displayConfig.label}
    </Badge>
  )
}
