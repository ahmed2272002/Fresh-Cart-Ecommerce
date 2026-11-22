import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getToken(){
    const token = (await cookies()).get("next-auth.session-token")?.value || (await cookies()).get("_vercel_jwt")?.value

    if(!token){
        throw new Error("Please Login to Add Product to Your Cart")
    }
    
    const decodedToken = await decode({token: token , secret : process.env.AUTH_SECRET !})

    return decodedToken?.token
}
