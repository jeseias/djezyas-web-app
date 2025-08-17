import type { IOrder } from "./order.types";

export namespace IPayment {
  export type EmisEvent = {
    status: "ACCEPTED" | "REJECTED" | "CANCELLED" | "EXPIRED";
    reference?: string;
    transactionId?: string;
  };

  export type PaymentStatus = "pending" | "succeeded" | "failed" | "expired" | "cancelled";

  export type PaymentProvider = "multicaixa_express" | "stripe" | "afrimoney";

  export type CheckoutSession = {
    paymentIntentId: string;
    status: PaymentStatus;
    expiresAt?: string;
    provider: PaymentProvider;
    totalAmount: number;
    orders: IOrder.Model[];
    providerSession?: {
      iframeUrl?: string;
      iframeToken?: string;
    };
  };

  export type PaymentTerminal = {
    status: PaymentStatus;
    reference?: string;
    transactionId?: string;
  };

  export type ReactNativeMessage = {
    type: "PAYMENT_STATUS";
    pi: string;
    status: PaymentStatus;
    reference?: string;
    transactionId?: string;
  };
}
