import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Memoized profile picture cache
const profilePictureCache = new Map<number, string>();

export function getRandomProfilePicture(): string {
  // Use a simple hash to get consistent profile pictures for the same user
  const randomIndex = Math.floor(Math.random() * 40) + 1;

  // Check cache first
  if (profilePictureCache.has(randomIndex)) {
    return profilePictureCache.get(randomIndex)!;
  }

  const profilePicture = `/pfp/pfp-${randomIndex}.png`;

  // Cache the result
  profilePictureCache.set(randomIndex, profilePicture);

  return profilePicture;
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

// Memoized certificate message generation
const certificateMessageCache = new Map<string, string>();

export function getCertificateMessage(
  username: string,
  buildName: string
): string {
  const cacheKey = `${username}-${buildName}`;

  if (certificateMessageCache.has(cacheKey)) {
    return certificateMessageCache.get(cacheKey)!;
  }

  const messages = [
    `Congratulations ${username}! You've successfully completed the ${buildName} build. Your dedication and persistence have paid off. Keep building amazing things!`,
    `Amazing work ${username}! The ${buildName} build is now complete. You've shown incredible skill and determination. The coding world is yours to conquer!`,
    `Fantastic job ${username}! You've mastered the ${buildName} build. Your journey from beginner to builder is inspiring. Keep pushing the boundaries!`,
    `Outstanding achievement ${username}! The ${buildName} build is in your portfolio. Your commitment to learning and growth is remarkable. Build on!`,
    `Incredible work ${username}! You've conquered the ${buildName} build. Your technical skills and problem-solving abilities are top-notch. The future is bright!`,
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  // Cache the result
  certificateMessageCache.set(cacheKey, randomMessage);

  return randomMessage;
}

// Debounce utility for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
