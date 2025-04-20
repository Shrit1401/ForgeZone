import React from "react";
import Link from "next/link";
import { LockClosedIcon, CheckCircleIcon } from "@heroicons/react/16/solid";
import { Step } from "@/types/project.types";

type SidebarProps = {
  steps: Step[];
  current: number;
  image: string;
  slug: string;
};

const Sidebar = ({ steps, image, current, slug }: SidebarProps) => {
  // Function to determine if a step is locked
  const isLocked = (stepIndex: number, itemIndex: number) => {
    const stepNumber =
      steps
        .slice(0, stepIndex)
        .reduce((count, step) => count + step.stepItems.length, 0) +
      itemIndex +
      1;

    return stepNumber > current;
  };

  // Reusable components
  const StepItem = ({
    text,
    url,
    locked,
  }: {
    text: string;
    url: string;
    locked: boolean;
  }) => (
    <Link
      href={locked ? "#" : url}
      className={`flex gap-2 items-center font-[700] ${
        locked
          ? "text-white/30 cursor-not-allowed"
          : "text-white hover:text-white/80"
      } transition-colors duration-200`}
      onClick={(e) => locked && e.preventDefault()}
    >
      {locked ? (
        <LockClosedIcon className="w-4 h-4 text-white/30" aria-hidden="true" />
      ) : (
        <CheckCircleIcon
          className="w-4 h-4 text-green-500"
          aria-hidden="true"
        />
      )}{" "}
      {text}
    </Link>
  );

  return (
    <div className="w-1/5 h-screen px-3 py-6 overflow-hidden fixed left-0 top-[4rem] bg-[#080707]">
      <img
        src={image}
        alt="Course thumbnail"
        className="rounded-sm w-full object-cover"
      />

      <div className="flex flex-col gap-6 mt-6">
        {steps.map((step, stepIndex) => (
          <div key={stepIndex} className="flex flex-col gap-2">
            <h3 className="manrope uppercase">{step.name}</h3>

            <ul className="flex flex-col gap-2">
              {step.stepItems.map((item, itemIndex) => {
                const locked = isLocked(stepIndex, itemIndex);
                return (
                  <li key={itemIndex}>
                    <StepItem
                      text={item.text}
                      url={`/p/${slug}/${item.slug}`}
                      locked={locked}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
