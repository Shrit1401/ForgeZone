"use server";
import { User } from "@supabase/supabase-js";
import db from "../db";
import { getRandomProfilePicture } from "../utils";
import { UserType } from "@/types/user.types";

export async function createUser(user: User) {
  try {
    if (!user.email) {
      console.error("User is null");
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
    console.error("Error creating user:", error);
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    });
    return user as unknown as UserType;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
