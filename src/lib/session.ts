import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

export async function getOrCreateSessionId(): Promise<string> {
  const cookieStore = await cookies(); // This call returns a Promise<ReadonlyRequestCookies>
  let sessionId = cookieStore.get('sessionId')?.value;

  if (!sessionId) {
    sessionId = uuidv4();

    // You need to await the cookies() call to get the ReadonlyRequestCookies object
    // Then you can use .set() on it.
    const mutableCookieStore = await cookies();
    mutableCookieStore.set('sessionId', sessionId, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  return sessionId;
}