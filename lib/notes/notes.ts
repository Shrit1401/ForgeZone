import { Note } from "@prisma/client";
import { GetNoteById, getNotes } from "../dashboard/notes/notes.server";

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
    const res = await GetNoteById(slug);

    if (!res) {
      return null;
    }

    setNote(res);
    return res;
  } catch (error) {
    console.error("Error fetching note:", error);
    return null;
  }
}
