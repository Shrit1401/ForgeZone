import { Skeleton } from "@/components/ui/skeleton";

const NotesCardSkeleton = () => {
  return (
    <div className="flex-1 min-w-[370px] min-h-[185px] aspect-[16/10] bg-[#1a1a1a] p-6 rounded-xl border-2 border-white/10 flex justify-between flex-col">
      <Skeleton className="w-16 h-6 rounded-full" />
      <div>
        <Skeleton className="h-6 w-3/4 mb-4 rounded" />
        <div className="flex items-center gap-2">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="h-4 w-24 rounded" />
        </div>
      </div>
    </div>
  );
};

export default NotesCardSkeleton;
