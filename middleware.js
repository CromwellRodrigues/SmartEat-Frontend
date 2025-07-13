import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/inventory(.*)",
  "/recipes(.*)",
  "/shopping-list(.*)",
  "/summary(.*)",
]);

export default clerkMiddleware((auth, req) => {
  // Just let Clerk handle the authentication flow automatically
  if (isProtectedRoute(req)) {
    auth();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
