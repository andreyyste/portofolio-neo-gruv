import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

async function isTokenValid(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    // Token invalid, expired, atau signature tidak cocok
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get('jwt_token');
  const token = tokenCookie?.value;

  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');
  const isLogin = request.nextUrl.pathname.startsWith('/nre-masuk');

  if (isDashboard) {
    if (!token || !(await isTokenValid(token))) {
      const response = NextResponse.redirect(new URL('/nre-masuk', request.url));
      response.cookies.delete('jwt_token');
      return response;
    }
  }

  if (isLogin) {
    if (token && (await isTokenValid(token))) {
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
