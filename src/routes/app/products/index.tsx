import { AllProductsPage } from '@/pages/app/all-products/all-products-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/products/')({
  component: AllProductsPage,
})

