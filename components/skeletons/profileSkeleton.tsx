// ProfileSkeleton.jsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ProfileSkeleton = () => {
  return (
    <div className="mt-[6rem] mx-auto max-w-7xl gap-5 px-4 mb-10 flex justify-between">
      {/* Form Skeleton */}
      <div className="w-[70%]">
        <Skeleton className="h-10 w-64 mb-6" />
        <div className="space-y-6">
          {/* Profile Picture */}
          <Card>
            <CardHeader>
              <Skeleton className="h-7 w-40" />
            </CardHeader>
            <CardContent className="flex justify-center">
              <Skeleton className="h-32 w-32 rounded-full" />
            </CardContent>
          </Card>

          {/* Basic Info */}
          <Card>
            <CardHeader>
              <Skeleton className="h-7 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <Skeleton className="h-7 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preview Skeleton */}
      <div className="w-[30%]">
        <Skeleton className="h-10 w-40 mb-6" />
        <Skeleton className="h-3 w-full mb-1" />
        <Skeleton className="h-2 w-16 mb-4" />

        <Card className="mb-6 bg-transparent border-dotted border-4">
          <CardContent className="flex justify-center py-6">
            <Skeleton className="h-32 w-32 rounded-full" />
          </CardContent>
          <CardContent className="space-y-4 py-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-24" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
