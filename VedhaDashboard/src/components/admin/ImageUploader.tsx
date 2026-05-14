import React, { useRef, useState } from "react";
import { Upload, RotateCcw, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContent } from "@/context/ContentContext";

interface ImageUploaderProps {
  currentImage: string;
  originalImage: string;
  onImageChange: (url: string) => void;
  recommendedSize: string;
  label?: string;
  usedIn?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentImage,
  originalImage,
  onImageChange,
  recommendedSize,
  label = "Image",
  usedIn,
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { addUploadedImage } = useContent();

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      onImageChange(url);
      addUploadedImage({
        id: crypto.randomUUID(),
        name: file.name,
        url,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        uploadedAt: new Date().toLocaleString(),
        usedIn,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleUrlAdd = () => {
    const url = imageUrl.trim();
    if (!url) return;
    onImageChange(url);
    addUploadedImage({
      id: crypto.randomUUID(),
      name: label,
      url,
      size: "URL",
      uploadedAt: new Date().toLocaleString(),
      usedIn,
    });
    setImageUrl("");
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) handleFile(file);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="text-xs text-muted-foreground">
          Recommended: {recommendedSize}
        </span>
      </div>
      <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 overflow-hidden">
        <div className="relative aspect-video w-full">
          <img
            src={currentImage}
            alt={label}
            className="w-full h-full object-contain bg-muted/50"
          />
        </div>
        <div
          className={`p-4 text-center transition-colors ${isDragging ? "bg-primary/10" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          <div className="flex items-center justify-center gap-2">
            <Button size="sm" variant="outline" onClick={() => fileRef.current?.click()}>
              <Upload className="h-4 w-4 mr-1" /> Upload New
            </Button>
            {currentImage !== originalImage && (
              <Button size="sm" variant="ghost" onClick={() => onImageChange(originalImage)}>
                <RotateCcw className="h-4 w-4 mr-1" /> Revert
              </Button>
            )}
          </div>
          <div className="mt-3 flex flex-col sm:flex-row gap-2">
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste image URL"
              className="bg-background"
            />
            <Button type="button" size="sm" variant="outline" onClick={handleUrlAdd} className="shrink-0">
              Use URL
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            <ImageIcon className="inline h-3 w-3 mr-1" />
            Drag & drop, upload, or paste a URL. Aspect ratio maintained, no cropping.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
