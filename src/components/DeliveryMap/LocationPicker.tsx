"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DeliveryMap from "./DeliveryMap";
import { useTranslations } from "next-intl";

type Props = {
  onConfirm: (lat: number, lng: number) => void;
};

// --- Delivery Zone Config ---
const STORE_LOCATION = { lat: 30.0444, lng: 31.2357 }; // Example: Cairo center
const MAX_DISTANCE_KM = 5; // allowed radius

 function getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance in km
}

export default function LocationPicker({ onConfirm }: Props) {
  const t = useTranslations();
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" bg-[var(--primary-color2)] cursor-pointer hover:bg-[var(--primary-color2)] hover:text-white my-3 text-white my-3" variant="outline"> {t("account.deliverhere")}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Select your delivery location</DialogTitle>
        </DialogHeader>

        <div className="my-1">
          <DeliveryMap 
            onSelect={(lat, lng) => {
              setCoords({ lat, lng });
            }}
          />
        </div>

        <div className="flex justify-end space-x-2 ">
          <Button
          className="mx-auto w-[70%] cursor-pointer bg-[var(--primary-color2)] hover:bg-[var(--primary-color2)]"
            disabled={!coords}
            onClick={() => {
              if (coords) {
                const distance = getDistanceKm(
                  STORE_LOCATION.lat,
                  STORE_LOCATION.lng,
                  coords.lat,
                  coords.lng
                );

                if (distance > MAX_DISTANCE_KM) {
                  alert(
                    `❌ Sorry, you are outside our ${MAX_DISTANCE_KM} km delivery zone.`
                  );
                  return;
                }

                // ✅ Inside zone → proceed
                onConfirm(coords.lat, coords.lng);
                setOpen(false);
              }
            }}
          >
            {t("account.deliverhere")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
