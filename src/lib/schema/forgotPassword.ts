import * as z from "zod";

export const forgotPasswordSchema = z.object({
    email: z.string().nonempty("Email is Required").email("Email is not Valid"),

})

export type  forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>



export const VerifyCodeSchema = z.object({
    resetCode: z.string().nonempty("Enter the 6-digit code").min(6,"Enter the 6-digit code"),

})

export type  VerifyCodeSchemaType = z.infer<typeof VerifyCodeSchema>




export const ResetPasswordSchema = z.object({
    email: z.string().nonempty("Email is Required").email("Email is not Valid"),

    newPassword : z.string().nonempty("New Password is Required").min(8, "min 8 chars"),

})

export type  ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>
