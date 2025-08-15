import * as React from "react"
import {
  SquareTerminal,
  Users,
  Mail,
  Package,
  Grid3X3,
  Tag,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { OrganizationSwitcher } from "./organization-switcher"

const data = {
  navMain: [
    {
      groupLabel: "Organization",
      items: [
        {
          title: "Overview",
          url: "/app",
          icon: SquareTerminal,
          items: [
            {
              title: "Members",
              url: "/app/members",
              icon: Users,
            },
            {
              title: "Invitations",
              url: "/app/invitations",
              icon: Mail,
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Merchandise",
      items: [
        {
          title: "Products Dashboard",
          url: "/app/products",
          icon: Package,
          items: [
            {
              title: "All Products",
              url: "/app/products",
              icon: Grid3X3,
            },
            {
              title: "Product Types",
              url: "/app/products/types",
              icon: Tag,
            },
          ],
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r border-border/50 bg-sidebar/95 backdrop-blur supports-[backdrop-filter]:bg-sidebar/60"
      {...props}
    >
      <SidebarHeader className="border-b border-border/50 bg-sidebar/50">
        <OrganizationSwitcher />
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="border-t border-border/50 bg-sidebar/50">
        <NavUser />
      </SidebarFooter>
      <SidebarRail className="border-r border-border/50" />
    </Sidebar>
  )
}
