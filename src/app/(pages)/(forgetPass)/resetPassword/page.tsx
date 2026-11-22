"use client"

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import { Spinner } from '@/components/ui/spinner'
import { ResetPasswordSchema, ResetPasswordSchemaType } from '@/lib/schema/forgotPassword'
import { resetPassword, VerifyResetCode } from '@/services/forgotPassword.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check,  Lock } from 'lucide-react'

import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function ResetPassword() {
  const route = useRouter()

    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
      } = useForm<ResetPasswordSchemaType>({
        mode: "all",
        resolver : zodResolver(ResetPasswordSchema),
        defaultValues: {
          email: "",
          newPassword : "",
        },
      });



      
    async function handleResetPassword(values : ResetPasswordSchemaType) {
    // console.log(values);

    try {
        const response = await resetPassword(values)
        console.log(response)
        if(response.token){
            toast.success("Password Is Updated")
            route.push('/login')
        }
        else{
            toast.error("Something Wrong")
        }
    } catch (error) {
        console.log(error)
    }
    }



  return (
    <>
    <div className='px-4 py-12'>
        <div className='body bg-white shadow rounded-md p-5 py-10'>
            <h2 className='font-bold text-3xl text-center'><span className='text-green-600'>Fresh</span>Cart</h2>
            <h3 className=' font-bold text-xl text-center mt-2'>Create New Password</h3>
            <p className='text-center text-md mt-2 text-gray-500'>Your new password must be different from previous passwords</p>
            <div className='flex justify-center my-8'>
                <ul className='flex justify-between relative items-center w-[50%] after:absolute after:top-1/2 after:left-12 after:block after:w-[57px] after:h-[1px] after:bg-green-300 
                before:absolute before:top-1/2 before:right-12 before:block before:w-[57px] before:h-[1px] before:bg-green-300'>
                    <li className='bg-green-600 inline-block p-3 rounded-full shadow-md shadow-green-300'><Check size={20} className='text-white'/></li>
                    <li className='bg-green-600 inline-block p-3 rounded-full shadow-md shadow-green-300'><Check size={20} className='text-white'/></li>
                    <li className='bg-green-600 inline-block p-3 rounded-full shadow-md shadow-green-300'><Lock size={20} className='text-white '/></li>
                </ul>
            </div>

            <form className='flex flex-col gap-3' onSubmit={handleSubmit(handleResetPassword)}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter Your Email Address"
                                type="email"
                                className="bg-white rounded-xl border border-gray-300"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="newPassword"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter New Password"
                                type="password"
                                className="bg-white rounded-xl border border-gray-300"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            </Field>
                        )}
                    />
                    <Button type="submit" className=" w-full py-6 rounded-xl text-md font-semibold" variant="default">
                        {isSubmitting ? <Spinner/>: "Reset Password"}
                    </Button>
                </form>
        </div>
    </div>
    </>   
)
}