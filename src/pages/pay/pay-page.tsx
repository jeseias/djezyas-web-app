import { useEffect, useRef, useState } from "react";
import { useSearch } from "@tanstack/react-router";
import { useApiGetCheckoutSession } from "@/core/modules/api";
import { OrderSummary } from "./components/OrderSummary";
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
  const [timeRemaining, setTimeRemaining] = useState<string>("");
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="lg:order-1">
            <OrderSummary
              orders={session.orders}
              totalAmount={session.totalAmount}
              expiresAt={session.expiresAt}
              timeRemaining={timeRemaining}
            />
          </div>

          {/* Payment Iframe */}
          <div className="lg:order-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment</h2>
              
              {iframeError ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Failed to load payment form</p>
                  <button
                    onClick={handleRetry}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="w-full max-w-[562px] h-[calc(100vh-200px)] min-h-[600px] max-h-[800px] overflow-hidden rounded-lg border border-gray-200">
                    <iframe
                      ref={iframeRef}
                      src={iframeUrl}
                      className="w-full h-full border-0 rounded-lg"
                      onError={handleIframeError}
                      style={{
                        minHeight: '600px',
                        maxHeight: '800px'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};