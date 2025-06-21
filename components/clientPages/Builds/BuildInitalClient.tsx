"use client";

import React, { useEffect, useState } from "react";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/16/solid";
import { FaTwitter } from "react-icons/fa";
import Btn from "@/components/Btn";
import Sidebar from "@/components/build/Sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getBuildBySlug, getProjectFromUser } from "@/lib/build/build";
import { SingleProject } from "@/types/project.types";
import BuildHomeSkeleton from "@/components/skeletons/buildHomeSkeleton";
import DiscordConnectionSection from "@/components/build/DiscordConnectionSection";
import { UserType, ProjectUser } from "@/types/user.types";
import { getLoggedInUser, updateUserBuild } from "@/lib/auth/auth";
import { toast } from "sonner";
import Bottombar from "@/components/build/Bottombar";

const BuildInitalClient = ({ buildSlug }: { buildSlug: string }) => {
  const [build, setBuild] = useState<SingleProject>();
  const [user, setUser] = useState<UserType | null | undefined>();
  const [userProject, setUserProject] = useState<ProjectUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);

  const [isDiscordConnected, setIsDiscordConnected] = useState(false);
  const [isTwitterConnected, setIsTwitterConnected] = useState(false);

  const [twitterUrl, setTwitterUrl] = useState<string | null>(null);

  const buildParam = buildSlug;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getLoggedInUser(setUser, setLoading);
      } catch (err) {
        console.error("Error fetching user:", err);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchBuild = async () => {
      try {
        if (!buildParam) {
          setLoading(false);
          return;
        }

        await getBuildBySlug(buildParam, setBuild);
      } catch (error) {
        console.error("Error fetching build:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuild();
  }, [buildParam]);

  useEffect(() => {
    if (user && build) {
      const res = getProjectFromUser(user, build.name);
      if (res) {
        setIsDiscordConnected(res.isDiscordConnected);
        setIsTwitterConnected(res.isTwitterShared);
        setUserProject(res);
        setPercentage(Math.floor((res.current / res.total) * 100));
      } else {
        setIsDiscordConnected(false);
        setIsTwitterConnected(false);
        setUserProject(null);

        setUserProject({
          projectname: build.name,
          current: 0,
          total: build.steps.reduce(
            (acc, step) => acc + step.stepItems.length,
            0
          ),
          isDiscordConnected: false,
          isTwitterShared: false,
        } as ProjectUser);
      }
    }
  }, [user, build]);

  useEffect(() => {
    if (twitterUrl) {
      window.open(twitterUrl, "_blank");
      setTwitterUrl(null);
    }
  }, [twitterUrl]);

  const twitterClicked = async () => {
    if (!user || !build || !user.id) return;
    const twitterDB = await updateUserBuild(
      user.id,
      build,
      undefined,
      undefined,
      true
    );

    if (twitterDB) {
      setIsTwitterConnected(true);
    } else {
      toast.error("Error sharing on Twitter");
      return;
    }

    const twitterText = encodeURIComponent(build?.twitterMessage || "");
    setTwitterUrl(`https://twitter.com/intent/tweet?text=${twitterText}`);
  };

  if (loading || !build || !user) {
    return <BuildHomeSkeleton />;
  }

  return (
    <div className="mt-[5rem] h-screen flex">
      <section className="flex w-full">
        <Sidebar
          slug={build.projectSlug}
          current={userProject?.current || 0}
          steps={build.steps}
          image={build.activeImg}
        />

        <div className="left-[20%] h-screen border-l fixed border-dashed border-white/20" />
        <div className="w-full mt-[4rem] fixed top-0 border-t border-dashed z-[999] border-white/20" />
        <div className="ml-[20%] w-4/5 h-screen overflow-y-auto px-4 py-2 relative">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/builds">Builds</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{build?.name || "Build Name"}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col items-center justify-center gap-1 mt-6">
            <h2 className="manrope text-white font-[700] text-3xl mt-6">
              Get Ready to Ship
            </h2>
            <p className="font-bold text-white/50 mt-2 w-[70%] text-center">
              Join hundreds of builders in ML/AI to ship this build together.
              Make sure to complete the tasks below to get the most out of this
              build.
            </p>
          </div>

          <div className="mt-4 mx-8 border border-dashed border-white/20 p-6 rounded-lg">
            <div className={isTwitterConnected ? "" : "mb-4"}>
              <h3 className="flex gap-1 items-center text-xl manrope font-[700]">
                {isTwitterConnected ? (
                  <CheckCircleIcon className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircleIcon className="w-6 h-6 text-[rgba(255,255,255,.8)]" />
                )}
                {isTwitterConnected
                  ? "Shared on Twitter"
                  : "Share Your Journey"}
              </h3>
              <p className="text-white/50 manrope font-[500] text-sm mt-2">
                {isTwitterConnected
                  ? "You've successfully shared your journey on Twitter!"
                  : "You'll need to share your journey with the cohort on Twitter to keep track of your progress and connect with other builders."}
              </p>
            </div>
            <div className={isTwitterConnected ? "" : "mt-4"}>
              {!isTwitterConnected && (
                <Btn
                  title="Share on Twitter"
                  className="w-fit"
                  onClick={twitterClicked}
                  sideIcon={<FaTwitter />}
                />
              )}
            </div>
          </div>

          <DiscordConnectionSection
            isDiscordConnected={isDiscordConnected}
            build={build}
            user={user}
            setIsDiscordConnected={setIsDiscordConnected}
          />
        </div>
      </section>

      <Bottombar
        userId={user.id}
        current={userProject?.current || 0}
        build={build}
        percentage={percentage}
        isDiscordConnected={isDiscordConnected}
        isTwitterConnected={isTwitterConnected}
      />
    </div>
  );
};

export default BuildInitalClient;
