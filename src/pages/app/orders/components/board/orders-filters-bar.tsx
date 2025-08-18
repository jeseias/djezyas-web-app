import { useState } from "react";
import { SearchIcon, FilterIcon, SortAscIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrdersFiltersBarProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
  selectedCount: number;
  totalCount: number;
  onSelectAll: (checked: boolean) => void;
}

// Simple status options for filtering
const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'picking', label: 'Picking' },
  { value: 'packed', label: 'Packed' },
  { value: 'in_delivery', label: 'In Delivery' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'expired', label: 'Expired' },
];

export function OrdersFiltersBar({
  filters,
  onFiltersChange,
  selectedCount,
  totalCount,
  onSelectAll,
}: OrdersFiltersBarProps) {
  const [searchValue, setSearchValue] = useState(filters.search || "");

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onFiltersChange({ ...filters, search: value });
  };

  const handleSort = (sortBy: string) => {
    onFiltersChange({ ...filters, sortBy });
  };

  const handleStatusFilter = (status: string, checked: boolean) => {
    const currentStatuses = filters.fulfillmentStatus || [];
    const newStatuses = checked
      ? [...currentStatuses, status]
      : currentStatuses.filter((s: string) => s !== status);
    
    onFiltersChange({ ...filters, fulfillmentStatus: newStatuses });
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Orders</h1>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedCount === totalCount && totalCount > 0}
              onCheckedChange={onSelectAll}
            />
            <span className="text-sm text-muted-foreground">
              {selectedCount} of {totalCount} selected
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <SortAscIcon className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSort("createdAt")}>
                Newest First
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("createdAt_asc")}>
                Oldest First
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("totalAmount")}>
                Highest Amount
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("totalAmount_asc")}>
                Lowest Amount
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID, customer..."
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <div className="p-2">
              <h4 className="font-medium mb-2">Status</h4>
              <div className="space-y-2">
                {STATUS_OPTIONS.map((status) => (
                  <div key={status.value} className="flex items-center space-x-2">
                    <Checkbox
                      checked={filters.fulfillmentStatus?.includes(status.value)}
                      onCheckedChange={(checked) => 
                        handleStatusFilter(status.value, checked as boolean)
                      }
                    />
                    <span className="text-sm">{status.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Active Filters */}
      {(filters.search || filters.fulfillmentStatus?.length > 0) && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {filters.search && (
            <Badge variant="secondary" className="text-xs">
              Search: {filters.search}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => handleSearch("")}
              >
                ×
              </Button>
            </Badge>
          )}
          
          {filters.fulfillmentStatus?.map((status: string) => {
            const statusOption = STATUS_OPTIONS.find(s => s.value === status);
            return (
              <Badge key={status} variant="secondary" className="text-xs">
                {statusOption?.label || status}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => handleStatusFilter(status, false)}
                >
                  ×
                </Button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
