import { useQuery } from "@tanstack/react-query";
import { gqlr } from "@/core/modules/shared/infra/gqlr";
import type { IOrder } from "../types";

const GET_CHECKOUT_SESSION_QUERY = `#graphql
  query GetCheckoutSession($token: String!) {
    checkoutSession(token: $token) {
      paymentIntentId
      status
      expiresAt
      provider
      totalAmount
      orders {
        id
        userId
        code
        organizationId
        organization {
          id 
          slug 
          name 
          logoUrl
        }
        items {
          priceId
          productId
          name
          quantity
          unitAmount
          subtotal
          product {
            id
            name
            slug
            imageUrl
            description
          }
          price {
            id
            currency
            unitAmount
          }
        }
        totalAmount
        fulfillmentStatus
        paymentStatus
        clientConfirmedIsDelivered
        paymentIntentId
        transactionId
        paidAt
        expiredAt
        cancelledAt
        meta
        createdAt
        updatedAt
      }
    }
  }
`;

export namespace GetCheckoutSession {
	export type Params = {
		token: string;
	};

	export type Response = {
		data: {
			checkoutSession: {
				paymentIntentId: string;
				status: "pending" | "succeeded" | "failed" | "expired" | "cancelled";
				expiresAt?: string;
				provider: "multicaixa_express" | "stripe" | "afrimoney";
				totalAmount: number;
				orders: IOrder.Model[];
			};
		};
	};
}

export const getCheckoutSession = async (params: GetCheckoutSession.Params) => {
	const response = await gqlr<GetCheckoutSession.Response>(
		GET_CHECKOUT_SESSION_QUERY,
		{
			token: params.token,
		},
	);

	return response.data.checkoutSession;
};

export const useApiGetCheckoutSession = (token: string) => {
	return useQuery({
		queryKey: ["checkout-session", token],
		queryFn: () => getCheckoutSession({ token }),
		enabled: !!token,
	});
};
