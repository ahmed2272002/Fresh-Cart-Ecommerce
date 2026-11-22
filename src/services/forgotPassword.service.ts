import { forgotPasswordSchemaType, ResetPasswordSchemaType, VerifyCodeSchemaType } from "@/lib/schema/forgotPassword";

const baseUrl = process.env.NEXT_PUBLIC_BASIC_URL

export async function forgotPassword(formdata : forgotPasswordSchemaType){
    const response = await fetch(`${baseUrl}/api/v1/auth/forgotPasswords` , {
        method : "POST",
        body: JSON.stringify(formdata),
        headers: {
            "content-type" : "application/json"
        }

    })
    const data = await response.json(); 
    return data;    
}


export async function VerifyResetCode(formdata : VerifyCodeSchemaType){
    const response = await fetch(`${baseUrl}/api/v1/auth/verifyResetCode` , {
        method : "POST",
        body: JSON.stringify(formdata),
        headers: {
            "content-type" : "application/json"
        }

    })
    const data = await response.json(); 
    return data;    
}


export async function resetPassword(formdata : ResetPasswordSchemaType){
    const response = await fetch(`${baseUrl}/api/v1/auth/resetPassword` , {
        method : "PUT",
        body: JSON.stringify(formdata),
        headers: {
            "content-type" : "application/json"
        }

    })
    const data = await response.json(); 
    return data;    
}
