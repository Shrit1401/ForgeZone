"use server";
import db from "@/lib/db";
import { ProjectType, SingleProject } from "@/types/project.types";
import { UserMessage } from "@/types/user.types";

const mapProjectType = (type: string): ProjectType => {
  if (type in ProjectType) {
    return ProjectType[type as keyof typeof ProjectType];
  }
  return ProjectType.none;
};

export const getAllBuilds = async () => {
  try {
    const allBuilds = await db.singleProject.findMany({
      select: {
        id: true,
        name: true,
        oneLiner: true,
        discordRole: true,
        twitterMessage: true,
        isFeatured: true,
        normalImg: true,
        activeImg: true,
        projectSlug: true,
        stepsLength: true,
        projectType: true,
        steps: {
          select: {
            id: true,
            name: true,
            projectId: true,
            stepItems: {
              select: {
                id: true,
                text: true,
                slug: true,
                sourceUrl: true,
                requirementMessage: true,
                stepId: true,
              },
            },
          },
        },
      },
    });

    const builds: SingleProject[] = allBuilds.map((build) => {
      return {
        id: build.id,
        name: build.name,
        oneLiner: build.oneLiner,
        discordRole: build.discordRole,
        twitterMessage: build.twitterMessage,
        isFeatured: build.isFeatured,
        normalImg: build.normalImg,
        projectType: mapProjectType(build.projectType), // 👈 clean mapping
        activeImg: build.activeImg,
        projectSlug: build.projectSlug,
        stepsLength: build.stepsLength,
        steps: build.steps.map((step) => ({
          ...step,
          stepItems: step.stepItems.map((item) => ({
            ...item,
            source: item.sourceUrl,
          })),
        })),
      };
    });

    return builds;
  } catch (error) {
    console.log("Error fetching builds:", error);
    return null;
  }
};

export const GetBuildBySlug = async (slug: string) => {
  try {
    const build = await db.singleProject.findFirst({
      where: {
        projectSlug: slug,
      },
      select: {
        id: true,
        name: true,
        oneLiner: true,
        discordRole: true,
        twitterMessage: true,
        isFeatured: true,
        normalImg: true,
        activeImg: true,
        projectSlug: true,
        stepsLength: true,
        projectType: true,
        steps: {
          select: {
            id: true,
            name: true,
            projectId: true,
            stepItems: {
              select: {
                id: true,
                text: true,
                slug: true,
                sourceUrl: true,
                requirementMessage: true,
                stepId: true,
              },
            },
          },
        },
      },
    });

    if (!build) return null;

    // Convert the projectType enum from database to TypeScript enum
    let projectType = ProjectType.none;
    if (build.projectType === "weekend") {
      projectType = ProjectType.weekend;
    } else if (build.projectType === "advance") {
      projectType = ProjectType.advance;
    }

    const formattedBuild = {
      id: build.id,
      name: build.name,
      oneLiner: build.oneLiner,
      discordRole: build.discordRole,
      twitterMessage: build.twitterMessage,
      isFeatured: build.isFeatured,
      normalImg: build.normalImg,
      projectType: projectType,
      activeImg: build.activeImg,
      projectSlug: build.projectSlug,
      stepsLength: build.stepsLength,
      steps: build.steps.map((step) => ({
        ...step,
        stepItems: step.stepItems.map((item) => ({
          ...item,
          source: item.sourceUrl,
        })),
      })),
    };

    return formattedBuild;
  } catch (error) {
    console.error("Error fetching build by slug:", error);
    return null;
  }
};

export async function updateUserProject(
  userId: string,
  build: SingleProject,
  isDiscordConnected?: boolean,
  isTwitterShared?: boolean,
  current?: "Increase"
) {
  try {
    const existingProject = await db.projectUser.findFirst({
      where: {
        userId: userId,
        projectname: build.name,
      },
    });

    if (existingProject) {
      // Calculate new current value
      const newCurrent =
        current === "Increase"
          ? existingProject.current + 1
          : existingProject.current;

      const res = await db.projectUser.update({
        where: {
          id: existingProject.id,
        },
        data: {
          isDiscordConnected:
            isDiscordConnected || existingProject.isDiscordConnected,
          isTwitterShared: isTwitterShared || existingProject.isTwitterShared,
          current: newCurrent,
        },
      });
      return res;
    } else {
      const res = await db.projectUser.create({
        data: {
          userId: userId,
          projectname: build.name,
          isDiscordConnected: isDiscordConnected || false,
          isTwitterShared: isTwitterShared || false,
          current: 0,
          total: build.stepsLength,
        },
      });

      return res;
    }
  } catch (error) {
    console.log("Error updating user:", error);
    return null;
  }
}

export const createProjectMessage = async (
  userId: string,
  message: string,
  target: string
) => {
  try {
    const res = await db.message.create({
      data: {
        message: message,
        target: target,
        projectUserId: userId,
      },
    });

    const msg: UserMessage = {
      id: res.id,
      message: res.message,
      target: res.target,
    };
    return msg;
  } catch (error) {
    console.log("Error creating project message:", error);
    return null;
  }
};

export const initialCurrentBuild = async (
  userId: string,
  build: SingleProject
) => {
  try {
    // Find the project user first
    const projectUser = await db.projectUser.findFirst({
      where: {
        userId: userId,
        projectname: build.name,
      },
    });

    if (!projectUser) {
      // Create a new record if not exists
      const res = await db.projectUser.create({
        data: {
          userId: userId,
          projectname: build.name,
          current: 1,
          total: build.stepsLength,
        },
      });
      return res;
    } else {
      // Update the existing record
      const res = await db.projectUser.update({
        where: {
          id: projectUser.id,
        },
        data: {
          current: 1,
          total: build.stepsLength,
        },
      });
      return res;
    }
  } catch (error) {
    console.log("Error initializing current user build:", error);
    return null;
  }
};
