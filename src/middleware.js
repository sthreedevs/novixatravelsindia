import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Verify token
      const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET || 'secret');
      const { payload } = await jwtVerify(token, secret);
      
      if (!payload.isAdmin) {
          throw new Error('Not an admin');
      }
      return NextResponse.next();
    } catch (error) {
      console.error('JWT Verification failed:', error);
      // Redirect to login if token is invalid or expired
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  // Redirect authenticated admins away from the login page
  if (pathname === '/admin/login') {
      const token = request.cookies.get('admin_token')?.value;
      if (token) {
        try {
            const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET || 'secret');
            await jwtVerify(token, secret);
            return NextResponse.redirect(new URL('/admin', request.url));
        } catch (error) {
            // Valid to be at login if token is bad
        }
      }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
