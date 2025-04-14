import { SingleProject } from "@prisma/client";
import { getAllBuilds, GetBuildBySlug } from "./builds.server";

export async function getBuilds(setBuilds: any) {
  const res = await getAllBuilds();
  if (!res) {
    return null;
  }

  setBuilds(res);
  return res;
}

export async function getBuildBySlug(slug: string, setBuild: any) {
  const res = await GetBuildBySlug(slug);
  if (!res) {
    return null;
  }
  setBuild(res);
  return res;
}
