// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if it's an admin route (but not the login page)
  const isAdminRoute = path.startsWith('/admin') && path !== '/admin/login';
  const isAuthRoute = path === '/admin/login';

  const session = request.cookies.get('admin_session');

  // Redirect to login if accessing admin without session
  if (isAdminRoute && !session) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Redirect to dashboard if accessing login with active session
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};