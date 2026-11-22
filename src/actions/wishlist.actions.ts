
    "use server";

    import { getToken } from "@/lib/auth";

    const baseUrl = process.env.NEXT_PUBLIC_BASIC_URL;

    export async function AddProductToWishlist( productId: string) {
        const token = await getToken();
        const response = await fetch(
        `${baseUrl}/api/v1/wishlist`,
        {
            method: "POST",
            body: JSON.stringify( {productId} ),
            headers: {
  "Content-Type": "application/json",
  ...(token ? { token } : {}),
},
        }
        );
        const data = await response.json();
        return data;
    }



    export async function RemoveProductFromWishlist( productId: string) {
        const token = await getToken();
        const response = await fetch(
        `${baseUrl}/api/v1/wishlist/${productId}`,
        {
            method: "DELETE",
            headers: {
  "Content-Type": "application/json",
  ...(token ? { token } : {}),
},
        }
        );
        const data = await response.json();
        return data;
    }


    export async function GetLoggedUserWishlist() {
        const token = await getToken();
        const response = await fetch(
        `${baseUrl}/api/v1/wishlist`,
        {
            headers: {
  "Content-Type": "application/json",
  ...(token ? { token } : {}),
},
        }
        );
        const data = await response.json();
        return data;
    }
