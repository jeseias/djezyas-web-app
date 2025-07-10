import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-organization')({
  component: CreateOrganizationPage,
})

function CreateOrganizationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create Your Organization
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            You need to create an organization to continue using the app
          </p>
        </div>
        <div className="mt-8 space-y-6">
          {/* Add your organization creation form here */}
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <p className="text-center text-gray-500">
              Organization creation form will go here
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 