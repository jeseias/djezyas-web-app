import { ProductPage } from '@/pages/app/products/product-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/products/')({
  component: ProductPage,
})

