import React from "react";
import { TrophyIcon, TagIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface BuildsCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  mode: "user" | "unknown";
  userCurrent?: number;
  buildType?: string;
  buildStepsLength?: number;
}

const BuildsCard = React.memo<BuildsCardProps>(
  ({
    title,
    description,
    imageUrl,
    link,
    mode,
    userCurrent = 0,
    buildType = "beginner",
    buildStepsLength = 0,
  }) => {
    const progressPercentage =
      buildStepsLength > 0 ? (userCurrent / buildStepsLength) * 100 : 0;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
        className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1rem)] mb-6"
      >
        <Link href={link}>
          <div className="bg-[#1c1c1c] border border-[#333] rounded-lg overflow-hidden hover:border-[#555] transition-all duration-300 cursor-pointer group">
            <div className="relative h-[200px] overflow-hidden">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {mode === "user" && (
                <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <TrophyIcon className="h-3 w-3" />
                  In Progress
                </div>
              )}

              <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <TagIcon className="h-3 w-3" />
                {buildType}
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                {title}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-3 mb-3">
                {description}
              </p>

              {mode === "user" && buildStepsLength > 0 && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {userCurrent} of {buildStepsLength} steps completed
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-green-500 text-sm font-semibold">
                  {mode === "user" ? "Continue Building" : "Start Building"}
                </span>
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }
);

BuildsCard.displayName = "BuildsCard";

export default BuildsCard;
