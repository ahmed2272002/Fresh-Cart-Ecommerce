"use client"
import { Controller, useForm } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'
import { Lock, LockIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangePassSchema, ChangePassSchemaSchemaType } from '@/lib/schema/profile'
import { toast } from 'sonner'
import { UpdateLoggedUserPassword } from '@/actions/profile.actions'
import { useRouter } from 'next/navigation'

export default function ChangePassword() {

    const route = useRouter()

      const {
      handleSubmit,
      control,
      formState: { isSubmitting },
    } = useForm<ChangePassSchemaSchemaType>({
      mode: "all",
      resolver : zodResolver(ChangePassSchema),
      defaultValues: {
        currentPassword: "",
        password: "",
        rePassword: "",
      },
    });


    async function ChangePassword(values : ChangePassSchemaSchemaType) {
    console.log(values);

    try {
      const response = await UpdateLoggedUserPassword(values)
      console.log(response)
      if(response.message === "success"){
        // toast success
        toast.success("Password Changed!")
        route.push('/login')
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
    <div className="bg-white p-6 rounded-xl shadow-xl mt-8">
      <div className="flex items-center gap-3">
        <span className="inline-block p-3 rounded-xl bg-[#fef3c6]"><LockIcon className="text-[#e17100] size-7"/></span>
        <div>
          <h2 className="text-md font-bold">Profile Information</h2>
          <p className='text-gray-400 text-sm'>Update your personal details</p>
        </div>
      </div>

      <form className=" flex flex-col gap-3 mt-5"  onSubmit={handleSubmit(ChangePassword)}>
        <Controller
            name="currentPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Current Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Your Password"
                  type="password"
                  className="bg-white rounded-xl border border-gray-300"
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
                <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Your New Password"
                  type="password"
                  className="bg-white rounded-xl border border-gray-300"
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
                <FieldLabel htmlFor={field.name}>Confirm New Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Confirm New Password"
                  type="password"
                  className="bg-white rounded-xl border border-gray-300"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />


          <Button type="submit" className=" w-fit rounded-md px-4 py-6 bg-[#e17100]" variant="default">
            {isSubmitting ? <Spinner/>: <><Lock /> Change Password</>}
            </Button>
      </form>
    </div>
  )
}
