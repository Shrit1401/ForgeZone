import { NextResponse } from "next/server";

const url = process.env.NEXT_PUBLIC_NEXT_URL || "http://localhost:3000";

export async function GET() {
  const redirectUri = `${url}/api/auth/discord/callback`;
  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${
    process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID
  }&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=identify`;

  // Log the constructed URL to verify
  console.log("Discord Auth URL:", discordAuthUrl);

  return NextResponse.redirect(discordAuthUrl);
}
