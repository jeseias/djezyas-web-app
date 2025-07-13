import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/')({
  component: AppLayout,
})

function AppLayout() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Home Dashboard</h1>
    </div>
  )
}
