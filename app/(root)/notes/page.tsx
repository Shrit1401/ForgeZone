import NotesHomeClient from "@/components/clientPages/Notes/NotesHomeClient";
import { NotesMetadeta } from "@/lib/metadatas";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = NotesMetadeta;

const NotesHome = () => {
  return <NotesHomeClient />;
};

export default NotesHome;
