export namespace IOrder {
	export enum OrderPaymentStatus {
		PENDING = "pending",
		PAID = "paid",
		REFUNDED = "refunded",
		FAILED = "failed",
	}

	export enum OrderFulfillmentStatus {
		NEW = "new",
		PICKING = "picking",
		PACKED = "packed",
		IN_DELIVERY = "in_delivery",
		DELIVERED = "delivered",
		CANCELLED = "cancelled",
		RETURNED = "returned",
		FAILED_DELIVERY = "failed_delivery",
		ISSUES = "issues",
		EXPIRED = "expired",
	}

	export type OrderItem = {
		productId: string;
		priceId: string;
		price: {
			id: string;
			currency: string;
			unitAmount: number;
		};
		product: {
			id: string;
			slug: string;
			name: string;
			imageUrl?: string;
			description?: string;
		};
		quantity: number;
		subtotal: number;
		unitAmount: number;
	};

	export type Organization = {
		id: string;
		slug: string;
		name: string;
		logoUrl?: string;
	};

	export type OrderMeta = {
		cartId: string;
		totalItems: number;
	};

	export type Model = {
		id: string;
		code: string;
		userId: string;
		paymentStatus: OrderPaymentStatus;
		fulfillmentStatus: OrderFulfillmentStatus;
		clientConfirmedIsDelivered: boolean;
		items: OrderItem[];
		totalAmount?: number;
		meta?: OrderMeta;
		organization?: Organization;
		createdAt: string;
		updatedAt: string;
		paidAt?: string;
		expiredAt?: string;
		cancelledAt?: string;
		paymentIntentId?: string;
		transactionId?: string;
	};
}
