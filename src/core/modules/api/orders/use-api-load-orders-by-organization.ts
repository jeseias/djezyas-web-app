import { useQuery } from "@tanstack/react-query";
import { gqlr } from "@/core/modules/shared/infra/gqlr";
import type { IOrder } from "../../types";
import { useOrganization } from "../../organization/context/organization-context";
import { useAuth } from "../../user/infra/context";

const GET_ORDERS_BY_ORGANIZATION_QUERY = `#graphql
  query GetOrdersByOrganization($input: GetOrdersByOrganizationInput!) {
    getOrdersByOrganization(input: $input) {
      orders {
        id
        code
        userId
        organizationId
        organization {
          id
          name
          slug
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
        paymentStatus
        fulfillmentStatus
        clientConfirmedIsDelivered
        paymentIntentId
        transactionId
        paidAt
        inDeliveryAt
        clientConfirmedDeliveryAt
        expiredAt
        cancelledAt
        meta
        createdAt
        updatedAt
      }
      totalItems
      groupedOrders {
        key
        orders {
          id
          code
          userId
          organizationId
          organization {
            id
            name
            slug
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
          paymentStatus
          fulfillmentStatus
          clientConfirmedIsDelivered
          paymentIntentId
          transactionId
          paidAt
          inDeliveryAt
          clientConfirmedDeliveryAt
          expiredAt
          cancelledAt
          meta
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export namespace GetOrdersByOrganization {
	export type Params = {
		userId: string;
		organizationId: string;
		filters?: {
			limit?: number;
			page?: number;
			sortBy?: string;
			sortOrder?: string;
			fulfillmentStatus?: IOrder.OrderFulfillmentStatus;
			paymentStatus?: IOrder.OrderPaymentStatus;
			createdAfter?: string;
			createdBefore?: string;
		};
		groupBy?: "date" | "status";
	};

	export type Response = {
		data: {
			getOrdersByOrganization: {
				orders: IOrder.Model[];
				totalItems: number;
				groupedOrders: Array<{
					key: string;
					orders: IOrder.Model[];
				}>;
			};
		};
	};
}

export const getOrdersByOrganization = async (params: GetOrdersByOrganization.Params) => {
	const response = await gqlr<GetOrdersByOrganization.Response>(
		GET_ORDERS_BY_ORGANIZATION_QUERY,
		{
			input: {
				userId: params.userId,
				organizationId: params.organizationId,
				filters: params.filters,
				groupBy: params.groupBy,
			},
		},
	);

	return response.data.getOrdersByOrganization;
};

export const useApiLoadOrdersByOrganization = (params: Omit<GetOrdersByOrganization.Params, "organizationId" | "userId">) => {
  const { organization } = useOrganization()
  const { user } = useAuth()  

	return useQuery({
		queryKey: ["orders-by-organization", params, organization?.id, user?.id],
		queryFn: () => getOrdersByOrganization({ 
      ...params, 
      organizationId: organization?.id ?? "", 
      userId: user?.id ?? "" 
    }),
		enabled: !!organization?.id && !!user?.id,
	});
};
