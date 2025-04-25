import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Work",
};
const WorkPage = () => {
  return (
    <div className="mt-[4rem] sm:mt-[6rem] mx-auto max-w-7xl px-2 sm:px-4 mb-10">
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold manrope">
        Get Interships and Jobs
      </h1>
      <div className="mt-4 sm:mt-8 h-[30vh] sm:h-[40vh] mx-2 sm:mx-8 border justify-center flex items-center border-dashed border-white/20 p-3 sm:p-6 rounded-lg">
        <h3 className="flex flex-col sm:flex-row gap-1 items-center text-center sm:text-xl manrope font-[700]">
          <span>Coming Soon</span>
          <span className="mt-2 sm:mt-0 sm:ml-2 animate-bounce">🤣</span>
          <span className="text-xs sm:text-sm italic text-gray-400 mt-2 sm:mt-0">
            (or whenever we finish our coffee)
          </span>
        </h3>
      </div>
    </div>
  );
};

export default WorkPage;
