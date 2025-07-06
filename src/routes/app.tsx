import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app')({
  component: AppPage,
})

function AppPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the App!</h1>
      <p className="text-muted-foreground">
        You have successfully logged in and are now in the main application.
      </p>
    </div>
  )
} 