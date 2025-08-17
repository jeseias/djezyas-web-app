import type { IOrder } from "@/core/modules/types";
import { formatCurrency } from "@/core/modules/shared/utils/payment-utils";

interface OrderSummaryProps {
  orders: IOrder.Model[];
  totalAmount: number;
  expiresAt?: string;
  timeRemaining?: string;
}

export const OrderSummary = ({
  orders,
  totalAmount,
  timeRemaining,
}: OrderSummaryProps) => {
  const allItems = orders.flatMap((order) => order.items);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
        {timeRemaining && (
          <div className="text-sm text-gray-500">
            Expires in: <span className="font-mono font-semibold">{timeRemaining}</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {allItems.map((item, index) => (
          <div key={`${item.productId}-${index}`} className="flex items-center space-x-3">
            {item.product.imageUrl && (
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-12 h-12 rounded-md object-cover"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {item.product.name}
              </h3>
              <p className="text-sm text-gray-500">
                Qty: {item.quantity} × {formatCurrency(item.unitAmount)}
              </p>
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {formatCurrency(item.subtotal)}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 mt-4 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">
            {formatCurrency(totalAmount)}
          </span>
        </div>
      </div>

      {orders.length > 1 && (
        <div className="mt-3 text-sm text-gray-500">
          {orders.length} orders • {allItems.length} items
        </div>
      )}
    </div>
  );
};
