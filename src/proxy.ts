import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });

  // to get the pathname of page
  const { pathname } = request.nextUrl;
  console.log(pathname);

  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/brands", "/cart", "/wishlist", "/myAccount" , "/login" , "/register"],
};
