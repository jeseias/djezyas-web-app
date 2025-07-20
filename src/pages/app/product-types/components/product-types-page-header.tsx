import { Package, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ProductTypesPageHeaderProps {
  productTypeCount: number
  onSearch: (search: string) => void
  onCreateProductType: () => void
  searchValue: string
}

export function ProductTypesPageHeader({
  // productTypeCount,
  onSearch,
  onCreateProductType,
  searchValue,
}: ProductTypesPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-md border bg-muted">
          <Package className="size-4" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Product Types</h1>
          <p className="text-sm text-muted-foreground">
            Manage your organization's product types
          </p>
        </div>
      </div>
      
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search product types..."
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-8 w-full sm:w-[300px]"
          />
        </div>
        <Button onClick={onCreateProductType} className="sm:ml-2">
          <Plus className="mr-2 h-4 w-4" />
          Create Product Type
        </Button>
      </div>
    </div>
  )
} 