import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import type { PropsWithChildren } from "react"
import { AppSidebar } from "./app-sidebar"

export const AppWrapperLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header>
        <h1>Header</h1>
      </header>
      <main>
        {children}
      </main>
    </SidebarInset>
  </SidebarProvider>
  )
}