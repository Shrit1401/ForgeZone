import { UserType } from "@/types/user.types";
import { createUser, getUserById } from "./auth.server";
import { supabaseClient } from "@/supabase/client";
import { SingleProject } from "@/types/project.types";
import { updateUserProject } from "../build/builds.server";
import { sendWelcomeEmail, createContact } from "../email/email.service";

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.log("Error signing in:", error);
    return null;
  }

  return data;
}

export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
  });

  if (data.user) {
    const newUser = await createUser(data.user);

    // Send welcome email and create contact
    if (newUser) {
      try {
        await sendWelcomeEmail({
          userEmail: email,
          userFirstName: newUser.name || undefined,
        });

        // Create contact in Resend
        await createContact({
          email: email,
          firstName: newUser.name || undefined,
          lastName: undefined,
          unsubscribed: false,
          audienceId: "b93f0fd4-a924-4693-8eac-359010084c5c",
        });
      } catch (emailError) {
        console.error(
          "Failed to send welcome email or create contact:",
          emailError
        );
        // Don't fail the signup if email/contact creation fails
      }
    }
  }
  if (error) {
    console.log("Error signing in:", error);
    return null;
  }

  return data;
}

export async function signUpWithGoogle() {
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
  });

  const { data: userData, error: userError } =
    await supabaseClient.auth.getUser();
  if (userData.user) {
    const newUser = await createUser(userData.user);

    // Send welcome email and create contact for Google signup
    if (newUser && userData.user.email) {
      try {
        await sendWelcomeEmail({
          userEmail: userData.user.email,
          userFirstName:
            newUser.name || userData.user.user_metadata?.full_name || undefined,
        });

        // Create contact in Resend
        await createContact({
          email: userData.user.email,
          firstName:
            newUser.name || userData.user.user_metadata?.full_name || undefined,
          lastName: undefined,
          unsubscribed: false,
          audienceId: "b93f0fd4-a924-4693-8eac-359010084c5c",
        });
      } catch (emailError) {
        console.error(
          "Failed to send welcome email or create contact:",
          emailError
        );
        // Don't fail the signup if email/contact creation fails
      }
    }
  }

  if (error || userError) {
    console.log("Error signing in with Google:", error || userError);
    return null;
  }

  return data;
}

export const getLoggedInUser = async (
  setUser: React.Dispatch<React.SetStateAction<UserType | null | undefined>>,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (setLoading) setLoading(true);

  try {
    const { data, error } = await supabaseClient.auth.getUser();
    if (error) {
      console.log("Error fetching user:", error.message);
      setUser(null);
      return;
    }

    const authUser = data?.user;
    if (!authUser) {
      setUser(null);
      return;
    }

    const existingUser = await getUserById(authUser.id);
    if (existingUser) {
      setUser(existingUser);
    } else {
      const newUser = await createUser(authUser);

      // Send welcome email and create contact for new users (especially from Google OAuth)
      if (newUser && authUser.email) {
        try {
          await sendWelcomeEmail({
            userEmail: authUser.email,
            userFirstName:
              newUser.name || authUser.user_metadata?.full_name || undefined,
          });

          // Create contact in Resend
          await createContact({
            email: authUser.email,
            firstName:
              newUser.name || authUser.user_metadata?.full_name || undefined,
            lastName: undefined,
            unsubscribed: false,
            audienceId: "b93f0fd4-a924-4693-8eac-359010084c5c",
          });
        } catch (emailError) {
          console.error(
            "Failed to send welcome email or create contact:",
            emailError
          );
          // Don't fail the login if email/contact creation fails
        }
      }

      setUser(newUser ?? null);
    }
  } catch (err) {
    console.log("Unexpected error in getLoggedInUser:", err);
    setUser(null);
  } finally {
    if (setLoading) setLoading(false);
  }
};

export const userSignOut = async () => {
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    console.log("Error signing out:", error);
    return null;
  }
  return true;
};

export const getUserCompletetion = async (
  user: UserType | null | undefined,
  setPercentage: React.Dispatch<React.SetStateAction<number>>
) => {
  if (!user) {
    console.log("User is null or undefined");
    return 0;
  }
  const requiredFields: (keyof UserType)[] = [
    "name",
    "username",
    "pfp",
    "oneLiner",
    "location",
    "whatworkingrn",
    "internshipOrJob",
    "socials",
  ];
  const completedFields = requiredFields.filter((field) => {
    const value = user[field];
    if (value === undefined || value === null) {
      return false;
    }
    if (typeof value === "string" && value.trim() === "") {
      return false;
    }
    return true;
  });

  const completionPercentage = Math.round(
    (completedFields.length / requiredFields.length) * 100
  );

  setPercentage(completionPercentage);
  return completionPercentage;
};

export const getLoggedInUserWithProject = async (
  setUser: React.Dispatch<React.SetStateAction<UserType | null | undefined>>,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  projectId?: string
) => {
  setLoading && setLoading(true);
  // TODO: write this function
};

export const updateUserBuild = async (
  userId: string,
  build: SingleProject,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  DiscordConnection?: boolean,
  TwitterConnection?: boolean,
  current?: "Increase"
) => {
  if (setLoading) setLoading(true);

  try {
    const res = await updateUserProject(
      userId,
      build,
      DiscordConnection,
      TwitterConnection,
      current
    );
    if (res) {
      return res;
    } else {
      console.log("Error updating user build");
      return null;
    }
  } catch (error) {
    console.log("Error updating user build:", error);
    return null;
  }
};
