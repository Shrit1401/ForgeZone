import React from "react";
import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/16/solid";
import { Step } from "@/types/project.types";

type SidebarProps = {
  steps: Step[];
  image: string;
};

const Sidebar = ({ steps, image }: SidebarProps) => {
  return (
    <div className="w-1/5 h-screen px-3 py-6 overflow-hidden fixed left-0 top-[4rem] bg-[#080707]">
      <img src={image} alt="image" className="rounded-sm" />
      <div className="flex flex-col gap-6 mt-6">
        {steps.map((p, i) => (
          <div key={i} className="flex flex-col gap-2">
            <h3 className="manrope uppercase">{p.name}</h3>
            <ul className="flex flex-col gap-2">
              {p.stepItems.map((s, i) => (
                <li key={i}>
                  <Link
                    href="/p/buid/name"
                    className="flex gap-2 items-center font-[700] text-white/30 hover:text-white transition-colors duration-200"
                  >
                    <LockClosedIcon
                      className="w-4 h-4 text-white/30"
                      aria-hidden="true"
                    />{" "}
                    {s.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
