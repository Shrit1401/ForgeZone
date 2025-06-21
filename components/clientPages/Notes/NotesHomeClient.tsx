"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { getAllNotes } from "@/lib/notes/notes";
import { Note } from "@prisma/client";
import Btn from "@/components/Btn";
import Link from "next/link";
import NotesCardSkeleton from "@/components/skeletons/NotesCardSkeleton";

// Extended Note type to include username and readTime which aren't in the Prisma model
type ExtendedNote = Note & {
  username?: string;
  readTime?: string;
  author?: {
    username?: string;
    pfp?: string;
  };
};

const NotesHomeClient = React.memo(() => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        await getAllNotes(setNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const skeletonCards = useMemo(
    () =>
      Array(6)
        .fill(0)
        .map((_, index) => <NotesCardSkeleton key={index} />),
    []
  );

  const renderedNotes = useMemo(
    () =>
      notes.map((note) => {
        // Treat as extended note for UI display
        const extendedNote = note as ExtendedNote;
        return (
          <Link
            href={`/notes/${note.slug}`}
            key={note.id}
            className={`flex-1 min-w-[370px] min-h-[185px] aspect-[16/10] bg-cover bg-center bg-no-repeat p-6 rounded-xl hover:brightness-150 border-2 border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer bg-black/50 hover:bg-black/30 flex justify-between flex-col relative`}
            style={{ backgroundImage: `url('${note.cardImage}')` }}
          >
            <div className="border border-white/10 w-fit backdrop-blur bg-gradient-to-r from-white/10 to-white/5 text-white manrope font-bold px-2 py-1 rounded-full z-10">
              {note.tag}
            </div>
            <div className="z-10">
              <h3 className="text-white manrope font-bold text-xl mb-2 line-clamp-2">
                {note.title}
              </h3>
              <p className="text-white/80 manrope text-sm line-clamp-2">
                {note.title}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <img
                  src={
                    extendedNote.author?.pfp || note.userPfp || "/pfp/pfp-1.png"
                  }
                  alt={extendedNote.author?.username || "Author"}
                  className="h-6 w-6 rounded-full"
                  loading="lazy"
                />
                <span className="text-white/70 manrope text-sm">
                  {extendedNote.author?.username ||
                    extendedNote.username ||
                    "Anonymous"}
                </span>
              </div>
            </div>
          </Link>
        );
      }),
    [notes]
  );

  return (
    <div className="relative">
      <section className="h-screen w-full block sm:fixed top-0 left-0 bg-[url('https://i.imgur.com/ugaUt8C.jpeg')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_70%,rgba(0,0,0,1)_140%)] z-0" />

        <h1 className="text-5xl sm:text-7xl manrope font-[800] text-white text-center z-10 relative">
          notes from our <br />
          top builders
        </h1>
        <p className="text-xl manrope font-normal text-white/90 text-center z-10 relative mt-4 w-[80%] sm:w-[50%]">
          Stories, tips, tricks, tutorials and learnings. Directly from our top
          builders to you. Get a taste of new tech, builder journeys, ideas and
          more. See how far you can get in 10 minutes or less.
        </p>
        <div className="flex gap-2">
          <Btn
            title="View Notes"
            className="mt-8"
            link="#notes-section"
            size="large"
            type="normal"
          />
          <Btn
            title="Write A Note"
            className="mt-8"
            link="/d/notes/new"
            size="large"
            type="ghost"
          />
        </div>
      </section>

      <section
        id="notes-section"
        className="relative z-10 mt-0 sm:mt-[100vh] backdrop-blur-3xl bg-black/70 p-12 min-h-screen"
      >
        <div className="flex flex-wrap items-center justify-center my-10 mx-10 gap-6">
          {loading ? skeletonCards : renderedNotes}
        </div>
      </section>
      <div
        className="w-full h-[40vh]
        bg-[url('https://framerusercontent.com/images/szikme2HNIVW7ekLuBFYrWnFSc.png')] bg-cover bg-center bg-no-repeat p-6 rounded-xl relative flex items-center flex-col justify-center"
      >
        <h2 className="text-5xl manrope font-[800] text-white text-center z-10 relative">
          Ready to write a note?
        </h2>

        <Btn
          title="Let us know"
          className="mt-8"
          link="/d/notes/new"
          size="large"
        />
      </div>
    </div>
  );
});

NotesHomeClient.displayName = "NotesHomeClient";

export default NotesHomeClient;
