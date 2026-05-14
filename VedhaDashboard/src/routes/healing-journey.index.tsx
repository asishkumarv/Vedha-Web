import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { defaultHealingPages } from "@/data/mockHealingPages";
import { api } from "@/lib/api";
import { Loader2, Pencil, Search } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/healing-journey/")({
  component: HealingJourneyPage,
});

function HealingJourneyPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!isAuthenticated) { if (typeof window !== "undefined") navigate({ to: "/login", replace: true }); return null; }
  return <AdminLayout><HealingJourneyList /></AdminLayout>;
}

function HealingJourneyList() {
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState(defaultHealingPages);

  useEffect(() => {
    api.getHealingPages<typeof defaultHealingPages>()
      .then(setPages)
      .catch((error) => console.error("Failed to load healing pages", error));
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return pages;
    const q = search.toLowerCase();
    return pages.filter(p => p.name.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q));
  }, [pages, search]);

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Healing Journey Pages</h2>
          <p className="text-muted-foreground mt-1 text-sm">Edit inner content pages for each healing journey topic.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search pages..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>
      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-12 text-sm">No pages match your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((page) => (
            <Card key={page.id} className="overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border-border/60">
              <div className="aspect-video relative bg-muted/30 overflow-hidden">
                <img src={page.bannerImage} alt={page.name} className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" />
                <Badge className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-[10px]">Active</Badge>
              </div>
              <CardContent className="p-3 sm:p-4 space-y-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-2xl shrink-0">{page.icon}</span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground truncate text-sm" style={{ fontFamily: "var(--font-heading)" }}>{page.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{page.subtitle}</p>
                  </div>
                </div>
                <Link to="/healing-journey/$slug" params={{ slug: page.slug }} className="block">
                  <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Pencil className="h-3 w-3 mr-1" /> Edit Page
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
