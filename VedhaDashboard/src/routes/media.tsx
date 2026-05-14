import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useContent, UploadedImage } from "@/context/ContentContext";
import { Loader2, Trash2, Upload } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/media")({
  component: MediaPage,
});

function MediaPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!isAuthenticated) { if (typeof window !== "undefined") navigate({ to: "/login", replace: true }); return null; }
  return <AdminLayout><MediaManager /></AdminLayout>;
}

function MediaManager() {
  const { content, uploadedImages, addUploadedImage, removeUploadedImage } = useContent();
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState("");

  const allDefaultImages = [
    { name: "Hero Banner", url: content.hero.bannerImage, usedIn: "Hero Section" },
    ...content.sections.map(s => ({ name: s.title, url: s.image, usedIn: "Section" })),
    ...content.cards.map(c => ({ name: c.title, url: c.image, usedIn: "Card" })),
  ];

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      addUploadedImage({ id: crypto.randomUUID(), name: file.name, url: e.target?.result as string, size: `${(file.size / 1024).toFixed(1)} KB`, uploadedAt: new Date().toLocaleString() });
    };
    reader.readAsDataURL(file);
  };

  const handleUrlUpload = () => {
    const url = imageUrl.trim();
    if (!url) return;
    addUploadedImage({
      id: crypto.randomUUID(),
      name: url.split("/").pop() || "Image URL",
      url,
      size: "URL",
      uploadedAt: new Date().toLocaleString(),
    });
    setImageUrl("");
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-muted-foreground">All images used across the site.</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex gap-2">
            <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Paste image URL" />
            <Button size="sm" variant="outline" onClick={handleUrlUpload}>Add URL</Button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} />
          <Button size="sm" onClick={() => fileRef.current?.click()}><Upload className="h-4 w-4 mr-1" /> Upload Image</Button>
        </div>
      </div>
      {uploadedImages.length > 0 && (
        <Card><CardHeader><CardTitle className="text-base">Uploaded Images ({uploadedImages.length})</CardTitle></CardHeader><CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {uploadedImages.map((img) => (
              <div key={img.id} className="group relative rounded-lg border overflow-hidden bg-muted/30">
                <div className="aspect-video"><img src={img.url} alt={img.name} className="w-full h-full object-contain" /></div>
                <div className="p-2"><p className="text-xs font-medium truncate">{img.name}</p><p className="text-xs text-muted-foreground">{img.size}</p></div>
                <Button size="icon" variant="destructive" className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeUploadedImage(img.id)}><Trash2 className="h-3 w-3" /></Button>
              </div>
            ))}
          </div>
        </CardContent></Card>
      )}
      <Card><CardHeader><CardTitle className="text-base">Current Site Images ({allDefaultImages.length})</CardTitle></CardHeader><CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allDefaultImages.map((img, i) => (
            <div key={i} className="rounded-lg border overflow-hidden bg-muted/30">
              <div className="aspect-video"><img src={img.url} alt={img.name} className="w-full h-full object-cover" /></div>
              <div className="p-2"><p className="text-xs font-medium truncate">{img.name}</p><p className="text-xs text-muted-foreground">{img.usedIn}</p></div>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  );
}
