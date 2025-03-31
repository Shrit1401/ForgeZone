import React, { HTMLAttributes } from "react";

const Btn = ({
  title,
  link,
  className,
  size = "medium",
  type = "normal",
}: {
  title: string;
  link: string;
  className?: HTMLAttributes<HTMLAnchorElement>["className"];
  size?: "small" | "medium" | "large";
  type?: "normal" | "outline" | "ghost";
}) => {
  return (
    <a
      href={link}
      className={`${
        type === "outline"
          ? "bg-transparent border-2 border-white text-white hover:bg-white hover:text-black"
          : type === "ghost"
          ? "bg-white/10 text-white hover:bg-white/20"
          : "bg-white text-black hover:bg-gray-100"
      } transition-colors duration-300 manrope rounded-full ${
        size === "small"
          ? "px-3 py-1 text-sm"
          : size === "large"
          ? "px-6 py-3 text-lg"
          : "px-4 py-2 text-base"
      } ${className} flex items-center justify-center text-center relative z-10`}
    >
      {title}
    </a>
  );
};

export default Btn;
