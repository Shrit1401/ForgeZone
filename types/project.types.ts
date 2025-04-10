export type SingleProject = {
  name: string;
  oneLiner: string;
  discordRole: string;
  twitterMessage: string;
  isFeatured: boolean;
  normalImg: string;
  activeImg: string;
  projectSlug: string;

  stepsLength: number;
  steps: Step[];
};

export type StepItem = {
  text: string;
  slug: string;
  source: string; // This maps to sourceUrl in the database schema
  requirementMessage: string;
};

export type Step = {
  name: string;
  stepItems: StepItem[];
};
