"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import LocationPicker from "@/components/DeliveryMap/LocationPicker";
import { toast } from "sonner"
import { useCart } from "@/hooks/useCart";
import { useCheckout } from "@/hooks/useCheckout";
import { useReverseGeocoding } from "@/hooks/reverseGeocoding";
import { useSession } from "next-auth/react";
import { useUserAddresses } from "@/hooks/useUserAddress";
import Link from "next/link";
import PaymentForm from "@/components/PaymentForm/PaymentForm"



// 1. Validation schema (Zod)
const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email"),
  address: z.string().min(1, "Address is required"),
  building: z.string().optional(),
  floor: z.string().optional(),
  flat: z.string().optional(),
  landmark: z.string().optional(),
  paymentType: z.enum(["cod", "card"]),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>



export default function CheckoutPage() {

  const { data: session } = useSession();
const isLoggedIn = !!session?.user;

const { data: addresses = [], isLoading: addressesLoading } = useUserAddresses();

const defaultAddress = addresses.find((a) => a.isDefault);

  const { data: cart, isLoading } = useCart();
  const checkoutMutation = useCheckout();
  // 2. Init form
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      building: "",
      floor: "",
      flat: "",
      landmark: "",
      paymentType: "cod",
      lat: undefined,
      lng: undefined,
    },
  });

  const paymentType = form.watch("paymentType");


  useEffect(() => {
    if (defaultAddress) {
      form.reset({
        firstName: defaultAddress.firstName,
        lastName: defaultAddress.lastName,
        phone: defaultAddress.phone,
        email: session?.user?.email ?? "",
        address: defaultAddress.address,
        building: defaultAddress.building ?? "",
        floor: defaultAddress.floor ?? "",
        flat: defaultAddress.flat ?? "",
        landmark: defaultAddress.landmark ?? "",
        lat: defaultAddress.lat,
        lng: defaultAddress.lng,
        paymentType: "cod",
      });
    }
  }, [defaultAddress, session?.user?.email, form]);
  



  const onSubmit = (values: CheckoutFormValues) => {
    if (!cart || cart.items.length === 0) {
      toast.success("Cart is empty");
      toast.success("Please add some items before checking out.");
      toast.success("destructive");
      return;
    }

    checkoutMutation.mutate(
      {
        cartId: cart.id,
        address: {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          email: values.email,
          address: values.address,
          building: values.building || "",
          floor: values.floor,
          flat: values.flat,
          landmark: values.landmark,
          lat: values.lat ?? 0,
          lng: values.lng ?? 0,
        },
        paymentType: values.paymentType,
      },
      {
        onSuccess: () => {
          toast.success("Order placed");
          toast.success("Thank you for your order!");
         
        },
        onError: () => {
          toast.error("Checkout failed");
          toast.error("Please try again.");
          toast.error("destructive");
          
        },
      }
    );
  };

  const lat = form.watch("lat");
  const lng = form.watch("lng");
  
  const { address, loading: addressLoading } = useReverseGeocoding(
    lat ?? null,
    lng ?? null
  );

  if (isLoading) return <p>Loading cart...</p>;
  return (
    <div className="container mx-auto py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* LEFT COLUMN: Customer + Payment Form */}
      {isLoggedIn ? (
  <Card>
  <CardHeader>
    <CardTitle>Customer Information</CardTitle>
  </CardHeader>
  <CardContent>
    {addressesLoading ? (
      <p>Loading address...</p>
    ) : defaultAddress ? (
      // ✅ Show read-only summary if user has a default address
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <p>
              <span className="font-medium">
                {defaultAddress.firstName} {defaultAddress.lastName}
              </span>
              <br />
              {defaultAddress.phone}
              <br />
              {/* {defaultAddress.email}<br /> */}
              {defaultAddress.address}, Building {defaultAddress.building}, Floor {defaultAddress.floor}, Flat {defaultAddress.flat}
              <br />
              {defaultAddress.landmark}
            </p>
            <p className="text-sm text-muted-foreground">
              Using your default address. Update it in{" "}
              <Link href="/account" className="underline">
                your account
              </Link>.
            </p>
          </div>

          {/* Submit button inside form */}
          {paymentType === "cod" && (
            <div className="">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={checkoutMutation.status === "pending"}
          >
            {checkoutMutation.status === "pending" ? "Placing order..." : "Place Order"}
          </Button> </div>)}
          <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="paymentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cod" id="cod" />
                            <Label htmlFor="cod">Cash on Delivery</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card">Card</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit */}
          
        </form>
          {paymentType === "card" && (
            <PaymentForm/>
          )}
      </Form>
    ) : (
      // ❌ User has no address saved
      <div>
        <p className="text-sm mb-2">You haven’t added a delivery address yet.</p>
        <Link href="/account/addresses">
          <Button className="cursor-pointer" variant="outline">Add Address</Button>
        </Link>
      </div>
    )}
    
  </CardContent>
</Card>



) : (
  // Show full guest form

      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Contact Info */}
              <div className="space-y-4">
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
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+20 100 000 0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (optional)</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>


              <div>
  <FormLabel>Delivery Location</FormLabel>
  <LocationPicker
    onConfirm={(lat, lng) => {
      form.setValue("lat", lat);
      form.setValue("lng", lng);
    }}
  />
  {lat && lng && (
    <p className="text-xs text-gray-500 mt-1">
      {addressLoading ? (
        "📍 Detecting address..."
      ) : (
        <>
          📍 <span className="text-md">{address}</span>
        </>
      )}
    </p>
  )}
</div>


              {/* Delivery Info */}
              <div className="space-y-4">
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
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="paymentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cod" id="cod" />
                            <Label htmlFor="cod">Cash on Delivery</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card">Card</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit */}
             
              {paymentType === "cod" && (        
  <Button
    type="submit"
    className="w-full cursor-pointer"
    disabled={checkoutMutation.status === "pending"}
  >
    {checkoutMutation.status === "pending" ? "Placing order..." : "Place Order"}
  </Button>)}



            </form>
            {paymentType === "card" && (
  <PaymentForm/>
)}
          </Form>
        </CardContent>
      </Card>)}

      {/* Right Column - Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {cart?.items.length ? (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.itemNameSnapshot}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.sizeOption?.size ?? "Unknown size"} •{" "}
                      {item.crustOption?.crust ?? "Unknown crust"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p>
                      {item.quantity} × ${item.unitPrice.toFixed(2)}
                    </p>
                    <p className="font-semibold">
                      ${item.lineTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cart.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${cart.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}