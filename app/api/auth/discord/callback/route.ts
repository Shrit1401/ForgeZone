import { NextResponse } from "next/server";

const url = process.env.NEXT_PUBLIC_NEXT_URL || "http://localhost:3000";

// Function to exchange the OAuth2 code for an access token
async function getAccessToken(code: string) {
  const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: `${url}/api/auth/discord/callback`,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenData.access_token) {
    throw new Error("Failed to fetch access token");
  }

  return tokenData.access_token;
}

// Function to fetch the user's data from Discord
async function getUserData(accessToken: string) {
  const userResponse = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userData = await userResponse.json();

  if (!userData.id) {
    throw new Error("Failed to fetch user data");
  }

  return userData;
}

// Function to assign roles to the user in a specific guild
async function assignRoles(userId: string, roles: string[]) {
  const assignRoleResponse = await fetch(
    `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${userId}/roles/${roles[0]}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!assignRoleResponse.ok) {
    throw new Error(`Failed to assign role ${roles[0]}`);
  }

  return { success: true };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code) {
      return NextResponse.redirect("/?error=No code provided");
    }

    if (!state) {
      return NextResponse.redirect("/?error=No state provided");
    }

    // Decode the state to extract the role and project
    const { role, project } = JSON.parse(decodeURIComponent(state));

    if (!role || !project) {
      return NextResponse.redirect(
        `/?error=${!role ? "No role" : "No project"} provided in state`
      );
    }

    // Step 1: Exchange the code for an access token
    const accessToken = await getAccessToken(code);

    // Step 2: Fetch user data from Discord
    const userData = await getUserData(accessToken);

    // Step 3: Assign the role to the user
    await assignRoles(userData.id, [role]);

    // Set a success message in a cookie and redirect to the project page
    const response = NextResponse.redirect(`${url}/p/${project}`);
    response.cookies.set("auth_message", "Role assigned successfully", {
      path: "/",
      httpOnly: false,
    });
    return response;
  } catch (error) {
    // Handle and log errors, then redirect with an error message
    console.error("OAuth2 Error:", error);
    const response = NextResponse.redirect(url);
    response.cookies.set("auth_message", (error as Error).message, {
      path: "/",
      httpOnly: false,
    });
    return response;
  }
}
