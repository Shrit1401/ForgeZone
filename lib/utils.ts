import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const pfps = [
  "https://i.imgur.com/8Fc5mKr.png",
  "https://i.imgur.com/uYYg4sD.png",
  "https://i.imgur.com/mdz2g9h.png",
  "https://i.imgur.com/OSIWhYM.png",
  "https://i.imgur.com/oHLKcmJ.png",
  "https://i.imgur.com/ikdrTaJ.png",
  "https://i.imgur.com/nq9eoW3.png",
  "https://i.imgur.com/xd0RIsE.png",
  "https://i.imgur.com/dQG3H1A.png",
  "https://i.imgur.com/RLBH8yZ.png",
  "https://i.imgur.com/9vyOSqA.png",
  "https://i.imgur.com/Q8PmFMY.png",
  "https://i.imgur.com/uTGKUOZ.png",
  "https://i.imgur.com/nKa2gf1.png",
  "https://i.imgur.com/iWMg8OK.png",
  "https://i.imgur.com/EifThf9.png",
  "https://i.imgur.com/i40eVlu.png",
  "https://i.imgur.com/5tNSq30.png",
  "https://i.imgur.com/PFdGf4t.png",
  "https://i.imgur.com/QZ4eNc6.png",
  "https://i.imgur.com/9xTK7Yx.png",
  "https://i.imgur.com/2av9cX2.png",
  "https://i.imgur.com/NOcsyt9.png",
  "https://i.imgur.com/rgzASiz.png",
  "https://i.imgur.com/aYp8cl0.png",
  "https://i.imgur.com/N7SIZBe.png",
  "https://i.imgur.com/D8wIGy8.png",
  "https://i.imgur.com/8bBUZ6C.png",
  "https://i.imgur.com/AMswtvt.png",
  "https://i.imgur.com/hxgZkHw.png",
  "https://i.imgur.com/DZrRqvH.png",
  "https://i.imgur.com/Iiu1OGQ.png",
  "https://i.imgur.com/Ki8RT59.png",
  "https://i.imgur.com/V7jhFDO.png",
  "https://i.imgur.com/Ega8pzf.png",
  "https://i.imgur.com/QtaBjDy.png",
  "https://i.imgur.com/zl7Zydn.png",
  "https://i.imgur.com/dBZncb6.png",
  "https://i.imgur.com/M5D8ZsR.png",
];

export function getRandomProfilePicture(): string {
  const randomIndex = Math.floor(Math.random() * pfps.length);
  return pfps[randomIndex];
}
