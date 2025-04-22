import { Note } from "@prisma/client";
import { getNotes } from "../dashboard/notes/notes.server";

export async function getAllNotes(
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>
) {
  const res = await getNotes();
  if (!res) {
    return null;
  }

  setNotes(res);
  return res;
}

export async function getNoteById(
  slug: string,
  setNote: React.Dispatch<React.SetStateAction<Note | null>>
) {
  try {
    const res = await fetch(`/api/notes/${slug}`);
    const data = await res.json();

    if (!data || !data.note) {
      return null;
    }

    setNote(data.note);
    return data.note;
  } catch (error) {
    console.error("Error fetching note:", error);
    return null;
  }
}
