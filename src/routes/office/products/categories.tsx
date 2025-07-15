import { ProductCategoriesPage } from '@/pages/office/product-categories/product-categories-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/office/products/categories')({
  component: ProductCategoriesPage,
})
