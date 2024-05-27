import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { SessionPublicMetadata } from "./types";

const isOnboardRoute = createRouteMatcher(["/auth/onboard(.*)"]);

const isPublicRoute = createRouteMatcher(["/", "/auth(.*)"]);

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/routers(.*)"]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const sessionClaims: SessionPublicMetadata = auth().sessionClaims
    ?.publicMetadata as SessionPublicMetadata;

  const authenticated = userId && sessionClaims?.onboarded;

  if (!authenticated && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  if (authenticated && isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
