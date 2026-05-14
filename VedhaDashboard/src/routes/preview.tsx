import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import { useContent } from "@/context/ContentContext";
import { Loader2, ArrowLeft, Facebook, Instagram, Youtube, Twitter, MapPin, Phone, Mail } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/preview")({
  component: PreviewPageRoute,
});

function PreviewPageRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!isAuthenticated) { if (typeof window !== "undefined") navigate({ to: "/login", replace: true }); return null; }
  return <AdminLayout><PreviewPage /></AdminLayout>;
}

function PreviewPage() {
  const { content } = useContent();
  const { hero, sections, cards, footer } = content;

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-3">
        <Link to="/">
          <Button variant="outline" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
        </Link>
        <p className="text-sm text-muted-foreground">This preview reflects your current edits.</p>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card shadow-sm">
        <div className="relative">
          <img src={hero.bannerImage} alt="Hero" className="w-full h-48 sm:h-64 md:h-96 object-cover" />
          <div className="absolute inset-0 bg-foreground/40 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-card max-w-3xl" style={{ fontFamily: "var(--font-heading)" }}>{hero.title}</h1>
            <p className="text-xs sm:text-sm md:text-lg text-card/90 mt-2 sm:mt-3 max-w-2xl">{hero.subtitle}</p>
            <button className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-primary text-primary-foreground rounded-lg font-medium text-xs sm:text-sm hover:bg-primary/90 transition-colors">
              {hero.buttonText}
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-10 space-y-8 sm:space-y-12">
          {sections.map((section, idx) => (
            <div key={section.id} className={`flex flex-col md:flex-row gap-4 sm:gap-6 items-center ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              <div className="w-full md:w-1/2">
                <img src={section.image} alt={section.title} className="w-full rounded-lg object-contain" />
              </div>
              <div className="w-full md:w-1/2 space-y-2 sm:space-y-3">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{section.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-muted/50 px-3 sm:px-4 py-6 sm:py-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-foreground mb-6 sm:mb-8" style={{ fontFamily: "var(--font-heading)" }}>Let's Start Our Healing Journey</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {cards.map((card) => (
                <div key={card.id} className="bg-card rounded-lg overflow-hidden shadow-sm border">
                  <img src={card.image} alt={card.title} className="w-full h-24 sm:h-40 object-cover" />
                  <div className="p-2 sm:p-4">
                    <h3 className="font-semibold text-foreground text-xs sm:text-base" style={{ fontFamily: "var(--font-heading)" }}>{card.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="bg-foreground text-card/80 px-3 sm:px-4 py-6 sm:py-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-sm">
            <div>
              <h4 className="font-bold text-card mb-2" style={{ fontFamily: "var(--font-heading)" }}>VedaThrive</h4>
              <p className="flex items-start gap-2 text-xs sm:text-sm"><MapPin className="h-4 w-4 shrink-0 mt-0.5" /> {footer.address}</p>
            </div>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-xs sm:text-sm"><Phone className="h-4 w-4 shrink-0" /> {footer.phone}</p>
              <p className="flex items-center gap-2 text-xs sm:text-sm"><Mail className="h-4 w-4 shrink-0" /> {footer.email}</p>
            </div>
            <div>
              <p className="font-medium text-card mb-2">Follow Us</p>
              <div className="flex gap-3">
                <a href={footer.facebookUrl} className="hover:text-card transition-colors"><Facebook className="h-5 w-5" /></a>
                <a href={footer.instagramUrl} className="hover:text-card transition-colors"><Instagram className="h-5 w-5" /></a>
                <a href={footer.youtubeUrl} className="hover:text-card transition-colors"><Youtube className="h-5 w-5" /></a>
                <a href={footer.twitterUrl} className="hover:text-card transition-colors"><Twitter className="h-5 w-5" /></a>
              </div>
            </div>
          </div>
          <div className="max-w-5xl mx-auto mt-4 sm:mt-6 pt-4 border-t border-card/20 text-xs text-center text-card/60">
            {footer.footerText}
          </div>
        </footer>
      </div>
    </div>
  );
}
