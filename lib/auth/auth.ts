import { createClient } from "@/supabase/client";
import { UserType } from "@/types/user.types";
import { createUser, getUserById } from "./auth.server";
import { User } from "@supabase/supabase-js";

const url = process.env.NEXT_URL || "http://localhost:3000";

const supabase = createClient();

export async function signInWithEmail(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${url}/auth-awesome`,
    },
  });

  if (error) {
    console.error("Error signing in:", error);
    return null;
  }

  return data;
}

export const getLoggedInUser = async (
  setUser: React.Dispatch<React.SetStateAction<UserType | null | undefined>>,
  setLoaing?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (setLoaing) {
    setLoaing(true);
  }
  const {
    data: { user: authUser },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.error("Error fetching user:", error);
    setUser(null);
    return;
  }
  if (authUser) {
    const res = await getUserById(authUser.id);
    if (res) {
      setUser(res);
    }
    if (!res) {
      const newUser = await createUser(authUser);
      if (newUser) {
        setUser(newUser);
      } else {
        setUser(null);
      }
    }
  } else {
    setUser(null);
  }
  if (setLoaing) {
    setLoaing(false);
  }
};
