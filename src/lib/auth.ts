import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getToken() {
  const cookieStore = await cookies();

  // على Vercel (HTTPS) الكوكي اسمه __Secure-..., وعلى localhost بدون البادئة
  const token =
    cookieStore.get("__Secure-next-auth.session-token")?.value ??
    cookieStore.get("next-auth.session-token")?.value;

  if (!token) {
    throw new Error("Please Login to Add Product to Your Cart");
  }

  const decodedToken = await decode({
    token,
    secret: (process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET)!,
  });

  return decodedToken?.token;
}