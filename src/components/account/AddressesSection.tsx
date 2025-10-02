"use client";

import { useState } from "react";
import { useUserAddresses, useDeleteAddress } from "@/hooks/useUserAddress";
import type { UserAddress } from "@/lib/schemas";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AddressForm } from "@/components/account/EditAddressForm";
import { useTranslations } from "next-intl";


export default function AddressesSection() {
  const { data: addresses, isLoading, error } = useUserAddresses();
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(null);
  const { mutateAsync: deleteAddress, isPending: deleting } = useDeleteAddress();
  const t = useTranslations();
  async function handleDelete(id: string) {
  
    const confirmDelete = confirm("Are you sure you want to delete this address?");
    if (!confirmDelete) return;
  
    try {
      await deleteAddress(id);
    } catch (err) {
      console.error("Failed to delete address", err);
    }
  }

  if (isLoading) return <p>Loading addresses...</p>;
  if (error) return <p className="text-red-500">Failed to load addresses</p>;

  function openAddModal() {
    setSelectedAddress(null); // Clear selection for adding new
    setOpen(true);
  }

  function openEditModal(address: UserAddress) {
    setSelectedAddress(address);
    setOpen(true);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{t("account.address")}</h2>
        <Button onClick={openAddModal}>{t("account.newaddress")}</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {addresses?.map((addr) => (
          <Card key={addr.id} className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{addr.address}</span>
                {addr.isDefault && (
                  <span className="text-xs text-green-600">{t("account.default")}</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-gray-600">
              <p>{t("account.building")}: {addr.building || "-"}</p>
              <p>{t("account.floor")}: {addr.floor || "-"}</p>
              <p>{t("account.flat")}: {addr.flat || "-"}</p>
              <p>{t("account.landmark")}: {addr.landmark || "-"}</p>
              <p>
                📍 {addr.lat}, {addr.lng}
              </p>
                  <div className="flex gap-20">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openEditModal(addr)}
                className="mt-2"
              >
                {t("account.edit")}
              </Button>
              <Button
  variant="destructive"
  size="sm"
  onClick={() => handleDelete(addr.id)}
  disabled={deleting}
  className="mt-2 ml-2"
>
{t("account.delete")}
</Button></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>{selectedAddress ? "Edit Address" : "Add Address"}</DialogTitle>
    </DialogHeader>
    <AddressForm
      address={selectedAddress ?? undefined}
      onSuccess={() => setOpen(false)}
    />
  </DialogContent>
</Dialog>
    </div>
  );
}
