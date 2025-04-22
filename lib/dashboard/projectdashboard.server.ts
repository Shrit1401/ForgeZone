"use server";
import db from "../db";
import { SingleProject, Step } from "@/types/project.types";

export const createProject = async (project: SingleProject, steps: Step[]) => {
  try {
    const res = db.singleProject.create({
      data: {
        name: project.name,
        oneLiner: project.oneLiner,
        discordRole: project.discordRole,
        twitterMessage: project.twitterMessage,
        isFeatured: project.isFeatured,
        normalImg: project.normalImg,
        activeImg: project.activeImg,
        projectSlug: project.projectSlug,

        stepsLength: project.stepsLength,

        steps: {
          create: steps.map((step) => ({
            name: step.name,
            stepItems: {
              create: step.stepItems.map((item) => ({
                text: item.text,
                slug: item.slug,
                sourceUrl: item.source,
                requirementMessage: item.requirementMessage,
              })),
            },
          })),
        },
      },
    });
    return res;
  } catch (error) {
    console.log("Error creating project:", error);
    throw new Error("Failed to create project");
  }
};

export const getBuildById = async (id: string) => {
  try {
    const build = await db.singleProject.findUnique({
      where: {
        id: id,
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
    console.log("Error fetching build by ID:", error);
    return null;
  }
};

export const updateProject = async (
  projectSlug: string,
  project: SingleProject,
  steps: Step[]
) => {
  try {
    // First, get the existing project to handle steps appropriately
    const existingProject = await db.singleProject.findUnique({
      where: { projectSlug: projectSlug },
      include: {
        steps: {
          include: { stepItems: true },
        },
      },
    });

    if (!existingProject) {
      throw new Error("Project not found");
    }

    // Update basic project info
    const updatedProject = await db.singleProject.update({
      where: { projectSlug: projectSlug },
      data: {
        name: project.name,
        oneLiner: project.oneLiner,
        discordRole: project.discordRole,
        twitterMessage: project.twitterMessage,
        isFeatured: project.isFeatured,
        normalImg: project.normalImg,
        activeImg: project.activeImg,
        projectSlug: project.projectSlug,
        stepsLength: project.stepsLength,
      },
    });

    // For each step in the updated project, update or create it
    for (const step of steps) {
      if (step.id) {
        // Update existing step
        await db.step.update({
          where: { id: step.id },
          data: { name: step.name },
        });

        // Handle step items for this step
        for (const item of step.stepItems) {
          if (item.id) {
            // Update existing step item
            await db.stepItem.update({
              where: { id: item.id },
              data: {
                text: item.text,
                slug: item.slug,
                sourceUrl: item.source,
                requirementMessage: item.requirementMessage,
              },
            });
          } else {
            // Create new step item
            await db.stepItem.create({
              data: {
                text: item.text,
                slug: item.slug,
                sourceUrl: item.source,
                requirementMessage: item.requirementMessage,
                stepId: step.id,
              },
            });
          }
        }
      } else {
        // Create new step with its items
        await db.step.create({
          data: {
            name: step.name,
            projectId: existingProject.id,
            stepItems: {
              create: step.stepItems.map((item) => ({
                text: item.text,
                slug: item.slug,
                sourceUrl: item.source,
                requirementMessage: item.requirementMessage,
              })),
            },
          },
        });
      }
    }

    return updatedProject;
  } catch (error) {
    console.log("Error updating project:", error);
    throw new Error("Failed to update project");
  }
};
