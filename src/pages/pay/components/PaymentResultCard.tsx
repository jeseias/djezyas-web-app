import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import type { IPayment } from "@/core/modules/types";
import { formatCurrency } from "@/core/modules/shared/utils/payment-utils";

interface PaymentResultCardProps {
  status: IPayment.PaymentStatus;
  totalAmount: number;
  reference?: string;
  transactionId?: string;
  onClose?: () => void;
}

const getStatusConfig = (status: IPayment.PaymentStatus) => {
  switch (status) {
    case "succeeded":
      return {
        icon: CheckCircle,
        title: "Payment Successful",
        description: "Your payment has been processed successfully.",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
      };
    case "failed":
      return {
        icon: XCircle,
        title: "Payment Failed",
        description: "Your payment could not be processed. Please try again.",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
      };
    case "cancelled":
      return {
        icon: XCircle,
        title: "Payment Cancelled",
        description: "Your payment was cancelled.",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
      };
    case "expired":
      return {
        icon: Clock,
        title: "Payment Expired",
        description: "The payment session has expired. Please start a new payment.",
        color: "text-gray-600",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
      };
    default:
      return {
        icon: AlertCircle,
        title: "Payment Status Unknown",
        description: "Unable to determine payment status.",
        color: "text-gray-600",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
      };
  }
};

export const PaymentResultCard = ({
  status,
  totalAmount,
  reference,
  transactionId,
  onClose,
}: PaymentResultCardProps) => {
  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <div className={`p-6 rounded-lg border ${config.bgColor} ${config.borderColor}`}>
      <div className="flex items-center space-x-3 mb-4">
        <Icon className={`w-8 h-8 ${config.color}`} />
        <div>
          <h3 className={`text-lg font-semibold ${config.color}`}>
            {config.title}
          </h3>
          <p className="text-gray-600">{config.description}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Amount:</span>
          <span className="font-semibold text-lg">
            {formatCurrency(totalAmount)}
          </span>
        </div>

        {reference && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Reference:</span>
            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
              {reference}
            </span>
          </div>
        )}

        {transactionId && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Transaction ID:</span>
            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
              {transactionId}
            </span>
          </div>
        )}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Close / Return to App
        </button>
      )}
    </div>
  );
};
