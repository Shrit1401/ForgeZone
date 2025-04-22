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

export function getProgressMessage(percentage: number): string {
  const progressMessages = [
    { threshold: 0, message: "Let's get started!" },
    { threshold: 25, message: "Just beginning your journey" },
    { threshold: 50, message: "Making good progress" },
    { threshold: 75, message: "Well on your way" },
    { threshold: 100, message: "Almost there!" },
    { threshold: Infinity, message: "You've completed it!" },
  ];

  return (
    progressMessages.find(({ threshold }) => percentage < threshold)?.message ||
    "You've completed it!"
  );
}

export function getCertificateMessage(buildName: string): string {
  const completionMessages = [
    `Completed the ${buildName} build with style, sarcasm, and exactly three breakdowns. Forge Zone is impressed and slightly concerned.`,
    `Battled semicolons, tamed async beasts, and emerged from the code jungle alive. The ${buildName} build has been bested.`,
    `Earned this certificate through blood, sweat, and questionable Stack Overflow copy-pasting. ${buildName} build: conquered.`,
    `Conquered the ${buildName} build without setting the repo on fire. A true modern miracle, certified by Forge Zone.`,
    `Faced the infinite loop and didn't blink. The ${buildName} build lies in ruins, and this builder walks away triumphant.`,
    `Debugged with valor, deployed with flair, and complained on Discord with style. The ${buildName} build didn't stand a chance.`,
    `Completed the ${buildName} build entirely fueled by memes and microwave noodles. Forge Zone bows to this power.`,
    `Committed questionable code, uncommitted sanity, and still finished the ${buildName} build. Certified chaos technician.`,
    `Fought bugs so stubborn they should have unionized. Still, the ${buildName} build is no more.`,
    `Did not cry. (Much.) The ${buildName} build is done. Therapy may begin.`,
    `Whispered sweet nothings to the compiler until it gave in. The ${buildName} build was no match for this persuasion.`,
    `Coded with the grace of a caffeinated octopus. Yet, the ${buildName} build has been slain.`,
    `Broke things. Fixed them. Broke them again. Somehow… success. ${buildName} build: check.`,
    `Has achieved what few dare to attempt — a passing npm run build. ${buildName} build? Obliterated.`,
    `Turned coffee into code and chaos into glory. ${buildName} build: handled like a legend.`,
    `Survived merge conflicts, race conditions, and the dark night of the soul. ${buildName} complete. Respect.`,
    `Wrote, rewrote, and eventually just duct-taped the logic together. Forge Zone approves.`,
    `Came for the tutorial, stayed for the breakdown, left with a certificate. ${buildName} build: done.`,
    `Applied brute force, optimism, and one lucky console.log. The ${buildName} build is no more.`,
    `Successfully convinced their code to work via sheer intimidation. ${buildName} build? Handled.`,
    `Overcame bugs, burnout, and questionable syntax. The ${buildName} build bows to this glorious mess.`,
    `Braved the abyss of undefined errors and returned with this certificate. ${buildName} build: slain.`,
    `Rendered the ${buildName} build speechless. And stateless. And probably broken. But done.`,
    `Survived 37 tabs, 12 docs, and 1 emotional breakdown. ${buildName} build complete.`,
    `Breathed life into code through caffeine and chaos. ${buildName} build? Conquered.`,
    `Outcoded destiny. Outdebugged fate. Outlasted the ${buildName} build.`,
    `Cursed at the screen with elegance and grit. The ${buildName} build is no more.`,
    `Defeated more bugs than a backyard BBQ. ${buildName}: check.`,
    `Laughed in the face of stack traces. Mostly to keep from crying. ${buildName} survived.`,
    `Turned "why isn't this working" into "oh god, it worked." ${buildName} build, handled.`,
    `Danced with divs, juggled JSON, and emerged victorious. ${buildName} build: crushed.`,
    `Bled pixels, wept semicolons, and summoned greatness. ${buildName} stands no chance.`,
    `Fought the framework and won. The ${buildName} build has been obliterated.`,
    `Solved problems with grace, grit, and a little Googling. ${buildName} build complete.`,
    `Somehow turned spaghetti code into a feast. ${buildName}? Delicious.`,
    `Defied logic. Defiled syntax. Defined victory. ${buildName} build: done.`,
    `Proved that sleep is optional when glory is on the line. ${buildName} achieved.`,
    `Whispered "please work" until the code complied. ${buildName} build defeated.`,
    `Made the impossible slightly broken but functional. ${buildName} build: success-ish.`,
    `Left no bug unsquashed, no commit unchaotic. The ${buildName} build is history.`,
    `Replaced logic with vibes and still made it work. ${buildName} build complete.`,
    `Cried in JavaScript, smiled in TypeScript. ${buildName}: conquered.`,
    `Earned this certificate through grit, grind, and glitchy brilliance. ${buildName} slain.`,
    `Used the dark arts (and dark mode) to finish the ${buildName} build.`,
    `Wrote poetry in code. Most of it didn't compile. But ${buildName} is done.`,
    `Slept not, shipped much. ${buildName} now lives to tell the tale.`,
    `Slayed dragons disguised as runtime errors. ${buildName} build vanquished.`,
    `Shouted at the screen until it obeyed. ${buildName} bows respectfully.`,
    `Debugged like a warrior, committed like a legend. ${buildName} crushed.`,
    `Walked through callback hell and came back enlightened. ${buildName} build: complete.`,
    `May not know what they did. But it worked. ${buildName} is done.`,
  ];

  // Get a random message
  return completionMessages[
    Math.floor(Math.random() * completionMessages.length)
  ];
}
