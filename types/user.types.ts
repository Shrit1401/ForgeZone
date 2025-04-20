export type UserType = {
  id: string;
  name: string | undefined;
  email: string;
  username: string | undefined;
  pfp: string;
  oneLiner: string | undefined;
  location: string | undefined;
  whatworkingrn: string | undefined;
  internshipOrJob: InternshipOrJob;
  projectsNumber: number;
  socials: Socials | undefined;
  projects: ProjectUser[];
};

export enum InternshipOrJob {
  internship,
  job,
}

type Socials = {
  twitter: string | undefined;
  github: string | undefined;
  linkedIn: string | undefined;
};

export type ProjectUser = {
  id: string;
  projectname: string;
  isDiscordConnected: boolean;
  isTwitterShared: boolean;
  current: number;
  total: number;
  userId: string;
  messages: UserMessage[];
};

export type UserMessage = {
  id: string;
  message: string;
  target: string;
};
