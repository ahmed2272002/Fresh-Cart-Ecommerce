import * as z from "zod";

export const ProfileSchema = z.object({
    name : z.string().nonempty("Name is Required").min(3,"min Chars is 3").max(10,"max Chars is 10"),

    email: z.string().nonempty("Email is Required").email("Email is not Valid"),

    phone : z.string().nonempty("Phone is Required").regex(/^01[0125][0-9]{8}$/ , "InValid Phone Number")

})

export type  ProfileSchemaType = z.infer<typeof ProfileSchema>





export const ChangePassSchema = z.object({

    currentPassword: z.string().nonempty("Password is Required").min(8, "min 8 chars"), 

    password : z.string().nonempty("Password is Required").min(8, "min 8 chars"),

    rePassword : z.string().nonempty("Confirm Your New Password"),

}).refine(
    (data) =>{
        return data.password === data.rePassword;
    },
    {path : ["rePassword"] , message: "Password Not Match"},
)

export type  ChangePassSchemaSchemaType = z.infer<typeof ChangePassSchema>


export const AddAddressSchema = z.object({
    name : z.string().nonempty("Name is Required"),

    details: z.string().nonempty("Details is Required"),

    phone : z.string().nonempty("Phone is Required").regex(/^01[0125][0-9]{8}$/ , "InValid Phone Number"),

    city : z.string().nonempty("City is Required")
})

export type  AddAddressSchemaType = z.infer<typeof AddAddressSchema>