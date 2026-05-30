import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function parseJwt(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function isTokenExpired(token: string): boolean {
  const payload = parseJwt(token);
  if (!payload) return true;
  if (payload.exp && typeof payload.exp === 'number') {
    return payload.exp < Math.floor(Date.now() / 1000);
  }
  return false;
}

export function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get('jwt_token');
  const token = tokenCookie?.value;

  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');
  const isLogin = request.nextUrl.pathname.startsWith('/nre-masuk');

  if (isDashboard) {
    if (!token || isTokenExpired(token)) {
      const response = NextResponse.redirect(new URL('/nre-masuk', request.url));
      response.cookies.delete('jwt_token');
      return response;
    }
  }

  if (isLogin) {
    if (token && !isTokenExpired(token)) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else if (token) {
      const response = NextResponse.next();
      response.cookies.delete('jwt_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/nre-masuk'],
};

