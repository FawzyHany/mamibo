import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateSessionId } from "@/lib/session";


type UpdateCartItemRequest = {
  quantity: number;
};

export async function PATCH(
  req: Request,
  { params }: { params: { itemId: string } }
) {
  try {
    const { itemId } = params;
    const body: UpdateCartItemRequest = await req.json();
    const { quantity } = body;

    if (quantity === undefined) {
      return NextResponse.json({ error: "Quantity is required" }, { status: 400 });
    }

    const sessionId =await getOrCreateSessionId();

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true },
    });

    if (!cartItem || cartItem.cart.sessionId !== sessionId) {
      return NextResponse.json({ error: "Cart item not found or unauthorized" }, { status: 403 });
    }

    if (quantity === 0) {
      await prisma.cartItem.delete({ where: { id: itemId } });
      return NextResponse.json({ message: "Item removed from cart" });
    }

    const updated = await prisma.cartItem.update({
      where: { id: itemId },
      data: {
        quantity,
        lineTotal: cartItem.unitPrice.toNumber() * quantity,
      },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}




export async function DELETE(
  req: Request,
  { params }: { params: { itemId: string } }
) {
  try {
    const { itemId } = params;
    const sessionId =await getOrCreateSessionId();

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true },
    });

    if (!cartItem || cartItem.cart.sessionId !== sessionId) {
      return NextResponse.json({ error: "Cart item not found or unauthorized" }, { status: 403 });
    }

    await prisma.cartItem.delete({ where: { id: itemId } });

    return NextResponse.json({ message: "Item deleted" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
