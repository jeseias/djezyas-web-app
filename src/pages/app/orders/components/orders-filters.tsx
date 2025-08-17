import { useState } from "react"
import { useSearch, useNavigate } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { XIcon, SearchIcon, CalendarIcon } from "lucide-react"
import { OrderStatus, FulfillmentStatus } from "../types/order.types"

const paymentStatusOptions = [
  { value: OrderStatus.PENDING, label: "Pending", color: "bg-yellow-500" },
  { value: OrderStatus.PAID, label: "Paid", color: "bg-green-500" },
  { value: OrderStatus.CANCELLED, label: "Cancelled", color: "bg-red-500" },
  { value: OrderStatus.EXPIRED, label: "Expired", color: "bg-gray-500" },
]

const fulfillmentStatusOptions = [
  { value: FulfillmentStatus.NEW, label: "New", color: "bg-blue-500" },
  { value: FulfillmentStatus.PICKING, label: "Picking", color: "bg-orange-500" },
  { value: FulfillmentStatus.PACKED, label: "Packed", color: "bg-purple-500" },
  { value: FulfillmentStatus.IN_DELIVERY, label: "In Delivery", color: "bg-indigo-500" },
  { value: FulfillmentStatus.DELIVERED, label: "Delivered", color: "bg-green-500" },
  { value: FulfillmentStatus.ISSUES, label: "Issues", color: "bg-red-500" },
]

export function OrdersFilters() {
  const search = useSearch({ from: '/app/orders' })
  const navigate = useNavigate()
  
  const [localFilters, setLocalFilters] = useState({
    code: search.code || "",
    dateFrom: search.dateFrom || "",
    dateTo: search.dateTo || "",
    assignedTo: search.assignedTo || "",
    paymentStatus: search.paymentStatus || [],
    fulfillmentStatus: search.fulfillmentStatus || [],
  })

  const applyFilters = () => {
    navigate({
      to: '/app/orders',
      search: {
        ...search,
        ...localFilters,
        page: 1, // Reset to first page when applying filters
      },
      replace: true,
    })
  }

  const clearFilters = () => {
    setLocalFilters({
      code: "",
      dateFrom: "",
      dateTo: "",
      assignedTo: "",
      paymentStatus: [],
      fulfillmentStatus: [],
    })
    navigate({
      to: '/app/orders',
      search: {
        page: 1,
        limit: search.limit,
      },
      replace: true,
    })
  }

  const togglePaymentStatus = (status: OrderStatus) => {
    const newStatuses = localFilters.paymentStatus.includes(status)
      ? localFilters.paymentStatus.filter(s => s !== status)
      : [...localFilters.paymentStatus, status]
    setLocalFilters(prev => ({ ...prev, paymentStatus: newStatuses }))
  }

  const toggleFulfillmentStatus = (status: FulfillmentStatus) => {
    const newStatuses = localFilters.fulfillmentStatus.includes(status)
      ? localFilters.fulfillmentStatus.filter(s => s !== status)
      : [...localFilters.fulfillmentStatus, status]
    setLocalFilters(prev => ({ ...prev, fulfillmentStatus: newStatuses }))
  }

  const hasActiveFilters = Object.values(localFilters).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== ""
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Filters</span>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <XIcon className="h-4 w-4 mr-2" />
              Clear all
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="code">Order Code</Label>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="code"
                placeholder="Search by order code..."
                value={localFilters.code}
                onChange={(e) => setLocalFilters(prev => ({ ...prev, code: e.target.value }))}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dateFrom">Date From</Label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="dateFrom"
                type="date"
                value={localFilters.dateFrom}
                onChange={(e) => setLocalFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dateTo">Date To</Label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="dateTo"
                type="date"
                value={localFilters.dateTo}
                onChange={(e) => setLocalFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Status Filters */}
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Payment Status</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {paymentStatusOptions.map((option) => (
                <Badge
                  key={option.value}
                  variant={localFilters.paymentStatus.includes(option.value) ? "default" : "outline"}
                  className={`cursor-pointer ${localFilters.paymentStatus.includes(option.value) ? option.color : ""}`}
                  onClick={() => togglePaymentStatus(option.value)}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Fulfillment Status</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {fulfillmentStatusOptions.map((option) => (
                <Badge
                  key={option.value}
                  variant={localFilters.fulfillmentStatus.includes(option.value) ? "default" : "outline"}
                  className={`cursor-pointer ${localFilters.fulfillmentStatus.includes(option.value) ? option.color : ""}`}
                  onClick={() => toggleFulfillmentStatus(option.value)}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={clearFilters}>
            Clear
          </Button>
          <Button onClick={applyFilters}>
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
