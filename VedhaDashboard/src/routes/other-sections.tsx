import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import { useContent } from "@/context/ContentContext";
import { Loader2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ImageUploader from "@/components/admin/ImageUploader";

const DAMAGE_SECTION_IDS = ["s1", "s2"];

export const Route = createFileRoute("/other-sections")({
  component: OtherSectionsPage,
});

function OtherSectionsPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!isAuthenticated) { if (typeof window !== "undefined") navigate({ to: "/login", replace: true }); return null; }
  return <AdminLayout><OtherSections /></AdminLayout>;
}

function OtherSections() {
  const { content, originalContent, updateSection } = useContent();
  const sections = (content.sections || []).filter(s => !DAMAGE_SECTION_IDS.includes(s.id));

  return (
    <div className="space-y-4 w-full max-w-4xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Other Sections</h2>
        <p className="text-muted-foreground text-sm mt-1">Edit the introductory damage awareness sections on your homepage.</p>
      </div>
      <Accordion type="single" collapsible className="space-y-2">
        {sections.map((section, idx) => {
          const originalIdx = content.sections.findIndex(s => s.id === section.id);
          const original = originalContent.sections[originalIdx];
          return (
            <AccordionItem key={section.id} value={section.id} className="border rounded-lg px-3 sm:px-4">
              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                <span className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">{idx + 1}</span>
                  <span className="truncate">{section.title}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <div>
                  <label className="text-sm font-medium text-foreground">Title</label>
                  <Input value={section.title} onChange={(e) => updateSection(section.id, { title: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <Textarea value={section.description} onChange={(e) => updateSection(section.id, { description: e.target.value })} className="mt-1" rows={3} />
                  <p className="text-xs text-muted-foreground mt-1">{section.description.length} characters</p>
                </div>
                <ImageUploader currentImage={section.image} originalImage={original?.image || ""} onImageChange={(url) => updateSection(section.id, { image: url })} recommendedSize={section.recommendedSize} label="Section Image" usedIn={section.title} />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
