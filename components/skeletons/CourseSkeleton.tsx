import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CourseSkeleton = () => {
  return (
    <div className="mt-[5rem] mb-[6rem] h-screen flex">
      <section className="flex w-full">
        {/* Skeleton Sidebar */}
        <div className="w-1/5 fixed h-screen p-4">
          <Skeleton className="h-[200px] w-full rounded-lg mb-6" />
          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-6 w-[80%]" />
                </div>
              ))}
          </div>
        </div>

        <div className="left-[20%] h-screen border-l fixed border-dashed border-white/20" />
        <div className="w-full mt-[4rem] fixed top-0 border-t border-dashed border-white/20" />

        {/* Skeleton Main Content */}
        <div className="ml-[20%] w-4/5 h-screen overflow-y-auto px-4 py-2">
          {/* Skeleton Breadcrumb */}
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-6 w-20" />
            <div className="h-4 w-4 rounded-full opacity-20">›</div>
            <Skeleton className="h-6 w-24" />
            <div className="h-4 w-4 rounded-full opacity-20">›</div>
            <Skeleton className="h-6 w-32" />
          </div>

          {/* Skeleton Content */}
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-[150px] w-full rounded-lg" />
          </div>
        </div>
      </section>

      {/* Fixed Bottom Section Skeleton */}
      <section className="fixed bottom-0 w-full h-[80px] border-t border-dashed border-white/20 flex items-center justify-between bg-[#080707]">
        <div className="flex items-center justify-center gap-3 w-1/5 px-6 py-3">
          <Skeleton className="h-[40px] w-[40px] rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>

        <div className="w-1/5 px-6 py-3 flex items-center justify-end gap-3">
          <Skeleton className="h-10 w-40 rounded-full" />
        </div>
      </section>
    </div>
  );
};

export default CourseSkeleton;
