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

	// Macro status for UI display (derived from payment + fulfillment)
	export enum MacroStatus {
		NEW = "new",
		AWAITING_PAYMENT = "awaiting_payment",
		PAID = "paid",
		PREPARING = "preparing",
		PICKING = "picking",
		PACKED = "packed",
		READY_FOR_DISPATCH = "ready_for_dispatch",
		IN_DELIVERY = "in_delivery",
		DELIVERED = "delivered",
		CANCELLED = "cancelled",
		RETURNED = "returned",
		FAILED_DELIVERY = "failed_delivery",
		ISSUES = "issues",
		EXPIRED = "expired",
	}

	// Exception flags for cards
	export interface ExceptionFlags {
		paymentRefunded: boolean;
		paymentFailed: boolean;
		returned: boolean;
		failedDelivery: boolean;
		hasIssues: boolean;
		expired: boolean;
	}

	// Board modes
	export enum BoardMode {
		IMPORTANT = "important",
		ALL_STAGES = "all_stages",
	}

	// Column configuration
	export interface KanbanColumn {
		id: string;
		title: string;
		macroStatus: MacroStatus;
		orders: Model[];
		count: number;
		color: string;
		bgColor: string;
		canDrop: boolean;
		isCollapsed?: boolean;
		wipLimit?: number;
	}

	// Order card data for display
	export interface OrderCardData {
		order: Model;
		macroStatus: MacroStatus;
		exceptionFlags: ExceptionFlags;
		shortId: string;
		relativeTime: string;
		customerName: string;
		itemsCount: number;
		topItem: string;
		hasDelivery: boolean;
		total: number;
		paymentBadge: {
			status: OrderPaymentStatus;
			label: string;
			color: string;
		};
	}

	// Status transition types
	export interface MoveOrderInput {
		orderId: string;
		toFulfillmentStatus: OrderFulfillmentStatus;
	}

	export interface MoveOrderResult {
		success: boolean;
		message: string;
		order?: Model;
	}

	// Status metadata for UI
	export interface StatusMeta {
		label: string;
		color: string;
		bgColor: string;
		icon?: string;
		order: number;
		canOrgSet: boolean;
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

// Status metadata for UI display
export const STATUS_META: Record<IOrder.MacroStatus, IOrder.StatusMeta> = {
	[IOrder.MacroStatus.NEW]: {
		label: "New",
		color: "text-blue-600",
		bgColor: "bg-blue-50",
		order: 1,
		canOrgSet: true,
	},
	[IOrder.MacroStatus.AWAITING_PAYMENT]: {
		label: "Awaiting Payment",
		color: "text-yellow-600",
		bgColor: "bg-yellow-50",
		order: 2,
		canOrgSet: false,
	},
	[IOrder.MacroStatus.PAID]: {
		label: "Paid",
		color: "text-green-600",
		bgColor: "bg-green-50",
		order: 3,
		canOrgSet: false,
	},
	[IOrder.MacroStatus.PREPARING]: {
		label: "Preparing",
		color: "text-purple-600",
		bgColor: "bg-purple-50",
		order: 4,
		canOrgSet: true,
	},
	[IOrder.MacroStatus.PICKING]: {
		label: "Picking",
		color: "text-purple-600",
		bgColor: "bg-purple-50",
		order: 4,
		canOrgSet: true,
	},
	[IOrder.MacroStatus.PACKED]: {
		label: "Packed",
		color: "text-indigo-600",
		bgColor: "bg-indigo-50",
		order: 5,
		canOrgSet: true,
	},
	[IOrder.MacroStatus.READY_FOR_DISPATCH]: {
		label: "Ready for Dispatch",
		color: "text-indigo-600",
		bgColor: "bg-indigo-50",
		order: 6,
		canOrgSet: true,
	},
	[IOrder.MacroStatus.IN_DELIVERY]: {
		label: "In Delivery",
		color: "text-orange-600",
		bgColor: "bg-orange-50",
		order: 7,
		canOrgSet: true,
	},
	[IOrder.MacroStatus.DELIVERED]: {
		label: "Delivered",
		color: "text-green-600",
		bgColor: "bg-green-50",
		order: 8,
		canOrgSet: false,
	},
	[IOrder.MacroStatus.CANCELLED]: {
		label: "Cancelled",
		color: "text-red-600",
		bgColor: "bg-red-50",
		order: 9,
		canOrgSet: true,
	},
	[IOrder.MacroStatus.RETURNED]: {
		label: "Returned",
		color: "text-red-600",
		bgColor: "bg-red-50",
		order: 10,
		canOrgSet: true,
	},
	[IOrder.MacroStatus.FAILED_DELIVERY]: {
		label: "Failed Delivery",
		color: "text-red-600",
		bgColor: "bg-red-50",
		order: 11,
		canOrgSet: true,
	},
	[IOrder.MacroStatus.ISSUES]: {
		label: "Issues",
		color: "text-red-600",
		bgColor: "bg-red-50",
		order: 12,
		canOrgSet: true,
	},
	[IOrder.MacroStatus.EXPIRED]: {
		label: "Expired",
		color: "text-gray-600",
		bgColor: "bg-gray-50",
		order: 13,
		canOrgSet: false,
	},
};

// Status transition rules
export const STATUS_TRANSITIONS: Record<IOrder.OrderFulfillmentStatus, IOrder.OrderFulfillmentStatus[]> = {
	[IOrder.OrderFulfillmentStatus.NEW]: [
		IOrder.OrderFulfillmentStatus.PICKING,
		IOrder.OrderFulfillmentStatus.CANCELLED,
	],
	[IOrder.OrderFulfillmentStatus.PICKING]: [
		IOrder.OrderFulfillmentStatus.PACKED,
		IOrder.OrderFulfillmentStatus.CANCELLED,
	],
	[IOrder.OrderFulfillmentStatus.PACKED]: [
		IOrder.OrderFulfillmentStatus.IN_DELIVERY,
		IOrder.OrderFulfillmentStatus.CANCELLED,
	],
	[IOrder.OrderFulfillmentStatus.IN_DELIVERY]: [
		IOrder.OrderFulfillmentStatus.DELIVERED,
		IOrder.OrderFulfillmentStatus.FAILED_DELIVERY,
	],
	[IOrder.OrderFulfillmentStatus.DELIVERED]: [],
	[IOrder.OrderFulfillmentStatus.CANCELLED]: [],
	[IOrder.OrderFulfillmentStatus.RETURNED]: [],
	[IOrder.OrderFulfillmentStatus.FAILED_DELIVERY]: [
		IOrder.OrderFulfillmentStatus.RETURNED,
	],
	[IOrder.OrderFulfillmentStatus.ISSUES]: [
		IOrder.OrderFulfillmentStatus.PICKING,
		IOrder.OrderFulfillmentStatus.CANCELLED,
	],
	[IOrder.OrderFulfillmentStatus.EXPIRED]: [],
};

// Utility functions
export function getMacroStatus(order: IOrder.Model): IOrder.MacroStatus {
	const { paymentStatus, fulfillmentStatus } = order;

	// Virtual status: Awaiting Payment
	if (paymentStatus === IOrder.OrderPaymentStatus.PENDING && fulfillmentStatus === IOrder.OrderFulfillmentStatus.NEW) {
		return IOrder.MacroStatus.AWAITING_PAYMENT;
	}

	// Virtual status: Paid (system-only holding column)
	if (paymentStatus === IOrder.OrderPaymentStatus.PAID && fulfillmentStatus === IOrder.OrderFulfillmentStatus.NEW) {
		return IOrder.MacroStatus.PAID;
	}

	// Virtual status: Preparing (groups new/picking/packed when payment=paid)
	if (paymentStatus === IOrder.OrderPaymentStatus.PAID && 
		[IOrder.OrderFulfillmentStatus.NEW, IOrder.OrderFulfillmentStatus.PICKING, IOrder.OrderFulfillmentStatus.PACKED].includes(fulfillmentStatus)) {
		return IOrder.MacroStatus.PREPARING;
	}

	// Virtual status: Ready for Dispatch (last step of Preparing)
	if (paymentStatus === IOrder.OrderPaymentStatus.PAID && fulfillmentStatus === IOrder.OrderFulfillmentStatus.PACKED) {
		return IOrder.MacroStatus.READY_FOR_DISPATCH;
	}

	// Direct mapping for other statuses
	switch (fulfillmentStatus) {
		case IOrder.OrderFulfillmentStatus.IN_DELIVERY:
			return IOrder.MacroStatus.IN_DELIVERY;
		case IOrder.OrderFulfillmentStatus.DELIVERED:
			return IOrder.MacroStatus.DELIVERED;
		case IOrder.OrderFulfillmentStatus.CANCELLED:
			return IOrder.MacroStatus.CANCELLED;
		case IOrder.OrderFulfillmentStatus.RETURNED:
			return IOrder.MacroStatus.RETURNED;
		case IOrder.OrderFulfillmentStatus.FAILED_DELIVERY:
			return IOrder.MacroStatus.FAILED_DELIVERY;
		case IOrder.OrderFulfillmentStatus.ISSUES:
			return IOrder.MacroStatus.ISSUES;
		case IOrder.OrderFulfillmentStatus.EXPIRED:
			return IOrder.MacroStatus.EXPIRED;
		default:
			return IOrder.MacroStatus.NEW;
	}
}

export function getExceptionFlags(order: IOrder.Model): IOrder.ExceptionFlags {
	return {
		paymentRefunded: order.paymentStatus === IOrder.OrderPaymentStatus.REFUNDED,
		paymentFailed: order.paymentStatus === IOrder.OrderPaymentStatus.FAILED,
		returned: order.fulfillmentStatus === IOrder.OrderFulfillmentStatus.RETURNED,
		failedDelivery: order.fulfillmentStatus === IOrder.OrderFulfillmentStatus.FAILED_DELIVERY,
		hasIssues: order.fulfillmentStatus === IOrder.OrderFulfillmentStatus.ISSUES,
		expired: order.fulfillmentStatus === IOrder.OrderFulfillmentStatus.EXPIRED,
	};
}

export function isOrgAllowedTransition(
	fromStatus: IOrder.OrderFulfillmentStatus,
	toStatus: IOrder.OrderFulfillmentStatus,
	paymentStatus: IOrder.OrderPaymentStatus
): boolean {
	// Block system-only transitions
	if (toStatus === IOrder.OrderFulfillmentStatus.DELIVERED) {
		return false; // Client/system confirm only
	}

	// Block expired transitions
	if (toStatus === IOrder.OrderFulfillmentStatus.EXPIRED) {
		return false; // System only
	}

	// Check allowed transitions
	const allowedTransitions = STATUS_TRANSITIONS[fromStatus];
	return allowedTransitions.includes(toStatus);
}

export function getNextAllowedStatuses(
	currentStatus: IOrder.OrderFulfillmentStatus,
	paymentStatus: IOrder.OrderPaymentStatus
): IOrder.OrderFulfillmentStatus[] {
	return STATUS_TRANSITIONS[currentStatus] || [];
}
