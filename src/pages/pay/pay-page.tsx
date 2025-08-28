import { useEffect, useRef, useState } from "react";
import { useSearch } from "@tanstack/react-router";
import { useApiGetCheckoutSession } from "@/core/modules/api";
// import { OrderSummary } from "./components/OrderSummary";
import { PaymentResultCard } from "./components/PaymentResultCard";
import { isTrustedProviderEvent, mapEmisStatusToPaymentStatus, formatExpiryTime } from "@/core/modules/shared/utils/payment-utils";
import type { IPayment } from "@/core/modules/types";

// Extend Window interface for React Native WebView
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

export const PayPage = () => {
  const search = useSearch({ from: "/pay" });
  const token = (search as { ct?: string }).ct;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const [terminal, setTerminal] = useState<IPayment.PaymentTerminal | null>(null);
  const [_timeRemaining, setTimeRemaining] = useState<string>("");
  const [iframeError, setIframeError] = useState(false);

  const { data: session, isLoading, error } = useApiGetCheckoutSession(token || "");

  useEffect(() => {
    if (!session) return;

    const onMessage = (evt: MessageEvent) => {
      const emisEvent = isTrustedProviderEvent(evt, iframeRef as React.RefObject<HTMLIFrameElement>);
      if (!emisEvent) return;

      const nextStatus = mapEmisStatusToPaymentStatus(emisEvent.status);

      setTerminal({
        status: nextStatus,
        reference: emisEvent.reference,
        transactionId: emisEvent.transactionId,
      });

      // Notify React Native WebView
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: "PAYMENT_STATUS",
          pi: session.paymentIntentId,
          status: nextStatus,
          reference: emisEvent.reference,
          transactionId: emisEvent.transactionId,
        })
      );
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [session]);

  // Countdown timer
  useEffect(() => {
    if (!session?.expiresAt) return;

    const updateTimer = () => {
      const remaining = formatExpiryTime(session.expiresAt!);
      setTimeRemaining(remaining);
      
      if (remaining === "Expired" && !terminal) {
        setTerminal({ status: "expired" });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [session?.expiresAt, terminal]);

  // Handle iframe load error
  const handleIframeError = () => {
    setIframeError(true);
  };

  // Retry iframe
  const handleRetry = () => {
    setIframeError(false);
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment session...</p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment Session Error</h2>
          <p className="text-gray-600">Unable to load payment session. Please try again.</p>
        </div>
      </div>
    );
  }

  // Show result card if payment is complete
  if (terminal?.status && terminal.status !== "pending") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <PaymentResultCard
            status={terminal.status}
            totalAmount={session.totalAmount}
            reference={terminal.reference}
            transactionId={terminal.transactionId}
            onClose={() => {
              // Close or return to app
              window.ReactNativeWebView?.postMessage(
                JSON.stringify({
                  type: "PAYMENT_STATUS",
                  pi: session.paymentIntentId,
                  status: terminal.status,
                  reference: terminal.reference,
                  transactionId: terminal.transactionId,
                })
              );
            }}
          />
        </div>
      </div>
    );
  }
  // Build iframe URL - fallback to token if no provider session
  // const iframeUrl = `${import.meta.env.VITE_EMIS_IFRAME_URL}?token=${token}`;
  const iframeUrl = `https://pagamentonline.emis.co.ao/online-payment-gateway/portal/frame?token=${session.transactionId}`;

  return (
    <div 
      className="min-h-screen bg-gray-50 relative overflow-y-auto"
      style={{
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
    >
      {iframeError ? (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Failed to load payment form</p>
            <button
              onClick={handleRetry}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-white">
          {/* Order Summary Section */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              {_timeRemaining && (
                <span className="text-sm text-gray-500">
                  Expires in: <span className="font-mono font-semibold">{_timeRemaining}</span>
                </span>
              )}
            </div>
            
            {session.orders.flatMap(order => order.items).map((item, index) => (
              <div key={`${item.productId}-${index}`} className="flex items-center justify-between py-2">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="w-8 h-8 bg-gray-200 rounded mr-3 flex items-center justify-center">
                    <span className="text-xs text-gray-600">📦</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity} × {item.unitAmount} Kz
                    </p>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-900 ml-2">
                  {item.subtotal} Kz
                </div>
              </div>
            ))}
            
            <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-3">
              <span className="text-base font-semibold text-gray-900">Total</span>
              <span className="text-lg font-bold text-gray-900">
                {session.totalAmount} Kz
              </span>
            </div>
          </div>

          {/* Payment Section */}
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Payment</h2>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <iframe
                ref={iframeRef}
                src={iframeUrl}
                className="w-full min-h-[95vh] border-0"
                onError={handleIframeError}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};