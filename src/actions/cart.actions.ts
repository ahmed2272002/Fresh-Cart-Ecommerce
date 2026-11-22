"use server"
import { getToken } from "@/lib/auth";

const baseUrl = process.env.NEXT_PUBLIC_BASIC_URL


async function getCartToken(): Promise<string>{
    return await getToken() as string
}


export async function addProductToCart(productId : string, count : number = 1, quantityMode : "set" | "increase" = "increase"){
    if(!Number.isInteger(count) || count < 1){
        throw new Error("Quantity must be at least 1")
    }

    const cart = await getLoggedUserCart()
    const existingProduct = cart.data.products.find((item : {product : {_id : string}, count : number}) => item.product._id === productId)

    if(existingProduct){
        const nextCount = quantityMode === "increase" ? existingProduct.count + count : count
        return await updateCartProductQuantity(productId, nextCount)
    }

    const token = await getCartToken()
    const response = await fetch(`${baseUrl}/api/v2/cart` , {
        method: "POST",
        body : JSON.stringify({productId}),
        headers: {
            token : token ,
            "content-type" : "application/json",
        }
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data?.message || "Failed to add product to cart")
    }

    if(count > 1){
        return await updateCartProductQuantity(productId, count)
    }

    return data;
}



export async function getLoggedUserCart(){
    const token = await getCartToken()
    const response = await fetch(`${baseUrl}/api/v2/cart` , {
        cache: "no-store",
        headers: {
            token : token ,
            "content-type" : "application/json",
        }

    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data?.message || "Failed to load cart")
    }
    return data;
}



export async function removeProductFromCart(productId : string ){
    const token = await getCartToken()
    const response = await fetch(`${baseUrl}/api/v2/cart/${productId}` , {
        method : "DELETE",
        headers: {
            token : token ,
            "content-type" : "application/json",
        }

    });
    const data = await response.json();
    return data;
}



export async function updateCartProductQuantity(productId : string ,count : number){
    const token = await getCartToken()
    const response = await fetch(`${baseUrl}/api/v2/cart/${productId}` , {
        method : "PUT",
        body:JSON.stringify({count}) ,
        headers: {
            token : token ,
            "content-type" : "application/json",
        }

    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data?.message || "Failed to update cart quantity")
    }
    return data;
}



export async function clearUserCart(){
    const token = await getCartToken()
    const response = await fetch(`${baseUrl}/api/v2/cart` , {
        method : "DELETE",
        headers: {
            token : token ,
            "content-type" : "application/json",
        }

    });
    const data = await response.json();
    return data;
}
