import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { SiteContent, defaultContent, HeroContent, SectionContent, CardContent as CardContentType, FooterContent } from "@/data/mockContent";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface ContentContextType {
  content: SiteContent;
  originalContent: SiteContent;
  updateHero: (hero: Partial<HeroContent>) => void;
  updateSection: (id: string, data: Partial<SectionContent>) => void;
  updateCard: (id: string, data: Partial<CardContentType>) => void;
  updateFooter: (footer: Partial<FooterContent>) => void;
  saveChanges: () => Promise<void>;
  resetAll: () => void;
  isSaving: boolean;
  uploadedImages: UploadedImage[];
  addUploadedImage: (img: UploadedImage) => void;
  removeUploadedImage: (id: string) => void;
}

export interface UploadedImage {
  id: string;
  name: string;
  url: string;
  size: string;
  uploadedAt: string;
  usedIn?: string;
}

const ContentContext = createContext<ContentContextType | null>(null);

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be within ContentProvider");
  return ctx;
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(structuredClone(defaultContent));
  const [originalContent, setOriginalContent] = useState<SiteContent>(structuredClone(defaultContent));
  const [isSaving, setIsSaving] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  useEffect(() => {
    api.getSiteContent<SiteContent>()
      .then((data) => {
        // Merge with defaultContent to ensure all properties exist
        const merged = {
          ...structuredClone(defaultContent),
          ...data,
          hero: { ...defaultContent.hero, ...data.hero },
          sections: data.sections || defaultContent.sections,
          cards: data.cards || defaultContent.cards,
          footer: { ...defaultContent.footer, ...data.footer },
        };
        setContent(merged);
        setOriginalContent(structuredClone(merged));
      })
      .catch((error) => console.error("Failed to load site content", error));

    api.getMediaAssets<UploadedImage[]>()
      .then(setUploadedImages)
      .catch((error) => console.error("Failed to load media assets", error));
  }, []);

  const saveChanges = useCallback(async () => {
    setIsSaving(true);
    try {
      await api.saveSiteContent(content);
      setOriginalContent(structuredClone(content));
      toast.success("Changes saved successfully", {
        description: "Your website content has been updated.",
      });
    } catch (error) {
      console.error("Failed to save site content", error);
      toast.error("Failed to save changes", {
        description: "Please try again or check your connection.",
      });
    } finally {
      setIsSaving(false);
    }
  }, [content]);

  const updateHero = useCallback((hero: Partial<HeroContent>) => {
    setContent(prev => ({ ...prev, hero: { ...prev.hero, ...hero } }));
  }, []);

  const updateSection = useCallback((id: string, data: Partial<SectionContent>) => {
    setContent(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === id ? { ...s, ...data } : s),
    }));
  }, []);

  const updateCard = useCallback((id: string, data: Partial<CardContentType>) => {
    setContent(prev => ({
      ...prev,
      cards: prev.cards.map(c => c.id === id ? { ...c, ...data } : c),
    }));
  }, []);

  const updateFooter = useCallback((footer: Partial<FooterContent>) => {
    setContent(prev => ({ ...prev, footer: { ...prev.footer, ...footer } }));
  }, []);

  const resetAll = useCallback(() => {
    api.resetSiteContent<SiteContent>()
      .then((data) => {
        setContent(data);
        setOriginalContent(structuredClone(data));
        toast.info("Content reset to defaults");
      })
      .catch(() => {
        const fallback = structuredClone(defaultContent);
        setContent(fallback);
        toast.error("Reset failed, using local defaults");
      });
  }, []);

  const addUploadedImage = useCallback((img: UploadedImage) => {
    setUploadedImages(prev => [img, ...prev.filter(i => i.url !== img.url)]);
    api.createMediaAsset<UploadedImage>(img)
      .then((saved) => setUploadedImages(prev => [saved, ...prev.filter(i => i.id !== img.id && i.url !== saved.url)]))
      .catch((error) => console.error("Failed to save media asset", error));
  }, []);

  const removeUploadedImage = useCallback((id: string) => {
    setUploadedImages(prev => prev.filter(i => i.id !== id));
    api.deleteMediaAsset(id).catch((error) => console.error("Failed to delete media asset", error));
  }, []);

  return (
    <ContentContext.Provider value={{ content, originalContent, updateHero, updateSection, updateCard, updateFooter, saveChanges, resetAll, isSaving, uploadedImages, addUploadedImage, removeUploadedImage }}>
      {children}
    </ContentContext.Provider>
  );
};
