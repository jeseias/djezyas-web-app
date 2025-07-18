import { useState } from "react"
import { useApiFindProductsByOrganization } from "@/core/modules/products/infra/hooks"
import { ProductsTable, ProductsPageHeader, CreateProductDialog } from "./components"

export function AllProductsPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const { data, isLoading, error } = useApiFindProductsByOrganization({})
  
  const products = data?.items || []

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-sm text-destructive">Failed to load products. Please try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 px-6">
      <ProductsPageHeader 
        productCount={products.length}
        onAddProduct={() => setShowCreateDialog(true)}
      />
      
      <CreateProductDialog 
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
      
      <ProductsTable products={products} isLoading={isLoading} />
    </div>
  )
} 