import { useState } from "react"
import { useApiListProductCategories, useApiCreateProductCategory } from "@/core/modules/products/infra/hooks"
import { CreateProductCategoryDialog, ProductCategoriesPageHeader, ProductCategoriesTable } from "./components"

export const ProductCategoriesPage = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  
  const { data, isLoading, error, refetch } = useApiListProductCategories({
    page: 1,
    limit: 100, // Get more items for frontend filtering
    sort: "name",
    order: "asc"
  })
  const createMutation = useApiCreateProductCategory()
  
  const allCategories = data?.items || []
  // const totalItems = data?.totalItems || 0

  // Frontend filtering
  const filteredCategories = allCategories.filter(category =>
    category.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchValue.toLowerCase()))
  )

  const handleCreateCategory = async (params: { name: string; description?: string }) => {
    try {
      await createMutation.mutateAsync(params)
      setShowCreateDialog(false)
      refetch() // Refresh the list after creating
    } catch (error) {
      console.error("Failed to create product category:", error)
    }
  }

  const handleSearch = (search: string) => {
    setSearchValue(search)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading product categories...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-sm text-destructive">Failed to load product categories. Please try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 px-6">
      <ProductCategoriesPageHeader 
        categoryCount={filteredCategories.length}
        onSearch={handleSearch}
        onCreateCategory={() => setShowCreateDialog(true)}
        searchValue={searchValue}
      />
      
      <CreateProductCategoryDialog 
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSubmit={handleCreateCategory}
        isLoading={createMutation.isPending}
      />
      
      <ProductCategoriesTable 
        categories={filteredCategories}
      />
    </div>
  )
}