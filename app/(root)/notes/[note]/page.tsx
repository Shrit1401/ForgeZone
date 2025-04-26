import NotesClient from "@/components/clientPages/Notes/NotesClient";
import { getNoteById } from "@/lib/notes/notes";
import { Metadata } from "next";
import React from "react";

type Params = Promise<{
  note: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { note } = await params;
  const notesSlug = note;

  const notes = await getNoteById(notesSlug);

  if (!notes) {
    return {
      title: "Note not found",
      description: "Note not found",
    };
  }
  return {
    title: `${notes.title}`,
    openGraph: {
      title: notes.title,
      images: [
        {
          url: notes.bgImage,
          alt: `${notes.title} - Build Project Faster`,
        },
      ],
      siteName: "Forge Zone",
    },
  };
}

const NotesPage = async ({ params }: { params: Params }) => {
  const { note } = await params;
  return <NotesClient slug={note} />;
};

export default NotesPage;
