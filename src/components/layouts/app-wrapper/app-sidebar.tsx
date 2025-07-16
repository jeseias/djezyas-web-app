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
          isActive: true,
          items: [
            {
              title: "Members",
              url: "/app/members",
            },
            {
              title: "Products",
              url: "/app/products",
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
          icon: SquareTerminal,
          isActive: true,
          items: [
            {
              title: "All Products",
              url: "/app/products",
            },
            {
              title: "Product Types",
              url: "/app/products/types",
            },
          ],
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrganizationSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
