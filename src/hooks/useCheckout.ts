// hooks/useCheckout.ts
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { checkoutSchema } from "@/app/api/checkout/route";  ; // we’ll extract schema here

// 👇 response type from backend
export type CheckoutResponse = {
  id: string;
  total: number;
  status: string;
  paymentType: string;
  createdAt: string;
  address: {
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
    address: string;
    building: string;
    floor?: string;
    flat?: string;
    landmark?: string;
    lat: number;
    lng: number;
  };
  items: Array<{
    id: string;
    itemName: string;
    imageUrl?: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }>;
};

// 👇 input type inferred from zod
export type CheckoutInput = z.infer<typeof checkoutSchema>;

export function useCheckout() {
  return useMutation<CheckoutResponse, Error, CheckoutInput>({
    mutationFn: async (data) => {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || "Checkout failed");
      }

      return res.json();
    },
  });
}
