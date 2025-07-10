import { ChevronsUpDown, Plus } from "lucide-react"
import { Link } from "@tanstack/react-router"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useOrganization } from "@/core/modules/organization/context/organization-context"

export function OrganizationSwitcher() {
  const { isMobile } = useSidebar()
  const { allMyOrganizations, organization: org, setOrganization } = useOrganization()

  if (!org) {
    return null
  }

  const handleOrganizationSwitch = (organizationId: string) => {
    const targetOrg = allMyOrganizations.find(org => org.id === organizationId)
    if (targetOrg && setOrganization) {
      setOrganization(targetOrg)
    }
  }

  return (
    <SidebarMenu className="w-[15rem]">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8">
                <AvatarImage src={org.logoUrl} alt={org.name} />
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground font-bold text-lg">
                  {org.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{org.name}</span>
                <span className="truncate text-xs">{org.plan ?? "—"}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Organizations
            </DropdownMenuLabel>
            {allMyOrganizations?.map((organization) => (
              <DropdownMenuItem
                key={organization.id}
                className="gap-2 p-2 cursor-pointer"
                onClick={() => handleOrganizationSwitch(organization.id)}
                disabled={organization.id === org.id}
              >
                <Avatar className="size-6">
                  <AvatarImage src={organization.logoUrl} alt={organization.name} />
                  <AvatarFallback className="font-bold text-base">
                    {organization.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <div className="font-medium">{organization.name}</div>
                  <div className="text-xs text-muted-foreground">{organization.plan ?? "—"}</div>
                </div>
                {organization.id === org.id && (
                  <DropdownMenuShortcut>Current</DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                to="/create-organization"
                className="gap-2 p-2 cursor-pointer flex items-center"
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">Add organization</div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
