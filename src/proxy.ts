import withAuth, { NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse, NextRequest, NextFetchEvent } from 'next/server' // <-- Import NextFetchEvent here

// The next-auth middleware function you're importing
const nextAuthMiddleware = withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // Basic check: allow if token exists
      return !!token 
    },
  },
})

/**
 * The function Next.js 16.0.7 now expects for the proxy file.
 * The 'event' argument is added to match the required signature.
 */
export async function proxy(req: NextRequestWithAuth, event: NextFetchEvent) { // <-- Include the 'event' argument
  
  const response = await nextAuthMiddleware(req, event);
  
  // If next-auth returned a response (e.g., redirect for unauthenticated users), return it.
  if (response != null && response.status !== 200) {
      return response;
  }
  
  // Otherwise, continue the request chain.
  return NextResponse.next();
}

// Keep your config for matching paths
export const config = {
    matcher: ["/admin/:path*"],
}