"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateAddress, useUpdateAddress } from "@/hooks/useUserAddress";
import type { UserAddress, UserAddressInput } from "@/lib/schemas";
import { userAddressSchema } from "@/lib/schemas";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import LocationPicker from "../DeliveryMap/LocationPicker";
import { useTranslations } from "next-intl";

interface AddressFormProps {
  address?: UserAddress & { id: string };
  onSuccess: () => void;
}

export function AddressForm({ address, onSuccess }: AddressFormProps) {
  const t = useTranslations();
  const form = useForm<UserAddressInput>({
    resolver: zodResolver(userAddressSchema),
    defaultValues: {
      firstName: address?.firstName,
      lastName: address?.lastName,
      phone: address?.phone,
      address: address?.address,
      building: address?.building,
      floor: address?.floor,
      flat: address?.flat,
      landmark: address?.landmark,
      lat: address?.lat,
      lng: address?.lng,
      isDefault: address?.isDefault ?? false,
    },
  });

  const { mutateAsync: createAddress, isPending: creating } = useCreateAddress();
  const { mutateAsync: updateAddress, isPending: updating } = useUpdateAddress();

  async function onSubmit(values: UserAddressInput) {
    if (address) {
      await updateAddress({ id: address.id, data: values });
    } else {
      await createAddress(values);
    }
    onSuccess();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name */}
        <FormField
          control={form.control}
          name={"firstName"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("ContactUsForm.firstname")}</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("ContactUsForm.lastname")}</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("ContactUsForm.phone")}</FormLabel>
              <FormControl>
                <Input  {...field} />
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
              <FormLabel>{t("account.address")}</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Building */}
        <FormField
          control={form.control}
          name="building"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("account.building")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Floor */}
        <FormField
          control={form.control}
          name="floor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("account.floor")}</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Flat */}
        <FormField
          control={form.control}
          name="flat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("account.flat")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Landmark */}
        <FormField
          control={form.control}
          name="landmark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("account.landmark")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Latitude */}
       <div>
  <FormLabel>{t("account.location")}</FormLabel>
  <LocationPicker
    onConfirm={(lat, lng) => {
      form.setValue("lat", lat);
      form.setValue("lng", lng);
      form.trigger(["lat", "lng"]);
    }}
  />
  {form.watch("lat") && form.watch("lng") && (
    <p className="text-xs text-gray-500 mt-1">
      📍 {form.watch("lat")}, {form.watch("lng")}
    </p>
  )}
  {(form.formState.errors.lat || form.formState.errors.lng) && (
    <p className="text-sm text-red-500 mt-1">
      Location is required
    </p>
  )}
</div>

        {/* Default checkbox */}
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
              <FormLabel className="mb-0">{t("account.default")}</FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={creating || updating} className=" w-full">
          {creating || updating ? "Saving..." : t("account.saveaddress")}
        </Button>
      </form>
    </Form>
  );
}
