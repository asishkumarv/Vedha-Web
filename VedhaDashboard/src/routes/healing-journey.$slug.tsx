import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { defaultHealingPages, HealingPage, HealingSection } from "@/data/mockHealingPages";
import { api } from "@/lib/api";
import { Loader2, ArrowLeft, Plus, Trash2, GripVertical } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/admin/ImageUploader";
import { toast } from "sonner";

export const Route = createFileRoute("/healing-journey/$slug")({
  component: HealingJourneyEditorPage,
});

function HealingJourneyEditorPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!isAuthenticated) { if (typeof window !== "undefined") navigate({ to: "/login", replace: true }); return null; }
  return <AdminLayout><HealingJourneyEditor /></AdminLayout>;
}

function HealingJourneyEditor() {
  const { slug } = Route.useParams();
  const initial = defaultHealingPages.find(p => p.slug === slug);
  const [page, setPage] = useState<HealingPage | null>(
    initial ? { ...initial, sections: initial.sections.map(s => ({ ...s })), bullets: initial.bullets.map(b => ({ ...b })) } : null
  );

  useEffect(() => {
    api.getHealingPage<HealingPage>(slug)
      .then((data) => setPage({ 
        ...data, 
        sections: (data.sections || []).map(s => ({ ...s })), 
        bullets: (data.bullets || []).map(b => ({ ...b })) 
      }))
      .catch((error) => console.error("Failed to load healing page", error));
  }, [slug]);

  if (!page) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Page not found.</p>
        <Link to="/healing-journey"><Button variant="outline" className="mt-4">← Back to list</Button></Link>
      </div>
    );
  }

  const update = (data: Partial<HealingPage>) => setPage(prev => prev ? { ...prev, ...data } : prev);
  const addSection = () => {
    const newSection: HealingSection = { id: `s${Date.now()}`, label: "", text: "" };
    update({ sections: [...page.sections, newSection] });
  };
  const updateSection = (id: string, data: Partial<HealingSection>) => {
    update({ sections: page.sections.map(s => s.id === id ? { ...s, ...data } : s) });
  };
  const deleteSection = (id: string) => {
    update({ sections: page.sections.filter(s => s.id !== id) });
  };
  const handleSave = async () => {
    try {
      const saved = await api.saveHealingPage<HealingPage>(slug, page);
      setPage(saved);
      toast.success(`${saved.name} updated with ${saved.sections.length} sections.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save healing page");
    }
  };

  return (
    <div className="space-y-5 w-full max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Link to="/healing-journey"><Button variant="ghost" size="icon" className="shrink-0"><ArrowLeft className="h-5 w-5" /></Button></Link>
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground truncate" style={{ fontFamily: "var(--font-heading)" }}>Edit: {page.name}</h2>
            <p className="text-muted-foreground text-sm">Editing the {page.name} healing journey page</p>
          </div>
        </div>
        <Button onClick={handleSave} className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shrink-0">Save Changes</Button>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg" style={{ fontFamily: "var(--font-heading)" }}>Title & Image</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><label className="text-sm font-medium block mb-1">Title</label><Input value={page.title} onChange={e => update({ title: e.target.value })} /></div>
          <ImageUploader currentImage={page.image} originalImage={initial?.image || ""} onImageChange={(url) => update({ image: url })} recommendedSize="800 x 600px" label="Detail Image" usedIn={`${page.name} Detail`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg" style={{ fontFamily: "var(--font-heading)" }}>Introductory Description</CardTitle></CardHeader>
        <CardContent>
          <Textarea value={page.fullDesc} onChange={e => update({ fullDesc: e.target.value })} rows={4} />
          <p className="text-xs text-muted-foreground mt-1">{page.fullDesc.length} characters</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-lg" style={{ fontFamily: "var(--font-heading)" }}>Content Sections</CardTitle>
            <Button size="sm" variant="outline" onClick={addSection}><Plus className="h-4 w-4 mr-1" /> Add Section</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {page.sections.map((section, i) => (
            <div key={section.id} className="p-3 sm:p-4 rounded-lg border bg-muted/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><GripVertical className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-semibold">Section {i + 1}</span></div>
                <Button size="icon" variant="ghost" onClick={() => deleteSection(section.id)} className="h-8 w-8 text-destructive hover:text-destructive/80"><Trash2 className="h-4 w-4" /></Button>
              </div>
              <div><label className="text-sm font-medium block mb-1">Label</label><Input value={section.label} onChange={e => updateSection(section.id, { label: e.target.value })} /></div>
              <div><label className="text-sm font-medium block mb-1">Text</label><Textarea value={section.text} onChange={e => updateSection(section.id, { text: e.target.value })} rows={3} /></div>
            </div>
          ))}
          {page.sections.length === 0 && <p className="text-muted-foreground text-sm text-center py-6">No sections yet. Click "Add Section" to create content blocks.</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg" style={{ fontFamily: "var(--font-heading)" }}>Banner & Quote</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <ImageUploader currentImage={page.bannerImage} originalImage={initial?.bannerImage || ""} onImageChange={(url) => update({ bannerImage: url })} recommendedSize={page.bannerRecommendedSize} label="Banner Image" usedIn={`${page.name} Banner`} />
          <div><label className="text-sm font-medium block mb-1">Quote Text</label><Textarea value={page.quoteText} onChange={e => update({ quoteText: e.target.value })} rows={2} /></div>
          <div><label className="text-sm font-medium block mb-1">Quote Author</label><Input value={page.quoteAuthor} onChange={e => update({ quoteAuthor: e.target.value })} /></div>
        </CardContent>
      </Card>
    </div>
  );
}
