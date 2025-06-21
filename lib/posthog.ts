import { PostHog } from "posthog-node";

export default function PostHogClient() {
  // Return null if PostHog key is not available
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return null;
  }

  try {
    const posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      flushAt: 1,
      flushInterval: 0,
    });
    return posthogClient;
  } catch (error) {
    console.warn("Failed to initialize PostHog client:", error);
    return null;
  }
}
