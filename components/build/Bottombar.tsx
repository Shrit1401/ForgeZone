import React, { useMemo } from "react";
import { TrophyIcon } from "@heroicons/react/16/solid";
import Btn from "@/components/Btn";
import { getProgressMessage } from "@/lib/utils";

interface BottombarProps {
  percentage: number;
  isDiscordConnected: boolean;
  isTwitterConnected: boolean;
}

const Bottombar: React.FC<BottombarProps> = ({
  percentage,
  isDiscordConnected,
  isTwitterConnected,
}) => {
  // Memoize calculations to ensure consistent rendering between server and client
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
          title="Let's Go"
          className={`bg-white ${
            isDiscordConnected &&
            isTwitterConnected &&
            "animate-pulse hover:animate-none"
          } rounded-full text-black font-[700] px-6 py-2 hover:opacity-80 transition-all duration-200`}
          link={""} // TODO: Add the correct link here
        />
      </div>
    </section>
  );
};

export default Bottombar;
