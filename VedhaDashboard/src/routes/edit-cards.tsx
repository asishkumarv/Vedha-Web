import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import { useContent } from "@/context/ContentContext";
import { Loader2, ExternalLink } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/admin/ImageUploader";
import { HealingPagePopup } from "@/components/admin/HealingPagePopup";

const SLUG_MAP: Record<string, string> = {
  "c1": "soil",
  "c2": "seed",
  "c3": "food",
  "c4": "kitchen",
  "c5": "home",
  "c6": "yoga",
  "c7": "nature",
  "c8": "rainwater",
};

export const Route = createFileRoute("/edit-cards")({
  component: EditCardsPage,
});

function EditCardsPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!isAuthenticated) { if (typeof window !== "undefined") navigate({ to: "/login", replace: true }); return null; }
  return <AdminLayout><EditCards /></AdminLayout>;
}

function EditCards() {
  const { content, originalContent, updateCard } = useContent();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  return (
    <div className="space-y-4 w-full">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Edit Cards</h2>
        <p className="text-muted-foreground text-sm mt-1">Edit the "Let's Start Our Healing Journey" cards grid. Click on an image to edit the detailed journey content.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {(content.cards || []).map((card, idx) => {
          const original = originalContent.cards[idx];
          const slug = SLUG_MAP[card.id];
          
          return (
            <Card key={card.id} className="relative group overflow-hidden">
              <CardHeader className="pb-3 p-3 sm:p-4 sm:pb-3">
                <CardTitle className="text-sm flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs flex items-center justify-center font-bold">{idx + 1}</span>
                    Card {idx + 1}
                  </div>
                  {slug && (
                    <Button variant="ghost" size="sm" onClick={() => setSelectedSlug(slug)} className="h-7 px-2 text-[10px] font-bold text-primary hover:bg-primary/5 uppercase tracking-wider">
                      <ExternalLink className="h-3 w-3 mr-1" /> Journey Info
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-3 sm:p-4 pt-0 sm:pt-0">
                <div>
                  <label className="text-sm font-medium text-foreground">Title</label>
                  <Input value={card.title} onChange={(e) => updateCard(card.id, { title: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <Textarea value={card.description} onChange={(e) => updateCard(card.id, { description: e.target.value })} className="mt-1" rows={2} />
                </div>
                <div 
                  className="relative cursor-pointer group/img" 
                  onClick={() => slug && setSelectedSlug(slug)}
                  title="Click to edit detailed journey content"
                >
                  <ImageUploader 
                    currentImage={card.image} 
                    originalImage={original.image} 
                    onImageChange={(url) => updateCard(card.id, { image: url })} 
                    recommendedSize={card.recommendedSize} 
                    label="Card Image" 
                    usedIn={card.title} 
                  />
                  {slug && (
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none rounded-lg border-2 border-dashed border-primary">
                      <div className="bg-background/90 px-3 py-1 rounded-full text-xs font-bold shadow-lg text-primary border border-primary/20">
                        Edit Detailed Content
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <HealingPagePopup 
        slug={selectedSlug || ""} 
        isOpen={!!selectedSlug} 
        onClose={() => setSelectedSlug(null)} 
      />
    </div>
  );
}
