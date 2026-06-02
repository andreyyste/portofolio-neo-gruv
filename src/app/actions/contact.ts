"use server";

export async function sendContactAction(prevState: { error?: string; success?: boolean } | null, formData: FormData) {
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const message = formData.get('message')?.toString().trim();

  if (!name || !email || !message) {
    return { error: 'All fields are required.' };
  }

  try {
    // Rely on private environment variable first, then fallback to public
    const baseUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    
    const res = await fetch(`${baseUrl}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      let errorMessage = 'Failed to send message.';
      if (Array.isArray(data.message)) {
        errorMessage = data.message.join(' ');
      } else if (typeof data.message === 'string') {
        errorMessage = data.message;
      }
      return { error: errorMessage };
    }

    return { success: true };
  } catch (error) {
    return { error: 'Failed to connect to contact server.' };
  }
}
