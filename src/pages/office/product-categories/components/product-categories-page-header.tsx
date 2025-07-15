import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"

interface ProductCategoriesPageHeaderProps {
  categoryCount?: number
  onSearch: (search: string) => void
  onCreateCategory: () => void
  searchValue?: string
}

export function ProductCategoriesPageHeader({ 
  categoryCount = 0, 
  onSearch,
  onCreateCategory,
  searchValue = ""
}: ProductCategoriesPageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Product Categories</h1>
        <p className="text-sm text-muted-foreground">
          Manage your product categories. {categoryCount > 0 && `Currently ${categoryCount} categor${categoryCount === 1 ? 'y' : 'ies'}.`}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-8 w-64"
          />
        </div>
        <Button 
          onClick={onCreateCategory}
          size="sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>
    </div>
  )
} 