"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { registerSchema, RegisterSchemaType } from "@/lib/schema/auth.schema";
import { SignupUser } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Register() {

  const router = useRouter()


  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<RegisterSchemaType>({
    mode: "all",
    resolver : zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  async function handleUserRegister(values : RegisterSchemaType) {
    // console.log(values);

    try {
      const response = await SignupUser(values)
      console.log(response)
      if(response.message === "success"){
        // toast success
        toast.success("Account created successfully!")
        router.push("/login")
      }
      else{
        // toast exist account
        toast.error(response.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleSubmit(handleUserRegister)}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Your Name"
                  type="text"
                  className="bg-white rounded-xl border border-gray-300 h-10 sm:h-12 text-sm sm:text-base"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

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

          <Controller
            name="rePassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>re-Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Confirm Your Password"
                  type="password"
                  className="bg-white rounded-xl border border-gray-300 h-10 sm:h-12 text-sm sm:text-base"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="01 XXXXXXXXX"
                  type="text"
                  className="bg-white rounded-xl border border-gray-300 h-10 sm:h-12 text-sm sm:text-base"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button type="submit" className="w-full h-10 sm:h-12" variant="default">
            {isSubmitting ? <Spinner/>: "Register"}
            </Button>
        </form>
      </div>
    </>
  );
}
