import { createFileRoute } from '@tanstack/react-router'
import { OrganizationSettingsPage } from '@/pages/app/organization/settings/organization-settings-page'

export const Route = createFileRoute('/app/organization/settings')({
  component: OrganizationSettingsPage,
})
