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
      <div className="p-2 sm:p-4 space-y-3 sm:space-y-4">
        {/* Top row - Search and Filters */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[150px] sm:min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search orders..."
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters Button */}
          <Button variant="outline" size="sm" className="shrink-0">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          {/* Needs Attention Badge */}
          {selectedCount > 0 && (
            <Badge variant="destructive" className="animate-pulse shrink-0">
              {selectedCount} needs attention
            </Badge>
          )}
        </div>

        {/* Bottom row - Controls and Info */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
          {/* Left - Board Controls */}
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
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
              <Label htmlFor="board-mode" className="text-sm font-medium whitespace-nowrap">
                Show all stages
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="show-all-stages"
                checked={showAllStages}
                onCheckedChange={onShowAllStagesChange}
              />
              <Label htmlFor="show-all-stages" className="text-sm font-medium whitespace-nowrap">
                Show exceptions
              </Label>
            </div>
          </div>

          {/* Right - Selection and Count */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Select All */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSelectAll}
              className="flex items-center gap-2 shrink-0"
            >
              {selectedCount === totalCount ? (
                <CheckSquare className="h-4 w-4" />
              ) : (
                <Square className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">
                {selectedCount > 0 ? `${selectedCount} selected` : "Select all"}
              </span>
              <span className="sm:hidden">
                {selectedCount > 0 ? `${selectedCount}` : "All"}
              </span>
            </Button>

            {/* Total Count */}
            <Badge variant="secondary" className="text-xs shrink-0">
              {totalCount} orders
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
