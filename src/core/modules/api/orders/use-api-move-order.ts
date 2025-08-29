import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gqlr } from "@/core/modules/shared/infra/gqlr";
import type { IOrder } from "../../types";
import { useOrganization } from "../../organization/context/organization-context";
import { useAuth } from "../../user/infra/context";

const MOVE_ORDER_MUTATION = `#graphql
  mutation MoveOrder($input: MoveOrderInput!) {
    moveOrder(input: $input) {
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
`;

export namespace MoveOrder {
	export type Params = {
		orderId: string;
		status: IOrder.OrderFulfillmentStatus;
		organizationId: string;
	};

	export type Response = {
		data: {
			moveOrder: IOrder.Model;
		};
	};
}

export const moveOrder = async (params: MoveOrder.Params) => {
	const response = await gqlr<MoveOrder.Response>(
		MOVE_ORDER_MUTATION,
		{
			input: {
				orderId: params.orderId,
				status: params.status,
				organizationId: params.organizationId,
			},
		},
	);

	return response.data.moveOrder;
};

export const useApiMoveOrder = () => {
  const { organization } = useOrganization()
  const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (params: Omit<MoveOrder.Params, "organizationId">) => 
			moveOrder({ 
				...params, 
				organizationId: organization?.id ?? "" ,
			}),
		onSuccess: (updatedOrder) => {
			// Invalidate and refetch orders queries
			queryClient.invalidateQueries({
				queryKey: ["orders-by-organization"],
			});
			
			// Optionally update the cache directly for optimistic updates
			queryClient.setQueryData(
				["orders-by-organization"],
				(oldData: any) => {
					if (!oldData) return oldData;
					
					// Update the specific order in the cache
					const updateOrderInArray = (orders: IOrder.Model[]) =>
						orders.map(order => 
							order.id === updatedOrder.id ? updatedOrder : order
						);
					
					return {
						...oldData,
						orders: updateOrderInArray(oldData.orders || []),
						groupedOrders: oldData.groupedOrders?.map((group: any) => ({
							...group,
							orders: updateOrderInArray(group.orders || []),
						})) || [],
					};
				}
			);
		},
		onError: (error) => {
			console.error("Failed to move order:", error);
		},
	});
};
