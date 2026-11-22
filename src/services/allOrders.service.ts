const baseUrl = process.env.NEXT_PUBLIC_BASIC_URL

export async function getUserOrders(userId : string){
    const response = await fetch(`${baseUrl}/api/v1/orders/user/${userId}` , {
        headers: {
            "content-type" : "application/json"
        }

    })
    const data = await response.json(); 
    return data;
}