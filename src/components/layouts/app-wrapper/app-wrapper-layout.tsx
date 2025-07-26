import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import type { PropsWithChildren } from "react"
import { AppSidebar } from "./app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { useAuth } from "@/core/modules/user/infra/context"
import { Link } from "@tanstack/react-router"

export const AppWrapperLayout = ({ children }: PropsWithChildren) => {
  const { isAdmin } = useAuth()
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="relative">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/app">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {isAdmin && (
            <Link to="/office" className="text-sm text-muted-foreground hover:text-foreground">
              Office
            </Link>
          )}
        </header>
        <main>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}