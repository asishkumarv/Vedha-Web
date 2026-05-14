import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import { useContent } from "@/context/ContentContext";
import { api } from "@/lib/api";
import { Subscription } from "@/data/mockSubscriptions";
import { Loader2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skull, Grid3X3, Layers, Leaf } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/login", replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AdminLayout>
      <DashboardHome />
    </AdminLayout>
  );
}


function DashboardHome() {
  const { content } = useContent();
  const [subCount, setSubCount] = useState(0);

  useEffect(() => {
    api.getSubscriptions<Subscription[]>().then(subs => setSubCount(subs.length)).catch(() => {});
  }, []);

  const stats = [
    { label: "Hero & Footer", value: 2, icon: Layers, link: "/edit-homepage", color: "text-primary" },
    { label: "Homepage Sections", value: content.sections?.length || 0, icon: Layers, link: "/other-sections", color: "text-primary" },
    { label: "Healing Cards", value: content.cards?.length || 0, icon: Grid3X3, link: "/edit-cards", color: "text-accent" },
    { label: "Active Subscriptions", value: subCount, icon: Leaf, link: "/subscriptions", color: "text-primary" },
  ];

  return (
    <div className="space-y-6 w-full">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Welcome to VedhaThrive Admin</h2>
        <p className="text-muted-foreground mt-1 text-sm">Manage all text and images across your website from here.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((s) => (
          <Link to={s.link} key={s.label}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardHeader className="pb-2 p-3 sm:p-4 sm:pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between p-3 sm:p-4 pt-0 sm:pt-0">
                <span className="text-2xl sm:text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</span>
                <s.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${s.color} opacity-60`} />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link to="/edit-homepage" className="p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-center">
              <p className="font-medium text-foreground text-sm">Edit Hero Banner</p>
              <p className="text-xs text-muted-foreground mt-1">Update title, subtitle & banner</p>
            </Link>
            <Link to="/damage-journey" className="p-4 rounded-lg bg-destructive/5 hover:bg-destructive/10 transition-colors text-center">
              <p className="font-medium text-foreground text-sm">The Damage Journey</p>
              <p className="text-xs text-muted-foreground mt-1">Edit damage awareness sections</p>
            </Link>
            <Link to="/preview" className="p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-center">
              <p className="font-medium text-foreground text-sm">Preview Site</p>
              <p className="text-xs text-muted-foreground mt-1">See live changes</p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
