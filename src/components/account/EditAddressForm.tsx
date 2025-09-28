"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useCreateAddress, useUpdateAddress } from "@/hooks/useUserAddress"
import { useVerifyPassword } from "@/hooks/useVerifyPassword"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import LocationPicker from "@/components/DeliveryMap/LocationPicker"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string(),
  phone: z.string().min(5, "Phone is required"),
  address: z.string().min(3, "Address is required"),
  building: z.string().optional(),
  floor: z.string().optional(),
  flat: z.string().optional(),
  landmark: z.string().optional(),
  lat: z.number(),
  lng: z.number(),
  isDefault: z.boolean(),
  password: z.string().min(6, "Password is required"),
})

type FormValues = z.infer<typeof formSchema>
 type AddressWithId = FormValues & { id: string };

export function EditAddressForm({
  address,
  onSuccess,
}: {
  address?: AddressWithId; 
  onSuccess: () => void
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: address?.firstName || "",
      lastName: address?.lastName || "",
      phone: address?.phone || "",
      address: address?.address || "",
      building: address?.building || "",
      floor: address?.floor || "",
      flat: address?.flat || "",
      landmark: address?.landmark || "",
      lat: address?.lat ?? 0,
      lng: address?.lng ?? 0,
      isDefault: address?.isDefault ?? false,
      password: "",
    },
  })

  const { mutateAsync: createAddress } = useCreateAddress()
  const { mutateAsync: updateAddress } = useUpdateAddress()
  const { mutateAsync: verifyPassword } = useVerifyPassword()

  const [loading, setLoading] = useState(false)

  async function onSubmit(values: FormValues) {
    setLoading(true)
    try {
      const isValid = await verifyPassword(values.password)

      if (!isValid) {
        form.setError("password", {
          type: "manual",
          message: "Incorrect password",
        })
        setLoading(false)
        return
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _password, ...dataToSend } = values;

      if (address) {
        await updateAddress({ id: address.id, data: dataToSend })
      } else {
        await createAddress(dataToSend)
      }

      onSuccess()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Location picker */}
        <div>
          <FormLabel>Delivery Location</FormLabel>
          <LocationPicker
            onConfirm={(lat, lng) => {
              form.setValue("lat", lat)
              form.setValue("lng", lng)
            }}
          />
          {form.watch("lat") && form.watch("lng") && (
            <p className="text-xs text-gray-500 mt-1">
              📍 {form.watch("lat")}, {form.watch("lng")}
            </p>
          )}
        </div>

        {/* First name & Last name */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Phone number */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+20123456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Building & Floor */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="building"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Building</FormLabel>
                <FormControl>
                  <Input placeholder="10B" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="floor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Floor</FormLabel>
                <FormControl>
                  <Input placeholder="2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Flat & Landmark */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="flat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Flat</FormLabel>
                <FormControl>
                  <Input placeholder="12A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="landmark"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Landmark</FormLabel>
                <FormControl>
                  <Input placeholder="Near mall" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ✅ isDefault checkbox */}
        <FormField
          control={form.control}
          name="isDefault"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                />
              </FormControl>
              <FormLabel className="mb-0">Set as default address</FormLabel>
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  )
}
