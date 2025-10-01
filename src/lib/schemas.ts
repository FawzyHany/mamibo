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