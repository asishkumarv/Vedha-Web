import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import { useContent } from "@/context/ContentContext";
import { Loader2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUploader from "@/components/admin/ImageUploader";

export const Route = createFileRoute("/edit-homepage")({
  component: EditHomepagePage,
});

function EditHomepagePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!isAuthenticated) { if (typeof window !== "undefined") navigate({ to: "/login", replace: true }); return null; }
  return <AdminLayout><EditHomepage /></AdminLayout>;
}

function EditHomepage() {
  const { content, originalContent, updateHero } = useContent();
  const { hero } = content;
  if (!hero) return null;

  return (
    <div className="space-y-6 w-full max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground">Title</label>
            <Input value={hero.title} onChange={(e) => updateHero({ title: e.target.value })} className="mt-1" />
            <p className="text-xs text-muted-foreground mt-1">{hero.title.length} characters</p>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Subtitle</label>
            <Textarea value={hero.subtitle} onChange={(e) => updateHero({ subtitle: e.target.value })} className="mt-1" rows={3} />
            <p className="text-xs text-muted-foreground mt-1">{hero.subtitle.length} characters</p>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Button Text</label>
            <Input value={hero.buttonText} onChange={(e) => updateHero({ buttonText: e.target.value })} className="mt-1" />
          </div>
          <ImageUploader currentImage={hero.bannerImage} originalImage={originalContent.hero.bannerImage} onImageChange={(url) => updateHero({ bannerImage: url })} recommendedSize={hero.recommendedSize} label="Hero Banner Image" usedIn="Hero Section" />
        </CardContent>
      </Card>
    </div>
  );
}
