import React from "react";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { useLocation, Link, useNavigate } from "@tanstack/react-router";
import { Eye, LogOut, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useContent } from "@/context/ContentContext";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/edit-homepage": "Homepage Editor",
  "/edit-sections": "Edit Sections",
  "/edit-cards": "Edit Cards",
  "/edit-footer": "Edit Footer",
  "/media": "Media Library",
  "/preview": "Preview",
  "/subscriptions": "Subscriptions",
  "/healing-journey": "Healing Journey Pages",
  "/damage-journey": "The Damage Journey",
  "/other-sections": "Other Sections",
};

function AdminContent({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar();
  const location = useLocation();
  const pathname = location.pathname;
  const { logout, userEmail } = useAuth();
  const { saveChanges, isSaving } = useContent();
  const navigate = useNavigate();
  const title = pageTitles[pathname] || (pathname.startsWith("/healing-journey/") ? "Edit Healing Page" : "Dashboard");

  const handleLogout = () => {
    logout();
    navigate({ to: "/login", replace: true });
  };

  const isEditPage = pathname.startsWith("/edit-") || pathname === "/damage-journey" || pathname === "/other-sections" || pathname.startsWith("/healing-journey/");

  return (
    <>
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
        <header className="h-14 flex items-center justify-between border-b bg-card px-4 shrink-0">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            {isEditPage && (
              <Button size="sm" onClick={saveChanges} disabled={isSaving} className="hidden sm:flex">
                {isSaving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Save className="h-4 w-4 mr-1" />}
                Save Changes
              </Button>
            )}
            {pathname !== "/preview" && (
              <Link to="/preview">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-1" /> Preview Site
                </Button>
              </Link>
            )}
            {userEmail && (
              <span className="text-xs text-muted-foreground hidden md:inline">{userEmail}</span>
            )}
            <Button size="sm" variant="ghost" onClick={handleLogout} title="Logout">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>
        {/* CHANGE #4: Full width content with proper spacing */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </>
  );
}

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminContent>{children}</AdminContent>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
