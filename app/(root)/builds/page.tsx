import { Metadata } from "next";
import { BuildMetadata } from "@/lib/metadatas";
import BuildsPageClient from "@/components/clientPages/BuildsPageClient";

export const metadata: Metadata = BuildMetadata;

export default async function BuildsPage() {
  return <BuildsPageClient />;
}
