import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/office/products/categories')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/office/products/categories"!</div>
}
