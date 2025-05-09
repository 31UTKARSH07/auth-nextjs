import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup'
    const token = request.cookies.get('token')?.value || '';
    // If the user is logged in and trying to access the login or signup page
    // redirect them to the home page
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    // If the user is not logged in and trying to access a protected route
    // redirect them to the login page
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}
// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup'
    ]
}