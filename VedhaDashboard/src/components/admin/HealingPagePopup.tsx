import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, Trash2, GripVertical, Save } from "lucide-react";
import { api } from "@/lib/api";
import { HealingPage, HealingSection } from "@/data/mockHealingPages";
import ImageUploader from "./ImageUploader";
import { toast } from "sonner";

interface HealingPagePopupProps {
  slug: string;
  isOpen: boolean;
  onClose: () => void;
}

export function HealingPagePopup({ slug, isOpen, onClose }: HealingPagePopupProps) {
  const [page, setPage] = useState<HealingPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen && slug) {
      setLoading(true);
      api.getHealingPage<HealingPage>(slug)
        .then((data) => {
          setPage({
            ...data,
            sections: (data.sections || []).map(s => ({ ...s })),
            bullets: (data.bullets || []).map(b => ({ ...b }))
          });
        })
        .catch((error) => {
          console.error("Failed to load healing page", error);
          toast.error("Failed to load page content");
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, slug]);

  const update = (data: Partial<HealingPage>) => setPage(prev => prev ? { ...prev, ...data } : prev);
  
  const addSection = () => {
    const newSection: HealingSection = { id: `s${Date.now()}`, label: "", text: "" };
    if (page) update({ sections: [...page.sections, newSection] });
  };

  const updateSection = (id: string, data: Partial<HealingSection>) => {
    if (page) update({ sections: page.sections.map(s => s.id === id ? { ...s, ...data } : s) });
  };

  const deleteSection = (id: string) => {
    if (page) update({ sections: page.sections.filter(s => s.id !== id) });
  };

  const handleSave = async () => {
    if (!page) return;
    setSaving(true);
    try {
      await api.saveHealingPage(slug, page);
      toast.success("Page content updated");
      onClose();
    } catch (error) {
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            Edit {page?.name || slug.charAt(0).toUpperCase() + slug.slice(1)} Journey Content
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-muted-foreground animate-pulse">Fetching journey details...</p>
          </div>
        ) : page ? (
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">Core Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Short Name (for Dashboard)</label>
                    <Input value={page.name} onChange={e => update({ name: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Full Page Title</label>
                    <Input value={page.title} onChange={e => update({ title: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Subtitle</label>
                    <Input value={page.subtitle} onChange={e => update({ subtitle: e.target.value })} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-lg">Visuals</CardTitle></CardHeader>
                <CardContent>
                  <ImageUploader 
                    currentImage={page.image} 
                    originalImage={page.image} 
                    onImageChange={(url) => update({ image: url })} 
                    recommendedSize="800 x 600px" 
                    label="Detail Image" 
                    usedIn={`${page.name} Detail`} 
                  />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader><CardTitle className="text-lg">Introductory Description</CardTitle></CardHeader>
              <CardContent>
                <Textarea value={page.fullDesc} onChange={e => update({ fullDesc: e.target.value })} rows={4} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Content Sections</CardTitle>
                <Button size="sm" variant="outline" onClick={addSection}>
                  <Plus className="h-4 w-4 mr-1" /> Add Section
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {page.sections.map((section, i) => (
                  <div key={section.id} className="p-4 rounded-lg border bg-muted/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-semibold">Section {i + 1}</span>
                      </div>
                      <Button size="icon" variant="ghost" onClick={() => deleteSection(section.id)} className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input placeholder="Label" value={section.label} onChange={e => updateSection(section.id, { label: e.target.value })} />
                    <Textarea placeholder="Content text" value={section.text} onChange={e => updateSection(section.id, { text: e.target.value })} rows={3} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="py-10 text-center">
            <p className="text-destructive">Failed to load content for this slug.</p>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={saving}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save Journey Content
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
