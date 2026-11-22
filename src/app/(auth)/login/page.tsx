"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { LoginSchema, LoginSchemaType } from "@/lib/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {signIn} from "next-auth/react"
import Link from "next/link";

export default function Login() {

  const router = useRouter()


  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<LoginSchemaType>({
    mode: "all",
    resolver : zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleUserRegister(values : LoginSchemaType) {
    // console.log(values);

    // NextAuth
    
    const response = await signIn("credentials" , {
      email: values.email,
      password : values.password,
      redirect: false,
    })
    if(response?.ok){
        toast.success("Login Successfully!")
        router.push("/")
    }else{
        toast.error(response?.error)
    }
    console.log(response)
  }

  return (
    <>
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleSubmit(handleUserRegister)}>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Your Email"
                  type="email"
                  className="bg-white rounded-xl border border-gray-300 h-10 sm:h-12 text-sm sm:text-base"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Your Password"
                  type="password"
                  className="bg-white rounded-xl border border-gray-300 h-10 sm:h-12 text-sm sm:text-base"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button type="submit" className="w-full h-10 sm:h-12" variant="default">
            {isSubmitting ? <Spinner/>: "Login"}
            </Button>
        </form>
        <div className="flex justify-start sm:justify-end mt-3 sm:mt-4">
          <Link href={'/forgotPassword'} className="text-sm sm:text-md font-semibold text-green-600 block hover:text-black duration-300">Forgot Password?</Link>
        </div>
      </div>
    </>
  );
}
