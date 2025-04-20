// BuildSkeleton.jsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Component for the builds page skeleton card
const SkeletonCard = () => (
  <div className="w-full sm:w-1/2 md:w-1/3 p-4">
    <div className="border rounded-lg overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  </div>
);

// Skeleton for the builds page
export const BuildsPageSkeleton = () => {
  return (
    <div className="mt-[6rem] mx-auto max-w-7xl px-4 mb-10">
      <section className="mb-12">
        <Skeleton className="h-10 w-48 mb-6" />
        <div className="flex flex-wrap">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
      <section>
        <Skeleton className="h-10 w-48 mb-6" />
        <div className="flex flex-wrap">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

// Original build home skeleton for a different page layout
const BuildHomeSkeleton = () => {
  return (
    <div className="mt-[5rem] h-screen flex">
      {/* Sidebar */}
      <div className="w-1/5 h-screen  fixed z-[1000] p-4">
        <Skeleton className="w-full h-6  mb-6" />
        <Skeleton className="w-full h-32  mb-6 rounded-md" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="w-6 h-6 rounded-full " />
              <Skeleton className="w-4/5 h-4 " />
            </div>
          ))}
        </div>
      </div>

      {/* Border & Header */}
      <div className="left-[20%] h-screen border-l fixed border-dashed border-white/20" />
      <div className="w-full mt-[4rem] fixed top-0 border-t border-dashed z-[999] border-white/20" />

      {/* Content */}
      <div className="ml-[20%] w-4/5 h-screen overflow-y-auto px-4 py-2">
        <div className="flex flex-col items-center justify-center gap-4 mt-6">
          <Skeleton className="w-64 h-8 " />
          <Skeleton className="w-3/4 h-4  mt-2" />
          <Skeleton className="w-3/4 h-4 " />

          <div className="mt-8 w-full px-8">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="mt-4 border border-dashed border-white/20 p-6 rounded-lg"
              >
                <div className="mb-4">
                  <div className="flex gap-1 items-center">
                    <Skeleton className="w-6 h-6 rounded-full " />
                    <Skeleton className="w-48 h-6 " />
                  </div>
                  <div className="space-y-2 mt-2">
                    <Skeleton className="w-full h-4 " />
                    <Skeleton className="w-2/3 h-4 " />
                  </div>
                </div>
                <div className="mt-4">
                  <Skeleton className="w-36 h-10  rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Section */}
      <section className="fixed bottom-0 w-full h-[80px] border-t border-dashed border-white/20 flex items-center justify-between bg-[#080707]">
        <div className="flex items-center justify-center gap-3 w-1/5 px-6 py-3">
          <Skeleton className="w-[40px] h-[40px] rounded-full " />
          <div className="space-y-2">
            <Skeleton className="w-24 h-4 " />
            <Skeleton className="w-32 h-3 " />
          </div>
        </div>

        <div className="w-1/5 px-6 py-3 flex items-center justify-end gap-3">
          <Skeleton className="w-24 h-10  rounded-full" />
        </div>
      </section>
    </div>
  );
};

export default BuildHomeSkeleton;
