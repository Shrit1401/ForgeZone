"use client";
import BuildsCard from "@/components/builds/BuildsCard";
import { getLoggedInUser } from "@/lib/auth/auth";
import { getBuilds } from "@/lib/build/build";
import { SingleProject } from "@/types/project.types";
import { UserType } from "@/types/user.types";
import React, { useEffect } from "react";

const BuildsPage = () => {
  const [user, setUser] = React.useState<UserType | undefined | null>();
  const [builds, setBuilds] = React.useState<SingleProject[]>([]);

  useEffect(() => {
    getBuilds(setBuilds);
    getLoggedInUser(setUser);
  }, []);

  return (
    <div className="mt-[6rem] mx-auto max-w-7xl px-4 mb-10 ">
      {user?.projects && user.projects.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold manrope">My Builds</h2>
          <div className="flex flex-wrap mt-6">
            <BuildsCard
              title="Intro to Solidity: Ship an Ethereum dApp"
              description="A 2-week project where you'll learn some Solidity, write a smart contract to the blockchain, and build a React frontend."
              imageUrl="https://i.imgur.com/3C2zb5n.png"
              link={""}
              mode={"user"}
            />
          </div>
        </section>
      )}
      <section>
        <h2 className="text-3xl font-bold manrope">Builds 🔥</h2>
        <div className="flex flex-wrap mt-6">
          {builds.map((build, index) => (
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
      </section>
    </div>
  );
};

export default BuildsPage;
