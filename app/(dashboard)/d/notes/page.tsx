"use client";
import Btn from "@/components/Btn";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getNotes, deleteNote } from "@/lib/dashboard/notes/notes.server";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

type Note = {
  id: string;
  title: string;
  bgImage: string;
  userPfp: string;
  createdAt: Date;
  tag: string;
  cardImage: string;
  markdownUrl: string;
  slug: string;
};

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteNote(id);
        toast.success("Note deleted successfully");
        fetchNotes();
      } catch (error) {
        console.error("Failed to delete note:", error);
        toast.error("Failed to delete note");
      }
    }
  };

  return (
    <section className="mt-[4rem] mx-4">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold text-white manrope">
          Notes Dashboard
        </h1>
        <Btn link="/d/notes/new" title="Create New Note" />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-[#1c1c1c] border-[#333] animate-pulse">
              <div className="h-[200px] bg-[#333]"></div>
              <CardHeader>
                <div className="h-6 bg-[#333] rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-[#333] rounded w-full mb-2"></div>
                <div className="h-4 bg-[#333] rounded w-5/6"></div>
              </CardContent>
              <CardFooter>
                <div className="h-10 bg-[#333] rounded w-full"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {notes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <Card
                  key={note.id}
                  className="bg-[#1c1c1c] border-[#333] overflow-hidden"
                >
                  <div className="h-[200px] relative">
                    {note.cardImage && (
                      <Image
                        src={note.cardImage}
                        alt={note.title}
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-xs text-white backdrop-blur-sm">
                      {note.tag}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white">{note.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Image
                        src={note.userPfp}
                        alt="Author"
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-sm text-white/70">
                        {formatDistanceToNow(new Date(note.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" asChild>
                        <Link href={`/d/notes/edit/${note.slug}`}>Edit</Link>
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(note.id)}
                      >
                        Delete
                      </Button>
                    </div>
                    <Link
                      href={`/notes/${note.id}`}
                      className="text-white/50 hover:text-white transition-colors text-sm"
                    >
                      View Note →
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#1c1c1c] rounded-lg border border-[#333]">
              <h3 className="text-xl font-medium text-white mb-2">
                No notes found
              </h3>
              <p className="text-white/50 mb-6">
                Create your first note to get started
              </p>
              <Btn link="/d/notes/new" title="Create New Note" />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default NotesPage;
