export type SingleProject = {
  id?: string;
  name: string;
  oneLiner: string;
  discordRole: string;
  twitterMessage: string;
  isFeatured: boolean;
  normalImg: string;
  activeImg: string;
  projectSlug: string;
  projectType: ProjectType;
  demoUrl?: string;
  stepsLength: number;
  steps: Step[];
};

export enum ProjectType {
  none,
  weekend,
  advance,
}

export type StepItem = {
  id?: string;
  text: string;
  slug: string;
  source: string; // This maps to sourceUrl in the database schema
  requirementMessage: string;
};

export type Step = {
  id?: string;
  name: string;
  stepItems: StepItem[];
};
