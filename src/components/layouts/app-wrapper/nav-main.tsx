
import { ChevronRight, type LucideIcon } from "lucide-react"
import { Link, useLocation } from "@tanstack/react-router"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

interface NavigationItem {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}

export function NavMain({
  items,
}: {
  items: Array<{
    groupLabel: string
    items: Array<NavigationItem>
  }>
}) {
  const location = useLocation()
  
  const isActiveRoute = (url: string) => {
    // Exact match for root routes
    if (url === '/app' && location.pathname === '/app') {
      return true
    }
    
    // For other routes, check if current path starts with the URL
    // but also handle the case where /app/products should match /app/products exactly
    if (url === '/app/products' && location.pathname === '/app/products') {
      return true
    }
    
    // For sub-routes, check if they match exactly
    return location.pathname === url
  }

  const hasActiveChild = (item: NavigationItem) => {
    return item.items?.some(subItem => isActiveRoute(subItem.url)) || false
  }

  return (
    <SidebarGroup>
      {items.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6 last:mb-0">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
            {section.groupLabel}
          </SidebarGroupLabel>
          <SidebarMenu>
            {section.items.map((item) => {
              const isActive = isActiveRoute(item.url)
              const hasActiveSubItem = hasActiveChild(item)
              
              return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={isActive || hasActiveSubItem}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton 
                        tooltip={item.title}
                        className={`group/button relative transition-all duration-200 ${
                          isActive 
                            ? 'bg-gradient-findora text-white shadow-lg' 
                            : 'hover:bg-accent hover:text-accent-foreground'
                        }`}
                      >
                        {item.icon && (
                          <item.icon className={`w-4 h-4 transition-colors ${
                            isActive ? 'text-white' : 'text-muted-foreground group-hover/button:text-accent-foreground'
                          }`} />
                        )}
                        <span className="font-medium">{item.title}</span>
                        <ChevronRight className={`ml-auto transition-all duration-200 group-data-[state=open]/collapsible:rotate-90 ${
                          isActive ? 'text-white' : 'text-muted-foreground group-hover/button:text-accent-foreground'
                        }`} />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2">
                      <SidebarMenuSub className="mt-1">
                        {item.items?.map((subItem) => {
                          const isSubActive = isActiveRoute(subItem.url)
                          
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton 
                                asChild
                                className={`group/sub relative transition-all duration-200 ${
                                  isSubActive 
                                    ? 'bg-gradient-findora/10 text-gradient-findora border-l-2 border-gradient-findora' 
                                    : 'hover:bg-accent/50 hover:text-accent-foreground'
                                }`}
                              >
                                <Link to={subItem.url} className="flex items-center gap-3 w-full">
                                  {subItem.icon && (
                                    <subItem.icon className={`w-3.5 h-3.5 transition-colors ${
                                      isSubActive 
                                        ? 'text-gradient-findora' 
                                        : 'text-muted-foreground group-hover/sub:text-accent-foreground'
                                    }`} />
                                  )}
                                  <span className="text-sm font-medium">{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </div>
      ))}
    </SidebarGroup>
  )
}
