"use server";
import db from "@/lib/db";
import { SingleProject } from "@/types/project.types";

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
