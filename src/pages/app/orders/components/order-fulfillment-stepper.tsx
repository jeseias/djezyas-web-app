import { 
  Stepper, 
  StepperItem, 
  StepperIndicator, 
  StepperSeparator, 
  StepperTitle 
} from "@/components/ui/stepper"
import { OrderStatus } from "../types/order.types"

interface OrderFulfillmentStepperProps {
  status: OrderStatus
}

export function OrderFulfillmentStepper({ status }: OrderFulfillmentStepperProps) {
  const getCurrentStep = (status: OrderStatus): number => {
    switch (status) {
      case OrderStatus.PENDING:
        return 0
      case OrderStatus.PAID:
        return 1
      case OrderStatus.IN_DELIVERY:
        return 3
      case OrderStatus.CLIENT_CONFIRMED_DELIVERY:
        return 4
      case OrderStatus.CANCELLED:
      case OrderStatus.EXPIRED:
        return -1 // Cancelled/expired orders don't show progress
      default:
        return 0
    }
  }

  const currentStep = getCurrentStep(status)

  // Don't show stepper for cancelled or expired orders
  if (currentStep === -1) {
    return null
  }

  return (
    <Stepper value={currentStep} className="w-full">
      <StepperItem step={0} completed={currentStep > 0}>
        <StepperIndicator />
        <StepperTitle>Order Placed</StepperTitle>
        <StepperSeparator />
      </StepperItem>
      
      <StepperItem step={1} completed={currentStep > 1}>
        <StepperIndicator />
        <StepperTitle>Payment Received</StepperTitle>
        <StepperSeparator />
      </StepperItem>
      
      <StepperItem step={2} completed={currentStep > 2}>
        <StepperIndicator />
        <StepperTitle>Processing</StepperTitle>
        <StepperSeparator />
      </StepperItem>
      
      <StepperItem step={3} completed={currentStep > 3}>
        <StepperIndicator />
        <StepperTitle>In Delivery</StepperTitle>
        <StepperSeparator />
      </StepperItem>
      
      <StepperItem step={4}>
        <StepperIndicator />
        <StepperTitle>Delivered</StepperTitle>
      </StepperItem>
    </Stepper>
  )
}
