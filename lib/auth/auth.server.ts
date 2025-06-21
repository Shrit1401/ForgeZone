"use server";
import { User } from "@supabase/supabase-js";
import db from "../db";
import { getRandomProfilePicture } from "../utils";
import { InternshipOrJob, UserType } from "@/types/user.types";
import { SingleProject } from "@/types/project.types";
import { sendWelcomeEmail, createContact } from "../email/email.service";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Server-side Supabase client
export const createServerSupabaseClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Handle cookie setting error
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // Handle cookie removal error
          }
        },
      },
    }
  );
};

// Server-side function to get authenticated user
export const getServerUser = async (): Promise<UserType | null> => {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    const userData = await getUserById(user.id);
    return userData;
  } catch (error) {
    console.error("Error getting server user:", error);
    return null;
  }
};

export async function createUser(user: User) {
  try {
    if (!user.email) {
      return null;
    }

    // Check if user already exists before creating
    const existingUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (existingUser) {
      return existingUser as unknown as UserType;
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
      },
    });

    // Send welcome email and create contact for new users
    if (res && user.email) {
      console.log("Attempting to send welcome email to:", user.email);
      try {
        await sendWelcomeEmail({
          userEmail: user.email,
          userFirstName: res.name || user.user_metadata?.full_name || undefined,
        });

        // Create contact in Resend
        await createContact({
          email: user.email,
          firstName: res.name || user.user_metadata?.full_name || undefined,
          lastName: undefined,
          unsubscribed: false,
          audienceId: "b93f0fd4-a924-4693-8eac-359010084c5c",
        });
        console.log(
          "Welcome email and contact creation completed successfully"
        );
      } catch (emailError) {
        console.error(
          "Failed to send welcome email or create contact:",
          emailError
        );
        // Don't fail the user creation if email/contact creation fails
      }
    }

    return res as unknown as UserType;
  } catch (error) {
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    // Use more specific select to only fetch what's needed
    const userData = await db.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        pfp: true,
        oneLiner: true,
        location: true,
        whatworkingrn: true,
        internshipOrJob: true,
        projectsNum: true,
        socials: {
          select: {
            github: true,
            linkedIn: true,
            twitter: true,
          },
        },
        projects: {
          select: {
            id: true,
            projectname: true,
            isDiscordConnected: true,
            isTwitterShared: true,
            total: true,
            current: true,
            userId: true,
            messages: {
              select: {
                id: true,
                message: true,
                target: true,
              },
            },
          },
        },
      },
    });

    if (!userData) {
      return null;
    }

    const user: UserType = {
      id: userData.id || "",
      name: userData.name || "",
      email: userData.email || "",
      username: userData.username || "",
      pfp: userData.pfp || "",
      oneLiner: userData.oneLiner || "",
      location: userData.location || "",
      whatworkingrn: userData.whatworkingrn || "",
      internshipOrJob:
        userData.internshipOrJob === "internship"
          ? InternshipOrJob.internship
          : InternshipOrJob.job,
      projectsNumber: userData.projectsNum || 0,
      socials: {
        github: userData.socials?.github || "",
        linkedIn: userData.socials?.linkedIn || "",
        twitter: userData.socials?.twitter || "",
      },
      projects: userData.projects.map((projectUser) => ({
        id: projectUser.id,
        projectname: projectUser.projectname,
        isDiscordConnected: projectUser.isDiscordConnected,
        isTwitterShared: projectUser.isTwitterShared,
        total: projectUser.total,
        current: projectUser.current,
        userId: projectUser.userId,
        messages: projectUser.messages.map((message) => ({
          id: message.id,
          message: message.message,
          target: message.target,
        })),
      })),
    };

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
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
    return null;
  }
}

export async function updateUser(user: UserType) {
  try {
    // Update user and handle socials in a single operation
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
        socials: {
          upsert: {
            create: {
              github: user.socials?.github || "",
              linkedIn: user.socials?.linkedIn || "",
              twitter: user.socials?.twitter || "",
            },
            update: {
              github: user.socials?.github || "",
              linkedIn: user.socials?.linkedIn || "",
              twitter: user.socials?.twitter || "",
            },
          },
        },
      },
      include: {
        socials: true,
      },
    });

    return res as unknown as UserType;
  } catch (error) {
    return null;
  }
}
