"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { supabaseClient } from "@/supabase/client";
import { updatePfp } from "@/lib/auth/auth.server";
type ProfilePictureUploadProps = {
  userId: string;
};

export default function ProfilePictureUpload({
  userId,
}: ProfilePictureUploadProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type. Please upload an image file", {
        description: "Please upload an image file",
      });

      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Please upload an image smaller than 5MB", {
        description: "Please upload an image smaller than 5MB",
      });
      return;
    }

    // Store the file
    setImageFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!preview || !imageFile) return;

    setIsUploading(true);

    // Simulate API call to update profile picture
    try {
      const filepath = `${userId}/pfp_${Date.now()}.png`;
      const { error } = await supabaseClient.storage
        .from("pfp")
        .upload(filepath, imageFile);

      if (error) throw error;

      toast.success("Profile picture updated successfully", {
        description: "Your profile picture has been updated successfully",
      });

      const pfpUrl = supabaseClient.storage.from("pfp").getPublicUrl(filepath)
        .data.publicUrl;
      const res = await updatePfp(userId, pfpUrl);
      if (!res) {
        toast.error("Error updating profile picture in database", {
          description: "Please try again.",
        });
        return;
      }
      toast.success("Profile picture updated in database", {
        description: "Your profile picture has been updated in the database",
      });

      window.location.reload();

      setIsOpen(false);
      setPreview(null);
      setImageFile(null);
    } catch (error) {
      console.log("Error updating profile picture:", error);
      toast.error("Error updating profile picture", {
        description:
          "There was an error updating your profile picture. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const clearSelection = () => {
    setPreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Upload className="h-4 w-4" />
          <span className="sr-only">Upload profile picture</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update profile picture</DialogTitle>
          <DialogDescription>
            Upload a new profile picture. Recommended size is 300x300 pixels.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {preview ? (
            <div className="relative mx-auto">
              <img
                src={preview || "/placeholder.svg"}
                alt="Profile preview"
                className="rounded-full w-40 h-40 object-cover mx-auto border-4 border-muted"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-0 right-0 rounded-full h-8 w-8"
                onClick={clearSelection}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear selection</span>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-12">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop or click to upload
              </p>
              <Button
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
              >
                Select File
              </Button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!preview || isUploading}>
            {isUploading ? "Uploading..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
