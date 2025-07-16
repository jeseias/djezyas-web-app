import { useState } from "react"
import { useApiListProductTypes, useApiCreateProductType } from "@/core/modules/products/infra/hooks"
import { useOrganization } from "@/core/modules/organization/context/organization-context"
import { ProductTypesTable, ProductTypesPageHeader, CreateProductTypeDialog } from "./components"

export const ProductTypesPage = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const { organization } = useOrganization()
  
  const { data, isLoading, error, refetch } = useApiListProductTypes({
    page: 1,
    limit: 100, // Get more items for frontend filtering and pagination
    sort: "name",
    order: "asc",
    search: searchValue || undefined
  })
  const createMutation = useApiCreateProductType()
  
  const productTypes = data?.items || []
  const totalItems = data?.totalItems || 0

  const handleCreateProductType = async (params: { name: string; description?: string }) => {
    if (!organization?.id) {
      throw new Error("No organization selected")
    }
    
    try {
      await createMutation.mutateAsync({
        ...params,
        organizationId: organization.id,
      })
      setShowCreateDialog(false)
      refetch() // Refresh the list after creating
    } catch (error) {
      console.error("Failed to create product type:", error)
      throw error
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
          <p className="text-sm text-muted-foreground">Loading product types...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-sm text-destructive">Failed to load product types. Please try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 px-6">
      <ProductTypesPageHeader 
        productTypeCount={totalItems}
        onSearch={handleSearch}
        onCreateProductType={() => setShowCreateDialog(true)}
        searchValue={searchValue}
      />
      
      <CreateProductTypeDialog 
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSubmit={handleCreateProductType}
        isLoading={createMutation.isPending}
      />
      
      <ProductTypesTable 
        productTypes={productTypes}
        isLoading={isLoading}
      />
    </div>
  )
}