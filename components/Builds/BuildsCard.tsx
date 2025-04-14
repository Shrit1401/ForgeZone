import React from "react";
import Btn from "../Btn";

type BuildsCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  mode: "user" | "unknown";
};

const BuildsCard = ({
  title,
  description,
  imageUrl,
  link,
  mode,
}: BuildsCardProps) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 p-3">
      <div className="h-full flex flex-col bg-[#151515] border-2 border-white/10 hover:border-white/30 transition-all duration-300 rounded-xl overflow-hidden group">
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
              title={mode === "user" ? "View Build" : "Start"}
              type="outline"
              size="small"
              className="py-1 px-4 text-sm rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
              link={`p/${link}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildsCard;
