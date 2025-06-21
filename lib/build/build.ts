import { SingleProject, StepItem } from "@/types/project.types";
import { getAllBuilds, GetBuildBySlug } from "./builds.server";
import { ProjectUser, UserType } from "@/types/user.types";

// Cache for build data to avoid unnecessary database calls
const buildCache = new Map<
  string,
  { build: SingleProject; timestamp: number }
>();
const BUILD_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function getBuilds(setBuilds: any) {
  const res = await getAllBuilds();
  if (!res) {
    return null;
  }

  setBuilds(res);
  return res;
}

export async function getBuildBySlug(
  slug: string,
  setBuild?: any
): Promise<SingleProject | null> {
  // Check cache first
  const cached = buildCache.get(slug);
  if (cached && Date.now() - cached.timestamp < BUILD_CACHE_DURATION) {
    if (setBuild) setBuild(cached.build);
    return cached.build;
  }

  const res = await GetBuildBySlug(slug);
  if (res) {
    // Update cache
    buildCache.set(slug, { build: res, timestamp: Date.now() });
    if (setBuild) setBuild(res);
  }
  return res;
}

// Clear build cache (useful for development or when data changes)
export const clearBuildCache = (slug?: string) => {
  if (slug) {
    buildCache.delete(slug);
  } else {
    buildCache.clear();
  }
};

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

export const getCurrentStepIndex = (build: SingleProject, stepSlug: string) => {
  let flatIndex = -1;

  for (let section of build.steps) {
    for (let step of section.stepItems) {
      flatIndex++;

      if (step.slug === stepSlug) {
        return flatIndex;
      }
    }
  }

  return -1;
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
