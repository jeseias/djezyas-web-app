import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { 
  MoreHorizontalIcon, 
  EyeIcon, 
  PackageIcon, 
  CheckCircleIcon,
  XCircleIcon,
  PrinterIcon,
  UserIcon,
} from "lucide-react"
import { OrderStatus } from "../types/order.types"
import type { Order } from "../types/order.types"

interface OrderActionsMenuProps {
  order: Order
}

export function OrderActionsMenu({ order }: OrderActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getActionsForStatus = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return [
          { label: "View Details", icon: EyeIcon, action: "view" },
          { label: "Start Picking", icon: PackageIcon, action: "start-picking" },
          { label: "Cancel Order", icon: XCircleIcon, action: "cancel" },
        ]
      
      case OrderStatus.PAID:
        return [
          { label: "View Details", icon: EyeIcon, action: "view" },
          { label: "Start Picking", icon: PackageIcon, action: "start-picking" },
          { label: "Mark Packed", icon: CheckCircleIcon, action: "mark-packed" },
          { label: "Cancel Order", icon: XCircleIcon, action: "cancel" },
        ]
      
      case OrderStatus.IN_DELIVERY:
        return [
          { label: "View Details", icon: EyeIcon, action: "view" },
          { label: "Mark Delivered", icon: CheckCircleIcon, action: "mark-delivered" },
          { label: "Failed Delivery", icon: XCircleIcon, action: "failed-delivery" },
        ]
      
      case OrderStatus.CLIENT_CONFIRMED_DELIVERY:
        return [
          { label: "View Details", icon: EyeIcon, action: "view" },
          { label: "View Receipt", icon: PrinterIcon, action: "view-receipt" },
        ]
      
      case OrderStatus.CANCELLED:
      case OrderStatus.EXPIRED:
        return [
          { label: "View Details", icon: EyeIcon, action: "view" },
        ]
      
      default:
        return [
          { label: "View Details", icon: EyeIcon, action: "view" },
        ]
    }
  }

  const handleAction = (action: string) => {
    setIsOpen(false)
    
    switch (action) {
      case "view":
        // This will be handled by the parent component
        break
      case "start-picking":
        // TODO: Implement start picking mutation
        console.log("Start picking order:", order.id)
        break
      case "mark-packed":
        // TODO: Implement mark packed mutation
        console.log("Mark packed order:", order.id)
        break
      case "mark-delivered":
        // TODO: Implement mark delivered mutation
        console.log("Mark delivered order:", order.id)
        break
      case "cancel":
        // TODO: Implement cancel mutation
        console.log("Cancel order:", order.id)
        break
      case "failed-delivery":
        // TODO: Implement failed delivery mutation
        console.log("Failed delivery order:", order.id)
        break
      case "view-receipt":
        // TODO: Implement view receipt
        console.log("View receipt order:", order.id)
        break
    }
  }

  const actions = getActionsForStatus(order.status)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {actions.map((action) => (
          <DropdownMenuItem
            key={action.action}
            onClick={() => handleAction(action.action)}
            className="cursor-pointer"
          >
            <action.icon className="h-4 w-4 mr-2" />
            {action.label}
          </DropdownMenuItem>
        ))}
        
        {actions.length > 1 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleAction("assign")}>
              <UserIcon className="h-4 w-4 mr-2" />
              Assign to User
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("print-slip")}>
              <PrinterIcon className="h-4 w-4 mr-2" />
              Print Slip
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
