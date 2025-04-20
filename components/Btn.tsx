import Link from "next/link";
import React from "react";

type BtnProps = {
  title: string;
  link?: string;
  className?: string;
  size?: "small" | "medium" | "large";
  type?: "normal" | "outline" | "ghost";
  sideIcon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const Btn: React.FC<BtnProps> = ({
  title,
  link,
  className,
  size = "medium",
  type = "normal",
  sideIcon = null,
  disabled = false,
  onClick,
}) => {
  const styles = `${
    type === "outline"
      ? "bg-transparent border-2 border-white text-white hover:bg-white hover:text-black"
      : type === "ghost"
      ? "bg-white/10 text-white hover:bg-white/20"
      : "bg-white text-black hover:bg-gray-100 hover:opacity-80"
  } transition-all duration-300 manrope rounded-full ${
    size === "small"
      ? "px-4 py-2 text-sm"
      : size === "large"
      ? "px-6 py-3 text-lg"
      : "px-4 py-2 text-base"
  } ${className} flex items-center justify-center text-center relative z-10 cursor-pointer`;

  if (link) {
    return (
      <Link href={link} className={styles}>
        {sideIcon && <span className="mr-2">{sideIcon}</span>}
        {title}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      aria-disabled={disabled}
      data-disabled={disabled}
      data-type={type}
      data-size={size}
      data-link={link}
      data-side-icon={sideIcon}
      data-title={title}
      data-class-name={className}
      className={styles}
    >
      {sideIcon && <span className="mr-2">{sideIcon}</span>}
      {title}
    </button>
  );
};

export default Btn;
