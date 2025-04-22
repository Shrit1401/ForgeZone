import { SingleProject, StepItem } from "@/types/project.types";
import { getAllBuilds, GetBuildBySlug } from "./builds.server";
import { ProjectUser, UserMessage, UserType } from "@/types/user.types";

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

export const getBuildFromUser = (
  user: UserType,
  builds: SingleProject[],
  setUserBuilds: React.Dispatch<React.SetStateAction<SingleProject[]>>
) => {
  const userProjectNames = user.projects.map(
    (project: ProjectUser) => project.projectname
  );

  const userBuilds = builds.filter((build: SingleProject) =>
    userProjectNames.includes(build.name)
  );

  if (userBuilds.length === 0) {
    return [];
  }

  setUserBuilds(userBuilds);
  return userBuilds;
};

export const getNextBuildPageSlug = (build: SingleProject, current: number) => {
  if (current < 0) return null; // Prevent invalid indices

  let flatIndex = -1;

  for (let section of build.steps) {
    for (let step of section.stepItems) {
      flatIndex++;

      if (flatIndex === current) {
        return step.slug;
      }
    }
  }

  // TODO: handle case when course is completed
  return null;
};

export const getCurrentStepIndex = (
  build: SingleProject | undefined,
  courseSlug: string
): number => {
  if (!build) {
    return -1;
  }

  let flatIndex = -1;
  let foundIndex = -1;

  for (let section of build.steps) {
    for (let step of section.stepItems) {
      flatIndex++;

      if (step.slug === courseSlug) {
        foundIndex = flatIndex;
        break;
      }
    }

    if (foundIndex !== -1) break;
  }

  return foundIndex;
};

export const getBuildStepBySlug = (
  build: SingleProject | undefined,
  courseSlug: string,
  setStep: React.Dispatch<React.SetStateAction<StepItem | undefined>>
) => {
  if (!build) {
    return null;
  }
  const step = build.steps
    .flatMap((section) => section.stepItems)
    .find((step) => step.slug === courseSlug);

  if (!step) {
    return null;
  }

  setStep(step);

  return step;
};
