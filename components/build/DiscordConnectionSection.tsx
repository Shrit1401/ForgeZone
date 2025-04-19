import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/16/solid";
import React from "react";
import Btn from "../Btn";
import { FaDiscord } from "react-icons/fa";
import { SingleProject } from "@/types/project.types";
import { UserType } from "@/types/user.types";
import { updateUserBuild } from "@/lib/auth/auth";

const clientID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
const nextURL = process.env.NEXT_PUBLIC_NEXT;

type DiscordConnectionSectionProps = {
  isDiscordConnected: boolean;
  build: SingleProject;
  user: UserType;
  setIsDiscordConnected: (connected: boolean) => void;
};

const DiscordConnectionSection = ({
  isDiscordConnected,
  build,
  user,
  setIsDiscordConnected,
}: DiscordConnectionSectionProps) => {
  const [loading, setLoading] = React.useState(false);

  const handleDiscordConnect = async () => {
    setLoading(true);
    const redirectUri = encodeURIComponent(
      `${nextURL}/api/auth/discord/callback`
    );
    const discordDB = await updateUserBuild(user.id, build, setLoading, true);

    if (discordDB) {
      setIsDiscordConnected(true);
    }

    const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&response_type=code&scope=identify email&state=${JSON.stringify(
      {
        role: build.discordRole,
        project: build.projectSlug,
      }
    )}`;

    window.location.href = discordAuthUrl;
  };

  return (
    <div className="mt-4 mx-8 border border-dashed border-white/20 p-6 rounded-lg">
      <div className={isDiscordConnected ? "" : "mb-4"}>
        <h3 className="flex gap-1 items-center text-xl manrope font-[700]">
          {isDiscordConnected ? (
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
          ) : (
            <XCircleIcon className="w-6 h-6 text-[rgba(255,255,255,.8)]" />
          )}
          {isDiscordConnected ? "Discord Connected" : "Connect Your Discord"}
        </h3>
        <p className="text-white/50 manrope font-[500] text-sm mt-2">
          {isDiscordConnected
            ? "Your Discord account is successfully linked. You now have access to secret channels for this cohort."
            : "You'll need to link your Discord account to access secret channels for this cohort and get support when stuck."}
        </p>
      </div>
      <div className={isDiscordConnected ? "" : "mt-4"}>
        {!isDiscordConnected && (
          <Btn
            title={loading ? "Connecting..." : "Connect Discord"}
            className="w-fit"
            onClick={handleDiscordConnect}
            sideIcon={<FaDiscord />}
          />
        )}
      </div>
    </div>
  );
};

export default DiscordConnectionSection;
