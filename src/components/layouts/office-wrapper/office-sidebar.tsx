import * as React from "react"
import {
  SquareTerminal,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { OfficeNavMain } from "./office-nav-main"
import { OfficeNavUser } from "./office-nav-user"

const data = {
  navMain: {
    groupLabel: "PRODUCTS",
    items: [
      {
        title: "Dashboard",
        url: "/office",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Products Categories",
            url: "/office/products/categories",
          },
        ],
      },
    ],
  },
}

export function OfficeSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-center h-12 px-4">
          <span className="text-lg font-semibold text-sidebar-foreground">djezyas</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <OfficeNavMain items={data.navMain.items} groupLabel={data.navMain.groupLabel} />
      </SidebarContent>
      <SidebarFooter>
        <OfficeNavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
