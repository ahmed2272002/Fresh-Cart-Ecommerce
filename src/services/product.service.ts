const baseUrl = process.env.NEXT_PUBLIC_BASIC_URL

export async function getAllProduct(page : number|null){
    const response = await fetch(`${baseUrl}/api/v1/products?page=${page}`)
    const data = await response.json(); 
    return data;
}


export async function getProductDetails(produnctId : string){
    const response = await fetch(`${baseUrl}/api/v1/products/${produnctId}`)
    const data = await response.json(); 
    return data;
}

