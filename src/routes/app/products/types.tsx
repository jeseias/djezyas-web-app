import { ProductTypesPage } from '@/pages/app/product-types/product-types-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/products/types')({
  component: ProductTypesPage,
})