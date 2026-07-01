import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function handleProxy(request: NextRequest) {
  // Extract path and search params safely avoiding dynamic params breaking change
  const pathname = request.nextUrl.pathname.replace('/api/proxy', '');
  const search = request.nextUrl.search;
  const url = `${BACKEND_URL}${pathname}${search}`;
  
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt_token')?.value;

  const headers = new Headers();
  const contentType = request.headers.get('Content-Type');
  if (contentType) {
    headers.set('Content-Type', contentType);
  }
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let body = undefined;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const rawBody = await request.text();
    if (rawBody) {
      body = rawBody;
      if (!contentType) {
        headers.set('Content-Type', 'application/json');
      }
    }
  }

  try {
    const fetchOptions: RequestInit = {
      method: request.method,
      headers,
    };
    if (body !== undefined) {
      fetchOptions.body = body;
    }
    const response = await fetch(url, fetchOptions);

    const data = await response.text();
    let parsedData;
    try { parsedData = JSON.parse(data); } catch { parsedData = data; }

    if (response.ok && request.method !== 'GET' && request.method !== 'HEAD') {
      revalidatePath('/');
      revalidatePath('/sitemap.xml');
    }

    const res = NextResponse.json(parsedData, {
      status: response.status,
    });

    if (response.status === 401) {
      res.cookies.delete('jwt_token');
    }

    return res;
  } catch (error) {
    return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PATCH = handleProxy;
export const DELETE = handleProxy;

