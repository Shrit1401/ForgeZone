"use client";
import BuildsCard from "@/components/builds/BuildsCard";
import { getLoggedInUser } from "@/lib/auth/auth";
import { getBuildFromUser, getBuilds } from "@/lib/build/build";
import { SingleProject } from "@/types/project.types";
import { UserType } from "@/types/user.types";
import React, { useEffect } from "react";
import { BuildsPageSkeleton } from "@/components/skeletons/buildHomeSkeleton";

const BuildsPage = () => {
  const [user, setUser] = React.useState<UserType | undefined | null>();
  const [builds, setBuilds] = React.useState<SingleProject[]>([]);
  const [userProjects, setUserProjects] = React.useState<SingleProject[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([getBuilds(setBuilds), getLoggedInUser(setUser)]);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!user || !builds) {
      return;
    }
    getBuildFromUser(user, builds, setUserProjects);
  }, [user, builds]);

  const filteredBuilds = builds.filter(
    (build) =>
      !userProjects.some(
        (userProject) => userProject.projectSlug === build.projectSlug
      )
  );

  if (loading) {
    return <BuildsPageSkeleton />;
  }

  return (
    <div className="mt-[6rem] mx-auto max-w-7xl px-4 mb-10 ">
      {user?.projects &&
        user.projects.length > 0 &&
        userProjects.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold manrope">My Builds</h2>
            <div className="flex flex-wrap mt-6">
              {userProjects.map((project, index) => (
                <BuildsCard
                  key={index}
                  title={project.name}
                  description={project.oneLiner}
                  imageUrl={project.activeImg}
                  link={project.projectSlug}
                  mode={"user"}
                />
              ))}
            </div>
          </section>
        )}
      <section>
        <h2 className="text-3xl font-bold manrope">Builds 🔥</h2>
        {filteredBuilds.length > 0 ? (
          <div className="flex flex-wrap mt-6">
            {filteredBuilds.map((build, index) => (
              <BuildsCard
                key={index}
                title={build.name}
                description={build.oneLiner}
                imageUrl={build.activeImg}
                link={build.projectSlug}
                mode="unknown"
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 text-center py-10">
            <p className="text-xl text-gray-500 manrope font-bold">
              No builds yet. Working on more!
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default BuildsPage;
