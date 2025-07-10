import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import type { PropsWithChildren } from "react"
import { AppSidebar } from "./app-sidebar"
import { OrganizationSwitcher } from "./organization-switcher"

export const AppWrapperLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="relative">
        <SidebarTrigger className="absolute mt-2" />
        <header className="grid items-center justify-between p-2 pl-8">
          <OrganizationSwitcher />
          <h1>Header</h1>
        </header>
        <main>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}