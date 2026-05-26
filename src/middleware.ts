import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if we're accessing the dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('jwt_token');

    // If no token exists, redirect to home page
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Check if we're accessing the login page but already have a token
  if (request.nextUrl.pathname.startsWith('/nre-masuk')) {
    const token = request.cookies.get('jwt_token');
    
    // If token exists, redirect to dashboard
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/nre-masuk'],
};
