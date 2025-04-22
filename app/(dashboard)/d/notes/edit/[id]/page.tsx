"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getNoteById, updateNote } from "@/lib/dashboard/notes/notes.server";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

type NoteFormData = {
  title: string;
  bgImage: string;
  userPfp: string;
  tag: string;
  cardImage: string;
  slug: string;
  markdownUrl: string;
};

export default function EditNote() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<NoteFormData>({
    title: "",
    bgImage: "",
    userPfp: "",
    tag: "",
    cardImage: "",
    slug: "",
    markdownUrl: "",
  });

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      try {
        const note = await getNoteById(id);
        if (note) {
          setForm({
            title: note.title,
            bgImage: note.bgImage,
            userPfp: note.userPfp,
            tag: note.tag,
            cardImage: note.cardImage,
            slug: note.slug,
            markdownUrl: note.markdownUrl,
          });
        } else {
          toast.error("Note not found");
          router.push("/d/notes");
        }
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to load note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await updateNote(id, form);
      toast.success("Note updated successfully");
      router.push("/d/notes");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="mt-[4rem] mx-4">
        <div className="h-10 w-48 bg-[#333] rounded animate-pulse mb-8"></div>
        <div className="h-6 w-full max-w-md bg-[#333] rounded animate-pulse mb-4"></div>
        <div className="h-6 w-full max-w-lg bg-[#333] rounded animate-pulse mb-4"></div>
        <div className="h-6 w-full max-w-sm bg-[#333] rounded animate-pulse mb-4"></div>
      </section>
    );
  }

  return (
    <section className="mt-[4rem] mx-4 pb-20">
      <h1 className="text-4xl font-bold text-white mb-8">
        Edit Note: {form.title}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 text-white max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info Fields */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Content</h2>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                name="title"
                id="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Note Title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tag">Tag</Label>
              <Input
                name="tag"
                id="tag"
                value={form.tag}
                onChange={handleChange}
                placeholder="e.g. AI / ML"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                name="slug"
                id="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="url-friendly-note-name"
                required
              />
              <p className="text-xs text-white/60 mt-1">
                A URL-friendly version of the note title (used in the note URL)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="markdownUrl">Markdown URL</Label>
              <Input
                name="markdownUrl"
                id="markdownUrl"
                value={form.markdownUrl}
                onChange={handleChange}
                placeholder="URL to markdown content"
                required
              />
              <p className="text-xs text-white/60 mt-1">
                The URL to a markdown file containing the note content
              </p>
            </div>
          </div>

          {/* Media Fields */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Media</h2>
            <div className="space-y-2">
              <Label htmlFor="bgImage">Background Image URL</Label>
              <Input
                name="bgImage"
                id="bgImage"
                value={form.bgImage}
                onChange={handleChange}
                placeholder="URL to background image"
                required
              />
              <p className="text-xs text-white/60 mt-1">
                Used as the header background for the note page
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardImage">Card Image URL</Label>
              <Input
                name="cardImage"
                id="cardImage"
                value={form.cardImage}
                onChange={handleChange}
                placeholder="URL to card image"
                required
              />
              <p className="text-xs text-white/60 mt-1">
                Displayed on the note card in the notes listing
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userPfp">User Profile Image URL</Label>
              <Input
                name="userPfp"
                id="userPfp"
                value={form.userPfp}
                onChange={handleChange}
                placeholder="URL to user profile image"
                required
              />
              <p className="text-xs text-white/60 mt-1">
                The author's profile picture
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/d/notes")}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Updating..." : "Update Note"}
          </Button>
        </div>
      </form>
    </section>
  );
}
