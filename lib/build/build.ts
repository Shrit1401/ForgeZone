import { SingleProject } from "@prisma/client";
import { getAllBuilds, GetBuildBySlug } from "./builds.server";
import { ProjectUser, UserType } from "@/types/user.types";

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

export const getProjectFromUser = (user: UserType, buildName: string) => {
  const project = user.projects.find((project: ProjectUser) => {
    return project.projectname === buildName;
  });

  if (!project) {
    return null;
  }

  return project;
};
