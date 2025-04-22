import React, { useMemo, useState } from "react";
import { TrophyIcon } from "@heroicons/react/16/solid";
import Btn from "@/components/Btn";
import { getProgressMessage } from "@/lib/utils";
import { updateUserBuild } from "@/lib/auth/auth";
import { SingleProject } from "@/types/project.types";
import { toast } from "sonner";
import { getNextBuildPageSlug } from "@/lib/build/build";
import { initialCurrentBuild } from "@/lib/build/builds.server";

interface BottombarProps {
  percentage: number;
  userId: string;
  current: number;
  build: SingleProject;
  isDiscordConnected: boolean;
  isTwitterConnected: boolean;
}

const Bottombar: React.FC<BottombarProps> = ({
  percentage,
  userId,
  current,
  build,
  isDiscordConnected,
  isTwitterConnected,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const slug = getNextBuildPageSlug(build, current);

      // Use a flag to track if the component is still mounted
      let isMounted = true;

      const increaseDB = await initialCurrentBuild(userId, build);

      // Check if component is still mounted before proceeding
      if (isMounted && increaseDB) {
        // Using router.push or window.location.replace is safer than window.location.href
        window.location.replace(`/p/${build.projectSlug}/${slug}`);
      } else if (isMounted) {
        toast.error("Error updating build");
      }

      // Cleanup function to handle component unmounting during async operation
      return () => {
        isMounted = false;
      };
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const strokeDasharray = useMemo(() => 2 * Math.PI * 17, []);
  const strokeDashoffset = useMemo(
    () => strokeDasharray * (1 - percentage / 100),
    [strokeDasharray, percentage]
  );

  return (
    <section className="fixed bottom-0 left-0 right-0 w-full h-[80px] border-t border-dashed border-white/20 flex items-center justify-between bg-[#080707] px-4">
      <div className="flex items-center gap-3 ml-2">
        <div className="relative w-[40px] h-[40px]">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="20"
              cy="20"
              r="17"
              strokeWidth="3"
              fill="transparent"
              className="stroke-zinc-500"
            />
            <circle
              cx="20"
              cy="20"
              r="17"
              strokeWidth="3"
              fill="transparent"
              className="stroke-white"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              style={{
                transition: "stroke-dashoffset 0.5s ease",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <TrophyIcon className="w-6 h-6 text-[#fdc422]" aria-hidden="true" />
          </div>
        </div>

        <div>
          <h3 className="manrope text-white">{percentage}% Completed</h3>
          <p className="text-white/30">{getProgressMessage(percentage)}</p>
        </div>
      </div>

      <div className="mr-2">
        <Btn
          title={isLoading ? "Loading..." : "Let's Go"}
          className={`bg-white ${
            isDiscordConnected &&
            isTwitterConnected &&
            !isLoading &&
            "animate-pulse hover:animate-none"
          } rounded-full text-black font-[700] px-6 py-2 hover:opacity-80 transition-all duration-200`}
          onClick={handleClick}
          disabled={isLoading}
        />
      </div>
    </section>
  );
};

export default Bottombar;
