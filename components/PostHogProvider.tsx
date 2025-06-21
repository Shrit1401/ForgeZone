"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { Suspense, useEffect, lazy } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Lazy load PostHog to prevent blocking main thread
const PostHogPageView = lazy(() =>
  Promise.resolve({
    default: () => {
      const posthogClient = usePostHog();
      const pathname = usePathname();
      const searchParams = useSearchParams();

      useEffect(() => {
        if (!posthogClient) return;
        posthogClient.capture("$pageview", {
          path: pathname + searchParams.toString(),
        });
      }, [posthogClient, pathname, searchParams]);

      return null;
    },
  })
);

function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize PostHog only on client side
    if (typeof window !== "undefined") {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") posthog.debug();
        },
        capture_pageview: false, // We'll handle this manually
        capture_pageleave: true,
        disable_session_recording: true, // Disable for performance
        autocapture: false, // Disable for performance
      });
    }
  }, []);

  return (
    <PHProvider client={posthog}>
      {children}
      <SuspendedPostHogPageView />
    </PHProvider>
  );
}
