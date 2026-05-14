import {
  LayoutDashboard, Home, Leaf, CreditCard, ImageIcon, Eye,
  Grid3X3, PanelBottom, Skull, Layers
} from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const allItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Homepage Editor", url: "/edit-homepage", icon: Home },
  { title: "The Damage Journey", url: "/damage-journey", icon: Skull },
  { title: "Healing Journey Pages", url: "/healing-journey", icon: Leaf },
  { title: "Edit Cards", url: "/edit-cards", icon: Grid3X3 },
  { title: "Edit Footer", url: "/edit-footer", icon: PanelBottom },
  { title: "Other Sections", url: "/other-sections", icon: Layers },
  { title: "Subscriptions", url: "/subscriptions", icon: CreditCard },
  { title: "Media Library", url: "/media", icon: ImageIcon },
  { title: "Preview", url: "/preview", icon: Eye },
];

export function AdminSidebar() {
  const { state, setOpenMobile, isMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (url: string) => {
    if (url === "/") return pathname === "/";
    return pathname.startsWith(url);
  };

  const handleNavClick = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
      <SidebarContent className="gap-0">
        {/* Logo */}
        <div className={`flex items-center justify-center border-b border-sidebar-border ${collapsed ? "p-2" : "p-5"}`}>
          <img
            src={logo}
            alt="VedhaThrive"
            className={`object-contain transition-all duration-200 ${collapsed ? "w-9 h-9" : "w-32 h-auto"}`}
          />
        </div>

        {/* Single Nav Group */}
        <SidebarGroup className="px-3 pt-4">
          <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60 mb-1 px-2">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {allItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      onClick={handleNavClick}
                      className={`rounded-lg transition-all duration-200 flex items-center ${
                        isActive(item.url)
                          ? "bg-primary/15 text-primary font-semibold shadow-sm"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                      }`}
                    >
                      <item.icon className={`mr-2.5 h-4 w-4 shrink-0 ${isActive(item.url) ? "text-primary" : ""}`} />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
