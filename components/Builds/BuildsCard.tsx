import React from "react";
import Btn from "../Btn";
import { TrophyIcon, TagIcon } from "@heroicons/react/16/solid";
import { ProjectType } from "@/types/project.types";

type BuildsCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  mode: "user" | "unknown";
  userCurrent?: number; // Added for progress tracking
  buildStepsLength?: number; // Added for progress tracking
  buildType?: ProjectType; // Added for build type
};

const BuildsCard = ({
  title,
  description,
  imageUrl,
  link,
  mode,
  buildType,
  userCurrent, // Added
  buildStepsLength, // Added
}: BuildsCardProps) => {
  // Determine if the build is completed by the user
  const isCompleted =
    typeof userCurrent === "number" &&
    typeof buildStepsLength === "number" &&
    userCurrent > buildStepsLength;

  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 p-3">
      <div
        className={`h-full flex flex-col bg-[#151515] border-2 ${
          isCompleted ? "border-green-500" : "border-transparent"
        } transition-all duration-300 rounded-xl overflow-hidden group relative`}
      >
        {isCompleted && (
          <div className="absolute top-2 right-2 z-10">
            <div className="bg-green-500 text-black font-bold text-xs px-2 py-1 rounded-full flex items-center">
              <TrophyIcon className="w-3 h-3 mr-1" />
              COMPLETED
            </div>
          </div>
        )}
        {buildType &&
          (buildType === ProjectType.weekend ||
            buildType === ProjectType.advance) && (
            <div className="absolute top-2 left-2 z-10">
              <div className="bg-yellow-400 text-black font-bold text-xs px-2 py-1 rounded-full flex items-center">
                <TagIcon className="w-3 h-3 mr-1 capitalize" />
                {buildType === ProjectType.weekend ? "Weekend" : "Advance"}{" "}
                Build
              </div>
            </div>
          )}

        <div
          className="relative aspect-[16/9] bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

          <div className="absolute bottom-0 left-0 p-4 w-full">
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between p-4">
          <p className="text-sm text-white/80 mb-4 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center justify-end mt-2">
            <Btn
              title={
                isCompleted
                  ? "View Certificate"
                  : mode === "user"
                    ? "View Build"
                    : "Start"
              }
              type="outline"
              size="small"
              className={`py-1 px-4 text-sm rounded-full opacity-70 group-hover:opacity-100 transition-opacity ${
                isCompleted ? "text-green-500 border-green-500" : ""
              }`}
              link={!isCompleted ? `/p/${link}` : `/p/${link}/congo`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildsCard;
