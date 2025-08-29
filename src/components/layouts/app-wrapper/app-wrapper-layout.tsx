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
    <SidebarProvider className="overflow-hidden">
      <AppSidebar />
      <SidebarInset className="relative h-screen flex flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 hover:bg-accent hover:text-accent-foreground" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" className="text-gradient-findora font-medium">
                    Findora
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/app" className="hover:text-gradient-findora transition-colors">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {isAdmin && (
            <Link 
              to="/office"
              className="text-sm text-muted-foreground hover:text-gradient-findora transition-colors font-medium"
            >
              Office
            </Link>
          )}
        </header>
        <main className="w-full h-full bg-gradient-to-br from-background via-background to-muted/20 overflow-scroll">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}