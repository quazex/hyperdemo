import { NextResponse } from 'next/server';

export function middleware(): NextResponse {
    // const token = request.cookies.get('accessToken')?.value;

    // if (!token) {
    //     const url = new URL('/login', request.url);
    //     return NextResponse.redirect(url);
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
