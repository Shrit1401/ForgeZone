import { UserType } from "@/types/user.types";
import { createUser, getUserById, updateUser } from "./auth.server";
import { supabaseClient } from "@/supabase/client";
import { SingleProject } from "@/types/project.types";
import { updateUserProject } from "../build/builds.server";
import { useEffect, useState, useCallback } from "react";

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
  }

  if (error || userError) {
    console.log("Error signing in with Google:", error || userError);
    return null;
  }

  return data;
}

// Cache for user data to avoid unnecessary database calls
const userCache = new Map<string, { user: UserType; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Better user fetching function that returns data instead of managing state
export const fetchUserData = async (
  userId: string
): Promise<UserType | null> => {
  // Check cache first
  const cached = userCache.get(userId);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.user;
  }

  try {
    const userData = await getUserById(userId);
    if (userData) {
      // Update cache
      userCache.set(userId, { user: userData, timestamp: Date.now() });
    }
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

// Clear cache for a specific user (useful after updates)
export const clearUserCache = (userId: string) => {
  userCache.delete(userId);
};

// Custom hook for user authentication with real-time updates
export const useAuth = () => {
  const [user, setUser] = useState<UserType | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUser = useCallback(async (authUser: any) => {
    if (!authUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const userData = await fetchUserData(authUser.id);
      setUser(userData);
    } catch (err) {
      console.error("Error refreshing user:", err);
      setError("Failed to load user data");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    // Get initial user
    const getInitialUser = async () => {
      try {
        const { data, error } = await supabaseClient.auth.getUser();

        if (!mounted) return;

        if (error) {
          console.error("Auth error:", error);
          setError(error.message);
          setUser(null);
          setLoading(false);
          return;
        }

        const authUser = data?.user;
        if (!authUser) {
          setUser(null);
          setLoading(false);
          return;
        }

        // Check if user exists in our database
        const existingUser = await getUserById(authUser.id);
        if (existingUser) {
          setUser(existingUser);
        } else {
          // Create new user if they don't exist
          const newUser = await createUser(authUser);
          setUser(newUser ?? null);
        }
      } catch (err) {
        if (mounted) {
          console.error("Unexpected error in getInitialUser:", err);
          setError("Failed to initialize user");
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialUser();

    // Set up real-time auth state listener
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      console.log("Auth state changed:", event, session?.user?.id);

      if (event === "SIGNED_IN" && session?.user) {
        setLoading(true);
        await refreshUser(session.user);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setLoading(false);
        setError(null);
        // Clear cache on sign out
        userCache.clear();
      } else if (event === "TOKEN_REFRESHED" && session?.user) {
        // Refresh user data when token is refreshed
        await refreshUser(session.user);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [refreshUser]);

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabaseClient.auth.signOut();
      if (error) {
        setError(error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.error("Error signing out:", err);
      setError("Failed to sign out");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateUserData = useCallback(
    async (updates: Partial<UserType>) => {
      if (!user) return null;

      try {
        const updatedUser = await updateUser({ ...user, ...updates });
        if (updatedUser) {
          setUser(updatedUser);
          // Update cache
          userCache.set(user.id, { user: updatedUser, timestamp: Date.now() });
          return updatedUser;
        }
        return null;
      } catch (err) {
        console.error("Error updating user:", err);
        setError("Failed to update user");
        return null;
      }
    },
    [user]
  );

  return {
    user,
    loading,
    error,
    signOut,
    refreshUser: () => user && refreshUser({ id: user.id }),
    updateUserData,
  };
};

// Legacy function for backward compatibility
export const getLoggedInUser = async (
  setUser?: React.Dispatch<React.SetStateAction<UserType | null | undefined>>,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
): Promise<UserType | null> => {
  if (setLoading) setLoading(true);

  try {
    const { data, error } = await supabaseClient.auth.getUser();
    if (error) {
      console.log("Error fetching user:", error.message);
      if (setUser) setUser(null);
      return null;
    }

    const authUser = data?.user;
    if (!authUser) {
      if (setUser) setUser(null);
      return null;
    }

    const existingUser = await getUserById(authUser.id);
    if (existingUser) {
      if (setUser) setUser(existingUser);
      return existingUser;
    } else {
      const newUser = await createUser(authUser);
      if (setUser) setUser(newUser ?? null);
      return newUser;
    }
  } catch (err) {
    console.log("Unexpected error in getLoggedInUser:", err);
    if (setUser) setUser(null);
    return null;
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
