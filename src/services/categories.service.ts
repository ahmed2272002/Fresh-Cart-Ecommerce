const baseUrl = process.env.NEXT_PUBLIC_BASIC_URL

export async function GetAllCategories(){
    const response = await fetch(`${baseUrl}/api/v1/categories` , {
        headers: {
            "content-type" : "application/json"
        }

    })
    const data = await response.json(); 
    return data;
}


export async function GetSpecificCategory(categoryId : string){
    const response = await fetch(`${baseUrl}/api/v1/categories/${categoryId}` , {
        headers: {
            "content-type" : "application/json"
        }

    })
    const data = await response.json(); 
    return data;
}
