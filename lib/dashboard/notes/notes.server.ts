"use server";
import db from "../../db";
import { Note } from "@prisma/client";

// Get all notes
export const getNotes = async () => {
  try {
    const notes = await db.note.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw new Error("Failed to fetch notes");
  }
};

// Get a note by ID
export const GetNoteById = async (id: string) => {
  try {
    const note = await db.note.findUnique({
      where: {
        slug: id,
      },
    });
    return note;
  } catch (error) {
    console.error("Error fetching note:", error);
    throw new Error("Failed to fetch note");
  }
};

// Create a new note
export const createNote = async (note: Omit<Note, "id" | "createdAt">) => {
  try {
    const newNote = await db.note.create({
      data: {
        title: note.title,
        bgImage: note.bgImage,
        userPfp: note.userPfp,
        tag: note.tag,
        slug: note.slug,
        cardImage: note.cardImage,
        markdownUrl: note.markdownUrl,
      },
    });
    return newNote;
  } catch (error) {
    console.error("Error creating note:", error);
    throw new Error("Failed to create note");
  }
};

// Update an existing note
export const updateNote = async (
  id: string,
  note: Omit<Note, "id" | "createdAt">
) => {
  try {
    const updatedNote = await db.note.update({
      where: {
        id: id,
      },
      data: {
        title: note.title,
        bgImage: note.bgImage,
        userPfp: note.userPfp,
        tag: note.tag,
        cardImage: note.cardImage,
        markdownUrl: note.markdownUrl,
      },
    });
    return updatedNote;
  } catch (error) {
    console.error("Error updating note:", error);
    throw new Error("Failed to update note");
  }
};

// Delete a note
export const deleteNote = async (id: string) => {
  try {
    await db.note.delete({
      where: {
        id: id,
      },
    });
    return true;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw new Error("Failed to delete note");
  }
};
