"use client";
import Btn from "@/components/Btn";
import React, { useEffect, useState } from "react";
import { getBuilds } from "@/lib/build/build";
import { SingleProject } from "@/types/project.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const BuildsPage = () => {
  const [builds, setBuilds] = useState<SingleProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuilds = async () => {
      setLoading(true);
      await getBuilds(setBuilds);
      setLoading(false);
    };

    fetchBuilds();
  }, []);

  return (
    <section className="mt-[4rem] mx-4">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold text-white manrope">
          Builds Dashboard
        </h1>
        <Btn link="/d/builds/new" title="Create New Build" />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-[#1c1c1c] border-[#333] animate-pulse">
              <div className="h-[200px] bg-[#333]"></div>
              <CardHeader>
                <div className="h-6 bg-[#333] rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-[#333] rounded w-full mb-2"></div>
                <div className="h-4 bg-[#333] rounded w-5/6"></div>
              </CardContent>
              <CardFooter>
                <div className="h-10 bg-[#333] rounded w-full"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {builds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {builds.map((build) => (
                <Card
                  key={build.name}
                  className="bg-[#1c1c1c] border-[#333] overflow-hidden"
                >
                  <div className="h-[200px] relative">
                    {build.activeImg && (
                      <Image
                        src={build.activeImg}
                        alt={build.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white">{build.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70">{build.oneLiner}</p>
                    {build.isFeatured && (
                      <div className="mt-2 inline-block px-2 py-1 bg-amber-600/20 text-amber-400 text-xs rounded-full">
                        Featured
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href={`/d/builds/edit/${build.projectSlug}`}>
                        Edit Build
                      </Link>
                    </Button>
                    <Link
                      href={`/p/${build.projectSlug}`}
                      className="text-white/50 hover:text-white transition-colors text-sm"
                    >
                      View Build →
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#1c1c1c] rounded-lg border border-[#333]">
              <h3 className="text-xl font-medium text-white mb-2">
                No builds found
              </h3>
              <p className="text-white/50 mb-6">
                Create your first build to get started
              </p>
              <Btn link="/d/builds/new" title="Create New Build" />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default BuildsPage;
