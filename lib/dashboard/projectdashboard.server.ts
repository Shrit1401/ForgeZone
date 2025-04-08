"use server";
import db from "../db";
import { SingleProject, Step } from "@/types/project";

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
    console.error("Error creating project:", error);
    throw new Error("Failed to create project");
  }
};
