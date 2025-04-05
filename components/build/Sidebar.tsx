import React from "react";
import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/16/solid";
const project = [
  {
    title: "Wtf is this",
    steps: [
      {
        title: "Wtf is this",
      },
    ],
  },
  {
    title: "Let's Do This",
    steps: [
      {
        title: "Program Your model",
      },
      {
        title: "First Program",
      },
    ],
  },
  {
    title: "setup your model",
    steps: [
      {
        title: "Program Your model",
      },
      {
        title: "First Program",
      },
    ],
  },
  {
    title: "build chrome extention",
    steps: [
      {
        title: "Program Your model",
      },
      {
        title: "First Program",
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className="w-1/5 h-screen px-3 py-6 overflow-hidden fixed left-0 top-[4rem] bg-[#080707]">
      <img
        src="https://raw.githubusercontent.com/Shrit1401/Supabase-CRUD/refs/heads/FORGEZONE/public/image.png"
        alt="image"
        className="rounded-lg"
      />
      <div className="flex flex-col gap-6 mt-6">
        {project.map((p, i) => (
          <div key={i} className="flex flex-col gap-2">
            <h3 className="manrope uppercase">{p.title}</h3>
            <ul className="flex flex-col gap-2">
              {p.steps.map((s, i) => (
                <li key={i}>
                  <Link
                    href="/p/buid/name"
                    className="flex gap-2 items-center font-[700] text-white/30 hover:text-white transition-colors duration-200"
                  >
                    <LockClosedIcon
                      className="w-4 h-4 text-white/30"
                      aria-hidden="true"
                    />{" "}
                    {s.title}
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
