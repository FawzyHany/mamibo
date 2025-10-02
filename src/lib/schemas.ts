import { z } from "zod";

export const checkoutSchema = z.object({
  cartId: z.string(),
  address: z.object({
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    email: z.string().optional(),
    address: z.string(),
    building: z.string(),
    floor: z.string().optional(),
    flat: z.string().optional(),
    landmark: z.string().optional(),
    lat: z.number(),
    lng: z.number(),
  }),
  paymentType: z.enum(["cod", "card"]),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;


//Cart Schema
export const AddToCartRequest = z.object({
  menuItemId: z.string(),
  sizeOptionId: z.string().nullable().optional(),
  crustOptionId: z.string().nullable().optional(),
  quantity: z.number(),
});

export type AddCartItemInput = z.infer<typeof AddToCartRequest>;





export const addressSchema = z.object({
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
});

export type AddressFormValues = z.infer<typeof addressSchema>;




// api/schemas/userAddress.ts


export const userAddressSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  address: z.string(),
  building: z.string().optional(),
  floor: z.string().optional(),
  flat: z.string().optional(),
  landmark: z.string().optional(),
  lat: z.number(),
  lng: z.number(),
  isDefault: z.boolean().optional(),
});

// Type for input (create/update)
export type UserAddressInput = z.infer<typeof userAddressSchema>;

// Type for full UserAddress from DB/API response
export interface UserAddress extends UserAddressInput {
  id: string;
  userId: string;
  createdAt: string; // or Date if you parse dates
  updatedAt: string;
}
