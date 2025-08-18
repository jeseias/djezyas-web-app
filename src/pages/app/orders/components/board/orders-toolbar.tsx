import { useState } from "react";
import { Search, Filter, CheckSquare, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { IOrder } from "@/core/modules/types";

interface OrdersToolbarProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
  boardMode: IOrder.BoardMode;
  onBoardModeChange: (mode: IOrder.BoardMode) => void;
  showAllStages: boolean;
  onShowAllStagesChange: (show: boolean) => void;
  selectedCount: number;
  totalCount: number;
  onSelectAll: (checked: boolean) => void;
}

export function OrdersToolbar({
  filters,
  onFiltersChange,
  boardMode,
  onBoardModeChange,
  showAllStages,
  onShowAllStagesChange,
  selectedCount,
  totalCount,
  onSelectAll,
}: OrdersToolbarProps) {
  const [searchValue, setSearchValue] = useState(filters.search || "");

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onFiltersChange({ ...filters, search: value });
  };

  const handleSelectAll = () => {
    const isAllSelected = selectedCount === totalCount;
    onSelectAll(!isAllSelected);
  };

  return (
    <div className="sticky top-0 z-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex items-center justify-between p-4 gap-4">
        {/* Left side - Search and Filters */}
        <div className="flex items-center gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search orders..."
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters Button */}
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          {/* Needs Attention Badge */}
          {selectedCount > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {selectedCount} needs attention
            </Badge>
          )}
        </div>

        {/* Center - Board Mode Toggle */}
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="board-mode"
              checked={boardMode === IOrder.BoardMode.ALL_STAGES}
              onCheckedChange={(checked) =>
                onBoardModeChange(
                  checked ? IOrder.BoardMode.ALL_STAGES : IOrder.BoardMode.IMPORTANT
                )
              }
            />
            <Label htmlFor="board-mode" className="text-sm font-medium">
              Show all stages
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="show-all-stages"
              checked={showAllStages}
              onCheckedChange={onShowAllStagesChange}
            />
            <Label htmlFor="show-all-stages" className="text-sm font-medium">
              Show exceptions
            </Label>
          </div>
        </div>

        {/* Right side - Selection and Count */}
        <div className="flex items-center gap-4">
          {/* Select All */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSelectAll}
            className="flex items-center gap-2"
          >
            {selectedCount === totalCount ? (
              <CheckSquare className="h-4 w-4" />
            ) : (
              <Square className="h-4 w-4" />
            )}
            {selectedCount > 0 ? `${selectedCount} selected` : "Select all"}
          </Button>

          {/* Total Count */}
          <Badge variant="secondary" className="text-xs">
            {totalCount} orders
          </Badge>
        </div>
      </div>
    </div>
  );
}
