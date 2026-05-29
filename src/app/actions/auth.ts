"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: { error: string } | null, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      return { error: 'Invalid credentials' };
    }

    const data = await res.json();
    const token = data.access_token;

    // Set HTTP-Only cookie
    const cookieStore = await cookies();
    cookieStore.set('jwt_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

  } catch (error) {
    return { error: 'Failed to connect to authentication server' };
  }

  // Redirect must be called outside of try/catch
  redirect('/dashboard');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('jwt_token');
  redirect('/nre-masuk');
}
