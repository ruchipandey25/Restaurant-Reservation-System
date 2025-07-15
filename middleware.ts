import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the protected routes (you can also protect entire paths like '/dashboard/*')
const protectedRoutes = ['/dashboard', '/profile', '/settings'];

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token'); // Or retrieve session token from headers, cookies, etc.

    // Check if the current path is protected
    if (protectedRoutes.includes(req.nextUrl.pathname)) {
        if (!token) {
            // If the user is not authenticated, redirect to login
            return NextResponse.redirect(new URL('/sign-in', req.url));
        }
    }

    // If authenticated or route is not protected, continue with the request
    return NextResponse.next();
}

// Define the routes or paths where this middleware should run
export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*'],
};
