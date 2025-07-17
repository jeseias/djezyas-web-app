import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface ProductsPageHeaderProps {
  productCount: number
  onAddProduct?: () => void
}

export function ProductsPageHeader({ productCount, onAddProduct }: ProductsPageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
        <p className="text-sm text-muted-foreground">
          Manage your organization's products
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-sm text-muted-foreground">
          {productCount} product{productCount !== 1 ? 's' : ''}
        </div>
        <Button onClick={onAddProduct}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
    </div>
  )
} 