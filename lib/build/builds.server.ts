"use server";
import db from "@/lib/db";
import { SingleProject } from "@/types/project.types";
import { UserMessage } from "@/types/user.types";

export const getAllBuilds = async () => {
  try {
    const allBuilds = await db.singleProject.findMany({
      include: {
        steps: {
          include: {
            stepItems: true,
          },
        },
      },
    });

    const builds: SingleProject[] = allBuilds.map((build) => ({
      id: build.id,
      name: build.name,
      oneLiner: build.oneLiner,
      discordRole: build.discordRole,
      twitterMessage: build.twitterMessage,
      isFeatured: build.isFeatured,
      normalImg: build.normalImg,
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
    }));

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
      include: {
        steps: {
          include: {
            stepItems: true,
          },
        },
      },
    });

    if (!build) return null;

    const formattedBuild = {
      id: build.id,
      name: build.name,
      oneLiner: build.oneLiner,
      discordRole: build.discordRole,
      twitterMessage: build.twitterMessage,
      isFeatured: build.isFeatured,
      normalImg: build.normalImg,
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
    console.log("Error fetching build by slug:", error);
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
      const res = await db.projectUser.update({
        where: {
          id: existingProject.id,
        },
        data: {
          isDiscordConnected:
            isDiscordConnected || existingProject.isDiscordConnected,
          isTwitterShared: isTwitterShared || existingProject.isTwitterShared,
          current:
            current == "Increase"
              ? existingProject.current + 1
              : existingProject.current,
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
