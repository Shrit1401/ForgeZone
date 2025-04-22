import { Skeleton } from "@/components/ui/skeleton";

const NoteDetailSkeleton = () => {
  return (
    <div className="relative">
      {/* Hero section skeleton */}
      <section className="h-[60vh] w-full sm:fixed top-0 left-0 bg-[#222222] flex flex-col items-center justify-center">
        <Skeleton className="h-12 w-[70%] sm:w-[50%] rounded-md mb-4" />
        <Skeleton className="h-8 w-[50%] sm:w-[30%] rounded-md mb-6" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>
      </section>

      {/* Content section skeleton */}
      <section className="relative z-10 mt-0 sm:mt-[60vh] backdrop-blur-3xl bg-black/40 px-12 py-40 flex items-start justify-center min-h-screen">
        <div className="max-w-[40rem] w-full flex flex-col gap-8 py-5">
          <Skeleton className="h-6 w-full rounded-md" />
          <Skeleton className="h-6 w-[90%] rounded-md" />
          <Skeleton className="h-6 w-[80%] rounded-md" />
          <Skeleton className="h-20 w-full rounded-md" />
          <Skeleton className="h-6 w-[85%] rounded-md" />
          <Skeleton className="h-6 w-[75%] rounded-md" />
          <Skeleton className="h-40 w-full rounded-md" />
          <Skeleton className="h-6 w-[70%] rounded-md" />
          <Skeleton className="h-6 w-full rounded-md" />
          <Skeleton className="h-6 w-[80%] rounded-md" />
        </div>
      </section>
    </div>
  );
};

export default NoteDetailSkeleton;
