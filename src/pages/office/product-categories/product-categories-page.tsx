import { useState } from "react"
import { useApiListProductCategories, useApiCreateProductCategory } from "@/core/modules/products/infra/hooks"
import { CreateProductCategoryDialog, ProductCategoriesPageHeader, ProductCategoriesTable } from "./components"

export const ProductCategoriesPage = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [searchParams, setSearchParams] = useState({
    page: 1,
    limit: 10,
    sort: "name",
    order: "asc",
    search: ""
  })
  
  const { data, isLoading, error, refetch } = useApiListProductCategories(searchParams)
  const createMutation = useApiCreateProductCategory()
  
  const categories = data?.items || []
  const totalItems = data?.totalItems || 0

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
    setSearchParams(prev => ({ ...prev, search, page: 1 }))
  }

  const handlePageChange = (page: number) => {
    setSearchParams(prev => ({ ...prev, page }))
  }

  const handleSort = (sort: string, order: string) => {
    setSearchParams(prev => ({ ...prev, sort, order }))
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
        categoryCount={totalItems}
        onSearch={handleSearch}
        onCreateCategory={() => setShowCreateDialog(true)}
        searchValue={searchParams.search}
      />
      
      <CreateProductCategoryDialog 
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSubmit={handleCreateCategory}
        isLoading={createMutation.isPending}
      />
      
      <ProductCategoriesTable 
        categories={categories}
        currentPage={searchParams.page}
        totalItems={totalItems}
        pageSize={searchParams.limit}
        sortBy={searchParams.sort}
        sortOrder={searchParams.order}
        onPageChange={handlePageChange}
        onSort={handleSort}
      />
    </div>
  )
}