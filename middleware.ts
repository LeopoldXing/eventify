import {clerkMiddleware} from '@clerk/nextjs/server';

// Make sure that the `/api/webhook/(.*)` route is not protected here
export default clerkMiddleware()

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
