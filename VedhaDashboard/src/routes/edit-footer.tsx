import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import { useContent } from "@/context/ContentContext";
import { Loader2, Facebook, Instagram, Youtube, Twitter, MapPin, Phone, Mail } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/edit-footer")({
  component: EditFooterPage,
});

function EditFooterPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!isAuthenticated) { if (typeof window !== "undefined") navigate({ to: "/login", replace: true }); return null; }
  return <AdminLayout><EditFooter /></AdminLayout>;
}

function EditFooter() {
  const { content, updateFooter } = useContent();
  const { footer } = content;
  if (!footer) return null;

  return (
    <div className="space-y-6 w-full max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Address</label>
            <Textarea value={footer.address} onChange={(e) => updateFooter({ address: e.target.value })} className="mt-1" rows={2} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground flex items-center gap-1"><Phone className="h-3 w-3" /> Phone</label>
              <Input value={footer.phone} onChange={(e) => updateFooter({ phone: e.target.value })} className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground flex items-center gap-1"><Mail className="h-3 w-3" /> Email</label>
              <Input value={footer.email} onChange={(e) => updateFooter({ email: e.target.value })} className="mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Social Media Links</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { icon: Facebook, label: "Facebook", key: "facebookUrl" as const },
            { icon: Instagram, label: "Instagram", key: "instagramUrl" as const },
            { icon: Youtube, label: "YouTube", key: "youtubeUrl" as const },
            { icon: Twitter, label: "Twitter / X", key: "twitterUrl" as const },
          ].map(({ icon: Icon, label, key }) => (
            <div key={key}>
              <label className="text-sm font-medium text-foreground flex items-center gap-1"><Icon className="h-3 w-3" /> {label}</label>
              <Input value={footer[key]} onChange={(e) => updateFooter({ [key]: e.target.value })} className="mt-1" />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Footer Text</CardTitle></CardHeader>
        <CardContent>
          <Textarea value={footer.footerText} onChange={(e) => updateFooter({ footerText: e.target.value })} rows={3} />
          <p className="text-xs text-muted-foreground mt-1">{footer.footerText.length} characters</p>
        </CardContent>
      </Card>
    </div>
  );
}
