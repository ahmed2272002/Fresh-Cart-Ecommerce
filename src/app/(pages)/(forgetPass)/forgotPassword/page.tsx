"use client"

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { forgotPasswordSchema, forgotPasswordSchemaType } from '@/lib/schema/forgotPassword'
import { forgotPassword } from '@/services/forgotPassword.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { Key, Lock, Mail, MoveLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'


export default function ForgotPassword() {

    const route = useRouter()

    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
      } = useForm<forgotPasswordSchemaType>({
        mode: "all",
        resolver : zodResolver(forgotPasswordSchema),
        defaultValues: {
          email: "",
        },
      });



      
    async function handleForgotPassword(values : forgotPasswordSchemaType) {
    console.log(values);

    try {
        const response = await forgotPassword(values)
        console.log(response)
        if(response.statusMsg === "success"){
            toast.success(response.message)
            route.push('/verifyCode')
        }
        else{
            toast.error("Something Error")
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
            <h3 className=' font-bold text-xl text-center mt-2'>Forgot Password?</h3>
            <p className='text-center text-md mt-2 text-gray-500'>No worries, we will send you a reset code</p>
            <div className='flex justify-center my-8'>
                <ul className='flex justify-between relative items-center w-[50%] after:absolute after:top-1/2 after:left-12 after:block after:w-[57px] after:h-[1px] after:bg-gray-300 
                before:absolute before:top-1/2 before:right-12 before:block before:w-[57px] before:h-[1px] before:bg-gray-300'>
                    <li className='bg-green-600 inline-block p-3 rounded-full shadow-md shadow-green-300'><Mail size={20} className='text-white'/></li>
                    <li className='bg-gray-200 inline-block p-3 rounded-full shadow-lg'><Key size={20} className='text-gray-500'/></li>
                    <li className='bg-gray-200 inline-block p-3 rounded-full shadow-lg'><Lock size={20} className='text-gray-500'/></li>
                </ul>
            </div>

            <form className='flex flex-col gap-3' onSubmit={handleSubmit(handleForgotPassword)}>
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
                                placeholder="Enter Your Email"
                                type="email"
                                className="bg-white rounded-xl border border-gray-300"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            </Field>
                        )}
                    />
                    <Button type="submit" className=" w-full py-6 rounded-xl text-md font-semibold" variant="default">
                        {isSubmitting ? <Spinner/>: "Send Reset Code"}
                    </Button>
                </form>

                <div className='flex flex-col items-center justify-center mt-6'>
                    <Link href={'/login'} className=' text-green-600 flex gap-2 hover:text-black duration-200'><MoveLeft/> Back to Signin</Link>
                    <Separator className='my-5'/>
                    <span className='flex gap-2'>Remember your password? <Link href={'/login'} className=' text-green-600 flex gap-2 hover:text-black duration-200'>Signin</Link></span>
                </div>
        </div>
    </div>
    </>
  )
}
