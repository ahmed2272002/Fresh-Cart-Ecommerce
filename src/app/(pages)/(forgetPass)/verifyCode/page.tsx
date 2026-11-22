"use client"

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { forgotPasswordSchema, forgotPasswordSchemaType, VerifyCodeSchema, VerifyCodeSchemaType } from '@/lib/schema/forgotPassword'
import { forgotPassword, VerifyResetCode } from '@/services/forgotPassword.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Dot, Key, Lock, MoveLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function VerifyCode() {

     const route = useRouter()

    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
      } = useForm<VerifyCodeSchemaType>({
        mode: "all",
        resolver : zodResolver(VerifyCodeSchema),
        defaultValues: {
          resetCode: "",
        },
      });



      
    async function handleVerifyCode(values : VerifyCodeSchemaType) {
    // console.log(values);

    try {
        const response = await VerifyResetCode(values)
        console.log(response)
        if(response.status === "Success"){
            toast.success("Success VerifyCode")
            route.push('/resetPassword')
        }
        else{
            toast.error("Wrong VerifyCode")
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
            <h3 className=' font-bold text-xl text-center mt-2'>Check Your Email</h3>
            <p className='text-center text-md mt-2 text-gray-500'>Enter the 6-digit code sent to Your Email@gmail.com</p>
            <div className='flex justify-center my-8'>
                <ul className='flex justify-between relative items-center w-[50%] after:absolute after:top-1/2 after:left-12 after:block after:w-[57px] after:h-[1px] after:bg-gray-300 
                before:absolute before:top-1/2 before:right-12 before:block before:w-[57px] before:h-[1px] before:bg-gray-300'>
                    <li className='bg-green-600 inline-block p-3 rounded-full shadow-md shadow-green-300'><Check size={20} className='text-white'/></li>
                    <li className='bg-green-600 inline-block p-3 rounded-full shadow-md shadow-green-300'><Key size={20} className='text-white'/></li>
                    <li className='bg-gray-200 inline-block p-3 rounded-full shadow-lg'><Lock size={20} className='text-gray-500'/></li>
                </ul>
            </div>

            <form className='flex flex-col gap-3' onSubmit={handleSubmit(handleVerifyCode)}>
                    <Controller
                        name="resetCode"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Verification Code</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder=". . . . . ."
                                type="text"
                                className="bg-white rounded-xl border text-center placeholder:text-6xl placeholder:text-gray-400 border-gray-300"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            </Field>
                        )}
                    />
                    <span className='text-center text-gray-400'>Did not receive the code? <Link href={'/forgotPassword'} className='text-green-600 font-semibold hover:text-black duration-200'>Resend Code</Link></span>
                    <Button type="submit" className=" w-full py-6 rounded-xl text-md font-semibold" variant="default">
                        {isSubmitting ? <Spinner/>: "Verify Code"}
                    </Button>
                </form>

                <div className='flex flex-col items-center justify-center mt-6'>
                    <Link href={'/forgotPassword'} className=' text-gray-500 flex gap-2 hover:text-black duration-200'><MoveLeft/> Change email address</Link>
                </div>
        </div>
    </div>
    </>
  )
}
