

const baseUrl = process.env.NEXT_PUBLIC_BASIC_URL

export async function GetAllBrands(){
    const response = await fetch(`${baseUrl}/api/v1/brands` , {
        headers: {
            "content-type" : "application/json"
        }

    })
    const data = await response.json(); 
    return data;
}


export async function GetSpecificBrand(brandId : string){
    const response = await fetch(`${baseUrl}/api/v1/brands/${brandId}` , {
        headers: {
            "content-type" : "application/json"
        }

    })
    const data = await response.json(); 
    return data;
}
