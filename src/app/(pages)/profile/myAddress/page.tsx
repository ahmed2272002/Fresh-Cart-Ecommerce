"use client";
import {
  AddAddress,
  GetLoggedUserAddresses,
  RemoveAddress,
} from "@/actions/profile.actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import { AddAddressSchema, AddAddressSchemaType } from "@/lib/schema/profile";
import { AddressIF } from "@/types/addressType";
import { zodResolver } from "@hookform/resolvers/zod";
import { BuildingComplex, MapPin, Pencil, Phone, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function MyAddress() {
  const [addresses, setAddress] = useState<AddressIF[]>([]);
  // console.log(addresses)

  const [editingAddress, setEditingAddress] = useState<AddressIF | null>(null);

  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<AddAddressSchemaType>({
    mode: "all",
    resolver: zodResolver(AddAddressSchema),
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
  });

  async function AddNewAddress(values: AddAddressSchemaType) {
    // console.log(values);

    try {
      const response = await AddAddress(values);
      console.log(response);
      if (response.status === "success") {
        // toast success
        toast.success("Added New Address");
        UserAddresses();
      } else {
        // toast exist account
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function UserAddresses() {
    try {
      const response = await GetLoggedUserAddresses();
      // console.log(response.data)
      setAddress(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    UserAddresses();
  }, []);

  async function removeAddress(id: string) {
    try {
      const response = await RemoveAddress(id);
      console.log(response);
      if (response.status === "success") {
        toast.success(response.message);
        UserAddresses();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const editForm = useForm<AddAddressSchemaType>({
    mode: "all",
    resolver: zodResolver(AddAddressSchema),
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
  });

  function handleEditAddress(address: AddressIF) {
    setEditingAddress(address);

    editForm.reset({
      name: address.name,
      details: address.details,
      phone: address.phone,
      city: address.city,
    });
  }

  async function SaveAddressUpdates(values: AddAddressSchemaType) {
    if (!editingAddress) return;

    try {
      // Delete old address
      const deleteResponse = await RemoveAddress(editingAddress._id);

      if (deleteResponse.status !== "success") {
        toast.error(deleteResponse.message || "Failed to delete address");
        return;
      }

      // Add updated address
      const addResponse = await AddAddress(values);

      if (addResponse.status !== "success") {
        toast.error("Address deleted, but adding the new address failed!");

        await UserAddresses();
        return;
      }

      // Refresh addresses
      await UserAddresses();

      toast.success("Address Updated Successfully!");

      // Close popover and reset form
      setOpenPopoverId(null);
      setEditingAddress(null);
      editForm.reset();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      await UserAddresses();
    }
  }

  return (
    <>
      <h2 className="font-bold text-2xl">My Addresses</h2>
      <p className="text-gray-400 text-sm">
        Manage your saved delivery addresses
      </p>

      <div className="grid grid-cols-12 mt-5">
        <div className=" col-span-10 flex flex-wrap gap-3">
          {addresses.map((address) => (
            <React.Fragment key={address._id}>
              <div className="bg-white rounded-xl shadow-2xl p-5 flex gap-3 w-[48%]">
                <span className="text-[#16a34a] bg-[#f0fdf4] p-3 rounded-md inline-block h-fit">
                  <MapPin />
                </span>
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-black">{address.city}</p>
                      <span className="text-gray-400">{address.details}</span>
                    </div>
                    <div className="flex gap-2">
                      <Popover
                        open={openPopoverId === address._id}
                        onOpenChange={(open) => {
                          setOpenPopoverId(open ? address._id : null);

                          if (!open) {
                            setEditingAddress(null);
                            editForm.reset();
                          }
                        }}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            onClick={() => handleEditAddress(address)}
                            className="rounded-md bg-gray-200 text-gray-600 hover:bg-fuchsia-300"
                          >
                            <Pencil />
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-80" align="end">
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-semibold">Edit Address</h3>
                              <p className="text-sm text-gray-500">
                                Update your address details.
                              </p>
                            </div>

                            <form
                              className="flex flex-col gap-3"
                              onSubmit={editForm.handleSubmit(
                                SaveAddressUpdates,
                              )}
                            >
                              {/* Name */}
                              <Controller
                                name="name"
                                control={editForm.control}
                                render={({ field, fieldState }) => (
                                  <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={`edit-${field.name}`}>
                                      Name
                                    </FieldLabel>
                                    <Input
                                      {...field}
                                      id={`edit-${field.name}`}
                                      aria-invalid={fieldState.invalid}
                                      placeholder="Enter Your Name"
                                      className="bg-white rounded-xl border border-gray-300"
                                    />
                                    {fieldState.invalid && (
                                      <FieldError errors={[fieldState.error]} />
                                    )}
                                  </Field>
                                )}
                              />

                              {/* Address Details */}
                              <Controller
                                name="details"
                                control={editForm.control}
                                render={({ field, fieldState }) => (
                                  <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={`edit-${field.name}`}>
                                      Address Details
                                    </FieldLabel>
                                    <Input
                                      {...field}
                                      id={`edit-${field.name}`}
                                      aria-invalid={fieldState.invalid}
                                      placeholder="Enter Your Address Details"
                                      className="bg-white rounded-xl border border-gray-300"
                                    />
                                    {fieldState.invalid && (
                                      <FieldError errors={[fieldState.error]} />
                                    )}
                                  </Field>
                                )}
                              />

                              {/* Phone */}
                              <Controller
                                name="phone"
                                control={editForm.control}
                                render={({ field, fieldState }) => (
                                  <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={`edit-${field.name}`}>
                                      Phone
                                    </FieldLabel>
                                    <Input
                                      {...field}
                                      id={`edit-${field.name}`}
                                      aria-invalid={fieldState.invalid}
                                      placeholder="Enter Your Phone Number"
                                      className="bg-white rounded-xl border border-gray-300"
                                    />
                                    {fieldState.invalid && (
                                      <FieldError errors={[fieldState.error]} />
                                    )}
                                  </Field>
                                )}
                              />

                              {/* City */}
                              <Controller
                                name="city"
                                control={editForm.control}
                                render={({ field, fieldState }) => (
                                  <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={`edit-${field.name}`}>
                                      City
                                    </FieldLabel>
                                    <Input
                                      {...field}
                                      id={`edit-${field.name}`}
                                      aria-invalid={fieldState.invalid}
                                      placeholder="Enter Your City"
                                      className="bg-white rounded-xl border border-gray-300"
                                    />
                                    {fieldState.invalid && (
                                      <FieldError errors={[fieldState.error]} />
                                    )}
                                  </Field>
                                )}
                              />

                              <Button
                                type="submit"
                                className="w-full"
                                disabled={editForm.formState.isSubmitting}
                              >
                                {editForm.formState.isSubmitting ? (
                                  <Spinner />
                                ) : (
                                  "Save Updates"
                                )}
                              </Button>
                            </form>
                          </div>
                        </PopoverContent>
                      </Popover>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="rounded-md bg-gray-200 text-gray-600 hover:bg-red-300">
                            <Trash />
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>

                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your address.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>

                            <AlertDialogAction
                              onClick={() => removeAddress(address._id)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-3">
                    <span className="flex items-center gap-2 text-[10px] text-gray-400">
                      <Phone size={15} />
                      {address.phone}
                    </span>
                    <span className="flex items-center gap-2 text-[10px] text-gray-400">
                      <BuildingComplex size={15} /> {address.name}
                    </span>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className=" col-span-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="rounded-md bg-[#17a34b] shadow-2xl">
                + Add Address
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Add New Address</h3>
                  <p className="text-sm text-gray-500">
                    Enter your address details.
                  </p>
                </div>

                <form
                  className=" flex flex-col gap-3"
                  onSubmit={handleSubmit(AddNewAddress)}
                >
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
                    name="details"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Address Details
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter Your Address Details"
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
                    name="phone"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter Your Phone Number"
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
                    name="city"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>City</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter Your City"
                          type="text"
                          className="bg-white rounded-xl border border-gray-300"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Button type="submit" className=" w-full" variant="default">
                    {isSubmitting ? <Spinner /> : "New Address"}
                  </Button>
                </form>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
}
