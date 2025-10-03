"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCheckout } from "@/hooks/useCheckout"; 
import { useTranslations } from "next-intl";


export default function PaymentSuccessPage() {
const t =useTranslations();

  const checkoutMutation = useCheckout();
  const params = useSearchParams();
  const cartId = params.get("cartId");
  const amount = params.get("amount"); // we passed it in return_url

  useEffect(() => {
  
    if (!cartId) {
      return;
    }
  
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
      <h1 className="text-3xl font-bold text-green-600">🎉 {t("account.paymentsuccess")}</h1>
      {amount? <p>{t("account.amount")}: ${amount}</p>:""}
      {checkoutMutation.isPending && <p>Placing your order...</p>}
      {checkoutMutation.isSuccess && <p>{t("account.orderplaced")} ✅</p>}
      {checkoutMutation.isError && <p className="text-red-500">Error creating order.</p>}
    </div>
  );
}
