// import { NextResponse, type NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL("/", request.url));
// }

// export const config = {
//   matcher: "/test",
// };

// export function middleware(request: NextRequest) {
//   if (request.nextUrl.pathname == "/test")
//     return NextResponse.redirect(new URL("/", request.url));
// }

// export function middleware(request: NextRequest) {
//   const response = NextResponse.next();

// const theme = request.cookies.get("theme");
// if (theme) {
//   return NextResponse.redirect(new URL("/", request.url));
// }

// return response;
// }

export { default } from 'next-auth/middleware';

export const config = {
    matcher: ['/dashboard/:path*', '/auth/profile']
};
