"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCheckout } from "@/hooks/useCheckout"; 


export default function PaymentSuccessPage() {
  console.log("🚀 PaymentSuccessPage mounted");

 
  

  const checkoutMutation = useCheckout();
  const params = useSearchParams();
  const cartId = params.get("cartId");
  const amount = params.get("amount"); // we passed it in return_url

  useEffect(() => {
    console.log("✅ useEffect triggered");
  
    if (!cartId) {
      console.error("❌ No cartId found in URL");
      return;
    }
  
    console.log("🚀 Attempting checkoutMutation with cartId:", cartId);
  
    checkoutMutation.mutate(
      {
        cartId,
        address: {
          firstName: params.get("firstName") ?? "",
          lastName: params.get("lastName") ?? "",
          phone: params.get("phone") ?? "",
          email: params.get("email") ?? "",
          address: params.get("address") ?? "",
          building: params.get("building") ?? "",
          floor: params.get("floor") ?? "",
          flat: params.get("flat") ?? "",
          landmark: params.get("landmark") ?? "",
          lat: Number(params.get("lat") ?? 0),
          lng: Number(params.get("lng") ?? 0),
        },
        paymentType: "card",
      },
      {
        onSuccess: () => {
          console.log("✅ checkoutMutation succeeded");
        },
        onError: (err) => {
          console.error("❌ checkoutMutation failed:", err);
        },
      }
    );
  }, [cartId]);
  
  

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-green-600">🎉 Payment Successful!</h1>
      <p>Amount: ${amount}</p>

      {checkoutMutation.isPending && <p>Placing your order...</p>}
      {checkoutMutation.isSuccess && <p>Your order has been placed ✅</p>}
      {checkoutMutation.isError && <p className="text-red-500">Error creating order.</p>}
    </div>
  );
}
