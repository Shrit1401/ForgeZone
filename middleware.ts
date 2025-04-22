import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Array of paths that should be protected (require authentication)
const protectedPaths = ["/p/", "/work", "/profile", "/d/"];

// Function to check if a path should be protected
const isProtectedPath = (path: string) => {
  return protectedPaths.some((protectedPath) => path.startsWith(protectedPath));
};

export async function middleware(request: NextRequest) {
  try {
    // Create a response object that we can modify
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // Create a Supabase client using cookies from the request
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            response.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options: any) {
            response.cookies.set({
              name,
              value: "",
              ...options,
            });
          },
        },
      }
    );

    // Get the user's session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // If the user is authenticated and trying to access the /start page, redirect to dashboard
    if (session && request.nextUrl.pathname === "/start") {
      return NextResponse.redirect(new URL("/builds", request.url));
    }

    // If the path is protected and the user is not authenticated, redirect to login
    if (isProtectedPath(request.nextUrl.pathname) && !session) {
      // Get the current URL to redirect back after login
      const redirectUrl = request.nextUrl.pathname + request.nextUrl.search;

      // Redirect to the login page with the return URL as a query parameter
      const loginUrl = new URL("/start", request.url);
      loginUrl.searchParams.set("redirectTo", redirectUrl);

      return NextResponse.redirect(loginUrl);
    }

    // Continue with the request if no redirection was triggered
    return response;
  } catch (error) {
    console.error("Error in middleware:", error);

    // If there's an error, redirect to login as a fallback
    if (isProtectedPath(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/start", request.url));
    }

    // If not a protected path, continue anyway
    return NextResponse.next();
  }
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - public folder
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
