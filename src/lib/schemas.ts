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


