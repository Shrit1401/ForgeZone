"use client";
import NoteMarkdown from "@/components/notes/NoteMarkdown";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getNoteById } from "@/lib/notes/notes";
import { Note } from "@prisma/client";
import NoteDetailSkeleton from "@/components/skeletons/NoteDetailSkeleton";

const NotesClient = ({ slug }: { slug: string }) => {
  const noteId = slug;
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      await getNoteById(noteId, setNote);
      setLoading(false);
    };

    if (noteId) {
      fetchNote();
    }
  }, [noteId]);

  if (loading) {
    return <NoteDetailSkeleton />;
  }

  if (!note) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-white/50 text-xl">Note not found</div>
      </div>
    );
  }

  return (
    <div className="relative">
      <section
        className="h-[60vh] w-full sm:fixed top-0 left-0 bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center [filter:sepia(0.2)] relative"
        style={{ backgroundImage: `url('${note.bgImage}')` }}
      >
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.5px]"></div>
        <h1 className="text-3xl sm:text-5xl manrope font-[800] text-white text-center z-10 relative w-[50%]">
          {note.title}
        </h1>
        <div className="flex items-center gap-2 text-white/60 z-10 relative">
          <img
            src={note.userPfp}
            alt="user"
            width={40}
            height={40}
            className="rounded-full mt-2"
          />
          <b>{"Builder"}</b> • {"5"} min read
        </div>
      </section>
      <section className="relative z-10 mt-0 sm:mt-[60vh] backdrop-blur-3xl bg-black/40 px-12 py-40 text-lg flex items-start justify-center min-h-screen">
        <div className="max-w-[40rem] w-full flex flex-col gap-10 py-5">
          <NoteMarkdown url={note.markdownUrl} />
        </div>
      </section>
    </div>
  );
};

export default NotesClient;
