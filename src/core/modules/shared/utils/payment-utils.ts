import { ALLOWED_PROVIDER_ORIGINS } from "@/core/config/payment";
import type { IPayment } from "@/core/modules/types";

export const isTrustedProviderEvent = (
  evt: MessageEvent,
  iframeRef: React.RefObject<HTMLIFrameElement>
): IPayment.EmisEvent | null => {
  // Validate origin
  if (!ALLOWED_PROVIDER_ORIGINS.includes(evt.origin)) {
    console.warn("Rejected message from untrusted origin:", evt.origin);
    return null;
  }

  // Validate source
  if (evt.source !== iframeRef.current?.contentWindow) {
    console.warn("Rejected message from unexpected source");
    return null;
  }

  // Validate data shape
  try {
    const data = evt.data;
    if (!data || typeof data !== "object") {
      return null;
    }

    // Check for EMIS payment event
    if (data.status) {
      const validStatuses = ["ACCEPTED", "REJECTED", "CANCELLED", "EXPIRED"];
      if (!validStatuses.includes(data.status)) {
        console.warn("Invalid payment status:", data.status);
        return null;
      }

      return {
        status: data.status,
        reference: data.reference,
        transactionId: data.transactionId,
      };
    }

    return null;
  } catch (error) {
    console.error("Error parsing provider event:", error);
    return null;
  }
};

export const mapEmisStatusToPaymentStatus = (
  emisStatus: "ACCEPTED" | "REJECTED" | "CANCELLED" | "EXPIRED"
): IPayment.PaymentStatus => {
  switch (emisStatus) {
    case "ACCEPTED":
      return "succeeded";
    case "REJECTED":
      return "failed";
    case "CANCELLED":
      return "cancelled";
    case "EXPIRED":
      return "expired";
    default:
      return "failed";
  }
};

export const formatCurrency = (amount: number, currency: string = "AOA"): string => {
  return new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export const formatExpiryTime = (expiresAt: string): string => {
  const expiryDate = new Date(expiresAt);
  const now = new Date();
  const diffMs = expiryDate.getTime() - now.getTime();
  
  if (diffMs <= 0) {
    return "Expired";
  }

  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);
  
  return `${diffMins}:${diffSecs.toString().padStart(2, '0')}`;
};
