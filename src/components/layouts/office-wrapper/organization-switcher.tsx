import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"

export function OrganizationSwitcher() {
  return (
    <SidebarMenu className="w-[15rem]">
      <SidebarMenuItem>
        <div className="flex items-center justify-center h-12 px-4">
          <span className="text-lg font-semibold text-sidebar-foreground">djezyas</span>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
