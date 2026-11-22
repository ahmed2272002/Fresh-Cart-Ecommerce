"use client"
import { UpdateLoggedUserData } from "@/actions/profile.actions";
import ChangePassword from "@/components/profile/ChangePassword";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ProfileSchema, ProfileSchemaType } from "@/lib/schema/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, User2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner";



export default function MyAccount() {


  const {
      handleSubmit,
      control,
      formState: { isSubmitting },
    } = useForm<ProfileSchemaType>({
      mode: "all",
      resolver : zodResolver(ProfileSchema),
      defaultValues: {
        name: "",
        email: "",
        phone: "",
      },
    });


    async function UpdateUserData(values : ProfileSchemaType) {
    // console.log(values);

    try {
      const response = await UpdateLoggedUserData(values)
      console.log(response)
      if(response.message === "success"){
        // toast success
        toast.success("Update Logged User Data")
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
    <h2 className='font-bold text-2xl'>Account Settings</h2>
    <p className='text-gray-400 text-sm'>Update your profile information and change your password</p>

    <div className="bg-white p-6 rounded-t-xl shadow-xl mt-6">
      <div className="flex items-center gap-3">
        <span className="inline-block p-3 rounded-xl bg-[#dcfce7]"><User2 className="text-green-700 size-7"/></span>
        <div>
          <h2 className="text-md font-bold">Profile Information</h2>
          <p className='text-gray-400 text-sm'>Update your personal details</p>
        </div>
      </div>

      <form className=" flex flex-col gap-3 mt-5"  onSubmit={handleSubmit(UpdateUserData)}>
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
                  className="bg-white rounded-xl border border-gray-300"
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
                  className="bg-white rounded-xl border border-gray-300"
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
                  className="bg-white rounded-xl border border-gray-300"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />


          <Button type="submit" className=" w-fit rounded-md px-4 py-6 bg-[#17a34b]" variant="default">
            {isSubmitting ? <Spinner/>: <><Save/> Save Changes</>}
            </Button>
      </form>

      
    </div>
    <div className="bg-gray-100 p-6 rounded-b-xl">
      <h3 className="font-bold text-md">Account Information</h3>
      <p className="w-full flex justify-between items-center my-4 text-gray-500">User ID <span>_</span></p>
      <p className="w-full flex justify-between items-center my-4 text-gray-500">Role <span className="text-green-800 bg-green-100 py-1 px-3 rounded-md">User</span></p>
    </div>
    
    <ChangePassword></ChangePassword>
    </>
    
  )
}
