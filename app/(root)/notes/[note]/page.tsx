import NotesClient from "@/components/clientPages/Notes/NotesClient";
import { getNoteById } from "@/lib/notes/notes";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: {
    note: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const notesSlug = params.note;

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

const NotesPage = () => {
  return <NotesClient />;
};

export default NotesPage;
