import * as z from "zod";

export const registerSchema = z.object({
    name : z.string().nonempty("Name is Required").min(3,"min Chars is 3").max(10,"max Chars is 10"),

    email: z.string().nonempty("Email is Required").email("Email is not Valid"),

    password : z.string().nonempty("Password is Required").min(8, "min 8 chars"),

    rePassword : z.string().nonempty("Confirm Your Password"),

    phone : z.string().nonempty("Phone is Required").regex(/^01[0125][0-9]{8}$/ , "InValid Phone Number")

}).refine(
    (data) =>{
        return data.password === data.rePassword;
    },
    {path : ["rePassword"] , message: "Password Not Match"},
)




export const LoginSchema = z.object({

    email: z.string().nonempty("Email is Required").email("Email is not Valid"),

    password : z.string().nonempty("Password is Required").min(8, "min 8 chars")
})



export type  RegisterSchemaType = z.infer<typeof registerSchema>
export type  LoginSchemaType = z.infer<typeof LoginSchema>
