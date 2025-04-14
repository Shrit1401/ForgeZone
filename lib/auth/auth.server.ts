"use server";
import { User } from "@supabase/supabase-js";
import db from "../db";
import { getRandomProfilePicture } from "../utils";
import { InternshipOrJob, UserType } from "@/types/user.types";

export async function createUser(user: User) {
  try {
    if (!user.email) {
      console.log("User is null");
      return null;
    }
    const pfp = getRandomProfilePicture();
    const res = await db.user.create({
      data: {
        id: user.id,
        email: user.email,
        username: user.email.split("@")[0],
        pfp: pfp,
        internshipOrJob: "internship",
        projectsNum: 0,

        projects: {
          create: [],
        },
      },
    });
    return res as unknown as UserType;
  } catch (error) {
    console.log("Error creating user:", error);
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const userData = await db.user.findUnique({
      where: {
        id: id,
      },
    });

    const socialsData = await db.social.findUnique({
      where: {
        userId: id,
      },
    });

    const user: UserType = {
      id: userData?.id || "",
      name: userData?.name || "",
      email: userData?.email || "",
      username: userData?.username || "",
      pfp: userData?.pfp || "",
      oneLiner: userData?.oneLiner || "",
      location: userData?.location || "",
      whatworkingrn: userData?.whatworkingrn || "",
      internshipOrJob:
        userData?.internshipOrJob == "internship"
          ? InternshipOrJob.internship
          : InternshipOrJob.job,
      projectsNumber: userData?.projectsNum || 0,
      socials: {
        github: socialsData?.github || "",
        linkedIn: socialsData?.linkedIn || "",
        twitter: socialsData?.twitter || "",
      },
      // add projects here
      projects: [],
    };
    return user;
  } catch (error) {
    console.log("Error fetching user:", error);
    return null;
  }
}

export async function updatePfp(id: string, pfp: string) {
  try {
    const res = await db.user.update({
      where: {
        id: id,
      },
      data: {
        pfp: pfp,
      },
    });

    return res as unknown as UserType;
  } catch (error) {
    console.log("Error updating user:", error);
    return null;
  }
}

export async function updateUser(user: UserType) {
  try {
    const existingSocials = await db.social.findUnique({
      where: {
        userId: user.id,
      },
    });

    const res = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        pfp: user.pfp,
        oneLiner: user.oneLiner,
        location: user.location,
        internshipOrJob: user.internshipOrJob ? "internship" : "job",
        projectsNum: user.projectsNumber,
        socials: existingSocials
          ? {
              update: {
                github: user.socials?.github || "",
                linkedIn: user.socials?.linkedIn || "",
                twitter: user.socials?.twitter || "",
              },
            }
          : {
              create: {
                github: user.socials?.github || "",
                linkedIn: user.socials?.linkedIn || "",
                twitter: user.socials?.twitter || "",
              },
            },
      },
    });
    return res as unknown as UserType;
  } catch (error) {
    console.log("Error updating user:", error);
    return null;
  }
}
