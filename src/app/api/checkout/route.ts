// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { PaymentType } from "@prisma/client";

// Zod schema for checkout POST body
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



export async function POST(req: Request) {
  try {
    
    const body = await req.json();
    console.log("🚀 Incoming Body:", body);
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { cartId, address, paymentType } = parsed.data;

    // 1. Fetch cart with items
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: true },
    });

    if (!cart) {
 
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }
    
    if (cart.items.length === 0) {

      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }
    

    // 2. Compute totals
    const subtotal = cart.items.reduce((acc, item) => acc + item.lineTotal.toNumber(), 0);
    const tax = +(subtotal * 0.1).toFixed(2); // simple 10% tax example
    const total = +(subtotal + tax).toFixed(2);

    // 3. Create order (with address + items snapshot)
    const order = await prisma.$transaction(async (tx) => {
    const createdAddress = await prisma.orderAddress.create({
      data: address,
    });

   
    const prismaPaymentType = paymentType === "cod" ? PaymentType.cod : PaymentType.card;
   
    const newOrder = await tx.order.create({
      data: {
        userId: cart.userId,
        sessionId: cart.sessionId,
        paymentType: prismaPaymentType,
        paid: paymentType === "cod" ? false : true,
        total,
        addressId:createdAddress.id,

        items: {
          create: cart.items.map((item) => ({
            menuItemId: item.menuItemId,
            itemName: item.itemNameSnapshot,
            imageUrl: item.imageUrlSnapshot,
            quantity: item.quantity,
            unitPrice: item.unitPrice.toNumber(),
            lineTotal: item.lineTotal.toNumber(),
            sizeOptionId: item.sizeOptionId ?? undefined,
            crustOptionId: item.crustOptionId ?? undefined,
          })),
        },
      },
      include: {
        address: true,
        items: true,
      },
    });
   
    return newOrder;
  });
    // 4. Clear cart
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return NextResponse.json(order, { status: 201 });
  } catch (err) {
    console.error("🔥 Uncaught Error:", err);
    console.error(err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
