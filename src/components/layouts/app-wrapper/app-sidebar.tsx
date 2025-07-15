import * as React from "react"
import {
  Frame,
  Map,
  PieChart,
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
  navMain: {
    groupLabel: "Organizations",
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
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
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
        <NavMain items={data.navMain.items} groupLabel={data.navMain.groupLabel} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
