"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useCart } from "@/hooks/useCart";
import { useFormContext } from "react-hook-form";

const CheckoutPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { data: cart } = useCart();
  const form = useFormContext(); // ✅ checkout form values

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const amount = cart?.total ?? 0;

  // Fetch clientSecret from backend
  useEffect(() => {
    if (!amount) return;
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    console.log("🚀 handleSubmit started");

    if (!stripe || !elements) {
      console.log("❌ Stripe or Elements not loaded");
      return;
    }

    console.log("✅ Stripe + Elements loaded");

    const { error: submitError } = await elements.submit();
    console.log("📦 elements.submit() result:", submitError);
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    // Grab checkout form values
    const firstName = form.getValues("firstName");
    const lastName = form.getValues("lastName");
    const phone = form.getValues("phone");
    const email = form.getValues("email");
    const address = form.getValues("address");
    const building = form.getValues("building") || "";
    const floor = form.getValues("floor");
    const flat = form.getValues("flat");
    const landmark = form.getValues("landmark");
    const lat = form.getValues("lat") ?? 0;
    const lng = form.getValues("lng") ?? 0;

    console.log("⚡ Calling stripe.confirmPayment with clientSecret:", clientSecret);

    // Only Stripe confirm + return_url
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/payment-success?amount=${amount}&cartId=${cart?.id}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}&address=${encodeURIComponent(address)}&building=${encodeURIComponent(building)}&floor=${encodeURIComponent(floor)}&flat=${encodeURIComponent(flat)}&landmark=${encodeURIComponent(landmark)}&lat=${lat}&lng=${lng}`,
      },
    });

    if (error) {
      console.log("❌ confirmPayment error:", error);
      setErrorMessage(error.message ?? "Payment failed. Please try again.");
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return <div className="text-center">Loading payment form...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      <PaymentElement />
      {errorMessage && <div className="text-red-600 mt-2">{errorMessage}</div>}
      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;
