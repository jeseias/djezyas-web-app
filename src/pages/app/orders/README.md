# Orders Management Feature

This module provides a comprehensive orders management system for store owners to track and manage their organization's orders.

## Features

### 📋 Orders List Page (`/app/orders`)
- **Header**: Title, order count, filter toggle, and new order button
- **Filters**: Date range, payment status, fulfillment status, order code search
- **Table**: Displays orders with columns for code, created date, customer, items, total, payment status, fulfillment status, assignee, and actions
- **Bulk Actions**: Select multiple orders for batch operations (assign, print slips, dispatch)
- **Pagination**: Cursor-based pagination with server-side filtering

### 🎯 Order Status Management
- **Payment Status**: Pending, Paid, Cancelled, Expired, In Delivery, Delivered
- **Fulfillment Status**: New, Picking, Packed, In Delivery, Delivered, Issues
- **Contextual Actions**: Different actions available based on order status
- **Status Badges**: Visual indicators for payment and fulfillment status

### 📱 Order Detail Drawer
- **Items Tab**: List of order items with quantities and prices
- **Customer Tab**: Customer information and assignment details
- **Payments Tab**: Payment intent ID, transaction ID, and payment timestamps
- **Timeline Tab**: Complete order timeline with status changes
- **Fulfillment Stepper**: Visual progress indicator for order fulfillment
- **Action Buttons**: Contextual actions based on current order status

### 🔄 Real-time Updates
- **Order Events Hook**: Simulates SSE/WebSocket for real-time order notifications
- **New Order Badge**: Shows count of new paid orders
- **Auto-refresh**: Invalidates queries when new orders arrive

## Components

### Core Components
- `OrdersPage`: Main page component with header, filters, table, and drawer
- `OrdersPageHeader`: Page header with title, count, and action buttons
- `OrdersFilters`: Advanced filtering with date range, status filters, and search
- `OrdersTable`: Data table with sorting, selection, and row actions
- `OrderDetailDrawer`: Slide-out drawer with order details and actions

### Status Components
- `OrderStatusBadge`: Reusable badge for payment and fulfillment status
- `OrderFulfillmentStepper`: Visual stepper showing order progress
- `OrderActionsMenu`: Contextual dropdown menu for order actions

### Hooks
- `useOrders`: React Query hook for fetching orders with filters
- `useOrderEvents`: Hook for real-time order event simulation

## Data Flow

1. **Route**: `/app/orders` with search parameters for filtering
2. **API**: Fetches orders from `/orders` endpoint with query parameters
3. **State**: Manages selected orders, filter state, and drawer visibility
4. **Actions**: Contextual actions based on order status with optimistic updates
5. **Real-time**: SSE/WebSocket simulation for live order updates

## Status Transitions

### Payment Status Flow
```
PENDING → PAID → IN_DELIVERY → CLIENT_CONFIRMED_DELIVERY
    ↓         ↓
CANCELLED  EXPIRED
```

### Fulfillment Status Flow
```
NEW → PICKING → PACKED → IN_DELIVERY → DELIVERED
  ↓
ISSUES
```

### Contextual Actions by Status

#### NEW Orders
- Start Picking
- Cancel

#### PICKING Orders
- Mark Packed
- Cancel

#### PACKED Orders
- Dispatch
- Print Slip
- Cancel

#### IN_DELIVERY Orders
- Mark Delivered
- Failed Delivery

#### DELIVERED Orders
- View Receipt

## API Integration

The module integrates with the backend API endpoints:
- `GET /orders` - List orders with filters and pagination
- `GET /orders/:id` - Get single order details
- `PATCH /orders/:id/status` - Update order status (to be implemented)
- `POST /orders/:id/assign` - Assign order to user (to be implemented)

## Styling

- **Dark Theme**: Clean dark theme with proper contrast
- **Responsive**: Mobile-friendly layout with collapsible sidebar
- **Compact**: Efficient use of space with compact table rows
- **Sticky Header**: Header remains visible during scroll
- **Consistent**: Uses shadcn/ui components for design consistency

## Future Enhancements

- [ ] Implement order status mutation hooks
- [ ] Add order assignment functionality
- [ ] Integrate with real SSE/WebSocket for live updates
- [ ] Add order export functionality
- [ ] Implement order printing/slip generation
- [ ] Add order analytics and reporting
- [ ] Integrate with shipping providers
- [ ] Add order notes and internal comments
